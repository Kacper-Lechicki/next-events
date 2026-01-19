'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const failedImages = new Set<string>();

interface EventImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string;
  fallbackSrc?: string;
}

const EventImage = ({
  src,
  fallbackSrc = '/images/event1.png',
  alt,
  ...props
}: EventImageProps) => {
  const [imgSrc, setImgSrc] = useState(
    failedImages.has(src) ? fallbackSrc : src,
  );

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        failedImages.add(src);
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default EventImage;
