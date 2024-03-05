module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'react-hooks', 'react', '@typescript-eslint', 'import'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalDecorators: true,
      jsx: true,
    },
  },
  rules: {
    quotes: ['error', 'single'],
    semi: [2, 'always'],
    indent: [0, 2],
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
