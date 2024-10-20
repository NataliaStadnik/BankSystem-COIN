import { prepareData } from './prepareData';
import { renderBarChart } from './renderBarChart';

export function oneBarChart(arr, mnthCount, id) {
  const prepare = prepareData(arr, mnthCount, id);
  if (prepare === undefined) {
    return;
  }
  const { beforeEndDate, filter6month, months } = prepare;

  filter6month.forEach((elem) => {
    const mnth = new Date(elem.date).toLocaleDateString('ru-RU', {
      month: 'long',
    });
    if (elem.to === id) {
      months.set(mnth, months.get(mnth) + elem.amount);
    } else {
      months.set(mnth, months.get(mnth) - elem.amount);
    }
  });

  const keyArray = Array.from(months.keys());
  for (let i = keyArray.length - 1; i >= 0; i--) {
    const value = months.get(keyArray[i]);
    if (i === keyArray.length - 1) {
      months.set(keyArray[i], value + beforeEndDate);
    } else {
      months.set(keyArray[i], value + months.get(keyArray[i + 1]));
    }
  }

  const monthKeys = [...months.keys()].reverse().map((elem) => {
    return elem.slice(0, 3);
  });
  const monthValue = [...months.values()].reverse();

  const trace1 = {
    type: 'bar',
    x: monthKeys,
    y: monthValue,
    marker: {
      color: '#116ACC',
    },
  };
  renderBarChart(document.getElementsByClassName('graphic')[0], [trace1]);
  return prepare;
}
