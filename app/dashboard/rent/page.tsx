'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Payment {
  id: string;
  txId: string;
  student: string;
  room: string;
  amount: number;
  month: string;
  status: string;
  date: string;
}

interface RentData {
  payments: Payment[];
  totalExpected: number;
  collected: number;
  pendingLate: number;
}

interface StudentOption {
  id: string;
  name: string;
  room: string;
}

export default function RentPage() {
  const [data, setData] = useState<RentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [form, setForm] = useState({ studentId: '', amount: '', month: '', status: 'PAID' });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/rent');
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch rent data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const result = await res.json();
      setStudents(result.filter((s: any) => s.status === 'Active').map((s: any) => ({
        id: s.id,
        name: s.name,
        room: s.room,
      })));
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleMarkPaid = async (paymentId: string) => {
    try {
      const res = await fetch(`/api/rent/${paymentId}`, { method: 'PATCH' });
      if (!res.ok) {
        toast.error('Failed to mark as paid');
        return;
      }
      toast.success('Payment marked as paid!');
      fetchData();
    } catch (error) {
      toast.error('Failed to mark as paid');
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/rent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error || 'Failed to record payment');
        return;
      }
      toast.success('Payment recorded!');
      setShowModal(false);
      setForm({ studentId: '', amount: '', month: '', status: 'PAID' });
      fetchData();
    } catch (error) {
      toast.error('Failed to record payment');
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = () => {
    fetchStudents();
    setShowModal(true);
  };

  const filteredPayments = (data?.payments || []).filter((p) =>
    p.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.txId.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Rent Tracking</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Monitor monthly rent payments and dues.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={openModal}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 font-medium text-sm"
          >
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
            <h3 className="text-2xl font-bold text-stone-900 dark:text-white">₹{(data?.totalExpected || 0).toLocaleString('en-IN')}</h3>
          </div>
          <div className="w-12 h-12 bg-stone-100 dark:bg-stone-900/50 rounded-full flex items-center justify-center text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
        </div>
        <div className="bg-white dark:bg-stone-950 p-5 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 flex items-center justify-between group border-l-4 border-l-emerald-500">
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Collected</p>
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{(data?.collected || 0).toLocaleString('en-IN')}</h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-500 transition-colors">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-stone-950 p-5 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 flex items-center justify-between group border-l-4 border-l-rose-500">
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mb-1">Pending/Late</p>
            <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400">₹{(data?.pendingLate || 0).toLocaleString('en-IN')}</h3>
          </div>
          <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-500 transition-colors">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
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
            placeholder="Search student, room, or transaction ID..."
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
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-stone-500 dark:text-stone-400">{payment.txId}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900 dark:text-white">{payment.student}</div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">Room {payment.room}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900 dark:text-white">₹{payment.amount.toLocaleString('en-IN')}</td>
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
                        <button 
                          onClick={() => handleMarkPaid(payment.id)}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-xs border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-stone-400 text-xs">✓ Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-400">
                    {searchTerm ? 'No payments match your search.' : 'No payment records yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white dark:bg-stone-950 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Record Payment</h2>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Student *</label>
                <select 
                  required value={form.studentId}
                  onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} (Room {s.room})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Amount (₹) *</label>
                  <input 
                    type="number" required value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                    placeholder="6000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Month *</label>
                  <input 
                    type="month" required value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value + '-01' })}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Status</label>
                <select 
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                >
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="LATE">Late</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-600 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium disabled:opacity-70 inline-flex items-center justify-center">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}
