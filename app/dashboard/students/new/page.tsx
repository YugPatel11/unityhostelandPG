'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, ArrowLeft, Loader2, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const studentSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  mobileNumber: z.string().min(10, "Valid mobile number is required"),
  parentName: z.string().min(2, "Parent name is required"),
  parentMobile: z.string().min(10, "Valid mobile number is required"),
  aadhaarNumber: z.string().min(12, "Valid Aadhaar number is required"),
  address: z.string().min(5, "Address is required"),
  college: z.string().optional(),
  course: z.string().optional(),
  checkInDate: z.string().min(1, "Check-in date is required"),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  roomId: z.string().min(1, "Please assign a room"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

export default function AddStudentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      checkInDate: new Date().toISOString().split('T')[0],
      securityDeposit: '0',
      monthlyRent: '6000',
    }
  });

  const onSubmit = async (data: StudentFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Student added successfully!");
      router.push('/dashboard/students');
    } catch (error) {
      toast.error("Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/students"
          className="p-2 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-stone-600 dark:text-stone-400" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-white">Add New Student</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Register a new resident to the PG.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Personal Details */}
        <div className="bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-6 border-b border-stone-100 dark:border-stone-800 pb-2">Personal Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Full Name *</label>
              <input 
                {...register("fullName")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                placeholder="Rahul Sharma"
              />
              {errors.fullName && <p className="text-rose-500 text-xs">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Mobile Number *</label>
              <input 
                {...register("mobileNumber")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                placeholder="+91 98765 43210"
              />
              {errors.mobileNumber && <p className="text-rose-500 text-xs">{errors.mobileNumber.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Permanent Address *</label>
              <textarea 
                {...register("address")}
                rows={3}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white resize-none"
                placeholder="123, Main Street, City"
              />
              {errors.address && <p className="text-rose-500 text-xs">{errors.address.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Aadhaar Number *</label>
              <input 
                {...register("aadhaarNumber")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                placeholder="XXXX XXXX XXXX"
              />
              {errors.aadhaarNumber && <p className="text-rose-500 text-xs">{errors.aadhaarNumber.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Upload ID Proof</label>
              <div className="w-full px-4 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                <div className="flex flex-col items-center gap-1 text-stone-500">
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Click to upload PDF/JPG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guardian / Parent Details */}
        <div className="bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-6 border-b border-stone-100 dark:border-stone-800 pb-2">Parent/Guardian Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Parent Name *</label>
              <input 
                {...register("parentName")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                placeholder="Parent's full name"
              />
              {errors.parentName && <p className="text-rose-500 text-xs">{errors.parentName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Parent Mobile *</label>
              <input 
                {...register("parentMobile")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                placeholder="Emergency contact"
              />
              {errors.parentMobile && <p className="text-rose-500 text-xs">{errors.parentMobile.message}</p>}
            </div>
          </div>
        </div>

        {/* Accommodation Details */}
        <div className="bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-6 border-b border-stone-100 dark:border-stone-800 pb-2">Room & Financials</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Assign Room *</label>
              <select 
                {...register("roomId")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
              >
                <option value="">Select a room</option>
                <option value="101">101 (3 Bed Sharing)</option>
                <option value="102">102 (4 Bed Sharing)</option>
                <option value="201">201 (5 Bed Sharing)</option>
              </select>
              {errors.roomId && <p className="text-rose-500 text-xs">{errors.roomId.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Check-In Date *</label>
              <input 
                type="date"
                {...register("checkInDate")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
              />
              {errors.checkInDate && <p className="text-rose-500 text-xs">{errors.checkInDate.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Monthly Rent (₹) *</label>
              <input 
                type="number"
                {...register("monthlyRent")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
              />
              {errors.monthlyRent && <p className="text-rose-500 text-xs">{errors.monthlyRent.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Security Deposit (₹)</label>
              <input 
                type="number"
                {...register("securityDeposit")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-600 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save Student
          </button>
        </div>

      </form>
    </div>
  );
}
