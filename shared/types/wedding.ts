export interface Wedding {
  couple: {
    person1: string
    person2: string
  }

  date: string

  ceremony: WeddingLocation
  celebration: WeddingLocation

  schedule: ScheduleItem[]

  dressCode?: string

  accommodation: Accommodation[]

  faq: FaqItem[]

  rsvpDeadline: string

  galleryEnabled: boolean
}

export interface WeddingLocation {
  name: string
  address: string
  mapsUrl?: string
}

export interface ScheduleItem {
  time: string
  title: string
  description?: string
}

export interface Accommodation {
  name: string
  address: string
  url?: string
}

export interface FaqItem {
  question: string
  answer: string
}
