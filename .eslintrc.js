module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'endOfLine': 'off',
    'no-console': 'error',
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal'],
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'external',
            'position': 'before'
          }
        ],
        'pathGroupsExcludedImportTypes': ['react'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }
    ]
  },
  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
        'project': './tsconfig.json'
      },
      'alias': {
        'map': [
          ['auth', './src/auth/*'],
          ['src', './src'],
          ['blog', './src/blog'],
          ['chatWebSockets', './src/chatWebSockets'],
          ['utils', './src/utils']
        ],
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
