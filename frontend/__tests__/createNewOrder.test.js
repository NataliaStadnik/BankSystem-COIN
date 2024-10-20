import { createNewOrder } from '../src/bundles/presenters/OneCard/createNewOrder';

describe('Check new order form', () => {
  const inputs = (txt) => {
    return `<input id="${txt}" name="${txt}" class=" input-reset input order__input" type="number" placeholder="Placeholder">`;
  };

  it('is correct render', () => {
    const btn = createNewOrder();
    expect(btn).toBeInstanceOf(HTMLFormElement);
    expect(btn.outerHTML.includes(inputs('to'))).toBeTruthy();
    expect(btn.outerHTML.includes(inputs('sum'))).toBeTruthy();
    expect(
      btn.outerHTML.includes(
        '<button class=" btn-reset btn btn--sign order__btn" type="submit">Отправить</button>',
      ),
    ).toBeTruthy();
  });
});
