<script setup lang="ts">
import { useWeddingPhase } from '~~/composables/useWeddingPhase.ts'
import placeholderImage from '~/assets/images/placeholder.png'
import ContentBlock from '~~/components/molecules/ContentBlock.vue'
import WeddingDayPlan from '~~/components/molecules/WeddingDayPlan.vue'
import AccomodationAndParking from '~~/components/molecules/AccomodationAndParking.vue'
import MoreDetails from '~~/components/molecules/MoreDetails.vue'

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

  <ContentBlock :title="t('weddingDayPlan.title')">
    <WeddingDayPlan />
  </ContentBlock>

  <ContentBlock
    :title="t('accomodation.title')"
    :subtitle="t('accomodation.intro')"
  >
    <AccomodationAndParking />
  </ContentBlock>

  <ContentBlock :title="t('hints.title')">
    <MoreDetails />
  </ContentBlock>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  &__subtext {
    display: flex;
    flex-direction: column;
    gap: $space-s;
    margin: auto;

    @include lg {
      flex-direction: row;
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
