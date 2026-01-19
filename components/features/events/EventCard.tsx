'use client';

import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';
import EventImage from '@/components/features/events/EventImage';

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  index: number;
}

const EventCard = ({
  title,
  image,
  slug,
  location,
  date,
  time,
  index,
}: Props) => {
  const handleClick = () => {
    posthog.capture('event_card_clicked', {
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
    });
  };

  return (
    <Link
      href={`/events/${slug}`}
      id="event-card"
      className="group"
      onClick={handleClick}
    >
      <div className="relative h-[300px] w-full">
        <EventImage
          preload
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="poster object-cover"
        />
      </div>

      <div className="flex flex-row gap-2">
        <Image
          src="/icons/pin.svg"
          alt="location"
          width={14}
          height={14}
          className="w-[14px] h-[14px]"
        />

        <p>{location}</p>
      </div>

      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="date"
            width={14}
            height={14}
            className="w-[14px] h-[14px]"
          />

          <p>{date}</p>
        </div>

        <div>
          <Image
            src="/icons/clock.svg"
            alt="time"
            width={14}
            height={14}
            className="w-[14px] h-[14px]"
          />

          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
