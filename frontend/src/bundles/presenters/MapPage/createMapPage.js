import { el } from 'redom';

export function createMapPage() {
  return el(
    'main',
    {
      class: 'main',
    },
    [
      el(
        'section',
        {
          class: 'map',
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
                  class: 'title map__title',
                },
                'Карта банкоматов',
              ),
              el('div', {
                class: 'map__container',
              }),
            ],
          ),
        ],
      ),
    ],
  );
}
