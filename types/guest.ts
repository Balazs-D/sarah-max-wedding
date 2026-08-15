type GuestPerson = {
  firstName: string
  lastName: string | null
}

type GuestSessionResponse = {
  authenticated: boolean
  guest: {
    id: string
    person1: GuestPerson
    person2: GuestPerson | null
    person3: GuestPerson | null
  }
}
