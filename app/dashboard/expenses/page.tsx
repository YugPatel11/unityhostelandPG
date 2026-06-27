'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Wallet, Receipt, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const expenses = [
  { id: 'EXP-001', category: 'Electricity', amount: '₹12,500', date: '2026-06-05', description: 'Monthly Bill - Main Meter' },
  { id: 'EXP-002', category: 'Groceries', amount: '₹8,000', date: '2026-06-08', description: 'Kitchen supplies week 1' },
  { id: 'EXP-003', category: 'Maintenance', amount: '₹2,500', date: '2026-06-10', description: 'Plumbing repair Room 102' },
  { id: 'EXP-004', category: 'Internet', amount: '₹1,500', date: '2026-06-12', description: 'JioFiber Monthly' },
  { id: 'EXP-005', category: 'Cleaning', amount: '₹5,000', date: '2026-06-15', description: 'Staff Salary - June half' },
];

const pieData = [
  { name: 'Electricity', value: 12500 },
  { name: 'Groceries', value: 8000 },
  { name: 'Cleaning', value: 5000 },
  { name: 'Maintenance', value: 2500 },
  { name: 'Internet', value: 1500 },
];
const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Expenses</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Track your PG running costs and vendor payments.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20 font-medium text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Overview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Expenses (June)</p>
              <h3 className="text-3xl font-bold text-stone-900 dark:text-white mt-2 mb-4">₹29,500</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-emerald-600 font-medium">12% less</span>
                <span className="text-stone-500">than last month</span>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-rose-50 dark:bg-rose-900/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute top-6 right-6 text-rose-200 dark:text-rose-900/30">
              <Wallet className="w-12 h-12" />
            </div>
          </div>

          <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-4 uppercase tracking-wider">Expense Breakdown</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-stone-600 dark:text-stone-400">{entry.name}</span>
                  </div>
                  <span className="font-medium text-stone-900 dark:text-white">₹{entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - List */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-950 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 flex flex-col">
          <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-stone-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-rose-500 sm:text-sm transition-all"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-sm font-medium">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 dark:bg-stone-900/50 text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors group">
                    <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{expense.date}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-600 dark:text-stone-300 max-w-xs truncate">{expense.description}</td>
                    <td className="px-6 py-4 font-bold text-stone-900 dark:text-white text-right">{expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
