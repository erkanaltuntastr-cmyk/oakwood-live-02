import { AppRouter } from '@/app/router'
import { ServerPersistenceGate } from '@/app/ServerPersistenceGate'

export default function App() {
  return (
    <ServerPersistenceGate>
      <AppRouter />
    </ServerPersistenceGate>
  )
}
