<script setup lang="ts">
interface Props {
  text: string
  variant?: 'warning' | 'info' | 'success'
}

const { text, variant = 'warning' } = defineProps<Props>()
</script>

<template>
  <p :class="['bold-p', 'info-text-block', `info-text-block--${variant}`]">
    {{ text }}
  </p>
</template>

<style scoped lang="scss">
.info-text-block {
  padding: $space-s;
  border-radius: 12px;
  border: 1px solid;
  margin: $space-s 0;

  &--warning {
    color: $color-warning;
    border-color: $color-warning;
    background: $color-warning-light;
  }

  //&--info {
  //  color: $color-info;
  //  border-color: $color-info;
  //  background: $color-info-light;
  //}
  //
  //&--success {
  //  color: $color-success;
  //  border-color: $color-success;
  //  background: $color-success-light;
  //}
}
</style>
