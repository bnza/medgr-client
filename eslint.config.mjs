import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/no-multiple-template-root': 'off',
    // 'vue/valid-v-slot': ['error', { allowModifiers: true }], // allow vuetify slot modifier
    'vue/html-self-closing': ['error', { html: { void: 'any' } }], // not conflict with prettier
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
})
