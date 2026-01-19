'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const BookEvent = () => {
  const t = useTranslations('event.form');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div id="book-event" className="w-full">
      {submitted ? (
        <p className="text-light-100 text-center font-medium animate-in fade-in zoom-in duration-300">
          {t('success')}
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="font-medium text-light-200">
              {t('emailLabel')}
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder={t('emailPlaceholder')}
              required
              className="focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
