import { el } from 'redom';

export function createLoader() {
  const loader = el(
    'div',
    {
      class: 'preloader',
    },
    [
      el('span', {
        class: 'loader',
      }),
    ],
  );
  if (document.body.getElementsByClassName('preloader').length === 0) {
    document.body.classList.add('scroll-none');
    document.body.prepend(loader);
  }
}

export function deleteLoader() {
  if (document.body.getElementsByClassName('preloader').length !== 0) {
    document.body.classList.remove('scroll-none');
    document.body.getElementsByClassName('preloader')[0].remove();
  }
}
