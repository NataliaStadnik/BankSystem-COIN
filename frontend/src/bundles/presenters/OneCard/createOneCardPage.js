import { el } from 'redom';
import { createNewOrder } from './createNewOrder';
import { createDinamic } from '../../components/createDinamic';
import { createTable } from '../../components/table';

export function createOneCardPage(num, sums, transactions) {
  return el(
    'main',
    {
      class: 'main',
    },
    [
      el(
        'section',
        {
          class: 'details',
        },
        [
          el(
            'div',
            {
              class: 'container details__container',
            },
            [
              el(
                'div',
                {
                  class: 'top details__top',
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
                          class: 'title details__title',
                        },
                        'Просмотр счёта',
                      ),
                      el(
                        'span',
                        {
                          class: 'card-number',
                        },
                        '№ ' + num,
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
                            sums + ' ₽',
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
                  el(
                    'div',
                    {
                      class: 'blocks__upper',
                    },
                    [createNewOrder(), createDinamic('Динамика баланса')],
                  ),
                  createTable(transactions, num, 10, true),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  );
}
