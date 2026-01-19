'use server';

import { Event } from '@/database';
import connectDB from '@/lib/db';

export const getSimilarEventsBySlug = async (slug: string) => {
  'use cache';

  try {
    await connectDB();

    const event = await Event.findOne({ slug });

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
