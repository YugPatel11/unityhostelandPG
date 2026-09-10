import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    // Get all expenses for current month
    const expenses = await prisma.expense.findMany({
      where: {
        date: { gte: currentMonthStart, lte: currentMonthEnd },
      },
      orderBy: { date: 'desc' },
    });

    const formattedExpenses = expenses.map((e, i) => ({
      id: e.id,
      expId: `EXP-${String(i + 1).padStart(3, '0')}`,
      category: e.category,
      amount: e.amount,
      date: new Date(e.date).toISOString().split('T')[0],
      description: e.description || '-',
    }));

    // Total this month
    const totalThisMonth = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Total last month
    const lastMonthExpenses = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        date: { gte: lastMonthStart, lte: lastMonthEnd },
      },
    });
    const totalLastMonth = lastMonthExpenses._sum.amount || 0;
    const changePercent = totalLastMonth > 0 ? Math.round(((totalThisMonth - totalLastMonth) / totalLastMonth) * 100) : 0;

    // Breakdown by category (pie chart data)
    const categoryBreakdown: Record<string, number> = {};
    expenses.forEach((e) => {
      categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + e.amount;
    });
    const pieData = Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value }));

    return NextResponse.json({
      expenses: formattedExpenses,
      totalThisMonth,
      changePercent,
      pieData,
      monthName: now.toLocaleString('default', { month: 'long' }),
    });
  } catch (error) {
    console.error('Expenses GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, amount, description, date } = body;

    if (!category || !amount || !date) {
      return NextResponse.json({ error: 'Category, amount and date are required' }, { status: 400 });
    }

    const expense = await prisma.expense.create({
      data: {
        category,
        amount: parseInt(amount),
        description: description || null,
        date: new Date(date),
      },
    });

    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    console.error('Expenses POST error:', error);
    return NextResponse.json({ error: 'Failed to add expense' }, { status: 500 });
  }
}
