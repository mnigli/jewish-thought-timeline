export const theme = {
  bg: {
    primary: '#0a0e1a',
    secondary: '#111827',
    tertiary: '#1a2035',
    glass: 'rgba(17, 24, 39, 0.85)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
    glassBorderHover: 'rgba(255, 255, 255, 0.15)',
  },
  text: {
    primary: '#f0f4ff',
    secondary: '#94a3b8',
    muted: '#64748b',
    dim: '#475569',
  },
  accent: {
    gold: '#f5a623',
    goldLight: '#ffd700',
    goldDim: 'rgba(245, 166, 35, 0.15)',
  },
  era: {
    medieval: '#c9a84c',
    'early-modern': '#7c6fa0',
    enlightenment: '#4a8f7f',
    modern: '#3b82f6',
  } as Record<string, string>,
  sourceType: {
    diary: '#f5a623',
    travel: '#10b981',
    autobiography: '#8b5cf6',
    memoirs: '#3b82f6',
    letters: '#f43f5e',
  } as Record<string, string>,
  gradient: {
    hero: 'linear-gradient(135deg, #0a0e1a 0%, #1a1040 30%, #0f172a 60%, #0a0e1a 100%)',
    gold: 'linear-gradient(135deg, #f5a623, #ffd700, #f5a623)',
  },
  font: {
    primary: 'Heebo',
    display: 'Frank Ruhl Libre',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
    full: 9999,
  },
};

export const sourceTypeLabels: Record<string, string> = {
  diary: 'יומן',
  travel: 'ספר מסע',
  autobiography: 'אוטוביוגרפיה',
  memoirs: 'זיכרונות',
  letters: 'אגרות',
};

export const eraLabels: Record<string, string> = {
  medieval: 'ימי הביניים',
  'early-modern': 'ראשית העת החדשה',
  enlightenment: 'עידן ההשכלה',
  modern: 'העת החדשה',
};
