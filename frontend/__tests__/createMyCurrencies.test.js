import { createMyCurrencies } from '../src/bundles/presenters/Currency/createMyCurrencies';

describe('Check render currencies', () => {
  const obj = {
    AUD: { amount: 22.348893086513034, code: 'AUD' },
    BTC: { amount: 3043.34, code: 'BTC' },
    BYR: { amount: 44.75, code: 'BYR' },
    CAD: { amount: 230.94, code: 'CAD' },
  };

  it('is correct render currencies', () => {
    const block = createMyCurrencies(obj);
    expect(block).toBeInstanceOf(HTMLDivElement);
    Object.keys(obj).forEach((elem) => {
      expect(block.outerHTML.includes(elem)).toBeTruthy();
    });
  });
});
