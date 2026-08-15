<script setup lang="ts">
const route = useRoute()

const pin = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/guest/login', {
      method: 'POST',
      body: {
        guestId: route.params.id,
        pin: pin.value,
      },
    })

    await navigateTo('/guest/rsvp')
  }
  catch {
    error.value = 'Der PIN ist leider nicht korrekt.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <p>
    Bitte gebt euren persönlichen Einladungscode ein.
  </p>

  <form @submit.prevent="login">
    <label for="pin">
      PIN
    </label>

    <input
      id="pin"
      v-model="pin"
      type="text"
      inputmode="numeric"
      maxlength="4"
      autocomplete="one-time-code"
    >

    <p
      v-if="error"
      class="rsvp-login__error"
    >
      {{ error }}
    </p>

    <button
      type="submit"
      :disabled="loading || pin.length !== 4"
    >
      {{ loading ? 'Prüfen...' : 'Weiter' }}
    </button>
  </form>
</template>
