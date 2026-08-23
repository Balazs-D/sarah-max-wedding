<script setup lang="ts">
const { t, tm, rt } = useI18n()
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
        v-for="(item, index) in tm('hints.data')"
        :key="index"
        class="hints__item"
      >
        <div class="hints__index-cont">
          <p class="hints__index">
            {{ index + 1 }}.
          </p>
        </div>

        <p class="wedding-day-plan__text">
          {{ rt(item as any) }}
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
    gap: $space-xl;
  }

  &__item {
    display: flex;
    gap: $space-xl;
    align-items: flex-start;
  }

  &__index-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 35px;
    min-width: 35px;
    height: 35px;
    background-color: $color-pink-light;
    border-radius: 999px;
  }

  &__index {
    font-size: $text-xl;
    font-family: 'Cheese-Milky', sans-serif;
  }
}
</style>
