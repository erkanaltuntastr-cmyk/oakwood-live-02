import { Keyboard, BotMessageSquare } from 'lucide-react'
import { useLang } from '@/lib/useLang'

interface TopbarProps { onCmdK: () => void; onAiToggle: () => void }

export function Topbar({ onCmdK, onAiToggle }: TopbarProps) {
  const { t } = useLang()
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card shrink-0 sticky top-0 z-10">
      <button onClick={onCmdK}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-border bg-muted text-muted-foreground text-sm hover:border-primary/30 hover:text-foreground transition-colors max-w-sm w-full">
        <Keyboard className="w-3.5 h-3.5 shrink-0" />
        <span className="flex-1 text-left">{t('cmd.placeholder')}</span>
        <kbd className="text-xs bg-background border border-border px-1.5 py-0.5 rounded-md font-mono shrink-0">⌘K</kbd>
      </button>
      <button onClick={onAiToggle}
        className="ml-4 flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
        <BotMessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">AI</span>
      </button>
    </header>
  )
}
