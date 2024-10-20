import { prepareData } from '../src/bundles/utilits/barChart/prepareData';
import { arrTransactions } from '../mockDatas/transactionsMocks';

describe('Check datas for bar chart', () => {
  const id = '55346305702750800358357025';

  it('is correct getting objects form', () => {
    const { beforeEndDate, filter6month, months } = prepareData(
      arrTransactions,
      6,
      id,
    );
    expect(beforeEndDate).toBe(0);
    const mnth = Object.fromEntries(months.entries());
    expect(mnth).toEqual({ октябрь: 0 });
    expect(filter6month).toEqual([
      {
        amount: 2222,
        date: '2024-10-11T21:54:00.956Z',
        from: '74213041477477406320783754',
        to: '55346305702750800358357025',
      },
      {
        amount: 222,
        date: '2024-10-11T21:47:10.875Z',
        from: '55346305702750800358357025',
        to: '35402663875162306018582081',
      },
      {
        amount: 22,
        date: '2024-10-11T09:08:07.020Z',
        from: '55346305702750800358357025',
        to: '65612651533776408504464286',
      },
      {
        amount: 200,
        date: '2024-10-10T13:34:02.394Z',
        from: '55346305702750800358357025',
        to: '77034645014415147475674412',
      },
      {
        date: '2024-10-10T09:45:33.361Z',
        from: '74213041477477406320783754',
        to: '55346305702750800358357025',
        amount: 1000,
      },
    ]);
  });
});
