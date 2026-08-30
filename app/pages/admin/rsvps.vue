<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

type RsvpGuest = {
  firstName: string
  lastName: string | null
  attending: boolean | null
}

type AdminRsvp = {
  guestId: string
  guests: RsvpGuest[]
  dietaryRequirements: string | null
  allergies: string | null
  needsAccommodation: boolean
  message: string | null
  submittedAt: string | null
  updatedAt: string | null
}

type AdminRsvpSummary = {
  familiesFeedbackEntered: number
  totalFamilies: number
  attendingPeople: number
  totalPeople: number
}

const { $supabase } = useNuxtApp()

const loading = ref(true)
const errorMessage = ref('')
const rsvps = ref<AdminRsvp[]>([])
const summary = ref<AdminRsvpSummary>({
  familiesFeedbackEntered: 0,
  totalFamilies: 0,
  attendingPeople: 0,
  totalPeople: 0,
})

const formatGuestName = (guest: RsvpGuest) =>
  [guest.firstName, guest.lastName]
    .filter(Boolean)
    .join(' ')

const formatAttendance = (attending: boolean | null) => {
  if (attending === true) {
    return 'Attending'
  }

  if (attending === false) {
    return 'Not attending'
  }

  return 'No response'
}

const formatDate = (value: string | null) => {
  if (!value) {
    return '—'
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    },
  ).format(new Date(value))
}

const loadRsvps = async () => {
  loading.value = true
  errorMessage.value = ''

  const { data } = await $supabase.auth.getSession()
  const accessToken = data.session?.access_token

  if (!accessToken) {
    loading.value = false
    errorMessage.value = 'Your admin session has expired.'
    await navigateTo('/admin/login')
    return
  }

  try {
    const response = await $fetch<{
      summary: AdminRsvpSummary
      rsvps: AdminRsvp[]
    }>('/api/admin/rsvps', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    summary.value = response.summary
    rsvps.value = response.rsvps
  }
  catch (error) {
    console.error('ADMIN RSVP PAGE ERROR:', error)
    errorMessage.value = 'Could not load RSVPs.'
  }
  finally {
    loading.value = false
  }
}

if (import.meta.client) {
  await loadRsvps()
}
</script>

<template>
  <section class="admin-rsvps">
    <div class="admin-rsvps__header">
      <div>
        <h2 class="admin-rsvps__title">
          RSVP feedback
        </h2>
        <p class="admin-rsvps__subtitle">
          Submitted guest responses are listed here for review.
        </p>
      </div>

      <button
        class="admin-rsvps__refresh"
        type="button"
        :disabled="loading"
        @click="loadRsvps"
      >
        {{ loading ? 'Refreshing...' : 'Refresh' }}
      </button>
    </div>

    <div class="admin-rsvps__summary">
      <article class="admin-summary-card">
        <p class="admin-summary-card__label">
          Feedback by families
        </p>
        <p class="admin-summary-card__value">
          {{ summary.familiesFeedbackEntered }} / {{ summary.totalFamilies }}
        </p>
      </article>

      <article class="admin-summary-card">
        <p class="admin-summary-card__label">
          Person attending
        </p>
        <p class="admin-summary-card__value">
          {{ summary.attendingPeople }} / {{ summary.totalPeople }}
        </p>
      </article>
    </div>

    <p
      v-if="errorMessage"
      class="admin-rsvps__error"
    >
      {{ errorMessage }}
    </p>

    <p v-else-if="loading">
      Loading RSVPs...
    </p>

    <p v-else-if="rsvps.length === 0">
      No RSVP responses yet.
    </p>

    <div
      v-else
      class="admin-rsvps__list"
    >
      <article
        v-for="rsvp in rsvps"
        :key="rsvp.guestId"
        class="admin-rsvp-card"
      >
        <div class="admin-rsvp-card__row">
          <div>
            <h3 class="admin-rsvp-card__title">
              {{ rsvp.guests.map(formatGuestName).join(', ') }}
            </h3>
            <p class="admin-rsvp-card__meta">
              Updated: {{ formatDate(rsvp.updatedAt) }}
            </p>
          </div>

          <p class="admin-rsvp-card__meta">
            Submitted: {{ formatDate(rsvp.submittedAt) }}
          </p>
        </div>

        <div class="admin-rsvp-card__section">
          <h4>Attendance</h4>
          <ul class="admin-rsvp-card__people">
            <li
              v-for="guest in rsvp.guests"
              :key="formatGuestName(guest)"
            >
              <strong>{{ formatGuestName(guest) }}</strong>: {{ formatAttendance(guest.attending) }}
            </li>
          </ul>
        </div>

        <div class="admin-rsvp-card__grid">
          <div class="admin-rsvp-card__section">
            <h4>Dietary requirements</h4>
            <p>{{ rsvp.dietaryRequirements || '—' }}</p>
          </div>

          <div class="admin-rsvp-card__section">
            <h4>Allergies</h4>
            <p>{{ rsvp.allergies || '—' }}</p>
          </div>

          <div class="admin-rsvp-card__section">
            <h4>Accommodation</h4>
            <p>{{ rsvp.needsAccommodation ? 'Needs accommodation info' : 'No accommodation needed' }}</p>
          </div>

          <div class="admin-rsvp-card__section">
            <h4>Message</h4>
            <p>{{ rsvp.message || '—' }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.admin-rsvps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 8rem;

  @include lg {
    padding-top: 1rem;
  }

  &__header {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__title {
    margin: 0 0 0.5rem;
  }

  &__summary {
    display: grid;
    gap: 1rem;

    @include lg {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__subtitle,
  &__error {
    margin: 0;
  }

  &__error {
    color: #b42318;
  }

  &__refresh {
    border: 1px solid currentColor;
    border-radius: 999px;
    padding: 0.75rem 1rem;
    background: transparent;
    font: inherit;
    white-space: nowrap;
  }

  &__list {
    display: grid;
    gap: 1rem;
  }
}

.admin-summary-card {
  padding: 1.25rem;
  border: 1px solid currentColor;
  border-radius: 1rem;

  &__label,
  &__value {
    margin: 0;
  }

  &__label {
    margin-bottom: 0.35rem;
    opacity: 0.7;
  }

  &__value {
    font-size: 1.5rem;
    font-weight: 700;
  }
}

.admin-rsvp-card {
  border: 1px solid currentColor;
  border-radius: 1rem;
  padding: 1.25rem;

  &__row {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  }

  &__title {
    margin: 0 0 0.35rem;
  }

  &__meta {
    margin: 0;
    opacity: 0.7;
  }

  &__grid {
    display: grid;
    gap: 1rem;

    @include lg {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__section {
    h4,
    p {
      margin: 0;
    }

    h4 {
      margin-bottom: 0.35rem;
    }
  }

  &__people {
    margin: 0;
    padding-left: 1.25rem;
    margin-bottom: $space-l;
  }
}
</style>
