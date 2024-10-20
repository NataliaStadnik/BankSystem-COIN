import { createChangeCurrency } from '../src/bundles/presenters/Currency/createChangeCurrency';

describe('Check render change currencies', () => {
  const block = createChangeCurrency();

  it('is correct render form for change currencies', () => {
    expect(block).toBeInstanceOf(HTMLFormElement);
    expect(
      block.outerHTML.includes(
        '<input id="sums" class=" input-reset input" type="number" placeholder="0.1235421">',
      ),
    ).toBeTruthy();

    expect(
      block.outerHTML.includes(
        '<button class=" btn-reset btn" type="submit">Обменять</button>',
      ),
    ).toBeTruthy();
  });
});
