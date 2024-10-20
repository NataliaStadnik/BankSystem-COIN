import { el } from 'redom';

export function createNewOrder() {
  return el(
    'form',
    {
      class: 'form order form--set',
    },
    [
      el('div', {
        class: 'card-type',
      }),
      el(
        'h3',
        {
          class: 'title title--midi order__title',
        },
        'Новый перевод',
      ),
      el(
        'div',
        {
          class: 'order__wrap',
        },
        [
          el(
            'label',
            {
              for: 'to',
              class: 'label order__label',
            },
            'Номер счёта получателя',
          ),
          el(
            'div',
            {
              class: 'btn-wrap',
              id: 'card-type',
            },
            [
              el('input', {
                id: 'to',
                name: 'to',
                class: 'input-reset input order__input',
                type: 'number',
                placeholder: 'Placeholder',
              }),
              el('button', {
                class: 'btn-reset choose choose-btn',
                id: 'sort',
              }),
            ],
          ),
        ],
      ),
      el(
        'div',
        {
          class: 'order__wrap',
        },
        [
          el(
            'label',
            {
              for: 'sum',
              class: 'label order__label',
            },
            'Сумма перевода',
          ),
          el('input', {
            id: 'sum',
            name: 'sum',
            class: 'input-reset input order__input',
            type: 'number',
            placeholder: 'Placeholder',
          }),
        ],
      ),
      el(
        'button',
        {
          class: 'btn-reset btn btn--sign order__btn',
          type: 'submit',
        },
        'Отправить',
      ),
    ],
  );
}
