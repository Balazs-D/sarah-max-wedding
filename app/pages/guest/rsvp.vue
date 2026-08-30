<script setup lang="ts">
import HomeLink from '~~/components/atoms/HomeLink.vue'
import InfoTextBlock from '~~/components/atoms/InfoTextBlock.vue'

const { t } = useI18n()

definePageMeta({
  middleware: 'guest-auth',
})

type GuestPerson = {
  firstName: string
  lastName: string | null
}

type GuestSessionResponse = {
  authenticated: boolean
  guest: {
    id: string
    person1: GuestPerson
    person2: GuestPerson | null
    person3: GuestPerson | null
    person4: GuestPerson | null
  }
}

type Rsvp = {
  person_1_attending: boolean | null
  person_2_attending: boolean | null
  person_3_attending: boolean | null
  person_4_attending: boolean | null
  dietary_requirements: string | null
  allergies: string | null
  needs_accommodation: boolean
  message: string | null
  submitted_at: string | null
  updated_at: string | null
}

type RsvpResponse = {
  rsvp: Rsvp | null
}

const person1Attending = ref<boolean | null>(null)
const person2Attending = ref<boolean | null>(null)
const person3Attending = ref<boolean | null>(null)
const person4Attending = ref<boolean | null>(null)

const dietaryRequirements = ref('')
const allergies = ref('')
const needsAccommodation = ref(false)
const message = ref('')

const saving = ref(false)
const submitError = ref('')
const submitted = ref(false)

const {
  data: session,
  error: sessionError,
} = await useFetch<GuestSessionResponse>(
  '/api/guest/session',
)

if (sessionError.value) {
  throw createError({
    status: 401,
    statusText: 'Unauthorized',
  })
}

const guest = computed(() => session.value?.guest ?? null)

const {
  data: rsvpResponse,
  error: rsvpLoadError,
} = await useFetch<RsvpResponse>(
  '/api/rsvp',
)

if (rsvpLoadError.value) {
  console.error(
    'Could not load RSVP:',
    rsvpLoadError.value,
  )
}

if (rsvpResponse.value?.rsvp) {
  const rsvp = rsvpResponse.value.rsvp

  person1Attending.value
    = rsvp.person_1_attending

  person2Attending.value
    = rsvp.person_2_attending

  person3Attending.value
    = rsvp.person_3_attending

  person4Attending.value
    = rsvp.person_4_attending

  dietaryRequirements.value
    = rsvp.dietary_requirements ?? ''

  allergies.value
    = rsvp.allergies ?? ''

  needsAccommodation.value
    = rsvp.needs_accommodation ?? false

  message.value
    = rsvp.message ?? ''
}

const canSubmit = computed(() => {
  if (!guest.value) {
    return false
  }

  if (person1Attending.value === null) {
    return false
  }

  if (
    guest.value.person2
    && person2Attending.value === null
  ) {
    return false
  }

  if (
    guest.value.person3
    && person3Attending.value === null
  ) {
    return false
  }

  if (
    guest.value.person4
    && person4Attending.value === null
  ) {
    return false
  }

  return true
})

const formatGuestName = (person: GuestPerson) =>
  [person.firstName, person.lastName]
    .filter(Boolean)
    .join(' ')

const submitRsvp = async () => {
  if (!canSubmit.value) {
    return
  }

  saving.value = true
  submitted.value = false
  submitError.value = ''

  try {
    await $fetch('/api/rsvp', {
      method: 'POST',

      body: {
        person_1_attending:
        person1Attending.value,

        person_2_attending:
            guest.value?.person2
              ? person2Attending.value
              : null,

        person_3_attending:
            guest.value?.person3
              ? person3Attending.value
              : null,

        person_4_attending:
            guest.value?.person4
              ? person4Attending.value
              : null,

        dietary_requirements:
            dietaryRequirements.value.trim() || null,

        allergies:
            allergies.value.trim() || null,

        needs_accommodation:
        needsAccommodation.value,

        message:
            message.value.trim() || null,
      },
    })

    submitted.value = true
  }
  catch (error) {
    console.error('RSVP SAVE ERROR:', error)

    submitError.value = t('rsvp.error')
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <main
    v-if="guest"
    class="rsvp"
  >
    <HomeLink />

    <header class="rsvp__header">
      <h1>
        {{ t('rsvp.greeting', { name: guest.person1.firstName }) }}
      </h1>

      <p>
        {{ t('rsvp.intro') }}
      </p>
      <InfoTextBlock :text="t('rsvp.infoHint')" />
    </header>

    <form
      class="rsvp__form"
      @submit.prevent="submitRsvp"
    >
      <section class="rsvp__section">
        <h2>{{ t('rsvp.attendance.title') }}</h2>

        <article class="rsvp-person">
          <h3>
            {{ formatGuestName(guest.person1) }}
          </h3>

          <div class="rsvp-person__options">
            <button
              type="button"
              class="button rsvp-person__option"
              :class="{
                'rsvp-person__option--active rsvp-person__option--active-positive':
                  person1Attending === true,
              }"
              @click="person1Attending = true"
            >
              {{ t('rsvp.attendance.accept') }}
            </button>

            <button
              type="button"
              class="button rsvp-person__option"
              :class="{
                'rsvp-person__option--active rsvp-person__option--active-negative':
                  person1Attending === false,
              }"
              @click="person1Attending = false"
            >
              {{ t('rsvp.attendance.decline') }}
            </button>
          </div>
        </article>

        <article
          v-if="guest.person2"
          class="rsvp-person"
        >
          <h3>
            {{ formatGuestName(guest.person2) }}
          </h3>

          <div class="rsvp-person__options">
            <button
              type="button"
              class="button rsvp-person__option"
              :class="{
                'rsvp-person__option--active rsvp-person__option--active-positive':
                  person2Attending === true,
              }"
              @click="person2Attending = true"
            >
              {{ t('rsvp.attendance.accept') }}
            </button>

            <button
              type="button"
              class="button rsvp-person__option"
              :class="{
                'rsvp-person__option--active rsvp-person__option--active-negative':
                  person2Attending === false,
              }"
              @click="person2Attending = false"
            >
              {{ t('rsvp.attendance.decline') }}
            </button>
          </div>
        </article>

        <article
          v-if="guest.person3"
          class="rsvp-person"
        >
          <h3>
            {{ formatGuestName(guest.person3) }}
          </h3>

          <div class="rsvp-person__options">
            <button
              type="button"
              class="button rsvp-person__option"
              :class="{
                'rsvp-person__option--active rsvp-person__option--active-positive':
                  person3Attending === true,
              }"
              @click="person3Attending = true"
            >
              {{ t('rsvp.attendance.accept') }}
            </button>

            <button
              type="button"
              class="button rsvp-person__option"
              :class="{
                'rsvp-person__option--active rsvp-person__option--active-negative':
                  person3Attending === false,
              }"
              @click="person3Attending = false"
            >
              {{ t('rsvp.attendance.decline') }}
            </button>
          </div>
        </article>

        <article
          v-if="guest.person4"
          class="rsvp-person"
        >
          <h3>
            {{ formatGuestName(guest.person4) }}
          </h3>

          <div class="rsvp-person__options">
            <button
              type="button"
              class="button rsvp-person__option"
              :class="{
                'rsvp-person__option--active rsvp-person__option--active-positive':
                  person4Attending === true,
              }"
              @click="person4Attending = true"
            >
              {{ t('rsvp.attendance.accept') }}
            </button>

            <button
              type="button"
              class="button rsvp-person__option"
              :class="{
                'rsvp-person__option--active rsvp-person__option--active-negative':
                  person4Attending === false,
              }"
              @click="person4Attending = false"
            >
              {{ t('rsvp.attendance.decline') }}
            </button>
          </div>
        </article>
      </section>

      <section class="rsvp__section">
        <h2>{{ t('rsvp.food.title') }}</h2>

        <div class="rsvp-field">
          <label for="dietary-requirements">
            {{ t('rsvp.food.dietary') }}
          </label>

          <textarea
            id="dietary-requirements"
            v-model="dietaryRequirements"
            rows="3"
          />
        </div>

        <div class="rsvp-field">
          <label for="allergies">
            {{ t('rsvp.food.allergies') }}
          </label>

          <textarea
            id="allergies"
            v-model="allergies"
            rows="3"
          />
        </div>
      </section>

      <section class="rsvp__section">
        <h2>{{ t('rsvp.accommodation.title') }}</h2>

        <label class="rsvp-checkbox">
          <input
            v-model="needsAccommodation"
            type="checkbox"
          >

          <span>
            {{ t('rsvp.accommodation.label') }}
          </span>
        </label>
      </section>

      <section class="rsvp__section">
        <h2>{{ t('rsvp.message.title') }}</h2>

        <div class="rsvp-field">
          <label for="message">
            {{ t('rsvp.message.label') }}
          </label>

          <textarea
            id="message"
            v-model="message"
            rows="5"
          />
        </div>
      </section>

      <p
        v-if="submitError"
        class="rsvp__error"
      >
        {{ submitError }}
      </p>

      <p
        v-if="submitted"
        class="rsvp__success"
      >
        {{ t('rsvp.success') }}
      </p>

      <button
        type="submit"
        class="button rsvp__submit"
        :disabled="saving || !canSubmit"
      >
        {{
          saving
            ? t('rsvp.saving')
            : t('rsvp.submit')
        }}
      </button>
    </form>
  </main>
</template>

<style scoped lang="scss">
.rsvp {
  max-width: 700px;
  margin: 0 auto;
  padding: 10rem 1rem 4rem 1rem;

  @include lg {
    padding: 4rem 1rem 4rem 1rem;
  }

  &__header {
    margin-bottom: 3rem;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

  }

  &__error,
  &__success {
    margin: 0;
  }

  &__submit {
    width: 100%;
    padding: 1rem 1.5rem;
    background: $color-blue-light;
  }
}

.rsvp-person {
  padding: 1.5rem;
  border: 1px solid currentColor;
  border-radius: 1rem;
  background-image: linear-gradient(45deg, $color-surface, $color-background);

  h3 {
    margin: 0 0 1rem;
  }

  &__options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  &__option {
    background: $color-surface;

    &--active {
      font-weight: 700;

    }

    &--active-positive {
      box-shadow: inset 0 0 0 2px $color-green-dark;
      border: 1px solid $color-green-light;
      background: $color-green-light;
    }

    &--active-negative {
      box-shadow: inset 0 0 0 2px $color-error;
      border: 1px solid $color-error;
      background: $color-pink-light;
    }
  }
}

.rsvp-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid currentColor;
    border-radius: 0.75rem;
    background: transparent;
    resize: vertical;
    font: inherit;
    background-image: linear-gradient(45deg, $color-surface, $color-background);

  }
}

.rsvp-checkbox {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
</style>
