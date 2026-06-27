'use client';

import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', profit: 16000 },
  { month: 'Feb', profit: 23000 },
  { month: 'Mar', profit: 14000 },
  { month: 'Apr', profit: 25000 },
  { month: 'May', profit: 25000 },
  { month: 'Jun', profit: 31000 },
];

export default function ReportsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Generate financial reports and analyze business growth.</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 font-medium text-sm">
          <Download className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Filters & Quick Generate */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
            <h3 className="font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-600" />
              Report Configuration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Report Type</label>
                <select className="w-full px-3 py-2 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  <option>Financial Summary</option>
                  <option>Rent Collection</option>
                  <option>Expense Breakdown</option>
                  <option>Occupancy Trends</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Time Period</label>
                <select className="w-full px-3 py-2 border border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Quarter</option>
                  <option>Year to Date</option>
                  <option>Custom Range</option>
                </select>
              </div>
              
              <button className="w-full py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white rounded-xl font-medium text-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
            <h3 className="font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Recent Exports
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">May Financials</p>
                      <p className="text-xs text-stone-500">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - Visuals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-stone-900 dark:text-white text-lg">Net Profit Margin</h3>
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <Calendar className="w-4 h-4" />
                <span>2026</span>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                  />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-emerald-200 font-medium text-sm">YTD Revenue</p>
                <h3 className="text-3xl font-bold mt-1 mb-2">₹282,000</h3>
                <p className="text-sm text-emerald-100/80">On track for ₹600k annual target</p>
              </div>
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>
            <div className="bg-stone-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-stone-400 font-medium text-sm">YTD Expenses</p>
                <h3 className="text-3xl font-bold mt-1 mb-2">₹148,000</h3>
                <p className="text-sm text-stone-500">52% of revenue</p>
              </div>
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
