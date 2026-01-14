import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        fetchPriority="high"
        preload
        loading="eager"
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
        style={{
          width: '410px',
          height: 'auto',
        }}
      />

      <div className="flex flex-row gap-2">
        <Image
          fetchPriority="low"
          loading="lazy"
          src="/icons/pin.svg"
          alt="location"
          width={14}
          height={14}
          style={{
            width: '14px',
            height: '14px',
          }}
        />

        <p>{location}</p>
      </div>

      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Image
            fetchPriority="low"
            loading="lazy"
            src="/icons/calendar.svg"
            alt="date"
            width={14}
            height={14}
            style={{
              width: '14px',
              height: '14px',
            }}
          />

          <p>{date}</p>
        </div>

        <div>
          <Image
            fetchPriority="low"
            loading="lazy"
            src="/icons/clock.svg"
            alt="time"
            width={14}
            height={14}
            style={{
              width: '14px',
              height: '14px',
            }}
          />

          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
