<script setup lang="ts">
import CurvesIcon from '~~/components/icons/CurvesIcon.vue'

interface Props {
  title: string
  subtitle?: string
}

const { title, subtitle } = defineProps<Props>()
</script>

<template>
  <div class="content-block">
    <div class="content-block__header">
      <div class="content-block__title">
        <CurvesIcon class="content-block__curve" />
        <h2 class="content-block__title-tag">
          {{ title }}
        </h2>
        <CurvesIcon class="content-block__curve content-block__curve--reverted" />
      </div>

      <p v-if="subtitle">
        {{ subtitle }}
      </p>
    </div>

    <div class="content-block__slot">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-block {
  padding-top: $space-l;
  padding-bottom: $space-l;

  @include layout-container;

  @include lg {
    padding-top: $space-xl * 2;
    padding-bottom: $space-xl * 2;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: $space-s;
    align-items: center;
  }

  &__title {
    display: flex;
    flex-direction: row;
    margin: $space-m auto;
  }

  &__title-tag {
    margin: 0 $space-s;
    color: $color-heading;

    @include lg {
      margin: 0 $space-xl;
    }
  }

  &__curve {
    width: 75px;
    height: auto;
    position: relative;
    bottom: 0;
    color: $color-heading;

    &--reverted {
      transform: scale(-1, 1);
    }

    @include lg {
      width: 125px;
      bottom: 8px;
    }
  }

  &__slot {
    padding: 0 $space-m;

    @include lg {
      padding: 0;

    }
  }
}
</style>
