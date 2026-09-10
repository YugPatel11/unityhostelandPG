import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const monthParam = searchParams.get('month'); // e.g., "2026-09"

    let monthFilter: any = {};
    if (monthParam) {
      const [year, month] = monthParam.split('-').map(Number);
      monthFilter = {
        month: {
          gte: new Date(year, month - 1, 1),
          lte: new Date(year, month, 0, 23, 59, 59),
        },
      };
    }

    const payments = await prisma.payment.findMany({
      where: monthFilter,
      orderBy: { createdAt: 'desc' },
      include: {
        student: {
          select: {
            fullName: true,
            room: { select: { roomNumber: true } },
          },
        },
      },
    });

    const formattedPayments = payments.map((p, i) => ({
      id: p.id,
      txId: `TRX-${String(i + 1).padStart(3, '0')}`,
      student: p.student.fullName,
      room: p.student.room?.roomNumber || '-',
      amount: p.amount,
      month: new Date(p.month).toLocaleString('default', { month: 'long', year: 'numeric' }),
      status: p.status === 'PAID' ? 'Paid' : p.status === 'PENDING' ? 'Pending' : 'Late',
      date: p.paidDate ? new Date(p.paidDate).toISOString().split('T')[0] : '-',
    }));

    // Summary cards
    const totalExpected = payments.reduce((sum, p) => sum + p.amount, 0);
    const collected = payments.filter((p) => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0);
    const pendingLate = payments.filter((p) => p.status !== 'PAID').reduce((sum, p) => sum + p.amount, 0);

    return NextResponse.json({
      payments: formattedPayments,
      totalExpected,
      collected,
      pendingLate,
    });
  } catch (error) {
    console.error('Rent GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, amount, month, status } = body;

    if (!studentId || !amount || !month) {
      return NextResponse.json({ error: 'Student, amount and month are required' }, { status: 400 });
    }

    const payment = await prisma.payment.create({
      data: {
        studentId,
        amount: parseInt(amount),
        month: new Date(month),
        status: status || 'PAID',
        paidDate: status === 'PAID' || !status ? new Date() : null,
      },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error('Rent POST error:', error);
    return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
  }
}
