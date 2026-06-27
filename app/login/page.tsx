'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { KeyRound, Mail, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Login successful');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf0e6] dark:bg-stone-950 transition-colors duration-300">
      
      {/* Left side - Branding & Info */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-emerald-900 text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-500/30 rounded-full blur-3xl mix-blend-screen"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
              <img src="/assets/image.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">Unity Hostel & PG</span>
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/50 border border-emerald-700/50 text-emerald-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4" /> Secure Admin Portal
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Manage your property with ease.
          </h1>
          <p className="text-emerald-100/80 text-lg font-light leading-relaxed">
            Welcome back, owner. Access your dashboard to manage rooms, residents, payments, and track the growth of your PG.
          </p>
        </div>
        
        <div className="relative z-10 text-emerald-200/50 text-sm">
          &copy; {new Date().getFullYear()} Unity Hostel and PG.
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
        
        <Link href="/" className="md:hidden absolute top-6 left-6 inline-flex items-center gap-2">
          <img src="/assets/image.png" alt="Logo" className="w-8 h-8 rounded-full object-cover shadow-sm" />
          <span className="font-display text-lg font-bold text-stone-900 dark:text-white">Unity Hostel</span>
        </Link>

        <div className="w-full max-w-md space-y-8 bg-white dark:bg-stone-900 p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-emerald-900/10 dark:shadow-black/50 border border-stone-100 dark:border-stone-800 relative z-10">
          
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm">Please sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-emerald-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="admin@unityhostel.com"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-emerald-600 transition-colors">
                  <KeyRound className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-600/20"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
