import { el } from 'redom';
import { createTable } from '../../components/table';
import { createDinamic } from '../../components/createDinamic';

export function createHistoryPage(
  { account, balance, transactions },
  rowAmount,
) {
  return el(
    'main',
    {
      class: 'main',
    },
    [
      el(
        'section',
        {
          class: 'history-section',
        },
        [
          el(
            'div',
            {
              class: 'container history-section__container',
            },
            [
              el(
                'div',
                {
                  class: 'top history-section__top',
                },
                [
                  el(
                    'div',
                    {
                      class: 'left',
                    },
                    [
                      el(
                        'h2',
                        {
                          class: 'title history-section__title',
                        },
                        'История баланса',
                      ),
                      el(
                        'span',
                        {
                          class: 'card-number',
                        },
                        '№ ' + account,
                      ),
                    ],
                  ),
                  el(
                    'div',
                    {
                      class: 'right',
                    },
                    [
                      el(
                        'button',
                        {
                          class: 'btn-reset btn btn--sign',
                          id: 'back-return',
                        },
                        'Вернуться назад',
                      ),
                      el(
                        'div',
                        {
                          class: 'balance',
                        },
                        [
                          el(
                            'h3',
                            {
                              class: 'title--midi',
                            },
                            'Баланс',
                          ),
                          el(
                            'span',
                            {
                              class: 'balance__sum',
                            },
                            balance + ' ₽',
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
              el(
                'div',
                {
                  class: 'blocks',
                },
                [
                  createDinamic(
                    'Динамика баланса',
                    'dinamic__upper dinamic--big',
                  ),
                  createDinamic(
                    'Соотношение входящих исходящих транзакций',
                    'dinamic__bottom dinamic--big',
                  ),
                  createTable(transactions, account, rowAmount),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  );
}
