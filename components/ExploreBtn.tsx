'use client';

import Image from 'next/image';
import posthog from 'posthog-js';

const ExploreBtn = () => {
  const handleClick = () => {
    posthog.capture('explore_events_clicked');
  };

  return (
    <a
      href="#events"
      id="explore-btn"
      className="mt-7 mx-auto"
      onClick={handleClick}
    >
      <span>Explore Events</span>

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
