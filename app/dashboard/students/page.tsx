'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  room: string;
  phone: string;
  status: string;
  rent: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch('/api/students');
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm)
  );

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

      {/* Search */}
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
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-400">
                    {searchTerm ? 'No students match your search.' : 'No students yet. Add your first student to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination info */}
        {filteredStudents.length > 0 && (
          <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-sm">
            <span className="text-stone-500 dark:text-stone-400">Showing {filteredStudents.length} of {students.length} entries</span>
          </div>
        )}
      </div>
      
    </div>
  );
}
