import { el } from 'redom';
import { createChangeCurrency } from './createChangeCurrency';

export function createCurrencyPage(myCurr) {
  return el(
    'main',
    {
      class: 'main',
    },
    [
      el(
        'section',
        {
          class: 'currency',
        },
        [
          el(
            'div',
            {
              class: 'container',
            },
            [
              el(
                'h2',
                {
                  class: 'title currency__title',
                },
                'Валютный обмен',
              ),
              el(
                'div',
                {
                  class: 'wrapper',
                },
                [
                  el(
                    'div',
                    {
                      class: 'left-part',
                    },
                    [myCurr, createChangeCurrency()],
                  ),
                  el(
                    'div',
                    {
                      class: 'dinamic-block',
                    },
                    [
                      el(
                        'h3',
                        {
                          class: 'title title--midi dinamic-block__title',
                        },
                        'Изменение курсов в реальном времени',
                      ),
                    ],
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
