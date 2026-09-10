import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        room: {
          select: { roomNumber: true },
        },
        payments: {
          orderBy: { month: 'desc' },
          take: 1,
          select: { status: true },
        },
      },
    });

    const formattedStudents = students.map((s) => ({
      id: s.id,
      name: s.fullName,
      room: s.room?.roomNumber || 'Unassigned',
      phone: s.mobileNumber,
      status: s.status === 'ACTIVE' ? 'Active' : 'Left',
      rent: s.payments.length > 0
        ? s.payments[0].status === 'PAID' ? 'Paid'
          : s.payments[0].status === 'PENDING' ? 'Pending'
          : 'Late'
        : s.status === 'LEFT' ? 'Cleared' : 'Pending',
    }));

    return NextResponse.json(formattedStudents);
  } catch (error) {
    console.error('Students GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      mobileNumber,
      parentName,
      parentMobile,
      aadhaarNumber,
      address,
      college,
      course,
      checkInDate,
      securityDeposit,
      monthlyRent,
      roomId,
    } = body;

    // Validate required fields
    if (!fullName || !mobileNumber || !parentName || !parentMobile || !aadhaarNumber || !address || !checkInDate || !monthlyRent || !roomId) {
      return NextResponse.json({ error: 'All required fields must be provided' }, { status: 400 });
    }

    // Check room exists and has space
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        students: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (room.students.length >= room.totalBeds) {
      return NextResponse.json({ error: 'Room is full' }, { status: 400 });
    }

    // Assign bed letter
    const usedBeds = room.students.map((s) => s.assignedBed);
    const bedLetters = 'ABCDEFGHIJ'.split('');
    const nextBed = bedLetters.find((b) => !usedBeds.includes(b)) || `${room.students.length + 1}`;

    const student = await prisma.student.create({
      data: {
        fullName,
        mobileNumber,
        parentName,
        parentMobile,
        aadhaarNumber,
        address,
        college: college || null,
        course: course || null,
        checkInDate: new Date(checkInDate),
        securityDeposit: parseInt(securityDeposit) || 0,
        monthlyRent: parseInt(monthlyRent),
        emergencyContact: parentMobile,
        roomId,
        assignedBed: nextBed,
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error: any) {
    console.error('Students POST error:', error);
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      return NextResponse.json({ error: `Duplicate ${field || 'value'}. This entry already exists.` }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to add student' }, { status: 500 });
  }
}
