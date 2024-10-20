import { el } from 'redom';

export function createLoginForm() {
  return el(
    'form',
    {
      class: 'form form__login',
    },
    [
      el(
        'h2',
        {
          class: 'title form__title',
        },
        'Вход в аккаунт',
      ),
      el(
        'div',
        {
          class: 'form__wrap',
        },
        [
          el(
            'label',
            {
              for: 'login',
              class: 'label form__label',
            },
            'Логин',
          ),
          el('input', {
            id: 'login',
            class: 'input-reset input',
            type: 'text',
            placeholder: 'Placeholder',
          }),
        ],
      ),
      el(
        'div',
        {
          class: 'form__wrap',
        },
        [
          el(
            'label',
            {
              for: 'password',
              class: 'label form__label',
            },
            'Пароль',
          ),
          el('input', {
            id: 'password',
            class: 'input-reset input',
            type: 'password',
            placeholder: 'Placeholder',
          }),
        ],
      ),
      el(
        'button',
        {
          class: 'btn-reset btn',
          type: 'submit',
          id: 'log',
        },
        'Войти',
      ),
    ],
  );
}
