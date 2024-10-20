import { createBTN } from '../src/bundles/components/button-input';
import { createHeader } from '../src/bundles/components/createHeader';
import { createHeaderWithButtons } from '../src/bundles/components/createHeaderWithButtons';

describe('Check header-render and buttons-render', () => {
  it('is correct create button', () => {
    const expectedHTML =
      '<div class=" btn-wrap"><button class=" btn-reset input input__select choose" id="select-btn">Назад</button></div>';
    const btn = createBTN('Назад');
    expect(btn).toBeInstanceOf(HTMLDivElement);
    expect(btn.outerHTML).toBe(expectedHTML);
  });

  const expectedHeaderHTML = `<header class=" header"><h1 class=" visually-hidden">Банковская система Coin</h1><div class=" container header__container"><h2 class=" header__title">Coin.</h2></div></header>`;

  it('is correct create header without buttons', () => {
    const header = createHeader();
    expect(header).toBeInstanceOf(HTMLElement);
    expect(header.outerHTML).toBe(expectedHeaderHTML);
  });

  it('is correct create header with buttons', () => {
    const buttonsHTML =
      '<nav class=" nav header__nav"><ul class=" list-reset nav__list"><li class=" nav__item"><button class=" btn btn-reset nav__btn" id="atm">Банкоматы</button></li><li class=" nav__item"><button class=" btn btn-reset nav__btn" id="accounts">Счета</button></li><li class=" nav__item"><button class=" btn btn-reset nav__btn" id="currency">Валюта</button></li><li class=" nav__item"><button class=" btn btn-reset nav__btn" id="quit">Выйти</button></li></ul></nav>';
    const header = createHeaderWithButtons();
    expect(header.outerHTML.includes(buttonsHTML)).toBeTruthy();
    expect(header).toBeInstanceOf(HTMLElement);
  });
});
