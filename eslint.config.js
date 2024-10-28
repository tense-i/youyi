import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
// pnpm add globals
import globals from 'globals'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },
  {
    name: 'global config',
    languageOptions: {
      globals: {
        ...globals.node
      },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      }
    },
    rules: {
      'no-dupe-class-members': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off'
    }
  },
  // 配置 Vue 规则
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  {
    rules: {
      // Vue specific rules
      // Vue 每行最多一个属性
      'vue/max-attributes-per-line': [
        2,
        {
          singleline: 10,
          multiline: {
            max: 1
          }
        }
      ],
      // Vue 模板中设置 2 个空格缩进
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1, // 属性缩进一个层级
          baseIndent: 1, // 顶级元素缩进一个层级
          closeBracket: 0, // 闭合标签不额外缩进
          alignAttributesVertically: true // 垂直对齐
        }
      ],
      // Vue HTML 关闭标签的换行规则
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never', // 单行时不换行
          multiline: 'always' // 多行时 `>` 号强制换行
        }
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/component-definition-name-casing': ['error', 'PascalCase'], // 代替 vue/name-property-casing
      'vue/no-v-html': 'off',
      // General ESLint rules
      'accessor-pairs': 2,
      'arrow-spacing': [2, { 'before': true, 'after': true }],
      'block-spacing': [2, 'always'],
      'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
      'camelcase': [0, { 'properties': 'always' }],
      'comma-dangle': [2, 'never'],
      'comma-spacing': [2, { 'before': false, 'after': true }],
      'comma-style': [2, 'last'],
      'constructor-super': 2,
      'curly': [2, 'multi-line'],
      'dot-location': [2, 'property'],
      'eol-last': 2,
      'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
      'generator-star-spacing': [2, { 'before': true, 'after': true }],
      'handle-callback-err': [2, '^(err|error)$'],
      'indent': [2, 2, { 'SwitchCase': 1 }],
      'jsx-quotes': [2, 'prefer-single'],
      'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
      'keyword-spacing': [2, { 'before': true, 'after': true }],
      'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }],
      'new-parens': 2,
      'no-array-constructor': 2,
      'no-console': 'off',
      'no-dupe-args': 2,
      'no-dupe-class-members': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-empty-character-class': 2,
      'no-empty-pattern': 2,
      'no-eval': 2,
      'no-extra-bind': 2,
      'no-extra-boolean-cast': 2,
      'no-extra-parens': [2, 'functions'],
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-func-assign': 2,
      'no-implied-eval': 2,
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': 2,
      'no-lone-blocks': 2,
      'no-multi-spaces': 2,
      'no-multiple-empty-lines': [2, { 'max': 1 }],
      'no-native-reassign': 2,
      'no-negated-in-lhs': 2,
      'no-new-object': 2,
      'no-octal': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-regex-spaces': 2,
      'no-return-assign': [2, 'except-parens'],
      'no-self-assign': 2,
      'no-self-compare': 2,
      'no-trailing-spaces': 2,
      'no-undef': 2,
      'no-unexpected-multiline': 2,
      'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],
      'no-useless-call': 2,
      'no-useless-computed-key': 2,
      'no-useless-constructor': 2,
      'no-whitespace-before-property': 2,
      'no-with': 2,
      'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' }}],
      'padded-blocks': [2, 'never'],
      'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'semi': [2, 'never'],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'spaced-comment': [2, 'always', { 'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }],
      'template-curly-spacing': [2, 'never'],
      'use-isnan': 2,
      'valid-typeof': 2,
      'wrap-iife': [2, 'any'],
      'yield-star-spacing': [2, 'both'],
      'yoda': [2, 'never'],
      'prefer-const': 2,
      'object-curly-spacing': [2, 'always', { objectsInObjects: false }],
      'array-bracket-spacing': [2, 'never']
    }
  }
]
