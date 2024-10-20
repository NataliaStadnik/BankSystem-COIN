import { createEmptyMessage } from '../emptyMessage';
import { oneBarChart } from './oneBarChart';
import { prepareData } from './prepareData';
import { renderBarChart } from './renderBarChart';

export function doubleBarChart(arr, mnthCount, id) {
  const containers = document.getElementsByClassName('graphic')[1];
  const firstResult = oneBarChart(arr, mnthCount, id);

  if (firstResult === undefined) {
    createEmptyMessage(
      'Соотношение входящих исходящих транзакций отсутвует',
      containers,
    );
    return;
  }

  const newDatas = prepareData(arr, mnthCount, id);
  const filter6month = newDatas.filter6month;
  const months = newDatas.months;

  for (let key of months.keys()) {
    months.set(key, {
      in: 0,
      out: 0,
    });
  }

  filter6month.forEach((elem) => {
    const mnth = new Date(elem.date).toLocaleDateString('ru-RU', {
      month: 'long',
    });
    if (elem.to === id) {
      months.get(mnth)['in'] += elem.amount;
    } else {
      months.get(mnth)['out'] += elem.amount;
    }
  });

  const monthKeys = [...months.keys()].reverse().map((elem) => {
    return elem.slice(0, 3);
  });
  const monthValueIn = [...months.values()].reverse().map((elem) => {
    return Math.round(elem['in']);
  });

  const monthValueOut = [...months.values()].reverse().map((elem) => {
    return elem['out'];
  });

  const trace1 = {
    x: monthKeys,
    y: monthValueIn,
    marker: {
      color: '#76CA66',
    },
    type: 'bar',
  };

  const trace2 = {
    x: monthKeys,
    y: monthValueOut,
    marker: {
      color: '#FD4E5D',
    },
    type: 'bar',
  };

  const data = [trace2, trace1];
  renderBarChart(containers, data, {
    barmode: 'stack',
  });
}
