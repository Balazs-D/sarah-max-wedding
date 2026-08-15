import { createHash, randomBytes } from 'node:crypto'
import type { H3Event } from 'h3'

const COOKIE_NAME = 'wedding_guest_session'

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30

const hashToken = (token: string) => {
  return createHash('sha256')
    .update(token)
    .digest('hex')
}

export const createGuestSession = async (
  event: H3Event,
  guestId: string,
) => {
  const supabase = useServerSupabase()

  const token = randomBytes(32).toString('hex')
  const tokenHash = hashToken(token)

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_SECONDS * 1000,
  )

  const { error } = await supabase
    .from('guest_sessions')
    .insert({
      guest_id: guestId,
      token_hash: tokenHash,
      expires_at: expiresAt.toISOString(),
    })

  if (error) {
    throw error
  }

  setCookie(
    event,
    COOKIE_NAME,
    token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    },
  )
}

export const getGuestSession = async (
  event: H3Event,
) => {
  const token = getCookie(event, COOKIE_NAME)

  if (!token) {
    return null
  }

  const supabase = useServerSupabase()

  const tokenHash = hashToken(token)

  const { data: session, error } = await supabase
    .from('guest_sessions')
    .select(`
      id,
      guest_id,
      expires_at,
      guests (
        id,
        person_1_first_name,
        person_1_last_name,
        person_2_first_name,
        person_2_last_name,
        person_3_first_name,
        person_3_last_name
      )
    `)
    .eq('token_hash', tokenHash)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle()

  if (error || !session) {
    return null
  }

  return session
}

export const requireGuestSession = async (
  event: H3Event,
) => {
  const session = await getGuestSession(event)

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return session
}

export const deleteGuestSession = async (
  event: H3Event,
) => {
  const token = getCookie(event, COOKIE_NAME)

  if (token) {
    const supabase = useServerSupabase()

    await supabase
      .from('guest_sessions')
      .delete()
      .eq('token_hash', hashToken(token))
  }

  deleteCookie(event, COOKIE_NAME, {
    path: '/',
  })
}
