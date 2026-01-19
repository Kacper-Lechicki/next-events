'use client';

import Image from 'next/image';
import posthog from 'posthog-js';
import { useTranslations } from 'next-intl';

const ExploreBtn = () => {
  const t = useTranslations('common');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    posthog.capture('explore_events_clicked');

    const eventsSection = document.getElementById('events');

    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#events"
      id="explore-btn"
      className="mt-7 mx-auto"
      onClick={handleClick}
    >
      <span>{t('exploreEvents')}</span>

      <Image
        src="/icons/arrow-down.svg"
        alt="arrow-down"
        width={20}
        height={20}
        style={{
          width: '20px',
          height: '20px',
        }}
      />
    </a>
  );
};

export default ExploreBtn;
