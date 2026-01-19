'use client';

import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { createBooking } from '@/lib/actions/booking.actions';

const BookEvent = ({ eventId }: { eventId: string }) => {
  const t = useTranslations('event.form');
  const [state, formAction, isPending] = useActionState(createBooking, {
    success: false,
    message: '',
  });

  return (
    <div id="book-event" className="w-full">
      {state?.success ? (
        <p className="text-light-100 text-center font-medium animate-in fade-in zoom-in duration-300">
          {t('success')}
        </p>
      ) : (
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="eventId" value={eventId} />

          <div>
            <label htmlFor="email" className="font-medium text-light-200">
              {t('emailLabel')}
            </label>

            <input
              type="email"
              name="email"
              id="email"
              placeholder={t('emailPlaceholder')}
              required
              className="mt-2 w-full rounded-lg border border-dark-200 bg-dark-200 p-3 text-light-100 outline-none transition-all placeholder:text-light-300 focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {state?.message && !state.success && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary p-3 font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? t('submitting') : t('submit')}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
