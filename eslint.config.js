import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-n';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,

  {
    plugins: {
      import: importPlugin,
      prettier: prettier
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'warn',
      'import/no-webpack-loader-syntax': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'warn',
      'import/no-duplicates': 'error',
      'import/no-deprecated': 'warn',
      'import/first': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ],
      'import/newline-after-import': 'error',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',
      'import/prefer-default-export': 'warn'
    }
  },

  {
    plugins: { n: nodePlugin },
    rules: {
      'n/handle-callback-err': ['error', 'err'],
      'n/no-deprecated-api': 'error',
      'n/no-exports-assign': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/no-process-exit': 'off',
      'n/prefer-global/buffer': ['error', 'always'],
      'n/prefer-global/console': ['error', 'always'],
      'n/prefer-global/process': ['error', 'always']
    }
  },

  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: {
      'react/display-name': 'off',
      'react/forbid-prop-types': 'off',
      'react/no-access-state-in-setstate': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-did-mount-set-state': 'error',
      'react/no-did-update-set-state': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-multi-comp': 'off',
      'react/no-redundant-should-component-update': 'error',
      'react/no-render-return-value': 'error',
      'react/no-set-state': 'off',
      'react/no-string-refs': 'error',
      'react/no-typos': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/no-unused-prop-types': 'off',
      'react/no-unused-state': 'off',
      'react/prefer-es6-class': ['error', 'always'],
      'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
      'react/prop-types': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      'react/sort-comp': 'off',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: { react: { version: 'detect' } }
  },

  {
    plugins: { 'jsx-a11y': jsxA11yPlugin },
    rules: jsxA11yPlugin.configs.recommended.rules
  },

  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024
      }
    },

    rules: {
      'spaced-comment': 'off',
      'no-console': 'off',
      'consistent-return': 'off',
      'func-names': 'off',
      'object-shorthand': 'off',
      'no-process-exit': 'off',
      'no-param-reassign': 'off',
      'no-return-await': 'off',
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      'no-plusplus': 'off',
      'prefer-template': 'off',
      'no-alert': 'off',
      'no-var': 'off',
      'prefer-const': 'off',
      'vars-on-top': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-unused-vars': ['off', { argsIgnorePattern: 'req|res|next|val' }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-multi-spaces': 'error',
      'no-proto': 'error',
      'no-prototype-builtins': 'warn',
      'no-return-assign': 'warn',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'no-void': 'error',
      'no-with': 'error',
      radix: 'error',
      yoda: ['error', 'never'],
      strict: ['error', 'never'],
      'no-shadow': 'warn',
      'no-shadow-restricted-names': 'error',
      'no-undef': 'error',
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'dot-location': ['error', 'property'],
      'dot-notation': ['error', { allowKeywords: true }],
      'no-caller': 'error',
      'no-debugger': 'error',
      'no-empty': 'error',
      'no-empty-function': 'warn',
      'no-ex-assign': 'error',
      'no-extend-native': 'warn',
      'no-extra-bind': 'error',
      'no-fallthrough': 'error',
      'no-floating-decimal': 'error',
      'no-global-assign': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-loop-func': 'warn',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'warn',
      'no-new-object': 'error',
      'no-new-wrappers': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-redeclare': 'error',
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      semi: ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'comma-dangle': ['error', 'never'],
      'comma-spacing': ['error', { before: false, after: true }],
      'computed-property-spacing': ['error', 'never'],
      indent: ['error', 2, { SwitchCase: 1, VariableDeclarator: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'linebreak-style': ['error', 'unix'],
      'max-len': [
        'warn',
        120,
        2,
        { ignoreUrls: true, ignoreRegExpLiterals: true, ignoreStrings: true, ignoreTemplateLiterals: true }
      ],
      'new-cap': ['error', { newIsCap: true, capIsNew: true, properties: true }],
      'new-parens': 'error',
      'no-array-constructor': 'error',
      'no-lonely-if': 'error',
      'no-mixed-operators': ['error', { allowSamePrecedence: true }],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-nested-ternary': 'error',
      'no-trailing-spaces': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-newline': ['error', { multiline: true }],
      'object-curly-spacing': ['error', 'always'],
      'one-var': ['error', 'never'],
      'one-var-declaration-per-line': ['error', 'always'],
      'operator-linebreak': ['error', 'before'],
      'padded-blocks': ['error', 'never'],
      'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }]
    }
  },

  {
    ignores: [
      'node_modules/**',
      'assets/**',
      'vendor/**',
      'system/**',
      'application/cache/**',
      'application/logs/**',
      '*.min.js',
      'package-lock.json'
    ]
  }
];
