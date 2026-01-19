'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import Booking from '@/database/booking.model';
import connectDB from '@/lib/db';

const CreateBookingSchema = z.object({
  email: z.string().email('Invalid email address'),
  eventId: z.string().min(1, 'Event ID is required'),
});

export interface BookingState {
  success: boolean;
  message: string;
}

export async function createBooking(
  _prevState: BookingState,
  formData: FormData,
) {
  try {
    const rawData = {
      email: formData.get('email'),
      eventId: formData.get('eventId'),
    };

    const validatedData = CreateBookingSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.issues[0].message,
      };
    }

    const { email, eventId } = validatedData.data;

    await connectDB();

    const existingBooking = await Booking.findOne({ email, eventId });

    if (existingBooking) {
      return {
        success: false,
        message: 'You have already booked this event.',
      };
    }

    await Booking.create({ email, eventId });

    revalidatePath('/events/[slug]', 'page');

    return {
      success: true,
      message: 'Booking successful!',
    };
  } catch (error) {
    console.error('Failed to create booking:', error);
    return {
      success: false,
      message: 'Failed to create booking. Please try again.',
    };
  }
}
