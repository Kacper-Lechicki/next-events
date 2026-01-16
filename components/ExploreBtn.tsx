'use client';

import Image from 'next/image';
import posthog from 'posthog-js';

const ExploreBtn = () => {
  const handleClick = () => {
    posthog.capture('explore_events_clicked');
  };

  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto"
      onClick={handleClick}
    >
      <a href="#events">
        <span>Explore Events</span>

        <Image
          loading="lazy"
          fetchPriority="low"
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
    </button>
  );
};

export default ExploreBtn;
