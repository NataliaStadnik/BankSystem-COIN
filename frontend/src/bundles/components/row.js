import { el } from 'redom';

export function createRow(name, number, state = null) {
  let color;
  state === 1 ? (color = 'green') : state === -1 ? (color = 'red') : '';

  return el(
    'li',
    {
      class: 'currency-list__item row',
    },
    [
      el(
        'span',
        {
          class: 'title title--midi row__title',
        },
        name,
      ),
      el('div', {
        class: `row__dots row__dots--${color}`,
      }),
      el(
        'span',
        {
          class: `title title--midi row__numbers row__sign row__sign--${color}`,
        },
        number,
      ),
    ],
  );
}
