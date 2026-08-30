export const requireAdminUser = async (event: H3Event) => {
  const authorizationHeader = getHeader(event, 'authorization')

  if (!authorizationHeader?.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing admin authorization',
    })
  }

  const accessToken = authorizationHeader.slice('Bearer '.length).trim()

  if (!accessToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing admin authorization',
    })
  }

  const supabase = useServerSupabase()
  const config = useRuntimeConfig()
  const adminEmails = config.adminEmails
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)

  const { data, error } = await supabase.auth.getUser(accessToken)

  if (error || !data.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid admin session',
    })
  }

  const userEmail = data.user.email?.toLowerCase()

  if (
    adminEmails.length > 0
    && (!userEmail || !adminEmails.includes(userEmail))
  ) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access denied',
    })
  }

  return data.user
}
