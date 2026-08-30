<script setup lang="ts">
import HomeLink from '~~/components/atoms/HomeLink.vue'

const { $supabase } = useNuxtApp()

const signOut = async () => {
  const { error } = await $supabase.auth.signOut({
    scope: 'local',
  })

  if (error) {
    console.error('ADMIN LOGOUT ERROR:', error)
    return
  }

  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="admin-layout">
    <HomeLink />

    <header class="admin-layout__header">
      <div>
        <p class="admin-layout__eyebrow">
          Admin
        </p>
        <h1 class="admin-layout__title">
          Wedding dashboard
        </h1>
      </div>

      <button
        class="admin-layout__logout"
        type="button"
        @click="signOut"
      >
        Log out
      </button>
    </header>

    <nav class="admin-layout__nav">
      <NuxtLink
        class="admin-layout__link"
        to="/admin/rsvps"
      >
        RSVPs
      </NuxtLink>

      <NuxtLink
        class="admin-layout__link"
        to="/admin/photos"
      >
        Photos
      </NuxtLink>
    </nav>

    <main class="admin-layout__content">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  min-height: 100vh;
  padding: 2rem 1.5rem 4rem;

  @include layout-container;

  &__header {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-top: 8rem;

    @include lg {
      padding-top: 1rem;
    }
  }

  &__eyebrow {
    margin: 0 0 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.7;
  }

  &__title {
    margin: 0;
  }

  &__nav {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  &__link,
  &__logout {
    border: 1px solid currentColor;
    border-radius: 999px;
    padding: 0.75rem 1rem;
    background: transparent;
    color: inherit;
    text-decoration: none;
    font: inherit;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
