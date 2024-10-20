import globals from 'globals';
import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      jest,
      eslintConfigPrettier,
    },
    rules: {
      ...jest.configs.recommended.rules,
      'no-var': 'error',
      'no-undef': 'off',
    },
  },
];
