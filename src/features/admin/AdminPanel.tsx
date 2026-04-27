import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, ADMIN_ID } from '@/state/store'
import { Avatar, getColor } from '@/components/Avatar'
import { crypto } from '@/lib/crypto'
import { useLang } from '@/lib/useLang'
import { cn } from '@/lib/utils'
import {
  Users, ClipboardList, GitBranch, MessageSquare,
  LogOut, Check, X, Plus, Pencil, Trash2, Send, Ticket
} from 'lucide-react'

const inp = 'w-full px-3 py-2 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'
const YEAR_GROUPS = Array.from({ length: 13 }, (_, i) => `Year ${i + 1}`)

// ── Requests tab ────────────────────────────────────────────────────────────
function RequestsTab() {
  const { registrationRequests, approveAndAdd, reviewRequest } = useAppStore()
  const pending  = registrationRequests.filter((r) => r.status === 'pending')
  const reviewed = registrationRequests.filter((r) => r.status !== 'pending')

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground">Kayıt İstekleri</h2>

      {pending.length === 0 && (
        <div className="oak-card p-8 text-center text-muted-foreground text-sm">Bekleyen istek yok.</div>
      )}

      {pending.map((req) => (
        <div key={req.id} className="oak-card p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="font-semibold text-foreground">{req.name} {req.surname}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {req.role === 'parent' ? 'Veli' : `Çocuk · ${req.yearGroup}`}
                {req.inviteCode && <span className="ml-2 text-primary">Davet: {req.inviteCode}</span>}
              </p>
              <p className="text-xs text-muted-foreground">{new Date(req.createdAt).toLocaleString('tr-TR')}</p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Bekliyor</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => reviewRequest(req.id, 'rejected')}
              className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors">
              <X className="w-4 h-4" /> Reddet
            </button>
            <button onClick={() => approveAndAdd(req.id)}
              className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <Check className="w-4 h-4" /> Onayla & Ekle
            </button>
          </div>
        </div>
      ))}

      {reviewed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Geçmiş</h3>
          <div className="space-y-2">
            {reviewed.map((req) => (
              <div key={req.id} className="oak-card px-4 py-3 flex items-center justify-between">
                <p className="text-sm text-foreground">{req.name} {req.surname} <span className="text-muted-foreground text-xs">· {req.role === 'parent' ? 'Veli' : 'Çocuk'}</span></p>
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium',
                  req.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                  {req.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Users tab ────────────────────────────────────────────────────────────────
function UsersTab() {
  const { profiles, addProfile, updateProfile, deleteProfile } = useAppStore()
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', surname: '', role: 'parent' as 'parent' | 'child', yearGroup: '', pin: '' })
  const [editForm, setEditForm] = useState<Record<string, string>>({})
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  function startEdit(p: typeof profiles[0]) {
    setEditing(p.id)
    setEditForm({ name: p.name, surname: p.surname ?? '', yearGroup: p.yearGroup ?? '', pin: '' })
  }

  function saveEdit(id: string) {
    updateProfile(id, {
      name: editForm.name,
      surname: editForm.surname || undefined,
      yearGroup: editForm.yearGroup || undefined,
      ...(editForm.pin ? { pinHash: editForm.pin } : {}),
    })
    setEditing(null)
  }

  function handleAdd() {
    const id = crypto.uuid()
    addProfile({
      id, role: form.role, name: form.name.trim(),
      surname: form.surname.trim() || undefined,
      yearGroup: form.yearGroup || undefined,
      pinHash: form.pin || '0000',
      childIds: form.role === 'parent' ? [] : undefined,
      color: getColor(id),
      initials: [form.name[0], form.surname[0]].filter(Boolean).join('').toUpperCase(),
      createdAt: new Date().toISOString(),
    })
    setForm({ name: '', surname: '', role: 'parent', yearGroup: '', pin: '' })
    setAdding(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Kullanıcılar ({profiles.length})</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 text-sm text-primary font-medium hover:opacity-80">
          <Plus className="w-4 h-4" /> Yeni Üye
        </button>
      </div>

      {adding && (
        <div className="oak-card p-5 space-y-3 border-dashed">
          <p className="text-sm font-semibold text-foreground">Yeni Üye Ekle</p>
          <div className="grid grid-cols-2 gap-3">
            <input className={inp} placeholder="Ad *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={inp} placeholder="Soyad" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select className={inp} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as 'parent' | 'child' })}>
              <option value="parent">Veli</option>
              <option value="child">Çocuk</option>
            </select>
            {form.role === 'child' && (
              <select className={inp} value={form.yearGroup} onChange={(e) => setForm({ ...form, yearGroup: e.target.value })}>
                <option value="">Sınıf seç</option>
                {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            )}
          </div>
          <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="PIN (4 hane, varsayılan 0000)" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g,'').slice(0,4) })} />
          <div className="flex gap-2">
            <button onClick={() => setAdding(false)} className="flex-1 oak-btn-ghost text-sm py-2">İptal</button>
            <button onClick={handleAdd} disabled={!form.name} className="flex-1 oak-btn-primary text-sm py-2 disabled:opacity-40">Ekle</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {profiles.map((p) => (
          <div key={p.id} className="oak-card p-4">
            {editing === p.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input className={inp} value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Ad" />
                  <input className={inp} value={editForm.surname} onChange={(e) => setEditForm({ ...editForm, surname: e.target.value })} placeholder="Soyad" />
                </div>
                {p.role === 'child' && (
                  <select className={inp} value={editForm.yearGroup} onChange={(e) => setEditForm({ ...editForm, yearGroup: e.target.value })}>
                    <option value="">Sınıf seç</option>
                    {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                )}
                <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="Yeni PIN (boş = değişmez)" value={editForm.pin ?? ''} onChange={(e) => setEditForm({ ...editForm, pin: e.target.value.replace(/\D/g,'').slice(0,4) })} />
                <div className="flex gap-2">
                  <button onClick={() => setEditing(null)} className="flex-1 oak-btn-ghost text-sm py-1.5">İptal</button>
                  <button onClick={() => saveEdit(p.id)} className="flex-1 oak-btn-primary text-sm py-1.5">Kaydet</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar profile={p} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{p.name} {p.surname}</p>
                    <p className="text-xs text-muted-foreground">{p.role === 'parent' ? 'Veli' : `Çocuk · ${p.yearGroup}`}{p.isDemo ? ' · Demo' : ''}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  {confirmDelete === p.id ? (
                    <div className="flex gap-1 items-center">
                      <button onClick={() => setConfirmDelete(null)} className="text-xs text-muted-foreground hover:text-foreground px-2">İptal</button>
                      <button onClick={() => { deleteProfile(p.id); setConfirmDelete(null) }} className="text-xs text-destructive hover:text-destructive/80 px-2 font-medium">Sil</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(p.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Families tab ─────────────────────────────────────────────────────────────
function FamiliesTab() {
  const { profiles, updateProfile, addInviteCode } = useAppStore()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const parents  = profiles.filter((p) => p.role === 'parent')
  const children = profiles.filter((p) => p.role === 'child')

  function generateInvite(parentId: string, targetRole: 'parent' | 'child') {
    const code = `OAK-${Date.now().toString(36).toUpperCase().slice(-4)}-${Math.random().toString(36).slice(2,5).toUpperCase()}`
    addInviteCode({
      id: crypto.uuid(), code, createdBy: parentId,
      targetRole, familyId: parentId, used: false,
    })
    navigator.clipboard.writeText(code).catch(() => {})
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 3000)
  }

  function toggleChild(parentId: string, childId: string, linked: boolean) {
    const parent = profiles.find((p) => p.id === parentId)
    if (!parent) return
    const childIds = linked
      ? (parent.childIds ?? []).filter((id) => id !== childId)
      : [...(parent.childIds ?? []), childId]
    updateProfile(parentId, { childIds })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground">Aileler</h2>

      {copiedCode && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
          Davet kodu kopyalandı: <span className="font-mono font-bold">{copiedCode}</span>
        </div>
      )}

      {parents.map((parent) => {
        const linkedIds = parent.childIds ?? []
        return (
          <div key={parent.id} className="oak-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar profile={parent} size="md" />
                <div>
                  <p className="font-semibold text-foreground">{parent.name} {parent.surname}</p>
                  <p className="text-xs text-muted-foreground">Veli · {linkedIds.length} çocuk bağlı</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => generateInvite(parent.id, 'child')}
                  className="flex items-center gap-1 text-xs text-primary border border-primary/30 rounded-lg px-2 py-1 hover:bg-accent/30 transition-colors">
                  <Ticket className="w-3 h-3" /> Çocuk Davet
                </button>
                <button onClick={() => generateInvite(parent.id, 'parent')}
                  className="flex items-center gap-1 text-xs text-primary border border-primary/30 rounded-lg px-2 py-1 hover:bg-accent/30 transition-colors">
                  <Ticket className="w-3 h-3" /> Veli Davet
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Çocuklar</p>
              {children.map((child) => {
                const linked = linkedIds.includes(child.id)
                return (
                  <label key={child.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Avatar profile={child} size="sm" />
                      <span className="text-sm text-foreground">{child.name} {child.surname} <span className="text-muted-foreground text-xs">· {child.yearGroup}</span></span>
                    </div>
                    <button onClick={() => toggleChild(parent.id, child.id, linked)}
                      className={cn('w-10 h-6 rounded-full transition-colors relative shrink-0', linked ? 'bg-primary' : 'bg-muted border border-border')}>
                      <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all', linked ? 'left-5' : 'left-1')} />
                    </button>
                  </label>
                )
              })}
              {children.length === 0 && <p className="text-xs text-muted-foreground px-3">No learner profiles in system.</p>}
            </div>
          </div>
        )
      })}
      {parents.length === 0 && <div className="oak-card p-8 text-center text-muted-foreground text-sm">No parent profiles.</div>}
    </div>
  )
}

// ── Messages tab ──────────────────────────────────────────────────────────────
function MessagesTab() {
  const { profiles, adminMessages, sendAdminMessage, markAdminRead } = useAppStore()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [text, setText] = useState('')

  const nonAdmin = profiles.filter((p) => p.role !== 'admin')

  function conversation(otherId: string) {
    return adminMessages
      .filter((m) => (m.fromId === ADMIN_ID && m.toId === otherId) || (m.fromId === otherId && m.toId === ADMIN_ID))
      .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
  }

  function unread(profileId: string) {
    return adminMessages.filter((m) => m.fromId === profileId && m.toId === ADMIN_ID && !m.read).length
  }

  function send() {
    if (!text.trim() || !selectedId) return
    sendAdminMessage({ id: crypto.uuid(), fromId: ADMIN_ID, toId: selectedId, text: text.trim(), sentAt: new Date().toISOString(), read: false })
    setText('')
  }

  const selected = profiles.find((p) => p.id === selectedId)
  const msgs = selectedId ? conversation(selectedId) : []

  return (
    <div className="flex gap-4 h-[480px] max-w-2xl">
      <div className="w-48 shrink-0 space-y-1 overflow-y-auto">
        {nonAdmin.map((p) => {
          const count = unread(p.id)
          return (
            <button key={p.id} onClick={() => { setSelectedId(p.id); markAdminRead(p.id, ADMIN_ID) }}
              className={cn('w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors',
                selectedId === p.id ? 'bg-accent text-primary' : 'hover:bg-muted text-foreground')}>
              <Avatar profile={p} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.role === 'parent' ? 'Parent' : p.yearGroup}</p>
              </div>
              {count > 0 && <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0">{count}</span>}
            </button>
          )
        })}
        {nonAdmin.length === 0 && <p className="text-xs text-muted-foreground px-2">No users.</p>}
      </div>

      <div className="flex-1 oak-card flex flex-col overflow-hidden">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Select a user</div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
              <Avatar profile={selected} size="sm" />
              <p className="text-sm font-semibold text-foreground">{selected.name}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.length === 0 && <p className="text-center text-xs text-muted-foreground">No messages yet.</p>}
              {msgs.map((m) => {
                const isAdmin = m.fromId === ADMIN_ID
                return (
                  <div key={m.id} className={cn('flex', isAdmin ? 'justify-end' : 'justify-start')}>
                    <div className={cn('max-w-[75%] px-3.5 py-2 rounded-2xl text-sm', isAdmin ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm border border-border')}>
                      <p>{m.text}</p>
                      <p className={cn('text-xs mt-1', isAdmin ? 'text-primary-foreground/60' : 'text-muted-foreground')}>
                        {new Date(m.sentAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="px-4 py-3 border-t border-border flex gap-2">
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder={`Message ${selected.name}...`} className={inp} />
              <button onClick={send} className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-xl hover:opacity-90 shrink-0"><Send className="w-3.5 h-3.5" /></button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Admin shell ───────────────────────────────────────────────────────────────
type TabId = 'requests' | 'users' | 'families' | 'messages'

export function AdminPanel() {
  const navigate = useNavigate()
  const { setAdminSession, registrationRequests } = useAppStore()
  const { t } = useLang()
  const [tab, setTab] = useState<TabId>('requests')

  const pendingCount = registrationRequests.filter((r) => r.status === 'pending').length

  const TABS = [
    { id: 'requests' as TabId, icon: ClipboardList, label: t('admin.tabs.requests') },
    { id: 'users'    as TabId, icon: Users,         label: t('admin.tabs.users') },
    { id: 'families' as TabId, icon: GitBranch,     label: t('admin.tabs.families') },
    { id: 'messages' as TabId, icon: MessageSquare, label: t('admin.tabs.messages') },
  ]

  function logout() { setAdminSession(false); navigate('/') }

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm font-display">A</span>
          </div>
          <span className="font-display font-semibold italic text-foreground">{t('admin.title')}</span>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="w-4 h-4" /> {t('admin.signOut')}
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit mb-8">
          {TABS.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={cn('flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative',
                tab === id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
              <Icon className="w-4 h-4" /> {label}
              {id === 'requests' && pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-white text-xs flex items-center justify-center">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>
        {tab === 'requests' && <RequestsTab />}
        {tab === 'users'    && <UsersTab />}
        {tab === 'families' && <FamiliesTab />}
        {tab === 'messages' && <MessagesTab />}
      </div>
    </div>
  )
}
