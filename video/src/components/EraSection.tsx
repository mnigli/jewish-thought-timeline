import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { theme } from '../styles/theme';
import { frankRuhlFamily, heeboFamily } from '../styles/fonts';
import { SourceCard } from './SourceCard';
import { HistoricalEventMarker } from './HistoricalEvent';
import { TimelineLine, TimelineDot } from './TimelineLine';
import { getSourcesByEra, type VideoSource } from '../data/sources';
import { getEventsForEra } from '../data/events';

interface EraSectionProps {
  eraId: string;
  eraLabel: string;
  dateRange: string;
  color: string;
  durationInFrames: number;
}

export const EraSection: React.FC<EraSectionProps> = ({
  eraId,
  eraLabel,
  dateRange,
  color,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eraSources = getSourcesByEra(eraId);
  const eraEvents = getEventsForEra(eraId);

  // Era header animation
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headerTranslateX = interpolate(frame, [0, 25], [100, 0], {
    extrapolateRight: 'clamp',
  });

  // Calculate timing per source
  const headerDuration = 40;
  const availableFrames = durationInFrames - headerDuration - 30; // 30 frames for exit
  const framesPerSource = Math.floor(availableFrames / eraSources.length);

  // Timeline line progress
  const lineProgress = interpolate(
    frame,
    [headerDuration, durationInFrames - 30],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Exit fade
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        direction: 'rtl',
        opacity: exitOpacity,
      }}
    >
      {/* Era Header Banner */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 80,
          left: 80,
          opacity: headerOpacity,
          transform: `translateX(${headerTranslateX}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          paddingBottom: 16,
          borderBottom: `3px solid ${color}`,
        }}
      >
        {/* Era color dot */}
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 20px ${color}60`,
            flexShrink: 0,
          }}
        />

        <div>
          <h2
            style={{
              fontFamily: frankRuhlFamily,
              fontSize: 48,
              fontWeight: 700,
              color: color,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {eraLabel}
          </h2>
          <span
            style={{
              fontFamily: heeboFamily,
              fontSize: 22,
              color: theme.text.secondary,
            }}
          >
            {dateRange}
          </span>
        </div>
      </div>

      {/* Timeline Line */}
      <TimelineLine color={color} progress={lineProgress} />

      {/* Source Cards */}
      {eraSources.map((source, i) => {
        const sourceDelay = headerDuration + i * framesPerSource;
        return (
          <SourceCard
            key={source.id}
            source={source}
            delay={sourceDelay}
            index={i}
          />
        );
      })}

      {/* Timeline Dots for each source */}
      {eraSources.map((source, i) => {
        const sourceDelay = headerDuration + i * framesPerSource;
        const dotX = 120 + i * 160 + 180;
        const isActive =
          frame >= sourceDelay && frame < sourceDelay + framesPerSource;
        return (
          <TimelineDot
            key={`dot-${source.id}`}
            color={theme.sourceType[source.sourceType] || color}
            posX={dotX}
            delay={sourceDelay}
            isActive={isActive}
          />
        );
      })}

      {/* Historical Events */}
      {eraEvents.map((event, i) => {
        const eventDelay =
          headerDuration + Math.floor((i + 0.5) * (availableFrames / (eraEvents.length + 1)));
        const eventX = 200 + i * 280;
        return (
          <HistoricalEventMarker
            key={event.year}
            event={event}
            delay={eventDelay}
            posX={eventX}
          />
        );
      })}

      {/* Source counter */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 80,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: heeboFamily,
            fontSize: 18,
            color: theme.text.dim,
          }}
        >
          {eraSources.length} מקורות
        </span>
      </div>
    </AbsoluteFill>
  );
};
