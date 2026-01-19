import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Event, IEvent } from '@/database';
import connectDB from '@/lib/db';
import EventImage from '@/components/features/events/EventImage';
import BookEvent from '@/components/features/events/BookEvent';
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions';
import EventCard from '@/components/features/events/EventCard';
import BackButton from '@/components/ui/BackButton';

const MOCK_TOTAL_BOOKINGS = 10;

interface PageParams {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string): Promise<IEvent | null> {
  'use cache';

  try {
    await connectDB();

    const event = await Event.findOne({
      slug: slug.toLowerCase(),
    }).lean<IEvent>();

    return event ? JSON.parse(JSON.stringify(event)) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  const t = await getTranslations('event');

  if (!event) {
    return {
      title: t('notFound'),
    };
  }

  return {
    title: event.title,
    description: event.description || event.overview,
    openGraph: {
      title: event.title,
      description: event.description || event.overview,
      images: [event.image],
      type: 'article',
    },
  };
}

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex items-center gap-2">
    <Image
      src={icon}
      alt={alt}
      width={17}
      height={17}
      className="w-[17px] h-[17px]"
    />

    <p>{label}</p>
  </div>
);

const EventAgenda = async ({ items }: { items: string[] }) => {
  const t = await getTranslations('event');

  return (
    <div className="flex flex-col gap-2">
      <h2>{t('agenda')}</h2>

      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index} className="text-light-100 text-lg max-sm:text-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row flex-wrap gap-1.5">
    {tags.map((tag) => (
      <span key={tag} className="pill">
        {tag}
      </span>
    ))}
  </div>
);

const EventDetailsPage = async ({ params }: PageParams) => {
  const { slug } = await params;
  const event = await getEvent(slug);
  const t = await getTranslations('event');
  const tCommon = await getTranslations('common');

  if (!event) {
    return notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    audience,
    agenda,
    organizer,
    tags,
  } = event;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event" className="mt-10">
      <BackButton label={tCommon('back')} />

      <div className="header mb-10 flex w-2/3 flex-col items-start gap-4 max-lg:w-full">
        <h1>{t('description')}</h1>

        <p className="mt-2 text-lg text-light-100 max-sm:text-sm">
          {description}
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-12 lg:flex-row max-lg:items-center">
        <div className="flex w-full flex-[2] flex-col gap-8">
          <div className="relative h-[457px] w-full overflow-hidden rounded-lg">
            <EventImage
              src={image || '/images/event1.png'}
              alt={t('description')}
              fill
              preload
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
            />
          </div>

          <section className="flex flex-col gap-2">
            <h2>{t('overview')}</h2>
            <p>{overview}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2>{t('eventDetails')}</h2>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />

            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda items={agenda} />

          <section className="flex flex-col gap-2">
            <h2>{t('aboutOrganizer')}</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        <aside className="w-full flex-1 lg:pl-10 lg:border-l lg:border-gray-700">
          <div className="card-shadow flex w-full flex-col gap-6 rounded-[10px] border border-dark-200 bg-dark-100 px-5 py-6">
            <h2>{t('bookSpot')}</h2>

            <p className="text-sm">
              {MOCK_TOTAL_BOOKINGS > 0
                ? t('joinPeople', { count: MOCK_TOTAL_BOOKINGS })
                : t('beTheFirst')}
            </p>

            <BookEvent eventId={event._id as unknown as string} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>{t('similarEvents')}</h2>

        {similarEvents.length > 0 ? (
          <div className="events">
            {similarEvents.map((event: IEvent, index: number) => (
              <EventCard key={index} {...event} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-dark-200 bg-dark-100 p-10 text-center">
            <p className="text-xl font-medium text-light-100">
              {t('noSimilarEvents')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetailsPage;
