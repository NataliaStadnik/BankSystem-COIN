import { el } from 'redom';
import { createBTN } from '../../components/button-input';

export function createChangeCurrency() {
  return el(
    'form',
    {
      class: 'dinamic dinamic__form',
    },
    [
      [
        el(
          'h2',
          {
            class: 'title title--midi dinamic__title',
          },
          'Обмен валюты',
        ),
        el(
          'div',
          {
            class: 'form-wrap',
          },
          [
            el(
              'div',
              {
                class: 'over-wrap',
              },
              [
                el(
                  'div',
                  {
                    class: 'over-wrap__outer',
                  },
                  [
                    el(
                      'div',
                      {
                        class: 'dinamic__wrap',
                      },
                      [
                        el(
                          'span',
                          {
                            class: 'label dinamic__label',
                          },
                          'Из',
                        ),
                        createBTN('BTC'),
                      ],
                    ),
                    el(
                      'div',
                      {
                        class: 'dinamic__wrap',
                      },
                      [
                        el(
                          'label',
                          {
                            class: 'label dinamic__label',
                          },
                          'в',
                        ),
                        createBTN('ETH'),
                      ],
                    ),
                  ],
                ),

                el(
                  'div',
                  {
                    class: 'dinamic__wrap',
                  },
                  [
                    el(
                      'label',
                      {
                        for: 'sums',
                        class: 'label dinamic__label',
                      },
                      'Сумма',
                    ),
                    el('input', {
                      id: 'sums',
                      class: 'input-reset input',
                      type: 'number',
                      placeholder: '0.1235421',
                    }),
                  ],
                ),
              ],
            ),
            el(
              'button',
              {
                class: 'btn-reset btn',
                type: 'submit',
              },
              'Обменять',
            ),
          ],
        ),
      ],
    ],
  );
}
