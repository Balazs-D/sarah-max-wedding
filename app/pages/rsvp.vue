<script setup lang="ts">
import HomeLink from '~~/components/atoms/HomeLink.vue'

const pin = ref('')
const loading = ref(false)
const error = ref('')
const { t } = useI18n()
const login = async () => {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/guest/login', {
      method: 'POST',
      body: {
        pin: pin.value,
      },
    })

    await navigateTo('/guest/rsvp')
  }
  catch (err) {
    console.error('LOGIN ERROR:', err)
    error.value = 'Der Code ist leider nicht korrekt.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="rsvp-login">
    <HomeLink />

    <h1>{{ t('rsvpLogin.title') }}</h1>

    <p class="rsvp-login__intro">
      {{ t('rsvpLogin.intro') }}
    </p>

    <form @submit.prevent="login">
      <div class="form-field rsvp-login__field">
        <label for="pin">
          {{ t('rsvpLogin.password') }}
        </label>

        <input
          id="pin"
          v-model="pin"
          type="text"
          autocomplete="off"
          class="form-input rsvp-login__input"
        >
      </div>
      <p
        v-if="error"
        class="rsvp-login__error"
      >
        {{ t('rsvpLogin.error') }}
      </p>

      <button
        type="submit"
        :disabled="loading || !pin.trim()"
        class="button rsvp-login__submit"
      >
        {{ loading ? t('rsvpLogin.loading') : t('rsvpLogin.submit') }}
      </button>
    </form>
  </main>
</template>

<style lang="scss" scoped>
.rsvp-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 4rem;

  &__intro {
    width: 600px;
    text-align: center;
  }

  &__field {
    margin-bottom: 1rem;
  }

  &__input {
    width: 100%;
  }

  &__error {
    color: $color-error;
  }

  &__submit {
    background: $color-blue-light;
  }
}
</style>
