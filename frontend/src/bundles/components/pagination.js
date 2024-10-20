import { el } from 'redom';

export function createPagination(firstNumber, count) {
  const btnArr = [];

  btnArr.push(
    el(
      'button',
      {
        class: 'btn-reset pagination__arrow',
      },
      '0',
    ),
  );

  for (let i = firstNumber; i < firstNumber + count; i++) {
    btnArr.push(
      el(
        'button',
        {
          class: 'btn-reset pagination__btn',
          id: i,
        },
        i,
      ),
    );
  }

  if (count === 6) {
    btnArr.push(
      el(
        'button',
        {
          class: 'btn-reset pagination__dots',
        },
        '...',
      ),
    );
  }

  btnArr.push(
    el(
      'button',
      {
        class: 'btn-reset pagination__arrow',
      },
      '0',
    ),
  );

  return el(
    'div',
    {
      class: 'pagination',
    },
    [btnArr],
  );
}
