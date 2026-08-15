import { createClient } from '@supabase/supabase-js'

export const useServerSupabase = () => {
  const config = useRuntimeConfig()

  return createClient(
    config.public.supabaseUrl,
    config.supabaseSecretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  )
}
