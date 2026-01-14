'use client';

import Image from 'next/image';

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto">
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
