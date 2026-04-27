import { useState } from 'react'
import { X, Send, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/useLang'

interface AiPanelProps { onClose: () => void }
interface Message { role: 'user' | 'ai'; text: string }

export function AiPanel({ onClose }: AiPanelProps) {
  const { t } = useLang()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const suggestions = [
    t('ai.suggestions.quiz'),
    t('ai.suggestions.summary'),
    t('ai.suggestions.resource'),
  ]

  function send(text: string) {
    if (!text.trim()) return
    setMessages((m) => [...m, { role: 'user', text }, { role: 'ai', text: t('ai.noBackend') }])
    setInput('')
  }

  return (
    <aside className="w-72 shrink-0 flex flex-col border-l border-border bg-white h-full">
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground font-display italic">{t('ai.assistant')}</span>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-muted-foreground font-medium mb-3">Quick prompts</p>
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)}
                className="w-full text-left text-xs px-3 py-2.5 rounded-xl border border-border hover:bg-muted hover:border-primary/20 transition-colors text-muted-foreground hover:text-foreground leading-relaxed">
                {s}
              </button>
            ))}
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`text-sm px-3.5 py-2.5 rounded-xl leading-relaxed ${m.role === 'user' ? 'bg-primary text-primary-foreground ml-6' : 'bg-muted text-foreground mr-6 border border-border'}`}>
              {m.text}
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder={t('ai.placeholder')}
            className="flex-1 text-sm bg-muted border border-border rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40" />
          <button onClick={() => send(input)} className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity shrink-0">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
