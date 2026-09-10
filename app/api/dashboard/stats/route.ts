import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    // Active students count
    const activeStudents = await prisma.student.count({
      where: { status: 'ACTIVE' },
    });

    // Students added this month
    const newStudentsThisMonth = await prisma.student.count({
      where: {
        createdAt: { gte: currentMonthStart, lte: currentMonthEnd },
      },
    });

    // Total beds & occupied beds
    const rooms = await prisma.room.findMany({
      include: {
        students: {
          where: { status: 'ACTIVE' },
        },
      },
    });
    const totalBeds = rooms.reduce((sum, r) => sum + r.totalBeds, 0);
    const occupiedBeds = rooms.reduce((sum, r) => sum + r.students.length, 0);

    // Revenue this month (paid payments)
    const revenueThisMonth = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: 'PAID',
        month: { gte: currentMonthStart, lte: currentMonthEnd },
      },
    });

    // Revenue last month
    const revenueLastMonth = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: 'PAID',
        month: { gte: lastMonthStart, lte: lastMonthEnd },
      },
    });

    const currentRevenue = revenueThisMonth._sum.amount || 0;
    const lastRevenue = revenueLastMonth._sum.amount || 0;
    const revenueChange = lastRevenue > 0 ? Math.round(((currentRevenue - lastRevenue) / lastRevenue) * 100) : 0;

    // Pending rent this month
    const pendingPayments = await prisma.payment.aggregate({
      _sum: { amount: true },
      _count: true,
      where: {
        status: { in: ['PENDING', 'LATE'] },
        month: { gte: currentMonthStart, lte: currentMonthEnd },
      },
    });

    // Recent students (last 5 with room and latest payment status)
    const recentStudents = await prisma.student.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        room: true,
        payments: {
          where: {
            month: { gte: currentMonthStart, lte: currentMonthEnd },
          },
          take: 1,
        },
      },
    });

    const formattedRecentStudents = recentStudents.map((s) => ({
      id: s.id,
      name: s.fullName,
      room: s.room?.roomNumber || 'Unassigned',
      date: s.checkInDate.toISOString().split('T')[0],
      rent: s.payments.length > 0 ? s.payments[0].status === 'PAID' ? 'Paid' : 'Pending' : 'Pending',
    }));

    const monthName = now.toLocaleString('default', { month: 'long' });

    return NextResponse.json({
      totalRevenue: currentRevenue,
      revenueChange,
      monthName,
      totalBeds,
      occupiedBeds,
      occupancyRate: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0,
      activeStudents,
      newStudentsThisMonth,
      pendingRent: pendingPayments._sum.amount || 0,
      pendingRentStudents: pendingPayments._count || 0,
      recentStudents: formattedRecentStudents,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
