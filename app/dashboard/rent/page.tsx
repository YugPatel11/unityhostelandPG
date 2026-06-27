'use client';

import { useState } from 'react';
import { Search, Filter, Download, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

const payments = [
  { id: 'TRX-101', student: 'Rahul Sharma', room: '101', amount: '₹6,500', month: 'June 2026', status: 'Paid', date: '2026-06-05' },
  { id: 'TRX-102', student: 'Aditya Patel', room: '102', amount: '₹6,000', month: 'June 2026', status: 'Pending', date: '-' },
  { id: 'TRX-103', student: 'Vikram Singh', room: '103', amount: '₹6,500', month: 'June 2026', status: 'Paid', date: '2026-06-01' },
  { id: 'TRX-104', student: 'Raj Kumar', room: '104', amount: '₹6,000', month: 'June 2026', status: 'Late', date: '-' },
  { id: 'TRX-105', student: 'Amit Desai', room: '105', amount: '₹5,500', month: 'June 2026', status: 'Paid', date: '2026-06-02' },
];

export default function RentPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Rent Tracking</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Monitor monthly rent payments and dues.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 font-medium text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-stone-950 p-5 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 flex items-center justify-between group">
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Total Expected</p>
            <h3 className="text-2xl font-bold text-stone-900 dark:text-white">₹152,000</h3>
          </div>
          <div className="w-12 h-12 bg-stone-100 dark:bg-stone-900/50 rounded-full flex items-center justify-center text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
        </div>
        <div className="bg-white dark:bg-stone-950 p-5 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 flex items-center justify-between group border-l-4 border-l-emerald-500">
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Collected (June)</p>
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹128,500</h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-500 transition-colors">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-stone-950 p-5 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 flex items-center justify-between group border-l-4 border-l-rose-500">
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Pending/Late</p>
            <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400">₹23,500</h3>
          </div>
          <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-500 transition-colors">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-950 text-stone-900 dark:text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm transition-all"
            placeholder="Search student, room, or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-950 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm">
          <option>June 2026</option>
          <option>May 2026</option>
          <option>April 2026</option>
        </select>
        <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-sm font-medium">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-stone-950 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 dark:bg-stone-900/50 text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">Student Info</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Month</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Paid On</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-stone-500 dark:text-stone-400">{payment.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-stone-900 dark:text-white">{payment.student}</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">Room {payment.room}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-stone-900 dark:text-white">{payment.amount}</td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{payment.month}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Paid' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                        : payment.status === 'Pending'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                    }`}>
                      {payment.status === 'Paid' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {payment.status === 'Late' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{payment.date}</td>
                  <td className="px-6 py-4 text-right">
                    {payment.status !== 'Paid' ? (
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20 px-3 py-1.5 rounded-lg transition-colors">
                        Mark Paid
                      </button>
                    ) : (
                      <button className="text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 font-medium text-xs px-3 py-1.5 transition-colors">
                        Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
