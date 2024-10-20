import { el } from 'redom';

export function createHeader(btn = null) {
  return el(
    'header',
    {
      class: 'header',
    },
    [
      el(
        'h1',
        {
          class: 'visually-hidden',
        },
        'Банковская система Coin',
      ),
      el(
        'div',
        {
          class: 'container header__container',
        },
        [
          el(
            'h2',
            {
              class: 'header__title',
            },
            'Coin.',
          ),
          btn,
        ],
      ),
    ],
  );
}
