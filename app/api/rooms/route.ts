import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { roomNumber: 'asc' },
      include: {
        students: {
          where: { status: 'ACTIVE' },
          select: { id: true },
        },
      },
    });

    const formattedRooms = rooms.map((room) => ({
      id: room.id,
      number: room.roomNumber,
      type: `${room.totalBeds} Bed Sharing`,
      floor: room.floor,
      capacity: room.totalBeds,
      occupied: room.students.length,
      price: room.monthlyRent,
    }));

    return NextResponse.json(formattedRooms);
  } catch (error) {
    console.error('Rooms GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomNumber, floor, totalBeds, monthlyRent } = body;

    if (!roomNumber || !floor || !totalBeds || !monthlyRent) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existing = await prisma.room.findUnique({ where: { roomNumber } });
    if (existing) {
      return NextResponse.json({ error: 'Room number already exists' }, { status: 400 });
    }

    const room = await prisma.room.create({
      data: {
        roomNumber,
        floor: parseInt(floor),
        roomType: `${totalBeds} Bed Sharing`,
        totalBeds: parseInt(totalBeds),
        monthlyRent: parseInt(monthlyRent),
      },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Rooms POST error:', error);
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}
