import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { Event, IEvent } from '@/database';
import connectDB from '@/lib/mongodb';
import { cache } from 'react';

const getEvents = cache(async () => {
  await connectDB();
  const events = await Event.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(events));
});

const Page = async () => {
  const events = await getEvents();

  return (
    <section className="mt-20">
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can`t Miss
      </h1>

      <p className="text-center mt-5">
        Hackathons, Meetups and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div id="events" className="scroll-mt-28 mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent, index: number) => (
              <li key={event.title}>
                <EventCard {...event} index={index} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
