import { useServerSupabase } from '#server/utils/supabase'
import { createGuestSession } from '#server/utils/guestSession'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    pin: string
  }>(event)
  const invitationCode = body.pin?.trim()

  if (!invitationCode) {
    throw createError({
      status: 400,
      statusText: 'Invitation code is required',
    })
  }

  const supabase = useServerSupabase()

  const { data: guests, error } = await supabase
    .from('guests')
    .select(`
      id,
      pin_hash
    `)

  console.log('GUESTS ERROR:', error)

  if (error) {
    throw createError({
      status: 500,
      statusText: 'Could not load guests',
    })
  }

  let matchedGuest: {
    id: string
    pin_hash: string
  } | null = null

  for (const guest of guests ?? []) {
    if (invitationCode === guest.pin_hash) {
      matchedGuest = guest
      break
    }
  }

  if (!matchedGuest) {
    throw createError({
      status: 401,
      statusText: 'Invalid invitation code',
    })
  }

  await createGuestSession(
    event,
    matchedGuest.id,
  )

  return {
    success: true,
  }
})
