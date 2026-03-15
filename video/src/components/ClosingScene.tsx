import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';
import { frankRuhlFamily, heeboFamily } from '../styles/fonts';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulsing star
  const starScale = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  const starGlow = interpolate(
    frame % 60,
    [0, 30, 60],
    [20, 40, 20]
  );

  // Title
  const titleOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Divider
  const dividerWidth = interpolate(frame, [30, 60], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // URL
  const urlOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Final fade to black
  const fadeToBlack = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        direction: 'rtl',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Pulsing Star of David */}
      <div
        style={{
          fontSize: 64,
          marginBottom: 24,
          color: theme.accent.gold,
          transform: `scale(${starScale})`,
          textShadow: `0 0 ${starGlow}px ${theme.accent.gold}60`,
        }}
      >
        ✡
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: frankRuhlFamily,
          fontSize: 52,
          fontWeight: 700,
          color: theme.text.primary,
          margin: 0,
          opacity: titleOpacity,
          textAlign: 'center',
        }}
      >
        ציר זמן של מחשבה יהודית
      </h2>

      {/* Gold divider */}
      <div
        style={{
          width: dividerWidth,
          height: 3,
          background: theme.gradient.gold,
          borderRadius: 2,
          margin: '20px 0',
        }}
      />

      {/* URL */}
      <p
        style={{
          fontFamily: heeboFamily,
          fontSize: 24,
          color: theme.accent.gold,
          opacity: urlOpacity,
          margin: 0,
          letterSpacing: 1,
        }}
      >
        jewish-thought-timeline.netlify.app
      </p>

      {/* Fade to black overlay */}
      <AbsoluteFill
        style={{
          background: theme.bg.primary,
          opacity: fadeToBlack,
        }}
      />
    </AbsoluteFill>
  );
};
