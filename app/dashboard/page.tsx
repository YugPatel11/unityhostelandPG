'use client';

import { 
  Users, 
  BedDouble, 
  IndianRupee, 
  TrendingUp, 
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', income: 40000, expense: 24000 },
  { name: 'Feb', income: 45000, expense: 22000 },
  { name: 'Mar', income: 42000, expense: 28000 },
  { name: 'Apr', income: 50000, expense: 25000 },
  { name: 'May', income: 48000, expense: 23000 },
  { name: 'Jun', income: 52000, expense: 21000 },
];

const pieData = [
  { name: 'Occupied', value: 25 },
  { name: 'Vacant', value: 5 },
];
const COLORS = ['#10b981', '#f43f5e'];

const recentStudents = [
  { id: '1', name: 'Rahul Sharma', room: '101', date: '2026-06-25', rent: 'Paid' },
  { id: '2', name: 'Aditya Patel', room: '102', date: '2026-06-24', rent: 'Pending' },
  { id: '3', name: 'Vikram Singh', room: '103', date: '2026-06-20', rent: 'Paid' },
  { id: '4', name: 'Raj Kumar', room: '104', date: '2026-06-15', rent: 'Paid' },
];

export default function DashboardHome() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm md:text-base">Welcome back! Here's what's happening at Unity PG today.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Revenue (June)</p>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white mt-2">₹52,000</h3>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-600 font-medium">+8%</span>
            <span className="text-stone-400 ml-2">from last month</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        </div>

        <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Occupied Beds</p>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white mt-2">25 <span className="text-sm font-normal text-stone-400">/ 30</span></h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <BedDouble className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="text-stone-600 dark:text-stone-300 font-medium">83% Occupancy Rate</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        </div>

        <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Active Students</p>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white mt-2">25</h3>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="text-stone-600 dark:text-stone-300">2 new this month</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        </div>

        <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Pending Rent</p>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">₹12,500</h3>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="text-red-600 font-medium">From 2 students</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-50 dark:bg-red-900/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 lg:col-span-2">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-6">Income vs Expenses (2026)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-950 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 flex flex-col">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Occupancy Status</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-stone-900 dark:text-white">83%</span>
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Occupied</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-stone-600 dark:text-stone-400">Occupied (25)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <span className="text-sm text-stone-600 dark:text-stone-400">Vacant (5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-stone-950 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">Recent Students</h3>
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 dark:bg-stone-900/50 text-stone-500 dark:text-stone-400">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Room</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium">Rent Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {recentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900 dark:text-white">{student.name}</td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{student.room}</td>
                  <td className="px-6 py-4 text-stone-600 dark:text-stone-300">{student.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      student.rent === 'Paid' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                    }`}>
                      {student.rent}
                    </span>
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
