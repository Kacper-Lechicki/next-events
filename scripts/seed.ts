import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { connect } from 'mongoose';
import Event from '../database/event.model';

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
  {
    title: 'Future of AI 2026',
    description:
      'Join us for a deep dive into the future of Artificial Intelligence.',
    overview:
      'Exploring the latest trends, ethical considerations, and real-world applications of AI.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    venue: 'Virtual Tech Hub',
    location: 'Online',
    date: '2026-05-15',
    time: '10:00',
    mode: 'online',
    audience: 'Tech Enthusiasts, Developers, Researchers',
    agenda: ['Keynote Speech', 'Panel Discussion', 'Workshop'],
    organizer: 'TechForward',
    tags: ['Tech', 'AI', 'Future'],
  },
  {
    title: 'Modern UI Design Patterns',
    description:
      'Master the art of creating intuitive and beautiful user interfaces.',
    overview: 'Hands-on workshop for designers using modern tools.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    venue: 'Design Center SF',
    location: 'San Francisco, CA',
    date: '2026-06-20',
    time: '09:00',
    mode: 'offline',
    audience: 'UI/UX Designers',
    agenda: ['Design Systems', 'Accessibility', 'Animation'],
    organizer: 'DesignMatters',
    tags: ['Design', 'UI', 'Workshop'],
  },
  {
    title: 'Global Marketing Summit',
    description: 'Connect with marketing professionals from around the globe.',
    overview: 'Strategies for brand growth and digital marketing.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    venue: 'ExCeL London',
    location: 'London, UK',
    date: '2026-07-10',
    time: '11:00',
    mode: 'hybrid',
    audience: 'Marketers, Entrepreneurs',
    agenda: ['Digital Strategy', 'Content Trends', 'Networking Mixer'],
    organizer: 'GlobalMarketers',
    tags: ['Marketing', 'Business', 'Networking'],
  },
  {
    title: 'React Native Workshop',
    description: 'Build cross-platform mobile apps using React Native.',
    overview: 'Intensive workshop for web developers going mobile.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    venue: 'CodeAcademy Online',
    location: 'Online',
    date: '2026-08-05',
    time: '14:00',
    mode: 'online',
    audience: 'Web Developers',
    agenda: ['Setup', 'Components', 'Navigation'],
    organizer: 'DevCommunity',
    tags: ['Tech', 'Coding', 'React Native'],
  },
  {
    title: 'Creative Typography',
    description: 'Explore the expressive power of type.',
    overview: 'Creative session for graphic designers.',
    image: 'https://images.unsplash.com/photo-1516962080544-eac695c93791',
    venue: 'The Art Loft',
    location: 'New York, NY',
    date: '2026-09-12',
    time: '13:00',
    mode: 'offline',
    audience: 'Graphic Designers',
    agenda: ['History', 'Experimental Layouts', 'Review'],
    organizer: 'TypeLovers',
    tags: ['Design', 'Art', 'Typography'],
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

    let createdCount = 0;

    for (const event of events) {
      const exists = await Event.findOne({ title: event.title });

      if (!exists) {
        await Event.create(event);
        console.log(`Created event: ${event.title}`);
        createdCount++;
      } else {
        console.log(`Skipped existing event: ${event.title}`);
      }
    }

    console.log(`Seeding complete. Created ${createdCount} new events.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding events:', error);
    process.exit(1);
  }
}

seed();
