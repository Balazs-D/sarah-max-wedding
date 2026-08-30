// scripts/seed-guests.ts

import { createClient } from '@supabase/supabase-js'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const supabaseUrl = process.env.SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is missing')
}

if (!secretKey) {
  throw new Error('SUPABASE_SECRET_KEY is missing')
}

const supabase = createClient(
  supabaseUrl,
  secretKey,
)

type GuestSeed = {
  person1FirstName: string
  person1LastName?: string | null
  person2FirstName?: string
  person2LastName?: string | null
  person3FirstName?: string
  person3LastName?: string | null
  person4FirstName?: string
  person4LastName?: string | null
  pin: string
}

async function seedGuests() {
  const guestsPath = path.resolve(
    process.cwd(),
    'scripts',
    'guests.json',
  )

  const guestsFile = await readFile(guestsPath, 'utf8')
  const guests: GuestSeed[] = JSON.parse(guestsFile)

  const entries = guests.map(guest => ({
    person_1_first_name: guest.person1FirstName,
    person_1_last_name: guest.person1LastName ?? '',

    person_2_first_name: guest.person2FirstName ?? null,
    person_2_last_name: guest.person2LastName ?? null,

    person_3_first_name: guest.person3FirstName ?? null,
    person_3_last_name: guest.person3LastName ?? null,

    person_4_first_name: guest.person4FirstName ?? null,
    person_4_last_name: guest.person4LastName ?? null,

    pin_hash: guest.pin,
  }))

  const { data, error } = await supabase
    .from('guests')
    .insert(entries)
    .select()

  if (error) {
    throw error
  }

  console.log(`Created ${data.length} guest entries.`)
}

seedGuests().catch((error) => {
  console.error('Could not seed guests:', error)
  process.exit(1)
})
