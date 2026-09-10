'use client';

import { useState, useEffect } from 'react';
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

interface Room {
  id: string;
  number: string;
  type: string;
  capacity: number;
  occupied: number;
  price: number;
}

export default function AddStudentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      checkInDate: new Date().toISOString().split('T')[0],
      securityDeposit: '0',
      monthlyRent: '',
    }
  });

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setLoadingRooms(false);
      }
    }
    fetchRooms();
  }, []);

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = e.target.value;
    setValue('roomId', roomId);
    const selectedRoom = rooms.find((r) => r.id === roomId);
    if (selectedRoom) {
      setValue('monthlyRent', String(selectedRoom.price));
    }
  };

  const onSubmit = async (data: StudentFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error || 'Failed to add student');
        return;
      }
      toast.success("Student added successfully!");
      router.push('/dashboard/students');
    } catch (error) {
      toast.error("Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableRooms = rooms.filter((r) => r.occupied < r.capacity);

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
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">College (Optional)</label>
              <input 
                {...register("college")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                placeholder="College name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Course (Optional)</label>
              <input 
                {...register("course")}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                placeholder="B.Tech, MBA, etc."
              />
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
              {loadingRooms ? (
                <div className="flex items-center gap-2 text-stone-400 text-sm py-2.5">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading rooms...
                </div>
              ) : (
                <select 
                  {...register("roomId")}
                  onChange={handleRoomChange}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                >
                  <option value="">Select a room</option>
                  {availableRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.number} ({room.type}) — {room.capacity - room.occupied} beds free — ₹{room.price.toLocaleString('en-IN')}/bed
                    </option>
                  ))}
                  {availableRooms.length === 0 && (
                    <option disabled>No rooms with available beds</option>
                  )}
                </select>
              )}
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
