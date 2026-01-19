'use client';

import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';
import { useTranslations } from 'next-intl';

const Navbar = () => {
  const t = useTranslations('nav');

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
            preload
            src="/icons/logo.png"
            alt="logo"
            width={24}
            height={24}
            style={{
              width: '24px',
              height: '24px',
            }}
          />

          <p>{t('logo')}</p>
        </Link>

        <ul>
          <Link href="/" onClick={() => handleNavLinkClick('Events')}>
            {t('events')}
          </Link>

          <Link
            href="/events/create"
            onClick={() => handleNavLinkClick('Create Event')}
          >
            {t('createEvent')}
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
