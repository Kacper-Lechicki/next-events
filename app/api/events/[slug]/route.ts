import { Event, IEvent } from '@/database';
import connectDB from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

const NODE_ENV = process.env.NODE_ENV;

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        {
          message: 'Invalid or missing slug parameter',
        },
        {
          status: 400,
        },
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    const event: IEvent | null = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    if (!event) {
      return NextResponse.json(
        {
          message: `Event with slug '${sanitizedSlug}' not found`,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: 'Event fetched successfully',
        event,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          {
            message: 'Database configuration error',
          },
          {
            status: 500,
          },
        );
      }

      return NextResponse.json(
        {
          message: 'Failed to fetch event',
          error: e.message,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
      },
      {
        status: 500,
      },
    );
  }
}
