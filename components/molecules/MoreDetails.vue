<script setup lang="ts">
const { t } = useI18n()
const scheduleIndexes = [0, 1] as const
</script>

<template>
  <section class="hints">
    <p
      v-if="t('weddingDayPlan.intro')"
      class="hints__intro"
    >
      {{ t('hints.intro') }}
    </p>
    <ul class="hints__schedule">
      <li
        v-for="index in scheduleIndexes"
        :key="index"
        class="hints__item"
      >
        <p>{{ index + 1 }}.</p>
        <p class="wedding-day-plan__text">
          {{ t(`hints.data.${index}`) }}
        </p>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.hints {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  align-self: stretch;

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
    gap: $space-s;
  }
}
</style>
