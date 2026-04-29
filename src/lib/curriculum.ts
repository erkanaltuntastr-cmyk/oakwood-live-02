export interface CurriculumRow {
  year: string
  subject: string
  mainTopic: string
  subtopic: string
  estimatedWeek: string
  difficulty: string
}

const CURRICULUM_URL = '/England_National_Curriculum_Full_Detailed.csv'

let cache: CurriculumRow[] | null = null

function parseCsvLine(line: string): string[] {
  const out: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"'
          i += 1
        } else {
          inQuotes = false
        }
      } else {
        current += ch
      }
    } else if (ch === ',') {
      out.push(current)
      current = ''
    } else if (ch === '"') {
      inQuotes = true
    } else {
      current += ch
    }
  }

  out.push(current)
  return out
}

function splitCsvRows(text: string): string[] {
  const rows: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i]
    if (ch === '"') {
      if (text[i + 1] === '"') {
        current += '""'
        i += 1
        continue
      }
      inQuotes = !inQuotes
      current += ch
      continue
    }
    if (ch === '\n' && !inQuotes) {
      if (current.trim()) rows.push(current)
      current = ''
      continue
    }
    if (ch === '\r') continue
    current += ch
  }

  if (current.trim()) rows.push(current)
  return rows
}

export function normaliseYearGroup(yearGroup?: string): string {
  if (!yearGroup) return ''
  const cleaned = String(yearGroup).trim()
  if (!cleaned) return ''
  if (/^Year\s+\d+$/i.test(cleaned)) return cleaned.replace(/^year/i, 'Year')
  if (/^\d+$/.test(cleaned)) return `Year ${cleaned}`
  return cleaned.startsWith('Year') ? cleaned : `Year ${cleaned}`
}

export async function loadCurriculum(): Promise<CurriculumRow[]> {
  if (cache) return cache

  const res = await fetch(CURRICULUM_URL, { cache: 'force-cache' })
  if (!res.ok) throw new Error(`Curriculum fetch failed: ${res.status}`)

  const text = (await res.text()).replace(/^\uFEFF/, '')
  const rows = splitCsvRows(text)
  if (!rows.length) {
    cache = []
    return cache
  }

  const headerRaw = rows[0].trim()
  const headerLine = headerRaw.startsWith('"') && headerRaw.endsWith('"')
    ? headerRaw.slice(1, -1)
    : headerRaw
  const headers = parseCsvLine(headerLine).map((header) => header.trim().toLowerCase())
  if (headers.length) headers[0] = headers[0].replace(/^\uFEFF/, '')

  const indexes = {
    year: headers.indexOf('year'),
    subject: headers.indexOf('subject'),
    mainTopic: headers.indexOf('main topic'),
    subtopic: headers.indexOf('subtopic (statutory focus)'),
    estimatedWeek: headers.indexOf('estimated week'),
    difficulty: headers.indexOf('difficulty (1-5)'),
  }

  cache = rows.slice(1).map((line) => {
    const raw = line.trim()
    const inner = raw.startsWith('"') && raw.endsWith('"')
      ? raw.slice(1, -1).replace(/""/g, '"')
      : raw
    const cols = parseCsvLine(inner)

    return {
      year: normaliseYearGroup(cols[indexes.year] ?? ''),
      subject: (cols[indexes.subject] ?? '').trim(),
      mainTopic: (cols[indexes.mainTopic] ?? '').trim(),
      subtopic: (cols[indexes.subtopic] ?? '').trim(),
      estimatedWeek: (cols[indexes.estimatedWeek] ?? '').trim(),
      difficulty: (cols[indexes.difficulty] ?? '').trim(),
    }
  }).filter((row) => row.year && row.subject)

  return cache
}

export async function getCurriculumSubjects(yearGroup?: string): Promise<string[]> {
  const year = normaliseYearGroup(yearGroup)
  if (!year) return []
  const rows = await loadCurriculum()
  return Array.from(new Set(
    rows
      .filter((row) => row.year === year)
      .map((row) => row.subject)
      .filter(Boolean)
  )).sort((left, right) => left.localeCompare(right))
}

export async function getCurriculumRowsForSubject(yearGroup: string | undefined, subject: string): Promise<CurriculumRow[]> {
  const year = normaliseYearGroup(yearGroup)
  if (!year || !subject.trim()) return []
  const rows = await loadCurriculum()
  return rows.filter((row) => row.year === year && row.subject.toLowerCase() === subject.trim().toLowerCase())
}

export async function getCurriculumTopicGroups(yearGroup: string | undefined, subject: string): Promise<Array<{ mainTopic: string; rows: CurriculumRow[] }>> {
  const rows = await getCurriculumRowsForSubject(yearGroup, subject)
  const groups = new Map<string, CurriculumRow[]>()

  rows.forEach((row) => {
    const key = row.mainTopic || row.subject || 'General'
    const existing = groups.get(key) ?? []
    existing.push(row)
    groups.set(key, existing)
  })

  return Array.from(groups.entries()).map(([mainTopic, groupedRows]) => ({
    mainTopic,
    rows: groupedRows,
  }))
}
