import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../styles/theme';

export const StarPattern: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 60], [0, 0.015], {
    extrapolateRight: 'clamp',
  });

  // Create a grid of Star of David symbols
  const stars: React.ReactNode[] = [];
  const cols = 24;
  const rows = 14;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c / cols) * 100;
      const y = (r / rows) * 100;
      stars.push(
        <text
          key={`${r}-${c}`}
          x={`${x}%`}
          y={`${y}%`}
          fill={theme.accent.gold}
          fontSize="18"
          opacity={1}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          ✡
        </text>
      );
    }
  }

  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {stars}
      </svg>
    </AbsoluteFill>
  );
};
