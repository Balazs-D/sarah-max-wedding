<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})
</script>

<template>
  <section class="admin-placeholder">
    <h2>Photo moderation</h2>
    <p>
      This screen is ready for the next step once the photo upload table and storage bucket are set up.
    </p>
  </section>
</template>

<style scoped lang="scss">
.admin-placeholder {
  padding: 1.5rem;
  border: 1px solid currentColor;
  border-radius: 1rem;
}
</style>
