export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return
  }

  const { $supabase } = useNuxtApp()
  const { data } = await $supabase.auth.getSession()
  const session = data.session

  if (!session && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }
})
