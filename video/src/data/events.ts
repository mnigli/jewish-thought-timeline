export interface HistoricalEvent {
  year: number;
  labelHe: string;
}

export const historicalEvents: HistoricalEvent[] = [
  { year: 1187, labelHe: 'צלאח א-דין כובש את ירושלים' },
  { year: 1290, labelHe: 'גירוש יהודי אנגליה' },
  { year: 1391, labelHe: 'פרעות בספרד' },
  { year: 1492, labelHe: 'גירוש ספרד' },
  { year: 1516, labelHe: 'הכיבוש העות\'מאני של ארץ ישראל' },
  { year: 1648, labelHe: 'גזירות ת"ח ות"ט' },
  { year: 1666, labelHe: 'התנועה השבתאית' },
  { year: 1789, labelHe: 'המהפכה הצרפתית' },
  { year: 1791, labelHe: 'תחום המושב ברוסיה' },
  { year: 1881, labelHe: 'פרעות ברוסיה / העלייה הראשונה' },
  { year: 1897, labelHe: 'הקונגרס הציוני הראשון' },
];

export function getEventsForEra(eraId: string): HistoricalEvent[] {
  const ranges: Record<string, [number, number]> = {
    medieval: [1160, 1530],
    'early-modern': [1530, 1700],
    enlightenment: [1700, 1850],
    modern: [1850, 1920],
  };
  const [start, end] = ranges[eraId] || [0, 0];
  return historicalEvents.filter(e => e.year >= start && e.year < end);
}
