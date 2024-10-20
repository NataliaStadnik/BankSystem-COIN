import { el } from 'redom';
import { createRow } from '../../components/row';

export function createMyCurrencies(obj) {
  const rowArr = [];
  for (const item in obj) {
    if (obj[item].amount !== 0) {
      rowArr.push(createRow(obj[item].code, obj[item].amount.toFixed(2)));
    }
  }

  return el(
    'div',
    {
      class: 'dinamic currency__dinamic',
    },
    [
      el(
        'h3',
        {
          class: 'title title--midi dinamic__title',
        },
        'Ваши валюты',
      ),
      [
        el(
          'ul',
          {
            class: 'list-reset currency-list',
          },
          [rowArr],
        ),
      ],
    ],
  );
}
