import { el, mount, unmount } from 'redom';

export function addErrorMessage(text, elem) {
  const errorSpan = el(
    'span',
    {
      class: 'error',
    },
    text,
  );
  hasError(elem);
  elem.classList?.remove('correct-form');
  elem.classList.add('error--red');
  mount(elem.parentNode, errorSpan, elem.parentNode.firstChild);
}

export function hasError(elem) {
  if (elem.parentNode.children[0].className === ' error') {
    elem.classList.remove('error--red');
    unmount(elem.parentNode, elem.parentNode.children[0]);
  }
}
