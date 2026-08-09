import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}).append({
  rules: {
    'vue/multi-word-component-names': 'off',
  },
})
