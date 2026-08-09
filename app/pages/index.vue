<script setup lang="ts">
import ContentBefore from '~~/components/organism/ContentBefore.vue'
</script>

<template>
  <main class="main">
    <ContentBefore />
  </main>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include layout-container;
}
</style>
