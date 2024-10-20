import { subMonths, isAfter } from 'date-fns';
import { createEmptyMessage } from '../emptyMessage';

export function prepareData(arr, mnthCount, id) {
  if (arr.length === 0) {
    createEmptyMessage(
      'Динамика баланса отсутвует',
      document.getElementsByClassName('graphic')[0],
    );
    return;
  }
  const sortTransactions = arr.sort((a, b) => {
    return new Date(b?.date) - new Date(a?.date);
  });

  try {
    const endDate = subMonths(sortTransactions[0].date, mnthCount);
    const months = new Map();
    let beforeEndDate = 0;

    const filter6month = sortTransactions.filter((elem) => {
      if (isAfter(elem.date, endDate)) {
        const mnth = new Date(elem.date).toLocaleDateString('ru-RU', {
          month: 'long',
        });
        months.set(mnth, 0);
        return elem;
      } else {
        elem.to === id
          ? (beforeEndDate += elem.amount)
          : (beforeEndDate -= elem.amount);
      }
    });
    return { beforeEndDate, filter6month, months };
  }
  catch (err) {
    console.log (err.message)
  }
}
