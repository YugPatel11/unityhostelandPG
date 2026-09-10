import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const payment = await prisma.payment.update({
      where: { id },
      data: {
        status: 'PAID',
        paidDate: new Date(),
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Rent PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 });
  }
}
