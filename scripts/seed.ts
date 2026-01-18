import { connect } from 'mongoose';
import Event, { IEvent } from '../database/event.model';

const events = [
  {
    title: 'Tech Conference 2026',
    description: 'A deep dive into the future of technology.',
    overview: 'Join us for 3 days of talks and workshops.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
    venue: 'Convention Center',
    location: 'Warsaw, Poland',
    date: '2026-06-15',
    time: '09:00',
    mode: 'offline',
    audience: 'Developers, Designers, PMs',
    agenda: ['Keynote', 'Workshops', 'Networking'],
    organizer: 'Tech Corp',
    tags: ['Tech', 'Conference', '2026'],
  },
  {
    title: 'Summer Music Festival',
    description: 'The best bands from around the world.',
    overview: 'Music, food, and fun under the sun.',
    image:
      'https://images.unsplash.com/photo-1459749411177-8c29134addd7?w=800&auto=format&fit=crop&q=60',
    venue: 'City Park',
    location: 'Krakow, Poland',
    date: '2026-07-20',
    time: '14:00',
    mode: 'offline',
    audience: 'Music Lovers',
    agenda: ['Opening Act', 'Main Stage', 'After Party'],
    organizer: 'Festival Inc.',
    tags: ['Music', 'Festival', 'Summer'],
  },
  {
    title: 'Abstract Art Workshop',
    description: 'Learn to paint abstract art with professionals.',
    overview: 'Hands-on workshop for all skill levels.',
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=60',
    venue: 'Art Studio',
    location: 'Gdansk, Poland',
    date: '2026-05-10',
    time: '10:00',
    mode: 'offline',
    audience: 'Artists, Beginners',
    agenda: ['Introduction', 'Painting Session', 'Critique'],
    organizer: 'Art Collective',
    tags: ['Art', 'Workshop', 'Painting'],
  },
  {
    title: 'Full Stack Bootcamp',
    description: 'Intensive coding bootcamp for web development.',
    overview: 'Master React, Node.js, and MongoDB.',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
    venue: 'Online',
    location: 'Online',
    date: '2026-08-01',
    time: '18:00',
    mode: 'online',
    audience: 'Aspiring Developers',
    agenda: ['HTML/CSS', 'JavaScript', 'React', 'Backend'],
    organizer: 'Code Academy',
    tags: ['Coding', 'Bootcamp', 'Education'],
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Projects .env file not loaded or MONGODB_URI missing');
    process.exit(1);
  }

  try {
    await connect(uri);
    console.log('Connected to MongoDB');

    const createdEvents = await Event.create(events);

    console.log(`Successfully created ${createdEvents.length} events`);
    console.log(createdEvents.map((e: IEvent) => e.title));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding events:', error);
    process.exit(1);
  }
}

seed();
