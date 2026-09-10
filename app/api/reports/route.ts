import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31, 23, 59, 59);

    // Get all paid payments this year
    const payments = await prisma.payment.findMany({
      where: {
        status: 'PAID',
        month: { gte: yearStart, lte: yearEnd },
      },
    });

    // Get all expenses this year
    const expenses = await prisma.expense.findMany({
      where: {
        date: { gte: yearStart, lte: yearEnd },
      },
    });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Build monthly profit trend
    const profitData = [];
    for (let m = 0; m <= now.getMonth(); m++) {
      const monthIncome = payments
        .filter((p) => new Date(p.month).getMonth() === m)
        .reduce((sum, p) => sum + p.amount, 0);
      const monthExpense = expenses
        .filter((e) => new Date(e.date).getMonth() === m)
        .reduce((sum, e) => sum + e.amount, 0);
      profitData.push({
        month: monthNames[m],
        profit: monthIncome - monthExpense,
        income: monthIncome,
        expense: monthExpense,
      });
    }

    // YTD totals
    const ytdRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const ytdExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const expenseRatio = ytdRevenue > 0 ? Math.round((ytdExpenses / ytdRevenue) * 100) : 0;

    return NextResponse.json({
      profitData,
      ytdRevenue,
      ytdExpenses,
      expenseRatio,
      year,
    });
  } catch (error) {
    console.error('Reports GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}
