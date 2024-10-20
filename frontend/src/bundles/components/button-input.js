import { el } from 'redom';

export function createBTN(text) {
  return el(
    'div',
    {
      class: 'btn-wrap',
    },
    [
      el(
        'button',
        {
          class: 'btn-reset input input__select choose',
          id: 'select-btn',
        },
        text,
      ),
    ],
  );
}
