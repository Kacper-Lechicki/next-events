'use server';

import { Event } from '@/database';
import connectDB from '@/lib/mongodb';

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    })
      .limit(5)
      .lean();

    return similarEvents.map((event) => ({
      ...event,
      _id: event._id.toString(),
    }));
  } catch {
    return [];
  }
};
