<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

await navigateTo('/admin/rsvps')
</script>

<template>
  <div />
</template>
