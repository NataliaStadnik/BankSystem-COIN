import { createRow } from '../src/bundles/components/row';

describe('Check create row in currencies', () => {
  const row = createRow('BYR', 44.75, 1);

  it('is correct create row', () => {
    expect(row).toBeInstanceOf(HTMLLIElement);
    expect(row.outerHTML.includes('BYR')).toBeTruthy();
    expect(row.outerHTML.includes(44.75)).toBeTruthy();
  });

  it('is correct for state "green"', () => {
    expect(row.outerHTML.includes('row__dots--green')).toBeTruthy();
    expect(row.outerHTML.includes('row__sign--green')).toBeTruthy();
  });

  it('is correct for state "red"', () => {
    const row = createRow('EUR', 123, -1);
    expect(row.outerHTML.includes('row__dots--red')).toBeTruthy();
    expect(row.outerHTML.includes('row__sign--red')).toBeTruthy();
  });

  it('is correct without state', () => {
    const row = createRow('GBP', 231);
    expect(row.outerHTML.includes('row__dots--red')).toBeFalsy();
    expect(row.outerHTML.includes('row__sign--red')).toBeFalsy();
  });
});
