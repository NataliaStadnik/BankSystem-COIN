import { createTableRow } from '../src/bundles/components/tableRow';
import { arrTransactions } from '../mockDatas/transactionsMocks';
import { createTable } from '../src/bundles/components/table';

describe('Check render table and table-rows', () => {
  const arr = createTableRow(
    arrTransactions,
    '55346305702750800358357025',
    10,
    0,
  );

  it('is correct if transactions not empty', () => {
    const oneElem = `<tr class=" body__row"><td class=" body__cell ">${arrTransactions[0].from}</td><td class=" body__cell body__img--mastercard">${arrTransactions[0].to}</td><td class=" body__cell amount amount--green">+ ${arrTransactions[0].amount} ₽</td><td class=" body__cell">12.10.2024</td></tr>`;
    const amount = arrTransactions.length;
    expect(arr).toBeInstanceOf(Array);
    expect(arr.length).toBe(amount);
    expect(arr[0].outerHTML).toEqual(oneElem);
  });

  it('is correct if transactions empty', () => {
    const arr1 = createTableRow([], '55346305702750800358357025', 10, 0);
    const oneElem =
      '<tr class=" body__row"><td class=" body__cell"></td><div class=" message">История переводов отсутвует</div></tr>';
    expect(arr1).toBeInstanceOf(Array);
    expect(arr1.length).toBe(1);
    expect(arr1[0].outerHTML).toEqual(oneElem);
  });

  it('is correct table render', () => {
    const table = createTable(arrTransactions, '55346305702750800358357025');
    expect(table).toBeInstanceOf(HTMLDivElement);
    arr.forEach((elem) => {
      expect(table.outerHTML.includes(elem.outerHTML)).toBeTruthy();
    });
  });
});
