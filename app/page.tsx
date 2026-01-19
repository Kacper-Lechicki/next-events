import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import Pagination from '@/components/Pagination';
import { Event, IEvent } from '@/database';
import connectDB from '@/lib/mongodb';
import { cache } from 'react';
import { getTranslations } from 'next-intl/server';

const getEvents = cache(async (page: number, limit: number) => {
  await connectDB();
  const skip = (page - 1) * limit;

  const [events, totalCount] = await Promise.all([
    Event.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Event.countDocuments(),
  ]);

  return {
    events: JSON.parse(JSON.stringify(events)),
    totalPages: Math.ceil(totalCount / limit),
  };
});

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const limit = 5;
  const t = await getTranslations('home');
  const { events, totalPages } = await getEvents(page, limit);

  return (
    <section className="mt-10">
      <h1 className="text-center whitespace-pre-line">{t('hero.title')}</h1>
      <p className="text-center mt-5">{t('hero.subtitle')}</p>

      <ExploreBtn />

      <div id="events" className="scroll-mt-28 mt-20 space-y-7">
        <h3>{t('featuredEvents')}</h3>

        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent, index: number) => (
              <li key={event.title}>
                <EventCard {...event} index={index} />
              </li>
            ))}
        </ul>

        {events.length > 0 && <Pagination totalPages={totalPages} />}
      </div>
    </section>
  );
};

export default Page;
