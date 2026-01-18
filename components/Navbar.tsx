'use client';

import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';

const Navbar = () => {
  const handleLogoClick = () => {
    posthog.capture('logo_clicked');
  };

  const handleNavLinkClick = (linkName: string) => {
    posthog.capture('nav_link_clicked', {
      link_name: linkName,
    });
  };

  return (
    <header>
      <nav>
        <Link href="/" className="logo" onClick={handleLogoClick}>
          <Image
            priority
            src="/icons/logo.png"
            alt="logo"
            width={24}
            height={24}
            style={{
              width: '24px',
              height: '24px',
            }}
          />

          <p>DevEvent</p>
        </Link>

        <ul>
          <Link href="/" onClick={() => handleNavLinkClick('Home')}>
            Home
          </Link>

          <Link href="/" onClick={() => handleNavLinkClick('Events')}>
            Events
          </Link>

          <Link href="/" onClick={() => handleNavLinkClick('Create Event')}>
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
