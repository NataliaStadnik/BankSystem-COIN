import { el } from 'redom';

export function createOneCard(acc, sums, date) {
  return el(
    'li',
    {
      class: 'cards-list__item',
    },
    [
      el(
        'article',
        {
          class: 'card cards-list__card',
        },
        [
          el(
            'div',
            {
              class: 'card__info',
            },
            [
              el(
                'span',
                {
                  class: 'number',
                },
                acc,
              ),
              el(
                'span',
                {
                  class: 'sum',
                },
                sums + ' ₽',
              ),
              el(
                'div',
                {
                  class: 'card__bottom',
                },
                [
                  el(
                    'div',
                    {
                      class: 'card-info',
                    },
                    [
                      el(
                        'h3',
                        {
                          class: 'card__title',
                        },
                        'Последняя транзакция:',
                      ),
                      el(
                        'span',
                        {
                          class: 'card__date',
                        },
                        date,
                      ),
                    ],
                  ),

                  el(
                    'button',
                    {
                      class: 'btn-reset btn card__btn',
                      id: acc,
                    },
                    'Открыть',
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  );
}
