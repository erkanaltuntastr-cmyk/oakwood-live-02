import { useEffect, useRef, useState } from 'react'
import { extractPersistedState, useAppStore } from '@/state/store'
import { fetchServerState, saveServerState } from '@/lib/serverState'

function hasMeaningfulState(state: ReturnType<typeof extractPersistedState>) {
  return (
    state.profiles.length > 0 ||
    state.registrationRequests.length > 0 ||
    state.inviteCodes.length > 0 ||
    state.quizDrafts.length > 0 ||
    state.quizSessions.length > 0 ||
    state.homework.length > 0 ||
    state.directMessages.length > 0 ||
    state.noteThreads.length > 0 ||
    state.adminMessages.length > 0
    || state.registrationDraft !== null
  )
}

export function ServerPersistenceGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const loadRef = useRef(false)
  const lastSnapshotRef = useRef('')
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let active = true
    let unsubscribe: (() => void) | undefined
    let syncEnabled = false

    async function init() {
      if (!useAppStore.persist.hasHydrated()) {
        await new Promise<void>((resolve) => {
          const unsubscribeHydration = useAppStore.persist.onFinishHydration(() => {
            unsubscribeHydration()
            resolve()
          })
        })
      }

      const localSnapshot = extractPersistedState(useAppStore.getState())

      try {
        const serverState = await fetchServerState()
        syncEnabled = serverState !== null
        if (serverState && hasMeaningfulState(serverState)) {
          useAppStore.getState().replacePersistedState(serverState)
        } else if (syncEnabled && hasMeaningfulState(localSnapshot)) {
          await saveServerState(localSnapshot)
        }
      } catch (error) {
        console.warn('Server state unavailable, using local cache.', error)
      }

      if (!active) return

      lastSnapshotRef.current = JSON.stringify(extractPersistedState(useAppStore.getState()))
      loadRef.current = true
      setReady(true)

      unsubscribe = useAppStore.subscribe((state) => {
        if (!loadRef.current || !syncEnabled) return

        const snapshot = extractPersistedState(state)
        const nextSerialized = JSON.stringify(snapshot)
        if (nextSerialized === lastSnapshotRef.current) return

        lastSnapshotRef.current = nextSerialized

        if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
        saveTimerRef.current = setTimeout(() => {
          saveServerState(snapshot).catch((error) => {
            console.warn('Server state save failed.', error)
          })
        }, 300)
      })
    }

    init()

    return () => {
      active = false
      unsubscribe?.()
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [])

  if (!ready) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Syncing workspace...</p>
      </div>
    )
  }

  return <>{children}</>
}
