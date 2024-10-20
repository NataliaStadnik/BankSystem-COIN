import { parseDate } from '../src/bundles/utilits/parseDate';

describe('Check parse date', () => {
  it('is correct parse date with state', () => {
    const mockDate = '2024-10-10T00:00:00.956Z';
    expect(parseDate(mockDate, 'long')).toBe('10 октября 2024 г.');
    expect(parseDate(mockDate, 'numeric')).toBe('10.10.2024');
  });
  it('is correct parse date without date or state', () => {
    expect(parseDate('', 'numeric')).toBeFalsy();
    expect(parseDate('', '')).toBeFalsy();
  });
});
