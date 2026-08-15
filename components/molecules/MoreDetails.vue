<script setup lang="ts">
const { t } = useI18n()
const scheduleIndexes = [0, 1] as const

const marginLefts = [2, 7, 2, 6, 7]
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
        :style="{ marginLeft: `${marginLefts[index]}px` }"
      >
        <div class="hints__index-cont">
          <p class="hints__index">
            {{ index + 1 }}.
          </p>
        </div>

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
    gap: $space-m;
  }

  &__item {
    display: flex;
    gap: $space-s;
    align-items: center;
  }

  &__index-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
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
