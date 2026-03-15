import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { theme } from './styles/theme';
import { heeboFamily } from './styles/fonts';
import { StarPattern } from './components/StarPattern';
import { TitleScene } from './components/TitleScene';
import { EraSection } from './components/EraSection';
import { StatsScene } from './components/StatsScene';
import { ClosingScene } from './components/ClosingScene';
import { eras } from './data/sources';
import backgroundMusic from './assets/background-music.mp3';

/**
 * Scene breakdown (60 seconds = 1800 frames @ 30fps):
 *
 * Scene 1: Title         0:00-0:05  frames 0-149      (150 frames)
 * Scene 2: Medieval      0:05-0:17  frames 150-509    (360 frames)
 * Scene 3: Early Modern  0:17-0:28  frames 510-839    (330 frames)
 * Scene 4: Enlightenment 0:28-0:39  frames 840-1169   (330 frames)
 * Scene 5: Modern        0:39-0:50  frames 1170-1499  (330 frames)
 * Scene 6: Stats         0:50-0:55  frames 1500-1649  (150 frames)
 * Scene 7: Closing       0:55-1:00  frames 1650-1800  (150 frames)
 */

const SCENE = {
  title: { from: 0, duration: 150 },
  medieval: { from: 150, duration: 360 },
  earlyModern: { from: 510, duration: 330 },
  enlightenment: { from: 840, duration: 330 },
  modern: { from: 1170, duration: 330 },
  stats: { from: 1500, duration: 150 },
  closing: { from: 1650, duration: 150 },
};

export const Timeline: React.FC = () => {
  const frame = useCurrentFrame();

  // Background gradient with subtle color shift per era
  const bgGradient = (() => {
    if (frame < 150) return theme.gradient.hero;
    if (frame < 510) return `linear-gradient(135deg, #0a0e1a 0%, #1a1508 30%, #0f172a 60%, #0a0e1a 100%)`;
    if (frame < 840) return `linear-gradient(135deg, #0a0e1a 0%, #15102a 30%, #0f172a 60%, #0a0e1a 100%)`;
    if (frame < 1170) return `linear-gradient(135deg, #0a0e1a 0%, #0a1a18 30%, #0f172a 60%, #0a0e1a 100%)`;
    if (frame < 1500) return `linear-gradient(135deg, #0a0e1a 0%, #0a1230 30%, #0f172a 60%, #0a0e1a 100%)`;
    return theme.gradient.hero;
  })();

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        fontFamily: heeboFamily,
      }}
    >
      {/* Star pattern background layer */}
      <StarPattern />

      {/* Background music with fade-in and fade-out */}
      <Audio
        src={backgroundMusic}
        volume={(f) => {
          // Fade in over first 2 seconds (60 frames)
          if (f < 60) return interpolate(f, [0, 60], [0, 0.5]);
          // Fade out over last 3 seconds (90 frames)
          if (f > 1710) return interpolate(f, [1710, 1800], [0.5, 0]);
          // Steady volume
          return 0.5;
        }}
        endAt={1800}
      />

      {/* Floating gold orb */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.accent.gold}08 0%, transparent 70%)`,
          transform: `translateY(${Math.sin(frame * 0.02) * 20}px)`,
          pointerEvents: 'none',
        }}
      />

      {/* Floating blue orb */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.accent.gold}06 0%, transparent 70%)`,
          transform: `translateY(${Math.cos(frame * 0.015) * 15}px)`,
          pointerEvents: 'none',
        }}
      />

      {/* Scene 1: Title */}
      <Sequence from={SCENE.title.from} durationInFrames={SCENE.title.duration}>
        <TitleScene />
      </Sequence>

      {/* Scene 2: Medieval Era */}
      <Sequence from={SCENE.medieval.from} durationInFrames={SCENE.medieval.duration}>
        <EraSection
          eraId="medieval"
          eraLabel="ימי הביניים"
          dateRange="~1160 – ~1530"
          color={theme.era.medieval}
          durationInFrames={SCENE.medieval.duration}
        />
      </Sequence>

      {/* Scene 3: Early Modern Era */}
      <Sequence from={SCENE.earlyModern.from} durationInFrames={SCENE.earlyModern.duration}>
        <EraSection
          eraId="early-modern"
          eraLabel="ראשית העת החדשה"
          dateRange="~1530 – ~1700"
          color={theme.era['early-modern']}
          durationInFrames={SCENE.earlyModern.duration}
        />
      </Sequence>

      {/* Scene 4: Enlightenment Era */}
      <Sequence from={SCENE.enlightenment.from} durationInFrames={SCENE.enlightenment.duration}>
        <EraSection
          eraId="enlightenment"
          eraLabel="עידן ההשכלה"
          dateRange="~1700 – ~1850"
          color={theme.era.enlightenment}
          durationInFrames={SCENE.enlightenment.duration}
        />
      </Sequence>

      {/* Scene 5: Modern Era */}
      <Sequence from={SCENE.modern.from} durationInFrames={SCENE.modern.duration}>
        <EraSection
          eraId="modern"
          eraLabel="העת החדשה"
          dateRange="~1850 – 1912"
          color={theme.era.modern}
          durationInFrames={SCENE.modern.duration}
        />
      </Sequence>

      {/* Scene 6: Stats */}
      <Sequence from={SCENE.stats.from} durationInFrames={SCENE.stats.duration}>
        <StatsScene />
      </Sequence>

      {/* Scene 7: Closing */}
      <Sequence from={SCENE.closing.from} durationInFrames={SCENE.closing.duration}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
