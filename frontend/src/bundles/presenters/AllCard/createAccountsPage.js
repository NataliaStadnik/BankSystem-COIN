import { el } from 'redom';
import { createOneCard } from './createOneCard';
import { createBTN } from '../../components/button-input';
import { parseDate } from '../../utilits/parseDate';

export function createAccountsPage(lst) {
  const cardArr = [];

  lst.forEach((elem) => {
    let newDate;
    if (elem.transactions[0]) {
      newDate = parseDate(elem.transactions[0].date, 'long');
    }
    cardArr.push(createOneCard(elem.account, elem.balance, newDate));
  });

  return el(
    'main',
    {
      class: 'main',
    },
    [
      el(
        'section',
        {
          class: 'accounts',
        },
        [
          el(
            'div',
            {
              class: 'container accounts__container',
            },
            [
              el(
                'div',
                {
                  class: 'upper accounts__upper',
                },
                [
                  el(
                    'h2',
                    {
                      class: 'title title__accounts',
                    },
                    'Ваши счета',
                  ),
                  createBTN('Сортировка'),
                  el(
                    'button',
                    {
                      class: 'btn-reset btn btn--sign',
                      id: 'create-btn',
                    },
                    'Создать новый счёт',
                  ),
                ],
              ),
              el(
                'ul',
                {
                  class: 'list-reset cards-list',
                },
                cardArr,
              ),
            ],
          ),
        ],
      ),
    ],
  );
}
