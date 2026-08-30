<script setup lang="ts">
import { useWeddingPhase } from '~~/composables/useWeddingPhase.ts'
import placeholderImage from '~/assets/images/hotel.png'
import sarahAndMaxImage from '~/assets/images/intro.png'
import ContentBlock from '~~/components/molecules/ContentBlock.vue'
import WeddingDayPlan from '~~/components/molecules/WeddingDayPlan.vue'
import AccomodationAndParking from '~~/components/molecules/AccomodationAndParking.vue'
import MoreDetails from '~~/components/molecules/MoreDetails.vue'
import RsvpLink from '~~/components/atoms/RsvpLink.vue'

const { t, tm, rt } = useI18n()
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
    <img
      :src="sarahAndMaxImage"
      alt="Sarah and Max"
      class="content__main-image"
    >
    <div class="content__subtext">
      <div
        v-if="events[0]"
        class="content__events"
      >
        <div class="content__event">
          <p>{{ t(events[0].beforeKey) }}</p>
          <p>{{ t(events[0].untilKey, { days: events[0].daysLeft }) }}</p>
        </div>
        <a
          href="https://theollerod.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
          class="content__location"
        >
          <h3>
            {{ t(events[0].location) }}
          </h3>
        </a>
        <p class="content__location-address">
          {{ t(events[0].address) }}
        </p>
      </div>
    </div>

    <img
      :src="placeholderImage"
      alt="Placeholder"
      class="content__image"
    >

    <div class="content__welcome-text">
      <p
        v-for="(line, index) in tm('home.welcome_text')"
        :key="`welcome-line-${index}`"
      >
        {{ rt(line as any) }}
      </p>
    </div>
    <RsvpLink />
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

  &__heading {
    margin-bottom: $space-xl;
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

  &__main-image {
    width: 240vw;
    max-width: none;
    height: auto;
    margin-left: calc(50% - 120vw);
    margin-right: calc(50% - 120vw);

    @include md {
      width: 100vw;
      margin-left: calc(50% - 50vw);
      margin-right: calc(50% - 50vw);
    }
  }

  &__location {
    color: $color-text;

    h3 {
      margin: 0;
    }

    &:hover {
      color: $color-pink-dark;
    }
  }

  &__welcome-text {
    padding: $space-xl 0;
    gap: $space-s;
    display: flex;
    flex-direction: column;

    & :nth-child(1) {
      font-family: 'Paris-Forbel', sans-serif;
      font-size:$text-xl;
      font-weight: bold;
      padding: $space-xl 0;
    }

    & :nth-last-child(1) {
      font-size: $text-l;
      font-weight: bold;
      padding: $space-xl 0;
    }

    & > p {
      margin: 0;
    }
  }

}
</style>
