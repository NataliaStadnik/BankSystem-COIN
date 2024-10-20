import { el } from 'redom';
import { createHeader } from './createHeader';

export function createHeaderWithButtons() {
  const navElem = [];
  const btnArray = {
    atm: 'Банкоматы',
    accounts: 'Счета',
    currency: 'Валюта',
    quit: 'Выйти',
  };
  const keys = Object.keys(btnArray);

  for (let i = 0; i < keys.length; i++) {
    navElem.push(
      el(
        'li',
        {
          class: 'nav__item',
        },
        [
          el(
            'button',
            {
              class: 'btn btn-reset nav__btn',
              id: keys[i],
            },
            btnArray[keys[i]],
          ),
        ],
      ),
    );
  }

  const nav = el(
    'nav',
    {
      class: 'nav header__nav',
    },
    [
      el(
        'ul',
        {
          class: 'list-reset nav__list',
        },
        [navElem],
      ),
    ],
  );
  return createHeader(nav);
}
