<script setup lang="ts">
import Rsvp from '~~/components/icons/Rsvp.vue'
</script>

<template>
  <NuxtLink
    class="rsvp-link"
    to="/rsvp"
  >
    <Rsvp class="rsvp-link__image" />
  </NuxtLink>
</template>

<style lang="scss">
.rsvp-link {
  display: block;
  width: min(100%, 450px);
  align-self: center;
  border: 1px solid transparent;
  background-image: radial-gradient(circle, transparent 0%, transparent 100%);
  font-family: 'Paris-Forbel', sans-serif;
  color: $color-text;
  text-decoration: underline;
  border-radius: $radius-md;

  &:hover {
    background-image: radial-gradient(circle, $color-pink-light 15%, transparent 90%);
    border: 1px solid $color-pink-dark;

  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
  }

  &:hover {
    color: $color-pink-dark;
    cursor: pointer;
  }

}
</style>
