import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../styles/theme';
import { frankRuhlFamily, heeboFamily } from '../styles/fonts';
import { sources } from '../data/sources';

const stats = [
  { number: 18, label: 'מקורות אישיים', suffix: '' },
  { number: 750, label: 'שנות כתיבה', suffix: '+' },
  { number: 18, label: 'שאלות מחקר', suffix: '' },
  { number: 5, label: 'סוגי טקסט', suffix: '' },
];

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        direction: 'rtl',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Stats grid */}
      <div
        style={{
          display: 'flex',
          gap: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {stats.map((stat, i) => {
          const delay = 10 + i * 15;
          const scaleSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, mass: 0.6 },
          });

          // Counting animation
          const countProgress = interpolate(
            frame,
            [delay, delay + 40],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const displayNumber = Math.round(stat.number * countProgress);

          const labelOpacity = interpolate(
            frame,
            [delay + 20, delay + 35],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                transform: `scale(${scaleSpring})`,
              }}
            >
              <div
                style={{
                  fontFamily: frankRuhlFamily,
                  fontSize: 80,
                  fontWeight: 900,
                  lineHeight: 1,
                  background: theme.gradient.gold,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {displayNumber}{stat.suffix}
              </div>
              <div
                style={{
                  fontFamily: heeboFamily,
                  fontSize: 22,
                  color: theme.text.secondary,
                  marginTop: 12,
                  opacity: labelOpacity,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini timeline below stats */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          right: 120,
          left: 120,
          height: 3,
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: 2,
        }}
      >
        {/* Era gradient overlay */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 2,
            background: `linear-gradient(to left, ${theme.era.medieval}, ${theme.era['early-modern']}, ${theme.era.enlightenment}, ${theme.era.modern})`,
            opacity: interpolate(frame, [60, 90], [0, 0.6], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        />

        {/* Source dots on mini timeline */}
        {sources.map((source, i) => {
          const dotDelay = 70 + i * 3;
          const dotScale = interpolate(
            frame,
            [dotDelay, dotDelay + 8],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const totalSpan = 1920 - 1160;
          const pos = ((source.dateStart - 1160) / totalSpan) * 100;
          const dotColor = theme.sourceType[source.sourceType];

          return (
            <div
              key={source.id}
              style={{
                position: 'absolute',
                right: `${pos}%`,
                top: -4,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: dotColor,
                transform: `scale(${dotScale})`,
                boxShadow: `0 0 8px ${dotColor}60`,
              }}
            />
          );
        })}
      </div>

      {/* Year labels */}
      <div
        style={{
          position: 'absolute',
          bottom: 170,
          right: 120,
          left: 120,
          display: 'flex',
          justifyContent: 'space-between',
          direction: 'rtl',
        }}
      >
        {[1160, 1400, 1600, 1800, 1912].map((year) => (
          <span
            key={year}
            style={{
              fontFamily: heeboFamily,
              fontSize: 14,
              color: theme.text.dim,
              opacity: interpolate(frame, [80, 100], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {year}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
