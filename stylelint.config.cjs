module.exports = {
  root: true,
  customSyntax: 'postcss-scss',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-prettier/recommended',
  ],
  ignoreFiles: ['dist/**/*', 'coverage/**/*', 'node_modules/**/*'],
  rules: {
    'color-hex-length': 'short',
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        resolveNestedSelectors: true,
        message: 'Используй kebab-case для имён CSS-классов.',
      },
    ],
    'scss/load-partial-extension': 'never',
    'scss/dollar-variable-pattern': [
      '^[_a-z][a-z0-9-]*$',
      {
        message: 'Используй kebab-case для SCSS переменных.',
      },
    ],
    'scss/percent-placeholder-pattern': [
      '^[a-z][a-z0-9-]*$',
      {
        message: 'Именуй плейсхолдеры в kebab-case.',
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreSelectors: [':global'],
        ignoreProperties: ['composes'],
      },
    ],
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'value-keyword-case': null,
    'rule-empty-line-before': null,
    'no-empty-source': null,
  },
  overrides: [
    {
      files: ['**/*.module.scss'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
}
