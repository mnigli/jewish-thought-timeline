import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { Timeline } from './Timeline';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TimelineJourney"
        component={Timeline}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
