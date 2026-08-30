type GuestRecord = {
  person_1_first_name: string
  person_1_last_name: string | null
  person_2_first_name: string | null
  person_2_last_name: string | null
  person_3_first_name: string | null
  person_3_last_name: string | null
  person_4_first_name?: string | null
  person_4_last_name?: string | null
}

type RsvpRecord = {
  guest_id: string
  person_1_attending: boolean | null
  person_2_attending: boolean | null
  person_3_attending: boolean | null
  person_4_attending?: boolean | null
  dietary_requirements: string | null
  allergies: string | null
  needs_accommodation: boolean
  message: string | null
  submitted_at: string | null
  updated_at: string | null
  guests: GuestRecord | null
}

const countPeople = (guest: GuestRecord) => {
  return [
    guest.person_1_first_name,
    guest.person_2_first_name,
    guest.person_3_first_name,
    guest.person_4_first_name,
  ].filter(Boolean).length
}

const toPerson = (
  firstName: string | null | undefined,
  lastName: string | null | undefined,
  attending: boolean | null | undefined,
) => {
  if (!firstName) {
    return null
  }

  return {
    firstName,
    lastName,
    attending: attending ?? null,
  }
}

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const supabase = useServerSupabase()

  const { data, error } = await supabase
    .from('rsvps')
    .select(`
      guest_id,
      person_1_attending,
      person_2_attending,
      person_3_attending,
      person_4_attending,
      dietary_requirements,
      allergies,
      needs_accommodation,
      message,
      submitted_at,
      updated_at,
      guests (
        person_1_first_name,
        person_1_last_name,
        person_2_first_name,
        person_2_last_name,
        person_3_first_name,
        person_3_last_name,
        person_4_first_name,
        person_4_last_name
      )
    `)
    .order('updated_at', { ascending: false })

  const { data: guestRows, error: guestError } = await supabase
    .from('guests')
    .select(`
      person_1_first_name,
      person_2_first_name,
      person_3_first_name,
      person_4_first_name
    `)

  if (error) {
    console.error('ADMIN RSVPS LOAD ERROR:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })

    throw createError({
      statusCode: 500,
      statusMessage: 'Could not load RSVPs',
    })
  }

  if (guestError) {
    console.error('ADMIN GUEST TOTALS LOAD ERROR:', {
      message: guestError.message,
      details: guestError.details,
      hint: guestError.hint,
      code: guestError.code,
    })

    throw createError({
      statusCode: 500,
      statusMessage: 'Could not load guest totals',
    })
  }

  const entries = (data as RsvpRecord[] | null ?? [])
    .map((entry) => {
      const guest = entry.guests

      if (!guest) {
        return null
      }

      return {
        guestId: entry.guest_id,
        guests: [
          toPerson(
            guest.person_1_first_name,
            guest.person_1_last_name,
            entry.person_1_attending,
          ),
          toPerson(
            guest.person_2_first_name,
            guest.person_2_last_name,
            entry.person_2_attending,
          ),
          toPerson(
            guest.person_3_first_name,
            guest.person_3_last_name,
            entry.person_3_attending,
          ),
          toPerson(
            guest.person_4_first_name,
            guest.person_4_last_name,
            entry.person_4_attending,
          ),
        ].filter(Boolean),
        dietaryRequirements: entry.dietary_requirements,
        allergies: entry.allergies,
        needsAccommodation: entry.needs_accommodation,
        message: entry.message,
        submittedAt: entry.submitted_at,
        updatedAt: entry.updated_at,
      }
    })
    .filter(Boolean)

  const totalFamilies = guestRows?.length ?? 0
  const totalPeople = (guestRows ?? [])
    .reduce((sum, guest) => sum + countPeople(guest as GuestRecord), 0)
  const familiesFeedbackEntered = entries.length
  const attendingPeople = entries
    .reduce((sum, entry) => (
      sum + entry.guests.filter(guest => guest.attending === true).length
    ), 0)

  return {
    summary: {
      familiesFeedbackEntered,
      totalFamilies,
      attendingPeople,
      totalPeople,
    },
    rsvps: entries,
  }
})
