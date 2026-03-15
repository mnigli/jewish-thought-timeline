export interface SourceMeta {
    id: number;
    slug: string;
    nameHe: string;
    workTitleHe: string;
    dateDisplay: string;
    dateStart: number;
    sourceType: 'diary' | 'travel' | 'autobiography' | 'memoirs' | 'letters';
    sourceTypeHe: string;
    era: 'medieval' | 'early-modern' | 'enlightenment' | 'modern';
    eraHe: string;
    color: string;
}

export const eraLabels: Record<string, string> = {
    'medieval': 'ימי הביניים',
    'early-modern': 'ראשית העת החדשה',
    'enlightenment': 'עידן ההשכלה',
    'modern': 'העת החדשה',
};

export const sourceTypeLabels: Record<string, string> = {
    diary: 'יומן',
    travel: 'ספר מסע',
    autobiography: 'אוטוביוגרפיה',
    memoirs: 'זיכרונות',
    letters: 'אגרות',
};

export const sourceTypeColors: Record<string, string> = {
    diary: 'var(--type-diary)',
    travel: 'var(--type-travel)',
    autobiography: 'var(--type-autobiography)',
    memoirs: 'var(--type-memoirs)',
    letters: 'var(--type-letters)',
};

export const eraColors: Record<string, string> = {
    'medieval': 'var(--era-medieval)',
    'early-modern': 'var(--era-early-modern)',
    'enlightenment': 'var(--era-enlightenment)',
    'modern': 'var(--era-modern)',
};

export const categoryLabels: Record<string, string> = {
    identity: 'זהות',
    society: 'חברה',
    religion: 'דת ואמונה',
    politics: 'פוליטיקה',
    culture: 'תרבות',
    overarching: 'שאלת-על',
};
