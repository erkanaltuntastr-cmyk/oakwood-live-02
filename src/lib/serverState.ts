import type { PersistedAppState } from '@/state/store'

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, '') ?? ''
const STATE_URL = `${API_BASE}/api/state`

interface ServerStateResponse {
  state?: PersistedAppState
}

export async function fetchServerState(): Promise<PersistedAppState | null> {
  const res = await fetch(STATE_URL, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`State fetch failed: ${res.status}`)
  }

  const payload = (await res.json()) as ServerStateResponse
  return payload.state ?? null
}

export async function saveServerState(state: PersistedAppState): Promise<void> {
  const res = await fetch(STATE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state }),
  })

  if (!res.ok) {
    throw new Error(`State save failed: ${res.status}`)
  }
}
