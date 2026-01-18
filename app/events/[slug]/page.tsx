import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface EventDetailsPageParams {
  params: Promise<{ slug: string }>;
}

const EventDetailsPage = async ({ params }: EventDetailsPageParams) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await request.json();

  if (!event) {
    return notFound();
  }

  return (
    <section id="event" className="mt-20">
      <h1>
        Event Details: <br /> {slug}
      </h1>
    </section>
  );
};

export default EventDetailsPage;
