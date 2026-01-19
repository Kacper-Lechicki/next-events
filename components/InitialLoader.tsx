'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function InitialLoader() {
  const t = useTranslations('loader');
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('has_visited');

    if (hasVisited) {
      return;
    }

    const mountTimer = setTimeout(() => setMounted(true), 0);

    const animationTimer = setTimeout(() => {
      setIsExiting(true);

      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('has_visited', 'true');
      }, 800);
    }, 2000);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  if (!mounted || !show) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary opacity-20 duration-[3s] ease-linear"></div>
        <div className="absolute h-24 w-24 animate-spin rounded-full border-r-2 border-l-2 border-primary opacity-40 duration-[2s] ease-in-out reverse"></div>
        <div className="h-16 w-16 animate-pulse rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_rgba(89,222,202,0.8)]"></div>
      </div>

      <p className="mt-12 animate-pulse font-martian-mono text-sm tracking-[0.3em] text-primary/80">
        {t('system')}
      </p>
    </div>
  );
}
