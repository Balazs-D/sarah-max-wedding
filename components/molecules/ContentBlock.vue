<script setup lang="ts">
import SeparatorHeart from '~~/components/icons/SeparatorHeart.vue'
import Heart from '~~/components/icons/Heart.vue'

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
        <SeparatorHeart class="content-block__curve" />
        <Heart class="content-block__heart" />
        <h2 class="content-block__title-tag">
          {{ title }}
        </h2>
        <Heart class="content-block__heart content-block__heart--reverted" />

        <SeparatorHeart class="content-block__curve content-block__curve--reverted" />
      </div>

      <p
        v-if="subtitle"
        class="content-block__subtitle"
      >
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
  width: 100%;
  padding-top: $space-l;
  padding-bottom: $space-l;

  @include layout-container(false);

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

  &__subtitle {
    padding: $space-s 0;
    margin: 0;
    color: $color-text;
    font-family: Secondary-Medium, sans-serif;
    text-align: center;

    @include lg {
      padding: $space-xl 0;
    }
  }

  &__title {
    display: flex;
    flex-direction: row;
    margin: $space-m auto;
  }

  &__title-tag {
    margin: 0 $space-m;
    color: $color-text;
    text-align: center;
    width: fit-content;

    @include md {
      margin: 0 $space-xl;
    }
  }

  &__curve {
    width: 50px;
    height: auto;
    position: relative;
    bottom: 0;
    color: $color-text;
    margin: 0 $space-m;
    display: none;

    &--reverted {
      transform: scale(-1, 1);
    }

    @include lg {
      display: block;
      width: 125px;
      bottom: 0;
    }
  }

  &__heart {
    width: 40px;
    height: auto;
    position: relative;
    bottom: 0;
    color: $color-text;
    margin: 0 $space-m;

    &--reverted {
      transform: scale(-1, 1);
    }

    @include lg {
      display: none;

      width: 125px;
      bottom: 0;
    }
  }

  &__slot {
    @include layout-container;
    padding: 0 $space-s;

    @include lg {
      padding: 0;
    }
  }
}
</style>
