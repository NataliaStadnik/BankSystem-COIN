import { el, mount } from 'redom';

export function createEmptyMessage(text, container) {
  const render = el(
    'div',
    {
      class: 'message',
    },
    text,
  );
  mount(container, render);
}
