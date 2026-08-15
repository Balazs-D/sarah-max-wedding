export default defineNuxtRouteMiddleware(async () => {
  const { error } = await useFetch('/api/guest/session')

  if (error.value) {
    return navigateTo('/')
  }
})
