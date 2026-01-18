'use client';

import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useState } from 'react';
// removed unused import

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  index: number;
}

const failedImages = new Set<string>();

const EventCard = ({
  title,
  image,
  slug,
  location,
  date,
  time,
  index,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(
    failedImages.has(image) ? '/images/event1.png' : image,
  );
  const isPriority = index < 2;

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
        <Image
          priority={isPriority}
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="poster object-cover"
          onError={() => {
            failedImages.add(image);
            setImgSrc('/images/event1.png');
          }}
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
