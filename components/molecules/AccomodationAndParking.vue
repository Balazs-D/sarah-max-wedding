<script setup lang="ts">
type MapType = 'location' | 'hotels' | 'parking'

const config = useRuntimeConfig()

const activeMap = ref<MapType>('location')

const address = '3 Prout Bridge, Beaminster, DT8 3AY, England'

const queries: Record<MapType, string> = {
  location: address,
  hotels: `Hotels near ${address}`,
  parking: `Parkplätze near ${address}`,
}

const mapUrl = computed(() => {
  const mode = activeMap.value === 'location' ? 'place' : 'search'

  return `https://www.google.com/maps/embed/v1/${mode}?key=${config.public.googleMapsApiKey}&q=${encodeURIComponent(
    queries[activeMap.value],
  )}`
})

const { t } = useI18n()

const copied = ref(false)

const copyAddress = async () => {
  await navigator.clipboard.writeText(address)

  copied.value = true

  window.setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <section class="location-map">
    <div class="location-map__navigation">
      <div class="location-map__navigation-buttons">
        <button
          type="button"
          :class="{ active: activeMap === 'location' }"
          @click="activeMap = 'location'"
        >
          {{ t('common.buttonLocation') }}
        </button>

        <button
          type="button"
          :class="{ active: activeMap === 'hotels' }"
          @click="activeMap = 'hotels'"
        >
          {{ t('common.buttonParking') }}
        </button>

        <button
          type="button"
          :class="{ active: activeMap === 'parking' }"
          @click="activeMap = 'parking'"
        >
          Parkplätze
          {{ t('common.buttonAccommodation') }}
        </button>
      </div>
      <button
        type="button"
        class="copy-address-button"
        @click="copyAddress"
      >
        {{ copied ? 'Adresse kopiert ✓' : 'Adresse kopieren' }}
      </button>
    </div>

    <div class="location-map__map">
      <iframe
        :src="mapUrl"
        width="100%"
        height="450"
        style="border: 0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.location-map {
  &__navigation {
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    gap: $space-m;
    flex-direction: column;

    @include md {
      flex-direction: row;
    }

    &-buttons {
      display: flex;
      gap: $space-m;
      flex-direction: column;

      @include md {
        flex-direction: row;
      }
    }

    button {
      padding: 0.75rem 1.25rem;
      border: 1px solid $color-border;
      border-radius: 999px;
      background: $color-surface;
      color: $color-text;
      cursor: pointer;
      font-family: 'Paris-Forbel', sans-serif;

      &.active {
        background: $color-pink-dark;
        border-color: $color-pink-dark;
        color: white;
      }
    }
  }

  &__map {
    overflow: hidden;
    border-radius: 20px;

    iframe {
      display: block;
      width: 100%;
    }
  }
}
</style>
