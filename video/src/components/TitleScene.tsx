import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';
import { frankRuhlFamily, heeboFamily } from '../styles/fonts';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Star of David entrance
  const starScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  const starRotate = interpolate(frame, [10, 50], [180, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title text
  const titleOpacity = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleTranslateY = interpolate(frame, [25, 55], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gold divider
  const dividerWidth = interpolate(frame, [70, 110], [0, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tag
  const tagOpacity = interpolate(frame, [85, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        direction: 'rtl',
      }}
    >
      {/* Star of David */}
      <div
        style={{
          fontSize: 80,
          marginBottom: 30,
          transform: `scale(${starScale}) rotate(${starRotate}deg)`,
          color: theme.accent.gold,
          textShadow: `0 0 40px ${theme.accent.gold}40`,
        }}
      >
        ✡
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: frankRuhlFamily,
          fontSize: 72,
          fontWeight: 900,
          textAlign: 'center',
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          lineHeight: 1.2,
        }}
      >
        <span
          style={{
            background: theme.gradient.gold,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ציר זמן
        </span>
        <br />
        <span style={{ color: theme.text.primary }}>של מחשבה יהודית</span>
      </h1>

      {/* Gold divider */}
      <div
        style={{
          width: dividerWidth,
          height: 3,
          background: theme.gradient.gold,
          borderRadius: 2,
          margin: '24px 0',
        }}
      />

      {/* Subtitle */}
      <p
        style={{
          fontFamily: heeboFamily,
          fontSize: 28,
          color: theme.text.secondary,
          opacity: subtitleOpacity,
          textAlign: 'center',
          margin: 0,
          maxWidth: 700,
        }}
      >
        750 שנה של כתיבה אישית יהודית
      </p>

      {/* Tag */}
      <div
        style={{
          marginTop: 20,
          opacity: tagOpacity,
          padding: '8px 24px',
          borderRadius: theme.radius.full,
          background: theme.accent.goldDim,
          border: `1px solid ${theme.accent.gold}40`,
        }}
      >
        <span
          style={{
            fontFamily: heeboFamily,
            fontSize: 16,
            color: theme.accent.gold,
            fontWeight: 500,
          }}
        >
          מחקר דיגיטלי במחשבה יהודית
        </span>
      </div>
    </AbsoluteFill>
  );
};
