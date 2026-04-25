import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { AiPanel } from './AiPanel'
import { CommandPalette } from '@/features/command/CommandPalette'
import { Dashboard } from '@/features/dashboard/Dashboard'
import { ChildrenHub } from '@/features/children/ChildrenHub'
import { QuizWizard } from '@/features/quiz/QuizWizard'
import { QuizSession } from '@/features/quiz/QuizSession'
import { QuizResult } from '@/features/quiz/QuizResult'

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
      <p className="text-lg font-display italic">{title}</p>
      <p className="text-sm">Bu ekran yakında gelecek.</p>
    </div>
  )
}

export function AppShell() {
  const [cmdOpen, setCmdOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar onCmdK={() => setCmdOpen(true)} onAiToggle={() => setAiOpen((o) => !o)} />

        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Routes>
            <Route path="dashboard"              element={<Dashboard />} />
            <Route path="children"               element={<ChildrenHub />} />
            <Route path="quizzes"                element={<QuizWizard />} />
            <Route path="quizzes/new"            element={<QuizWizard />} />
            <Route path="quiz/session/:sessionId" element={<QuizSession />} />
            <Route path="quiz/result/:sessionId"  element={<QuizResult />} />
            <Route path="subjects"   element={<Placeholder title="Dersler" />} />
            <Route path="homework"   element={<Placeholder title="Ödevler" />} />
            <Route path="reports"    element={<Placeholder title="Raporlar" />} />
            <Route path="messages"   element={<Placeholder title="Mesajlar" />} />
            <Route path="settings"   element={<Placeholder title="Ayarlar" />} />
            <Route path="*"          element={<Dashboard />} />
          </Routes>
        </main>
      </div>

      {aiOpen && <AiPanel onClose={() => setAiOpen(false)} />}
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  )
}
