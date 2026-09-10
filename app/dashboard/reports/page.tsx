'use client';

import { useState, useEffect } from 'react';
import { Download, FileText, Calendar, Filter, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReportData {
  profitData: { month: string; profit: number; income: number; expense: number }[];
  ytdRevenue: number;
  ytdExpenses: number;
  expenseRatio: number;
  year: number;
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/reports');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const profitData = data?.profitData || [];
  const ytdRevenue = data?.ytdRevenue || 0;
  const ytdExpenses = data?.ytdExpenses || 0;
  const netProfit = ytdRevenue - ytdExpenses;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Analyze financial performance and business growth.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
            <h3 className="font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-600" />
              Year at a Glance
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900">
                <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Total Revenue</p>
                <p className="text-xl font-bold text-stone-900 dark:text-white">₹{ytdRevenue.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900">
                <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Total Expenses</p>
                <p className="text-xl font-bold text-stone-900 dark:text-white">₹{ytdExpenses.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Net Profit</p>
                <p className={`text-xl font-bold ${netProfit >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  ₹{netProfit.toLocaleString('en-IN')}
                </p>
              </div>
              {ytdRevenue > 0 && (
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900">
                  <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Expense Ratio</p>
                  <p className="text-xl font-bold text-stone-900 dark:text-white">{data?.expenseRatio || 0}%</p>
                  <p className="text-xs text-stone-400 mt-1">of revenue goes to expenses</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col - Visuals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-stone-900 dark:text-white text-lg">Net Profit Trend</h3>
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <Calendar className="w-4 h-4" />
                <span>{data?.year}</span>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              {profitData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={profitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number, name: string) => [`₹${value.toLocaleString('en-IN')}`, name === 'profit' ? 'Net Profit' : name]}
                    />
                    <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-stone-400 text-sm">
                  No data yet. Add payments and expenses to see trends.
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-emerald-200 font-medium text-sm">YTD Revenue</p>
                <h3 className="text-3xl font-bold mt-1 mb-2">₹{ytdRevenue.toLocaleString('en-IN')}</h3>
                <p className="text-sm text-emerald-100/80">
                  {profitData.length > 0 ? `${profitData.length} months tracked` : 'Start recording payments'}
                </p>
              </div>
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>
            <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-stone-400 font-medium text-sm">YTD Expenses</p>
                <h3 className="text-3xl font-bold mt-1 mb-2">₹{ytdExpenses.toLocaleString('en-IN')}</h3>
                <p className="text-sm text-stone-500">{data?.expenseRatio || 0}% of revenue</p>
              </div>
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
