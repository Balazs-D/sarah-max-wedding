<script setup lang="ts">
import SeparatorHeart from '~~/components/icons/SeparatorHeart.vue'

const { t } = useI18n()
</script>

<template>
  <NuxtLink
    to="/"
    class="home-link"
  >
    <div class="home-link__cont">
      <p class="home-link__title">Sarah & Max</p>
      <SeparatorHeart class="home-link__curve" />
      <p class="home-link__link">
        {{ t('navigation.backToHome') }}
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.home-link {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  z-index: 20;
  text-decoration: none;
  color: $color-dark;
  transform: translateX(-50%);

  @include md {
    left: 1.5rem;
    transform: none;
  }

  &__cont {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 100px;
    border: 1px solid $color-pink-dark;
    border-radius: $radius-full;
    background: $color-background;

  }

  &:hover {
    color: $color-pink-dark;

    .home-link__title,
    .home-link__link {
      color: $color-pink-dark;
    }
  }

  &__title {
    position: absolute;
    bottom: 52%;
    left: 23%;
    font-family: 'Paris-Forbel', sans-serif;
  }

  &__link {
    position: absolute;
    left: 25%;
    bottom: 28%;
    font-size: $text-s;

  }

  &__curve {
    bottom: 48%;
    left: 4%;
    transform: scale(-1, 1) translate(0%, 50%);
    width: 200px;
    height: auto;
    position: absolute;
    color: $color-text;
    margin: 0 $space-m;
  }
}
</style>
