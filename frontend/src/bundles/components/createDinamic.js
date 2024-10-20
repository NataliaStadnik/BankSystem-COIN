import { el } from 'redom';

export function createDinamic(txt, classes = '') {
  return el(
    'div',
    {
      class: `dinamic ${classes}`,
      tabindex: 0,
    },
    [
      el(
        'h3',
        {
          class: 'title title--midi dinamic__title',
        },
        txt,
      ),
      el('div', {
        class: 'graphic',
      }),
    ],
  );
}
