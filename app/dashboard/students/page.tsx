'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash } from 'lucide-react';
import Link from 'next/link';

const students = [
  { id: '1', name: 'Rahul Sharma', room: '101', phone: '+91 9876543210', status: 'Active', rent: 'Paid' },
  { id: '2', name: 'Aditya Patel', room: '102', phone: '+91 9876543211', status: 'Active', rent: 'Pending' },
  { id: '3', name: 'Vikram Singh', room: '103', phone: '+91 9876543212', status: 'Active', rent: 'Paid' },
  { id: '4', name: 'Raj Kumar', room: '104', phone: '+91 9876543213', status: 'Active', rent: 'Paid' },
  { id: '5', name: 'Amit Desai', room: '105', phone: '+91 9876543214', status: 'Left', rent: 'Cleared' },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Students</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Manage PG residents and their details.</p>
        </div>
        <Link 
          href="/dashboard/students/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 font-medium text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Link>
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
            placeholder="Search by name, room, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-sm font-medium">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-stone-950 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 dark:bg-stone-900/50 text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Room No</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Rent</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-stone-900 dark:text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                      {student.name.charAt(0)}
                    </div>
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{student.room}</td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{student.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                        : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-400'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      student.rent === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                      student.rent === 'Pending' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                      'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-400'
                    }`}>
                      {student.rent}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-sm">
          <span className="text-stone-500 dark:text-stone-400">Showing 1 to 5 of 24 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900">Next</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
