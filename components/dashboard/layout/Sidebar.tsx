'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BedDouble, 
  IndianRupee, 
  Wallet, 
  FileText, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', href: '/dashboard/students', icon: Users },
  { name: 'Rooms', href: '/dashboard/rooms', icon: BedDouble },
  { name: 'Rent Tracking', href: '/dashboard/rent', icon: IndianRupee },
  { name: 'Expenses', href: '/dashboard/expenses', icon: Wallet },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      {/* Mobile sidebar blur backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-stone-900/80 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar component */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 pb-4 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-stone-200 dark:border-stone-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <img src="/assets/image.png" alt="Logo" className="w-6 h-6 rounded-md object-cover" />
            </div>
            <span className="font-display text-xl font-bold text-stone-900 dark:text-white">PG Admin</span>
          </Link>
          <button 
            type="button" 
            className="lg:hidden text-stone-500 hover:text-stone-900 dark:hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hide-scrollbar">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center px-3 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Column */}
      <div className="lg:pl-72 flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900">
        <div className="sticky top-0 z-30 flex h-20 flex-shrink-0 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
          <button
            type="button"
            className="px-4 border-r border-stone-200 dark:border-stone-800 text-stone-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 md:px-8 flex justify-between items-center">
            {/* Can put a search bar or breadcrumbs here in the future */}
            <div className="flex-1"></div>
            <div className="ml-4 flex items-center md:ml-6 gap-4">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-medium text-stone-900 dark:text-white">Admin User</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">Owner</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold">
                A
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
