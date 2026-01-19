'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { createEvent } from '@/lib/actions/event.actions';

const CreateEventSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(1000, { message: 'Description cannot exceed 1000 characters' }),
  overview: z
    .string()
    .min(5, { message: 'Overview must be at least 5 characters long' })
    .max(400, { message: 'Overview cannot exceed 400 characters' }),
  image: z.string().url({ message: 'Please provide a valid image URL' }),
  venue: z
    .string()
    .min(3, { message: 'Venue name must be at least 3 characters long' }),
  location: z
    .string()
    .min(3, { message: 'Location must be at least 3 characters long' }),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Please select a future date for the event',
  }),
  time: z.string().regex(/^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i, {
    message: 'Please enter a valid time (e.g., 10:00 AM)',
  }),
  mode: z.enum(['online', 'offline', 'hybrid'], {
    message: 'Please select a valid event mode',
  }),
  audience: z.string().min(3, {
    message: 'Audience description must be at least 3 characters long',
  }),
  agenda: z
    .string()
    .min(3, { message: 'Please provide at least one agenda item' }), // Input as comma separated string for simplicity in UI
  organizer: z
    .string()
    .min(3, { message: 'Organizer name must be at least 3 characters long' }),
  tags: z.string().min(3, { message: 'Please provide at least one tag' }), // Input as comma separated string for simplicity in UI
});

type FormValues = z.infer<typeof CreateEventSchema>;

const CreateEventForm = () => {
  const t = useTranslations('event.create');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      mode: 'offline',
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      const formattedData = {
        ...data,
        agenda: data.agenda.split(',').map((item) => item.trim()),
        tags: data.tags.split(',').map((item) => item.trim()),
      };

      const result = await createEvent(formattedData);

      if (result.success) {
        router.push('/');
      } else {
        setError('root', {
          message: result.error || 'Something went wrong',
        });
      }
    });
  };

  const inputStyles =
    'w-full rounded-lg border border-dark-200 bg-dark-200 p-3 text-light-100 outline-none transition-all placeholder:text-light-300 focus:border-light-100';

  const labelStyles = 'font-medium text-light-200 mb-2 block';
  const errorStyles = 'text-red-500 text-sm mt-1';

  return (
    <div className="w-full mx-auto">
      <h2 className="text-3xl font-bold text-gradient mb-2">{t('title')}</h2>
      <p className="text-light-200 mb-8">{t('subtitle')}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className={labelStyles}>{t('form.title')}</label>

          <input
            {...register('title')}
            className={inputStyles}
            placeholder="Ex: Next.js Conf 2026"
          />

          {errors.title && (
            <p className={errorStyles}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className={labelStyles}>{t('form.overview')}</label>

          <input
            {...register('overview')}
            className={inputStyles}
            placeholder="Short summary for the card view"
          />

          {errors.overview && (
            <p className={errorStyles}>{errors.overview.message}</p>
          )}
        </div>

        <div>
          <label className={labelStyles}>{t('form.description')}</label>

          <textarea
            {...register('description')}
            className={`${inputStyles} h-32 resize-none`}
            placeholder="Detailed description of the event..."
          />

          {errors.description && (
            <p className={errorStyles}>{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className={labelStyles}>{t('form.image')}</label>

          <input
            {...register('image')}
            className={inputStyles}
            placeholder="https://example.com/image.jpg"
          />

          {errors.image && (
            <p className={errorStyles}>{errors.image.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>{t('form.date')}</label>
            <input type="date" {...register('date')} className={inputStyles} />

            {errors.date && (
              <p className={errorStyles}>{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className={labelStyles}>{t('form.time')}</label>

            <input
              {...register('time')}
              className={inputStyles}
              placeholder="10:00 AM"
            />

            {errors.time && (
              <p className={errorStyles}>{errors.time.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>{t('form.venue')}</label>

            <input
              {...register('venue')}
              className={inputStyles}
              placeholder="Convention Center"
            />

            {errors.venue && (
              <p className={errorStyles}>{errors.venue.message}</p>
            )}
          </div>

          <div>
            <label className={labelStyles}>{t('form.location')}</label>

            <input
              {...register('location')}
              className={inputStyles}
              placeholder="San Francisco, CA"
            />

            {errors.location && (
              <p className={errorStyles}>{errors.location.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>{t('form.mode')}</label>

            <select {...register('mode')} className={inputStyles}>
              <option value="offline">{t('form.modes.offline')}</option>
              <option value="online">{t('form.modes.online')}</option>
              <option value="hybrid">{t('form.modes.hybrid')}</option>
            </select>

            {errors.mode && (
              <p className={errorStyles}>{errors.mode.message}</p>
            )}
          </div>

          <div>
            <label className={labelStyles}>{t('form.organizer')}</label>

            <input
              {...register('organizer')}
              className={inputStyles}
              placeholder="Company or Name"
            />

            {errors.organizer && (
              <p className={errorStyles}>{errors.organizer.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className={labelStyles}>{t('form.audience')}</label>

          <input
            {...register('audience')}
            className={inputStyles}
            placeholder="Developers, Designers..."
          />

          {errors.audience && (
            <p className={errorStyles}>{errors.audience.message}</p>
          )}
        </div>

        <div>
          <label className={labelStyles}>{t('form.agenda')}</label>

          <input
            {...register('agenda')}
            className={inputStyles}
            placeholder="Registration, Keynote, Lunch (comma separated)"
          />

          {errors.agenda && (
            <p className={errorStyles}>{errors.agenda.message}</p>
          )}
        </div>

        <div>
          <label className={labelStyles}>{t('form.tags')}</label>

          <input
            {...register('tags')}
            className={inputStyles}
            placeholder="React, Next.js, AI (comma separated)"
          />

          {errors.tags && <p className={errorStyles}>{errors.tags.message}</p>}
        </div>

        {errors.root && (
          <p className="text-red-500 text-center font-medium">
            {errors.root.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-primary p-4 font-bold text-black text-lg transition-all hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed mt-8 cursor-pointer"
        >
          {isPending ? 'Creating...' : t('submit')}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
