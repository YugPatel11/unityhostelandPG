'use client';

import { useState } from 'react';
import { Plus, Search, Filter, BedDouble, Users } from 'lucide-react';

const rooms = [
  { id: '1', number: '101', type: '3 Bed Sharing', floor: 1, capacity: 3, occupied: 3, price: '₹6,500' },
  { id: '2', number: '102', type: '4 Bed Sharing', floor: 1, capacity: 4, occupied: 2, price: '₹6,000' },
  { id: '3', number: '103', type: '3 Bed Sharing', floor: 1, capacity: 3, occupied: 1, price: '₹6,500' },
  { id: '4', number: '201', type: '5 Bed Sharing', floor: 2, capacity: 5, occupied: 5, price: '₹5,500' },
  { id: '5', number: '202', type: '4 Bed Sharing', floor: 2, capacity: 4, occupied: 4, price: '₹6,000' },
];

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">Rooms</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1 text-sm">Manage room inventory and bed availability.</p>
        </div>
        <button 
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
        <button className="inline-flex items-center px-4 py-2 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-sm font-medium">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {rooms.map((room) => {
          const isFull = room.occupied === room.capacity;
          const occupancyPercentage = (room.occupied / room.capacity) * 100;
          
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
                  <span className="font-bold text-stone-900 dark:text-white">{room.price}<span className="text-xs text-stone-400 font-normal">/bed</span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
