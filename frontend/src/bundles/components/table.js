import { el } from 'redom';
import { createTableRow } from './tableRow';

export function createTable(transactions, num, rowAmount = 10, tab = false) {
  const headerArr = [];
  ['Счёт отправителя', 'Счёт получателя', 'Сумма', 'Дата'].map((elem) => {
    headerArr.push(
      el(
        'th',
        {
          class: 'head__cell',
        },
        elem,
      ),
    );
  });

  let ind;
  if (tab) {
    ind = 0;
  }

  return el(
    'div',
    {
      class: 'form history',
      tabindex: ind,
    },
    [
      el(
        'h3',
        {
          class: 'title title--midi history__title',
        },
        'История переводов',
      ),
      [
        el(
          'div',
          {
            class: 'table-wrapper',
          },
          [
            el(
              'table',
              {
                class: 'table',
              },
              [
                el(
                  'thead',
                  {
                    class: 'table__head head',
                  },
                  [
                    el(
                      'tr',
                      {
                        class: 'head__row',
                      },
                      [headerArr],
                    ),
                  ],
                ),
                el(
                  'tbody',
                  {
                    class: 'table__body body',
                  },
                  rowAmount === 10
                    ? createTableRow(transactions, num, rowAmount)
                    : null,
                ),
              ],
            ),
          ],
        ),
      ],
    ],
  );
}
