import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../styles/theme';

interface TimelineLineProps {
  color: string;
  progress: number; // 0-1, how much of the line to show
}

export const TimelineLine: React.FC<TimelineLineProps> = ({ color, progress }) => {
  const frame = useCurrentFrame();

  const lineWidth = interpolate(progress, [0, 1], [0, 100], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 220,
        right: 80,
        left: 80,
        height: 4,
        borderRadius: 2,
        background: `rgba(255, 255, 255, 0.06)`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${lineWidth}%`,
          height: '100%',
          borderRadius: 2,
          background: `linear-gradient(to left, ${color}, ${color}80)`,
          boxShadow: `0 0 20px ${color}40`,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
};

interface TimelineDotProps {
  color: string;
  posX: number;
  delay: number;
  isActive: boolean;
}

export const TimelineDot: React.FC<TimelineDotProps> = ({
  color,
  posX,
  delay,
  isActive,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const size = isActive ? 16 : 10;
  const glowSize = isActive ? 30 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 220 - size / 2,
        right: posX - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        transform: `scale(${scale})`,
        boxShadow: isActive ? `0 0 ${glowSize}px ${color}60` : 'none',
        zIndex: isActive ? 10 : 1,
      }}
    />
  );
};
