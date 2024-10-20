import { el } from 'redom';

export function createChangeBlocksBtn() {
  const btn = el('button', {
    class: 'btn-reset change-btn',
  });

  const main = document.getElementsByClassName('main');
  main[0].prepend(btn);
}
