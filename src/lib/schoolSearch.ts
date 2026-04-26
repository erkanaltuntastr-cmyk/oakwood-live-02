interface School {
  name: string
  postcode: string
  town: string
  phase: string
}

let cache: School[] | null = null
let loading = false
const listeners: Array<() => void> = []

async function loadSchools(): Promise<School[]> {
  if (cache) return cache
  if (loading) {
    return new Promise((resolve) => {
      listeners.push(() => resolve(cache ?? []))
    })
  }
  loading = true
  try {
    const res = await fetch('/gias_schools.csv')
    const text = await res.text()
    const lines = text.split('\n').slice(1) // skip header
    cache = lines
      .map((line) => {
        const cols = line.split(',')
        return {
          name:     (cols[1] ?? '').replace(/"/g, '').trim(),
          phase:    (cols[2] ?? '').replace(/"/g, '').trim(),
          postcode: (cols[3] ?? '').replace(/"/g, '').trim(),
          la:       (cols[4] ?? '').replace(/"/g, '').trim(),
          town:     (cols[5] ?? '').replace(/"/g, '').trim(),
        }
      })
      .filter((s) => s.name)
    listeners.forEach((fn) => fn())
    listeners.length = 0
    return cache
  } catch {
    cache = []
    return cache
  } finally {
    loading = false
  }
}

export async function searchSchools(query: string, limit = 8): Promise<string[]> {
  const schools = await loadSchools()
  const q = query.trim().toLowerCase()
  if (!q) return []
  const seen = new Set<string>()
  const results: string[] = []
  for (const s of schools) {
    const hay = `${s.name} ${s.postcode} ${s.town}`.toLowerCase()
    if (!hay.includes(q)) continue
    const label = s.postcode ? `${s.name} [${s.postcode}]` : s.name
    if (seen.has(label)) continue
    seen.add(label)
    results.push(label)
    if (results.length >= limit) break
  }
  return results
}
