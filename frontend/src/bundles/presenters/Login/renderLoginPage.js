import { el } from 'redom';
import { createLoginForm } from './createLoginForm';

export function renderLoginPage() {
  return el(
    'main',
    {
      class: 'main',
    },
    [
      el(
        'div',
        {
          class: 'login-wrap',
        },
        [
          el(
            'div',
            {
              class: 'container',
            },
            [createLoginForm()],
          ),
        ],
      ),
    ],
  );
}
