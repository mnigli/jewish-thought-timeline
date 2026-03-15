import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme, sourceTypeLabels } from '../styles/theme';
import { frankRuhlFamily, heeboFamily } from '../styles/fonts';
import type { VideoSource } from '../data/sources';

interface SourceCardProps {
  source: VideoSource;
  delay: number;
  index: number;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, mass: 0.8 },
  });

  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const translateX = interpolate(entryProgress, [0, 1], [120, 0]);

  const typeColor = theme.sourceType[source.sourceType] || theme.accent.gold;
  const typeLabel = sourceTypeLabels[source.sourceType] || source.sourceType;

  // Position cards in a staggered layout
  const isTop = index % 2 === 0;
  const topPos = isTop ? 180 : 520;

  return (
    <div
      style={{
        position: 'absolute',
        top: topPos,
        right: 120 + index * 160,
        width: 360,
        opacity,
        transform: `translateX(${translateX}px)`,
        direction: 'rtl',
      }}
    >
      {/* Glass Card */}
      <div
        style={{
          background: theme.bg.glass,
          border: `1px solid ${theme.bg.glassBorder}`,
          borderRight: `4px solid ${typeColor}`,
          borderRadius: theme.radius.lg,
          padding: '24px 28px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Header: date + type badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: frankRuhlFamily,
              fontSize: 22,
              color: theme.text.secondary,
              fontWeight: 500,
            }}
          >
            {source.dateDisplay}
          </span>

          {/* Type Badge */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 14px',
              borderRadius: theme.radius.full,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: heeboFamily,
              background: `${typeColor}26`,
              color: typeColor,
              border: `1px solid ${typeColor}4D`,
            }}
          >
            {typeLabel}
          </span>
        </div>

        {/* Author Name */}
        <h3
          style={{
            fontFamily: frankRuhlFamily,
            fontSize: 30,
            fontWeight: 700,
            color: theme.text.primary,
            margin: 0,
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {source.nameHe}
        </h3>

        {/* Work Title */}
        <p
          style={{
            fontFamily: heeboFamily,
            fontSize: 18,
            color: theme.accent.gold,
            margin: 0,
            marginBottom: 8,
          }}
        >
          {source.workTitleHe}
        </p>

        {/* Language + Gender badges */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span
            style={{
              fontFamily: heeboFamily,
              fontSize: 14,
              color: theme.text.muted,
            }}
          >
            {source.language}
          </span>
          {source.authorGender === 'female' && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '2px 10px',
                borderRadius: theme.radius.full,
                fontSize: 13,
                fontWeight: 500,
                fontFamily: heeboFamily,
                background: 'rgba(244, 63, 94, 0.15)',
                color: '#f43f5e',
                border: '1px solid rgba(244, 63, 94, 0.3)',
              }}
            >
              ♀ קול נשי
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
