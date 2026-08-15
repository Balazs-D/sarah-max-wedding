<script lang="ts" setup>
import { computed } from 'vue'
import weddingIntroDe from '~/assets/svgs/wedding_intro_de.svg'
import weddingIntroEn from '~/assets/svgs/wedding_into_en.svg'

const { locale, t } = useI18n()

const introImage = computed(() => {
  return locale.value === 'en'
    ? weddingIntroEn
    : weddingIntroDe
})

const introLabel = computed(() => t('home.title'))

const introStyle = computed(() => ({
  '--intro-mask': `url("${introImage.value}")`,
}))
</script>

<template>
  <div class="home-intro">
    <div
      class="home-intro__image"
      :style="introStyle"
      role="img"
      :aria-label="introLabel"
    />
  </div>
</template>

<style scoped lang="scss">
.home-intro {
  width: 100%;
  margin: 40px 0 40px 0;
  padding: 0 $space-xl;

  @include md {
    margin: 100px 0 0 0;
    padding: 0;
  }

  &__image {
    width: 100%;
    color: $color-text;
    aspect-ratio: 1668 / 364;
    background-color: currentColor;
    -webkit-mask-image: var(--intro-mask);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: contain;

    mask-image: var(--intro-mask);
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
  }

}
</style>
