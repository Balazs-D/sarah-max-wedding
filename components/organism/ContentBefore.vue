<script setup lang="ts">
import { useWeddingPhase } from '~~/composables/useWeddingPhase.ts'
import placeholderImage from '~/assets/images/placeholder.png'
import ContentBlock from '~~/components/molecules/ContentBlock.vue'

const { t } = useI18n()
const { phase, events } = useWeddingPhase()
</script>

<template>
  <div
    v-if="phase === 'before'"
    class="content"
  >
    <h1 class="content__heading">
      {{ t('home.title') }}
    </h1>

    <div class="content__subtext">
      <div
        v-for="(event, number) in events"
        :key="event.beforeKey"
        class="content__events"
      >
        <div
          :class="number === 0 && events.length !== 0 && 'content__event-separator'"
          class="content__event"
        >
          <p>{{ t(event.beforeKey) }}</p>
          <p>{{ t(event.untilKey, { days: event.daysLeft }) }}</p>
        </div>
      </div>
    </div>

    <img
      :src="placeholderImage"
      alt="Placeholder"
      class="content__image"
    >
  </div>

  <ContentBlock :title="t('navigation.story')">
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </ContentBlock>

  <ContentBlock :title="t('navigation.locations')">
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </ContentBlock>

  <ContentBlock :title="t('navigation.germany')">
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </ContentBlock>

  <ContentBlock :title="t('navigation.england')">
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </ContentBlock>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  &__heading {
    padding: $space-xl * 2 0;
  }

  &__subtext {
    display: flex;
    flex-direction: column;
    gap: $space-s;
    margin: auto;

    @include lg {
      flex-direction: row;
    }
  }

  &__event-separator {
    border-bottom: 1px solid $color-muted;

    @include lg {
      border-bottom: 0;
      border-right: 1px solid $color-muted;
    }
  }

  &__events {
    display: flex;
    flex-direction: column;
    gap: $space-s;
  }

  &__event {
    padding: $space-xl;
  }

  &__separator {
    height: 100%;
    width: 2px;
    background: $color-text
  }

  &__image {
    width: 100%;
    height: auto;
    margin: auto;
    padding-top: $space-xl;

    @include lg {
      width: 50%;

    }
  }
}
</style>
