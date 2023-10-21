module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard-with-typescript',
    'prettier',
  ],
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['metro.config.js', 'babel.config.js', '.eslintrc.js'],
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'array-callback-return': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/key-spacing': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'no-restricted-exports': [
      'error',
      {'restrictDefaultExports': {'namespaceFrom': true, 'namedFrom': true}},
    ],
  },
}
