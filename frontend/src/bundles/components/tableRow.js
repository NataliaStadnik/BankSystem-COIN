import { el } from 'redom';
import { parseDate } from '../utilits/parseDate';
import { addCardInTable } from '../utilits/cardValidation';

export function createTableRow(transactions, num, rowAmount, startIndex = 0) {
  if (transactions.length === 0) {
    return [
      el(
        'tr',
        {
          class: 'body__row',
        },
        el('td', {
          class: 'body__cell',
        }),
        el(
          'div',
          {
            class: 'message',
          },
          'История переводов отсутвует',
        ),
      ),
    ];
  }

  const sortTransactions = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const bodyArr = [];
  let count =
    sortTransactions.length > rowAmount ? rowAmount : sortTransactions.length;

  for (let i = startIndex; i < count + startIndex; i++) {
    let stateFrom = 'green';
    if (sortTransactions[i]?.from === num) {
      stateFrom = 'red';
    }

    const type1 = addCardInTable(sortTransactions[i]?.from);
    const type2 = addCardInTable(sortTransactions[i]?.to);

    bodyArr.push(
      el(
        'tr',
        {
          class: 'body__row',
        },
        el(
          'td',
          {
            class: `body__cell ${type1}`,
          },
          sortTransactions[i]?.from,
        ),
        el(
          'td',
          {
            class: `body__cell ${type2}`,
          },
          sortTransactions[i]?.to,
        ),
        el(
          'td',
          {
            class: `body__cell amount amount--${stateFrom}`,
          },
          `${stateFrom === 'green' ? '+' : '-'} ${
            sortTransactions[i]?.amount
          } ₽`,
        ),
        el(
          'td',
          {
            class: 'body__cell',
          },
          parseDate(sortTransactions[i]?.date, 'numeric'),
        ),
      ),
    );
  }
  return bodyArr;
}
