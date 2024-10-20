import { createRow } from '../components/row';
import { el } from 'redom';

export function openWebSocket() {
  const socketObject = {};
  const renderRows = [];
  let socket = new WebSocket('ws://localhost:3000/currency-feed');

  socket.onmessage = function (event) {
    const dataParse = JSON.parse(event.data);

    if (dataParse.type === 'EXCHANGE_RATE_CHANGE') {
      const key = `${dataParse.from}/${dataParse.to}`;
      socketObject[key] = [dataParse.rate, dataParse.change];
    }

    renderRows.length = 0;
    for (let elem in socketObject) {
      renderRows.push(createRow(elem, ...socketObject[elem]));
    }

    const lstRender = el(
      'ul',
      {
        class: 'list-reset currency-list',
        id: 'currency-dinamic',
      },
      renderRows,
    );

    const block = document.getElementsByClassName('dinamic-block');
    if (block[0].childElementCount === 2) {
      block[0].lastChild.remove();
    }
    block[0].append(lstRender);
  };

  socket.onerror = function (error) {
    console.log(error);
  };
  return socket;
}
