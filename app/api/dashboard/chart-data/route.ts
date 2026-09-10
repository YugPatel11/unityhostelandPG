import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const year = now.getFullYear();

    // Get monthly income (paid payments) for the current year
    const payments = await prisma.payment.findMany({
      where: {
        status: 'PAID',
        month: {
          gte: new Date(year, 0, 1),
          lte: new Date(year, 11, 31),
        },
      },
    });

    // Get monthly expenses for the current year
    const expenses = await prisma.expense.findMany({
      where: {
        date: {
          gte: new Date(year, 0, 1),
          lte: new Date(year, 11, 31),
        },
      },
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Build monthly data up to current month
    const barChartData = [];
    for (let m = 0; m <= now.getMonth(); m++) {
      const monthIncome = payments
        .filter((p) => new Date(p.month).getMonth() === m)
        .reduce((sum, p) => sum + p.amount, 0);
      const monthExpense = expenses
        .filter((e) => new Date(e.date).getMonth() === m)
        .reduce((sum, e) => sum + e.amount, 0);
      barChartData.push({
        name: monthNames[m],
        income: monthIncome,
        expense: monthExpense,
      });
    }

    // Occupancy pie data
    const rooms = await prisma.room.findMany({
      include: {
        students: {
          where: { status: 'ACTIVE' },
        },
      },
    });
    const totalBeds = rooms.reduce((sum, r) => sum + r.totalBeds, 0);
    const occupiedBeds = rooms.reduce((sum, r) => sum + r.students.length, 0);
    const vacantBeds = totalBeds - occupiedBeds;

    return NextResponse.json({
      barChartData,
      pieData: [
        { name: 'Occupied', value: occupiedBeds },
        { name: 'Vacant', value: Math.max(vacantBeds, 0) },
      ],
      occupancyRate: totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0,
      occupiedBeds,
      vacantBeds: Math.max(vacantBeds, 0),
    });
  } catch (error) {
    console.error('Chart data error:', error);
    return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}
