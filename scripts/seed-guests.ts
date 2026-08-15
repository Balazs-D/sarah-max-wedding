// scripts/seed-guests.ts

import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
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
  person1LastName: string
  person2FirstName?: string
  person2LastName?: string
  person3FirstName?: string
  person3LastName?: string
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

  const entries = await Promise.all(
    guests.map(async guest => ({
      person_1_first_name: guest.person1FirstName,
      person_1_last_name: guest.person1LastName,

      person_2_first_name: guest.person2FirstName ?? null,
      person_2_last_name: guest.person2LastName ?? null,

      person_3_first_name: guest.person3FirstName ?? null,
      person_3_last_name: guest.person3LastName ?? null,

      pin_hash: await bcrypt.hash(guest.pin, 10),
    })),
  )

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
