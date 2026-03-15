import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../styles/theme';
import { heeboFamily } from '../styles/fonts';
import type { HistoricalEvent as EventType } from '../data/events';

interface HistoricalEventProps {
  event: EventType;
  delay: number;
  posX: number;
}

export const HistoricalEventMarker: React.FC<HistoricalEventProps> = ({
  event,
  delay,
  posX,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 12], [0, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [delay, delay + 15], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 180,
        right: posX,
        opacity,
        transform: `translateY(${translateY}px)`,
        direction: 'rtl',
        textAlign: 'center',
      }}
    >
      {/* Dashed connector */}
      <div
        style={{
          width: 1,
          height: 40,
          borderLeft: `1px dashed ${theme.text.dim}`,
          margin: '0 auto',
          marginBottom: 6,
        }}
      />

      {/* Event pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: theme.radius.full,
          background: 'rgba(255, 255, 255, 0.04)',
          border: `1px dashed ${theme.text.dim}`,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            fontFamily: heeboFamily,
            fontSize: 16,
            fontWeight: 700,
            color: theme.text.secondary,
          }}
        >
          {event.year}
        </span>
        <span
          style={{
            fontFamily: heeboFamily,
            fontSize: 13,
            color: theme.text.muted,
          }}
        >
          {event.labelHe}
        </span>
      </div>
    </div>
  );
};
