export type WeddingPhase = 'before' | 'today' | 'after'

export interface WeddingCountdownItem {
  beforeKey: 'home.phase.before_de' | 'home.phase.before_en'
  untilKey: 'home.phase.until_de' | 'home.phase.until_en'
  daysLeft: number
}

export interface WeddingPhaseInfo {
  phase: WeddingPhase
  events: WeddingCountdownItem[]
  phaseMessageKey: 'home.phase.today' | 'home.phase.after'
}

const GERMANY_WEDDING_DAY = '2026-11-05'
const ENGLAND_WEDDING_DAY = '2027-05-10'
const MS_PER_DAY = 1000 * 60 * 60 * 24

const toDateOnly = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

const parseWeddingDate = (value: Date | string) => {
  if (value instanceof Date) {
    return new Date(value.getTime())
  }

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (isoMatch) {
    const [, year, month, day] = isoMatch

    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  const localizedMatch = value.match(/^(\d{2})-(\d{2})-(\d{4})$/)

  if (localizedMatch) {
    const [, day, month, year] = localizedMatch

    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  return new Date(value)
}

export const useWeddingPhase = (): WeddingPhaseInfo => {
  const today = toDateOnly(new Date())
  const germanyDate = toDateOnly(parseWeddingDate(GERMANY_WEDDING_DAY))
  const englandDate = toDateOnly(parseWeddingDate(ENGLAND_WEDDING_DAY))

  if (Number.isNaN(germanyDate.getTime()) || Number.isNaN(englandDate.getTime())) {
    throw new Error('Invalid wedding date configuration')
  }

  const daysUntil = (targetDate: Date) => {
    const differenceInMs = targetDate.getTime() - today.getTime()

    return Math.max(0, Math.round(differenceInMs / MS_PER_DAY))
  }

  const events: WeddingCountdownItem[] = []

  if (today.getTime() <= germanyDate.getTime()) {
    events.push({
      beforeKey: 'home.phase.before_de',
      untilKey: 'home.phase.until_de',
      daysLeft: daysUntil(germanyDate),
    })
  }

  if (today.getTime() <= englandDate.getTime()) {
    events.push({
      beforeKey: 'home.phase.before_en',
      untilKey: 'home.phase.until_en',
      daysLeft: daysUntil(englandDate),
    })
  }

  let phase: WeddingPhase = 'before'

  if (today.getTime() === englandDate.getTime()) {
    phase = 'today'
  }
  else if (today.getTime() > englandDate.getTime()) {
    phase = 'after'
  }

  return {
    phase,
    events,
    phaseMessageKey: phase === 'today' ? 'home.phase.today' : 'home.phase.after',
  }
}
