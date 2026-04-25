import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { AiPanel } from './AiPanel'
import { CommandPalette } from '@/features/command/CommandPalette'
import { Dashboard } from '@/features/dashboard/Dashboard'
import { ChildrenHub } from '@/features/children/ChildrenHub'

export function AppShell() {
  const [cmdOpen, setCmdOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar onCmdK={() => setCmdOpen(true)} onAiToggle={() => setAiOpen((o) => !o)} />

        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="children" element={<ChildrenHub />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>

      {aiOpen && <AiPanel onClose={() => setAiOpen(false)} />}

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  )
}
