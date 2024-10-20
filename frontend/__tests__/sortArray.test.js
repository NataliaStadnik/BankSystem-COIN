import { sortArray } from '../src/bundles/utilits/sortArray';
import { arrAccounts } from '../mockDatas/accountsMock';

describe('Check sort array in AllCards', () => {
  it('is correct sort for "balance"', () => {
    expect(sortArray(arrAccounts, 'balance')).toEqual([
      {
        account: '74213041477477406320783754',
        balance: 4633139.85,
        mine: true,
        transactions: [],
      },
      {
        account: '81767161143785044212001232',
        mine: true,
        balance: 20000,
        transactions: [
          {
            date: '2024-10-10T09:44:01.435Z',
            from: '44202480472178304343051178',
            to: '74213041477477406320783754',
            amount: 0,
          },
        ],
      },
      {
        account: '44202480472178304343051178',
        mine: true,
        balance: 0,
        transactions: [
          {
            date: '2024-10-16T08:43:04.015Z',
            from: '35402663875162306018582081',
            to: '74213041477477406320783754',
            amount: 2,
          },
        ],
      },
      {
        account: '71460358641415323481713502',
        mine: true,
        balance: 0,
        transactions: [],
      },
    ]);
  });

  it('is correct sort for "date"', () => {
    expect(sortArray(arrAccounts, 'date')).toEqual([
      {
        account: '44202480472178304343051178',
        balance: 0,
        mine: true,
        transactions: [
          {
            amount: 2,
            date: '2024-10-16T08:43:04.015Z',
            from: '35402663875162306018582081',
            to: '74213041477477406320783754',
          },
        ],
      },
      {
        account: '81767161143785044212001232',
        balance: 20000,
        mine: true,
        transactions: [
          {
            amount: 0,
            date: '2024-10-10T09:44:01.435Z',
            from: '44202480472178304343051178',
            to: '74213041477477406320783754',
          },
        ],
      },
      {
        account: '74213041477477406320783754',
        balance: 4633139.85,
        mine: true,
        transactions: [],
      },
      {
        account: '71460358641415323481713502',
        balance: 0,
        mine: true,
        transactions: [],
      },
    ]);
  });

  it('is correct sort for "account"', () => {
    expect(sortArray(arrAccounts, 'account')).toEqual([
      {
        account: '81767161143785044212001232',
        balance: 20000,
        mine: true,
        transactions: [
          {
            amount: 0,
            date: '2024-10-10T09:44:01.435Z',
            from: '44202480472178304343051178',
            to: '74213041477477406320783754',
          },
        ],
      },
      {
        account: '74213041477477406320783754',
        balance: 4633139.85,
        mine: true,
        transactions: [],
      },
      {
        account: '71460358641415323481713502',
        balance: 0,
        mine: true,
        transactions: [],
      },
      {
        account: '44202480472178304343051178',
        balance: 0,
        mine: true,
        transactions: [
          {
            amount: 2,
            date: '2024-10-16T08:43:04.015Z',
            from: '35402663875162306018582081',
            to: '74213041477477406320783754',
          },
        ],
      },
    ]);
  });
});
