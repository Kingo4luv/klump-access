module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    amd: true,

  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'import/order': 0,
    'no-trailing-spaces': 1,
    'no-param-reassign': 0,
    'arrow-body-style': 0,
    'no-undef': 0,
    'class-methods-use-this': 0,
    'no-useless-escape': 0,
    'jsx-a11y/href-no-hash': 'off',
    indent: ['error', "tab"],
    camelcase: 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
