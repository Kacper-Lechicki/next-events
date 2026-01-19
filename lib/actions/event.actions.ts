'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Event } from '@/database';
import connectDB from '@/lib/db';

const CreateEventSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(1000, { message: 'Description cannot exceed 1000 characters' }),
  overview: z
    .string()
    .min(5, { message: 'Overview must be at least 5 characters long' })
    .max(400, { message: 'Overview cannot exceed 400 characters' }),
  image: z.string().url({ message: 'Please provide a valid image URL' }),
  venue: z
    .string()
    .min(3, { message: 'Venue name must be at least 3 characters long' }),
  location: z
    .string()
    .min(3, { message: 'Location must be at least 3 characters long' }),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Please select a future date for the event',
  }),
  time: z.string().regex(/^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i, {
    message: 'Please enter a valid time (e.g., 10:00 AM)',
  }),
  mode: z.enum(['online', 'offline', 'hybrid'], {
    message: 'Please select a valid event mode',
  }),
  audience: z.string().min(3, {
    message: 'Audience description must be at least 3 characters long',
  }),
  agenda: z
    .array(z.string())
    .min(1, { message: 'Please provide at least one agenda item' }),
  organizer: z
    .string()
    .min(3, { message: 'Organizer name must be at least 3 characters long' }),
  tags: z
    .array(z.string())
    .min(1, { message: 'Please provide at least one tag' }),
});

export const createEvent = async (data: z.infer<typeof CreateEventSchema>) => {
  try {
    await connectDB();

    const validatedData = CreateEventSchema.parse(data);
    const event = await Event.create(validatedData);

    revalidatePath('/');

    return { success: true, data: JSON.parse(JSON.stringify(event)) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues.reduce(
        (acc: Record<string, string[]>, issue: z.core.$ZodIssue) => {
          const path = issue.path.join('.') || 'Global';

          if (!acc[path]) {
            acc[path] = [];
          }

          acc[path].push(issue.message);

          return acc;
        },
        {} as Record<string, string[]>,
      );

      const errorMessage = Object.entries(fieldErrors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join(' | ');

      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred while creating the event',
    };
  }
};

export const getSimilarEventsBySlug = async (slug: string) => {
  'use cache';

  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    if (!event) {
      return [];
    }

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    })
      .limit(5)
      .lean();

    return JSON.parse(JSON.stringify(similarEvents));
  } catch {
    return [];
  }
};
