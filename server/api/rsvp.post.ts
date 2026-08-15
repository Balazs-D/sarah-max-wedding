import { requireGuestSession } from '#server/utils/guestSession'
import { useServerSupabase } from '#server/utils/supabase'

type RsvpBody = {
  person_1_attending: boolean | null
  person_2_attending: boolean | null
  person_3_attending: boolean | null
  dietary_requirements: string | null
  allergies: string | null
  needs_accommodation: boolean
  message: string | null
}

export default defineEventHandler(async (event) => {
  const session = await requireGuestSession(event)

  const body = await readBody<RsvpBody>(event)

  const supabase = useServerSupabase()

  const { error } = await supabase
    .from('rsvps')
    .upsert(
      {
        guest_id: session.guest_id,

        person_1_attending: body.person_1_attending,
        person_2_attending: body.person_2_attending,
        person_3_attending: body.person_3_attending,

        dietary_requirements: body.dietary_requirements,
        allergies: body.allergies,

        needs_accommodation: body.needs_accommodation,

        message: body.message,

        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'guest_id',
      },
    )

  if (error) {
    console.error('RSVP UPSERT ERROR:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })

    throw createError({
      status: 500,
      statusText: 'Could not save RSVP',
    })
  }

  return {
    success: true,
  }
})
