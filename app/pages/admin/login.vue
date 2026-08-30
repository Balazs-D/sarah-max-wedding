<script setup lang="ts">
import HomeLink from '~~/components/atoms/HomeLink.vue'

definePageMeta({
  middleware: 'admin-auth',
})

const { $supabase } = useNuxtApp()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

if (import.meta.client) {
  const { data } = await $supabase.auth.getSession()

  if (data.session) {
    await navigateTo('/admin/rsvps')
  }
}

const signIn = async () => {
  errorMessage.value = ''
  loading.value = true

  const { error } = await $supabase.auth.signInWithPassword({
    email: email.value.trim(),
    password: password.value,
  })

  loading.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  await navigateTo('/admin/rsvps')
}
</script>

<template>
  <main class="admin-login">
    <HomeLink />

    <div class="admin-login__card">
      <p class="admin-login__eyebrow">
        {{ t('adminLogin.title') }}
      </p>
      <h1 class="admin-login__title">
        {{ t('adminLogin.title') }}
      </h1>
      <p class="admin-login__subtitle">
        {{ t('adminLogin.intro') }}
      </p>

      <form
        class="form admin-login__form"
        @submit.prevent="signIn"
      >
        <label class="form-field admin-login__field">
          <span>{{ t('adminLogin.email') }}</span>
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            class="form-input"
            required
          >
        </label>

        <label class="form-field admin-login__field">
          <span>{{ t('adminLogin.password') }}</span>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="form-input"
            required
          >
        </label>

        <p
          v-if="errorMessage"
          class="admin-login__error"
        >
          {{ t('adminLogin.error') }}
        </p>

        <button
          class="button admin-login__submit form-submit"
          type="submit"
          :disabled="loading || !email.trim() || !password"
        >
          {{ loading ? t('adminLogin.loading') : t('adminLogin.submit') }}
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
.admin-login {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;

  &__card {
    width: min(100%, 28rem);
    padding: 2rem;
    border: 1px solid currentColor;
    border-radius: 1.5rem;
  }

  &__eyebrow {
    margin: 0 0 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.7;
  }

  &__title {
    margin: 0 0 0.75rem;
  }

  &__subtitle {
    margin: 0 0 1.5rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__field {
    width: 100%;
  }

  &__error {
    margin: 0;
    color: #b42318;
  }

  &__submit {
    padding: 0.9rem 1.25rem;
  }
}
</style>
