'use client';

import dynamic from 'next/dynamic';

const LightRays = dynamic(() => import('@/components/effects/LightRays'), {
  ssr: false,
});

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <LightRays
        raysOrigin="top-center-offset"
        raysColor="#5DFECA"
        raysSpeed={0.5}
        lightSpread={0.9}
        rayLength={1.4}
        followMouse={true}
        mouseInfluence={0.02}
        noiseAmount={0.0}
        distortion={0.01}
      />
    </div>
  );
};

export default BackgroundEffects;
