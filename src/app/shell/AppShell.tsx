import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { AiPanel } from './AiPanel'
import { CommandPalette } from '@/features/command/CommandPalette'
import { Dashboard } from '@/features/dashboard/Dashboard'
import { ChildrenHub } from '@/features/children/ChildrenHub'
import { Settings } from '@/features/settings/Settings'
import { Homework } from '@/features/homework/Homework'
import { Subjects } from '@/features/subjects/Subjects'
import { Reports } from '@/features/reports/Reports'
import { Messages } from '@/features/messages/Messages'
import { QuizWizard } from '@/features/quiz/QuizWizard'
import { QuizSession } from '@/features/quiz/QuizSession'
import { QuizResult } from '@/features/quiz/QuizResult'
import { OakwoodBackground } from '@/components/brand/OakwoodBackground'


export function AppShell() {
  const [cmdOpen, setCmdOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(true)
  const location = useLocation()
  const isStudentFlow = [
    '/app/quizzes',
    '/app/quiz/',
    '/app/subjects',
    '/app/homework',
    '/app/reports',
  ].some((path) => location.pathname.startsWith(path))

  return (
    <div className="flex h-screen overflow-hidden bg-oak-warm">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar onCmdK={() => setCmdOpen(true)} onAiToggle={() => setAiOpen((o) => !o)} />

        <main className="flex-1 overflow-auto">
          <OakwoodBackground className="p-6 lg:p-8" variant={isStudentFlow ? 'student' : 'family'}>
            <Routes>
              <Route path="dashboard"              element={<Dashboard />} />
              <Route path="children"               element={<ChildrenHub />} />
              <Route path="quizzes"                element={<QuizWizard />} />
              <Route path="quizzes/new"            element={<QuizWizard />} />
              <Route path="quiz/session/:sessionId" element={<QuizSession />} />
              <Route path="quiz/result/:sessionId"  element={<QuizResult />} />
              <Route path="subjects"   element={<Subjects />} />
              <Route path="homework"   element={<Homework />} />
              <Route path="reports"    element={<Reports />} />
              <Route path="messages"   element={<Messages />} />
              <Route path="settings"   element={<Settings />} />
              <Route path="*"          element={<Dashboard />} />
            </Routes>
          </OakwoodBackground>
        </main>
      </div>

      {aiOpen && <AiPanel onClose={() => setAiOpen(false)} />}
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  )
}
