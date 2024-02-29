module.exports = {
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'max-line-length': 0,
    'vue/multi-word-component-names': 'off'
  }
}
