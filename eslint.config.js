import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        Image: 'readonly',
        IntersectionObserver: 'readonly',
        PerformanceObserver: 'readonly',
        CustomEvent: 'readonly',
        btoa: 'readonly',
        gtag: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        alert: 'readonly',
        process: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Event: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off', // Allow console in development
      'prefer-const': 'error',
      'no-var': 'error',
      'no-irregular-whitespace': 'off', // Allow for Spanish content
      'no-useless-escape': 'warn',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.js'],
  },
];
