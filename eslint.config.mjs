// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import tsParser from '@typescript-eslint/parser';

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: await (async () => {
        const vueParser = await import('vue-eslint-parser');
        return vueParser.default;
      })(),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        parser: tsParser,
        projectService: true,
        tsconfigRootDir: new URL('.', import.meta.url).pathname
      }
    }
  },
  {
    ignores: ['node_modules', '.nuxt', 'dist', 'public'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/html-end-tags': 'error',
      'vue/html-self-closing': 'off',
      'camelcase': 'off',
      'no-irregular-whitespace': 'error'
    }
  }
);
