import { requireGuestSession } from '#server/utils/guestSession'
import { useServerSupabase } from '#server/utils/supabase'

export default defineEventHandler(async (event) => {
  const session = await requireGuestSession(event)

  const supabase = useServerSupabase()

  const { data, error } = await supabase
    .from('rsvps')
    .select(`
      person_1_attending,
      person_2_attending,
      person_3_attending,
      dietary_requirements,
      allergies,
      needs_accommodation,
      message,
      submitted_at,
      updated_at
    `)
    .eq('guest_id', session.guest_id)
    .maybeSingle()

  if (error) {
    console.error('RSVP GET ERROR:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })

    throw createError({
      status: 500,
      statusText: 'Could not load RSVP',
    })
  }

  return {
    rsvp: data ?? null,
  }
})
