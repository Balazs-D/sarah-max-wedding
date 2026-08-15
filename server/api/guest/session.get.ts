import { requireGuestSession } from '#server/utils/guestSession'

export default defineEventHandler(async (event) => {
  const session = await requireGuestSession(event)

  const guest = session.guests

  return {
    authenticated: true,

    guest: {
      id: guest.id,

      person1: {
        firstName: guest.person_1_first_name,
        lastName: guest.person_1_last_name,
      },

      person2: guest.person_2_first_name
        ? {
            firstName: guest.person_2_first_name,
            lastName: guest.person_2_last_name,
          }
        : null,

      person3: guest.person_3_first_name
        ? {
            firstName: guest.person_3_first_name,
            lastName: guest.person_3_last_name,
          }
        : null,
    },
  }
})
