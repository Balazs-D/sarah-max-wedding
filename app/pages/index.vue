<script setup lang="ts">
import ContentBefore from '~~/components/organism/ContentBefore.vue'
import HomeIntro from '~~/components/molecules/HomeIntro.vue'
import RsvpLink from '~~/components/atoms/RsvpLink.vue'
</script>

<template>
  <main class="main">
    <HomeIntro />
    <ContentBefore />
    <RsvpLink />
  </main>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @include layout-container;
}
</style>
