import { createDinamic } from '../src/bundles/components/createDinamic';
import { createHistoryPage } from '../src/bundles/presenters/History/createHistoryPage';
import { arrTransactions } from '../mockDatas/transactionsMocks';

describe('Check blocks for dinamic and history page', () => {
  const expectedHTML = (txt, cls = '') => {
    return `<div class=" dinamic ${cls}" tabindex="0"><h3 class=" title title--midi dinamic__title">${txt}</h3><div class=" graphic"></div></div>`;
  };
  const title = 'Динамика баланса';

  it('is correct dinamic block for card', () => {
    const block = createDinamic(title);
    expect(block).toBeInstanceOf(HTMLDivElement);
    expect(block.outerHTML).toBe(expectedHTML(title));
  });

  const classes1 = 'dinamic__upper dinamic--big';
  const block1 = createDinamic(title, classes1);
  it('is correct dinamic block for history', () => {
    expect(block1).toBeInstanceOf(HTMLDivElement);
    expect(block1.outerHTML).toBe(expectedHTML(title, classes1));
  });

  const classes2 = 'dinamic__bottom dinamic--big';
  const title2 = 'Соотношение входящих исходящих транзакций';
  const block2 = createDinamic(title2, classes2);
  it('is correct correlation block for history', () => {
    expect(block2).toBeInstanceOf(HTMLDivElement);
    expect(block2.outerHTML).toBe(expectedHTML(title2, classes2));
  });

  it('check render history-page', () => {
    const obj = {
      account: '55346305702750800358357025',
      balance: 2778,
      transactions: arrTransactions,
    };
    const main = createHistoryPage(obj, 25);
    expect(main).toBeInstanceOf(HTMLElement);
    expect(main.outerHTML.includes(block1.outerHTML)).toBeTruthy();
    expect(main.outerHTML.includes(block2.outerHTML)).toBeTruthy();
  });
});
