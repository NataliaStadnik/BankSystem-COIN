import { el } from 'redom';

export function createSelectFrame(arr) {
  const listArr = [];
  const keys = Object.keys(arr);
  for (let i = 0; i < keys.length; i++) {
    listArr.push(
      el(
        'li',
        {
          class: 'select-list__item',
        },
        [
          el(
            'button',
            {
              class: 'select-list__btn',
              id: keys[i],
            },
            arr[keys[i]],
          ),
        ],
      ),
    );
  }

  return el(
    'div',
    {
      class: 'frame',
    },
    [
      el(
        'ul',
        {
          class: 'list-reset select-list',
        },
        listArr,
      ),
    ],
  );
}
