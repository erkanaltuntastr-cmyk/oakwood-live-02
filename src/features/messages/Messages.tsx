import { useState } from 'react'
import { useAppStore } from '@/state/store'
import { Avatar } from '@/components/Avatar'
import { Send, MessageSquare, Plus, Users } from 'lucide-react'
import { crypto } from '@/lib/crypto'
import { cn } from '@/lib/utils'
import type { NoteThread } from '@/state/store'

const inp = 'w-full px-3 py-2 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'

// ── Direct Messages ────────────────────────────────────────────────────────

function DirectMessages() {
  const { profiles, activeProfileId, directMessages, sendDirectMessage, markRead } = useAppStore()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [text, setText] = useState('')

  const family = profiles.filter((p) => p.id !== activeProfileId)

  function conversation(otherId: string) {
    return directMessages
      .filter((m) =>
        (m.fromId === activeProfileId && m.toId === otherId) ||
        (m.fromId === otherId && m.toId === activeProfileId)
      )
      .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
  }

  function unread(profileId: string) {
    return directMessages.filter(
      (m) => m.fromId === profileId && m.toId === activeProfileId && !m.read
    ).length
  }

  function handleSelect(id: string) {
    setSelectedId(id)
    markRead(id, activeProfileId!)
  }

  function send() {
    if (!text.trim() || !selectedId || !activeProfileId) return
    sendDirectMessage({
      id: crypto.uuid(),
      fromId: activeProfileId,
      toId: selectedId,
      text: text.trim(),
      sentAt: new Date().toISOString(),
      read: false,
    })
    setText('')
  }

  const selected = family.find((p) => p.id === selectedId)
  const msgs = selectedId ? conversation(selectedId) : []

  return (
    <div className="flex gap-4 h-[480px]">
      {/* Contact list */}
      <div className="w-44 shrink-0 space-y-1 overflow-y-auto">
        {family.map((p) => {
          const count = unread(p.id)
          return (
            <button key={p.id} onClick={() => handleSelect(p.id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors',
                selectedId === p.id ? 'bg-accent text-primary' : 'hover:bg-muted text-foreground'
              )}>
              <Avatar profile={p} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.role === 'parent' ? 'Veli' : p.yearGroup}</p>
              </div>
              {count > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0">
                  {count}
                </span>
              )}
            </button>
          )
        })}
        {family.length === 0 && (
          <p className="text-xs text-muted-foreground px-2">Başka aile üyesi yok.</p>
        )}
      </div>

      {/* Conversation */}
      <div className="flex-1 oak-card flex flex-col overflow-hidden">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
            Bir aile üyesi seç
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
              <Avatar profile={selected} size="sm" />
              <p className="text-sm font-semibold text-foreground">{selected.name}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.length === 0 && (
                <p className="text-center text-xs text-muted-foreground">Henüz mesaj yok.</p>
              )}
              {msgs.map((m) => {
                const isMe = m.fromId === activeProfileId
                return (
                  <div key={m.id} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
                    <div className={cn(
                      'max-w-[75%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed',
                      isMe ? 'bg-primary text-primary-foreground rounded-br-sm'
                           : 'bg-muted text-foreground rounded-bl-sm border border-border'
                    )}>
                      <p>{m.text}</p>
                      <p className={cn('text-xs mt-1', isMe ? 'text-primary-foreground/60' : 'text-muted-foreground')}>
                        {new Date(m.sentAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="px-4 py-3 border-t border-border flex gap-2">
              <input value={text} onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={`${selected.name}'e mesaj yaz...`}
                className={inp} />
              <button onClick={send}
                className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-xl hover:opacity-90 shrink-0">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Shared Notes ───────────────────────────────────────────────────────────

function SharedNotes() {
  const { profiles, activeProfileId, noteThreads, addNoteThread, addNoteReply } = useAppStore()
  const [adding, setAdding] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [newForm, setNewForm] = useState({ subject: '', topic: '', text: '' })

  function handleAddThread() {
    if (!newForm.subject || !newForm.text || !activeProfileId) return
    const now = new Date().toISOString()
    addNoteThread({
      id: crypto.uuid(),
      subject: newForm.subject,
      topic: newForm.topic,
      authorId: activeProfileId,
      createdAt: now,
      replies: [{ id: crypto.uuid(), authorId: activeProfileId, text: newForm.text, createdAt: now }],
    })
    setNewForm({ subject: '', topic: '', text: '' })
    setAdding(false)
  }

  function handleAddReply(thread: NoteThread) {
    if (!replyText.trim() || !activeProfileId) return
    addNoteReply(thread.id, {
      id: crypto.uuid(),
      authorId: activeProfileId,
      text: replyText.trim(),
      createdAt: new Date().toISOString(),
    })
    setReplyText('')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {!adding && (
          <button onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:opacity-80">
            <Plus className="w-4 h-4" /> Yeni Not
          </button>
        )}
      </div>

      {adding && (
        <div className="oak-card p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input className={inp} placeholder="Ders" value={newForm.subject}
              onChange={(e) => setNewForm({ ...newForm, subject: e.target.value })} />
            <input className={inp} placeholder="Konu" value={newForm.topic}
              onChange={(e) => setNewForm({ ...newForm, topic: e.target.value })} />
          </div>
          <textarea className={inp} rows={3} placeholder="Not..." value={newForm.text}
            onChange={(e) => setNewForm({ ...newForm, text: e.target.value })} />
          <div className="flex gap-2">
            <button onClick={() => setAdding(false)} className="flex-1 oak-btn-ghost text-sm py-2">İptal</button>
            <button onClick={handleAddThread} className="flex-1 oak-btn-primary text-sm py-2">Ekle</button>
          </div>
        </div>
      )}

      {noteThreads.map((t) => (
        <div key={t.id} className="oak-card overflow-hidden">
          <button onClick={() => setOpenId(openId === t.id ? null : t.id)}
            className="w-full flex items-start justify-between gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-primary bg-accent/60 px-2 py-0.5 rounded-full">{t.subject}</span>
                {t.topic && <span className="text-xs text-muted-foreground">{t.topic}</span>}
              </div>
              <p className="text-sm text-foreground line-clamp-1">{t.replies[0]?.text}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.replies.length} not · {new Date(t.createdAt).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          </button>

          {openId === t.id && (
            <div className="border-t border-border">
              <div className="px-5 py-4 space-y-4 max-h-60 overflow-y-auto">
                {t.replies.map((r) => {
                  const author = profiles.find((p) => p.id === r.authorId)
                  return (
                    <div key={r.id} className="flex items-start gap-3">
                      {author && <Avatar profile={author} size="sm" />}
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-foreground mb-0.5">{author?.name ?? '?'}</p>
                        <p className="text-sm text-foreground leading-relaxed">{r.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(r.createdAt).toLocaleString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="px-5 py-3 border-t border-border flex gap-2">
                <input value={replyText} onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddReply(t)}
                  placeholder="Yanıt..." className={inp} />
                <button onClick={() => handleAddReply(t)}
                  className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-xl hover:opacity-90 shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
        Öğretmen bağlantısı V2'de gelecek
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────

export function Messages() {
  const [tab, setTab] = useState<'direct' | 'notes'>('direct')

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold italic text-foreground">Mesajlar</h1>
        <p className="text-muted-foreground mt-1 text-sm">Aile içi mesajlaşma ve paylaşılan notlar.</p>
      </div>

      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit">
        {[
          { id: 'direct', icon: Users, label: 'Direkt' },
          { id: 'notes', icon: MessageSquare, label: 'Paylaşılan Notlar' },
        ].map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setTab(id as 'direct' | 'notes')}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              tab === id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            )}>
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'direct' ? <DirectMessages /> : <SharedNotes />}
    </div>
  )
}
