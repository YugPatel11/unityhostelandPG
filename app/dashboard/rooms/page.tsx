'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, BedDouble, Users, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  capacity: number;
  occupied: number;
  price: number;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ roomNumber: '', floor: '', totalBeds: '', monthlyRent: '' });

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to add room');
        return;
      }
      toast.success('Room added successfully!');
      setShowModal(false);
      setForm({ roomNumber: '', floor: '', totalBeds: '', monthlyRent: '' });
      fetchRooms();
    } catch (error) {
      toast.error('Failed to add room');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Rooms</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Manage room inventory and bed availability.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 font-medium text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </button>
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
            placeholder="Search rooms by number or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Room Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredRooms.map((room) => {
            const isFull = room.occupied >= room.capacity;
            const occupancyPercentage = room.capacity > 0 ? (room.occupied / room.capacity) * 100 : 0;
            
            return (
              <div key={room.id} className="bg-white dark:bg-stone-950 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 p-5 group hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white">{room.number}</h3>
                      <span className="text-xs font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 rounded-full">Floor {room.floor}</span>
                    </div>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{room.type}</p>
                  </div>
                  <div className={`p-2 rounded-xl ${isFull ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                    <BedDouble className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5"><Users className="w-4 h-4" /> Occupancy</span>
                    <span className="font-medium text-stone-900 dark:text-white">{room.occupied} / {room.capacity}</span>
                  </div>
                  
                  <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
                    <span className="text-xs text-stone-500 dark:text-stone-400">Monthly Rent</span>
                    <span className="font-bold text-stone-900 dark:text-white">₹{room.price.toLocaleString('en-IN')}<span className="text-xs text-stone-400 font-normal">/bed</span></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-950 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 p-12 text-center">
          <BedDouble className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">No Rooms Yet</h3>
          <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Get started by adding your first room.</p>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </div>
      )}

      {/* Add Room Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white dark:bg-stone-950 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Add New Room</h2>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Room Number *</label>
                <input 
                  type="text" required value={form.roomNumber}
                  onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                  placeholder="e.g. 101"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Floor *</label>
                  <input 
                    type="number" required value={form.floor}
                    onChange={(e) => setForm({ ...form, floor: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Total Beds *</label>
                  <input 
                    type="number" required value={form.totalBeds}
                    onChange={(e) => setForm({ ...form, totalBeds: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                    placeholder="3"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Monthly Rent per Bed (₹) *</label>
                <input 
                  type="number" required value={form.monthlyRent}
                  onChange={(e) => setForm({ ...form, monthlyRent: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                  placeholder="6000"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-600 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium disabled:opacity-70 inline-flex items-center justify-center">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
