<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, te } = useI18n()

// This drives the loop and ensures clean, safe template keys
const scheduleIndexes = [0, 1, 2, 3] as const
</script>

<template>
  <section class="wedding-day-plan">
    <!-- te() checks if the key exists and has content before rendering -->
    <p
      v-if="te('weddingDayPlan.intro') && t('weddingDayPlan.intro')"
      class="wedding-day-plan__intro"
    >
      {{ t('weddingDayPlan.intro') }}
    </p>

    <ul class="wedding-day-plan__schedule">
      <li
        v-for="index in scheduleIndexes"
        :key="index"
        class="wedding-day-plan__item"
      >
        <p class="wedding-day-plan__time">
          {{ t(`weddingDayPlan.schedule.${index}.time`) }}
        </p>

        <div class="wedding-day-plan__content">
          <p class="wedding-day-plan__event">
            {{ t(`weddingDayPlan.schedule.${index}.event`) }}
          </p>

          <!-- Conditionally hides the subtext paragraph if the string is empty -->
          <p
            v-if="t(`weddingDayPlan.schedule.${index}.subtext`)"
            class="wedding-day-plan__subtext"
          >
            {{ t(`weddingDayPlan.schedule.${index}.subtext`) }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.wedding-day-plan {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  align-self: stretch;

  &__intro,
  &__time,
  &__event,
  &__subtext {
    margin: 0;
  }

  &__schedule {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: $space-s;
    align-items: flex-start;
    padding: $space-m $space-l;
    border-bottom: 1px dashed $color-pink-light;

    @include md {
      display: grid;
      grid-template-columns: 5fr 5fr;
      gap: $space-xl;
      align-items: start;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-s;
  }

  &__time {
    @include md {
      text-align: end;
    }
  }

  &__event {
    color: $color-text;
    font-weight: 700;

  }

  &__subtext {
    color: $color-text;
    font-style: italic;
  }
}
</style>
