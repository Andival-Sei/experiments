module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
}
