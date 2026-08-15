import bcrypt from 'bcryptjs'
import { useServerSupabase } from '#server/utils/supabase'
import { createGuestSession } from '#server/utils/guestSession'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    pin: string
  }>(event)

  console.log('LOGIN pin:', body.pin)

  if (!body.pin) {
    throw createError({
      status: 400,
      statusText: 'PIN is required',
    })
  }

  if (!/^\d{4}$/.test(body.pin)) {
    throw createError({
      status: 400,
      statusText: 'Invalid PIN',
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
    const pinIsValid = await bcrypt.compare(
      body.pin,
      guest.pin_hash,
    )

    if (pinIsValid) {
      matchedGuest = guest
      break
    }
  }

  if (!matchedGuest) {
    throw createError({
      status: 401,
      statusText: 'Invalid PIN',
    })
  }

  try {
    console.log('CREATING SESSION FOR:', matchedGuest.id)

    await createGuestSession(
      event,
      matchedGuest.id,
    )

    console.log('SESSION CREATED')
  }
  catch (sessionError) {
    console.error('SESSION ERROR:', sessionError)

    throw createError({
      status: 500,
      statusText: 'Could not create guest session',
    })
  }

  return {
    success: true,
  }
})
