'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Wallet, X, Loader2, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { toast } from 'sonner';

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#f43f5e', '#84cc16'];

interface Expense {
  id: string;
  expId: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface ExpenseData {
  expenses: Expense[];
  totalThisMonth: number;
  changePercent: number;
  pieData: { name: string; value: number }[];
  monthName: string;
}

export default function ExpensesPage() {
  const [data, setData] = useState<ExpenseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/expenses');
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error || 'Failed to add expense');
        return;
      }
      toast.success('Expense added!');
      setShowModal(false);
      setForm({ category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
      fetchData();
    } catch (error) {
      toast.error('Failed to add expense');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredExpenses = (data?.expenses || []).filter((e) =>
    e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pieData = data?.pieData || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Expenses</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Track your PG running costs and vendor payments.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setShowModal(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20 font-medium text-sm"
          >
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
              <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Expenses ({data?.monthName})</p>
              <h3 className="text-3xl font-bold text-stone-900 dark:text-white mt-2 mb-4">₹{(data?.totalThisMonth || 0).toLocaleString('en-IN')}</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className={`font-medium ${(data?.changePercent || 0) <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {(data?.changePercent || 0) <= 0 ? `${Math.abs(data?.changePercent || 0)}% less` : `${data?.changePercent || 0}% more`}
                </span>
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
            {pieData.length > 0 ? (
              <>
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
                        formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, undefined]}
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
                      <span className="font-medium text-stone-900 dark:text-white">₹{entry.value.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-stone-400 text-sm text-center py-8">No expenses this month yet.</p>
            )}
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
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors group">
                      <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{expense.date}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-stone-600 dark:text-stone-300 max-w-xs truncate">{expense.description}</td>
                      <td className="px-6 py-4 font-bold text-stone-900 dark:text-white text-right">₹{expense.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-stone-400">
                      {searchTerm ? 'No expenses match your search.' : 'No expenses recorded this month.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Expense Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white dark:bg-stone-950 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Add Expense</h2>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Category *</label>
                <select 
                  required value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white"
                >
                  <option value="">Select category</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Internet">Internet</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Gas">Gas</option>
                  <option value="Salary">Salary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Amount (₹) *</label>
                  <input 
                    type="number" required value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white"
                    placeholder="5000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Date *</label>
                  <input 
                    type="date" required value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Description</label>
                <input 
                  type="text" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white"
                  placeholder="e.g. Monthly electricity bill"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-600 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="flex-1 px-4 py-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors font-medium disabled:opacity-70 inline-flex items-center justify-center">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
