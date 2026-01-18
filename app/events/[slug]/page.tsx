import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface EventDetailsPageParams {
  params: Promise<{ slug: string }>;
}

const EventDetailsPage = async ({ params }: EventDetailsPageParams) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const t = await getTranslations('event');

  const {
    event: { description, image, overview, date, time, location, mode, agenda },
  } = await request.json();

  if (!description) {
    return notFound();
  }

  return (
    <section id="event" className="mt-10">
      <div className="header">
        <h1>{t('description')}</h1>
        <p className="mt-2">{description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="event banner"
            width={800}
            height={800}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="banner w-[800px] h-[800px]"
          />

          <section className="flex-col-gap-2">
            <h2>{t('overview')}</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>{t('eventDetails')}</h2>
          </section>
        </div>

        <aside className="booking">
          <p className="text-lg font-semibold">{t('bookEvent')}</p>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
