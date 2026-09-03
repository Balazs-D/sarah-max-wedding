<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <NuxtLink
    class="rsvp-link"
    to="/rsvp"
  >

    {{ t('navigation.rsvpLabel') }}
    <!--    <Rsvp class="rsvp-link__image" /> -->
  </NuxtLink>
</template>

<style lang="scss">
.rsvp-link {
  display: block;

  width: min(80%, 450px);
  align-self: center;
  font-family: 'Paris-Forbel', sans-serif;
  color: $color-dark;
  border-radius: $radius-md;
  background-image: radial-gradient(circle, $color-pink-light 15%, $color-pink-light 90%);
  border: 1px solid $color-pink-dark;
  padding: $space-m;
  box-shadow: 0 0 0 $color-pink-dark;
  margin-bottom: $space-xl;
  transition: all 0.2s ease-in-out;
  justify-content: center;
  text-align: center;

  &:hover {
    text-decoration: underline;
    box-shadow: 0 0 10px $color-pink-dark;
  }

  &:hover {
    cursor: pointer;
  }

}
</style>
