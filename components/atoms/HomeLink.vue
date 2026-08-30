<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <NuxtLink
    to="/"
    class="home-link"
  >
    {{ t('navigation.backToHome') }}
  </NuxtLink>
</template>

<style scoped lang="scss">
.home-link {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 20;
  text-decoration: none;
}
</style>
