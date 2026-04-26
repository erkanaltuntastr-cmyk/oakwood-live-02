import { useState } from 'react'
import { useAppStore } from '@/state/store'
import { Avatar, getColor } from '@/components/Avatar'
import { crypto } from '@/lib/crypto'
import type { Profile } from '@/types'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'

const YEAR_GROUPS = Array.from({ length: 13 }, (_, i) => `Year ${i + 1}`)

// ── Shared input style ─────────────────────────────────────────────────────
const inp = 'w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40'

// ── Parent edit card ───────────────────────────────────────────────────────
function ParentCard({ profile }: { profile: Profile }) {
  const { updateProfile } = useAppStore()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: profile.name,
    surname: profile.surname ?? '',
    email: profile.email ?? '',
    postcode: profile.postcode ?? '',
    familyName: profile.familyName ?? '',
    pin: '',
    pinConfirm: '',
  })
  const [error, setError] = useState('')

  function save() {
    if (!form.name.trim()) { setError('Ad zorunlu'); return }
    if (form.pin && form.pin.length !== 4) { setError('PIN 4 haneli olmalı'); return }
    if (form.pin && form.pin !== form.pinConfirm) { setError("PIN'ler eşleşmiyor"); return }
    const updates: Partial<Profile> = {
      name: form.name.trim(),
      surname: form.surname.trim() || undefined,
      email: form.email.trim() || undefined,
      postcode: form.postcode.trim() || undefined,
      familyName: form.familyName.trim() || undefined,
    }
    const initials = [form.name[0], form.surname?.[0]].filter(Boolean).join('').toUpperCase()
    updates.initials = initials || profile.initials
    if (form.pin) updates.pinHash = form.pin
    updateProfile(profile.id, updates)
    setEditing(false)
    setError('')
  }

  return (
    <div className="oak-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar profile={profile} size="md" />
          <div>
            <p className="font-semibold text-foreground">{profile.name} {profile.surname}</p>
            <p className="text-xs text-muted-foreground">Veli</p>
          </div>
        </div>
        <button onClick={() => setEditing(!editing)}
          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          {editing ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
        </button>
      </div>

      {!editing ? (
        <div className="space-y-1.5 text-sm">
          {profile.email && <p className="text-muted-foreground">{profile.email}</p>}
          {profile.postcode && <p className="text-muted-foreground">{profile.postcode}</p>}
          {profile.familyName && <p className="text-muted-foreground">Aile: {profile.familyName}</p>}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Ad *</label>
              <input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Soyad</label>
              <input className={inp} value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">E-posta</label>
            <input className={inp} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Posta Kodu</label>
              <input className={inp} value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Aile Adı</label>
              <input className={inp} value={form.familyName} onChange={(e) => setForm({ ...form, familyName: e.target.value })} />
            </div>
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">PIN Değiştir (boş bırakırsan değişmez)</p>
            <div className="grid grid-cols-2 gap-3">
              <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="Yeni PIN" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g,'').slice(0,4) })} />
              <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="Tekrar" value={form.pinConfirm} onChange={(e) => setForm({ ...form, pinConfirm: e.target.value.replace(/\D/g,'').slice(0,4) })} />
            </div>
          </div>
          {error && <p className="text-destructive text-xs">{error}</p>}
          <div className="flex gap-2 pt-1">
            <button onClick={() => { setEditing(false); setError('') }} className="flex-1 oak-btn-ghost text-sm py-2">İptal</button>
            <button onClick={save} className="flex-1 oak-btn-primary text-sm py-2 flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Child edit card ────────────────────────────────────────────────────────
function ChildCard({ profile }: { profile: Profile }) {
  const { updateProfile, deleteProfile } = useAppStore()
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [form, setForm] = useState({
    name: profile.name,
    surname: profile.surname ?? '',
    yearGroup: profile.yearGroup ?? '',
    school: profile.school ?? '',
    dob: profile.dob ?? '',
    notes: profile.notes ?? '',
    hobbies: profile.hobbies?.join(', ') ?? '',
    pin: '',
    pinConfirm: '',
  })
  const [error, setError] = useState('')

  function save() {
    if (!form.name.trim()) { setError('Ad zorunlu'); return }
    if (form.pin && form.pin.length !== 4) { setError('PIN 4 haneli olmalı'); return }
    if (form.pin && form.pin !== form.pinConfirm) { setError("PIN'ler eşleşmiyor"); return }
    const initials = [form.name[0], form.surname?.[0]].filter(Boolean).join('').toUpperCase()
    const updates: Partial<Profile> = {
      name: form.name.trim(),
      surname: form.surname.trim() || undefined,
      yearGroup: form.yearGroup || undefined,
      school: form.school.trim() || undefined,
      dob: form.dob.trim() || undefined,
      notes: form.notes.trim() || undefined,
      hobbies: form.hobbies ? form.hobbies.split(',').map((h) => h.trim()).filter(Boolean) : [],
      initials: initials || profile.initials,
    }
    if (form.pin) updates.pinHash = form.pin
    updateProfile(profile.id, updates)
    setEditing(false)
    setError('')
  }

  return (
    <div className="oak-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar profile={profile} size="md" />
          <div>
            <p className="font-semibold text-foreground">{profile.name} {profile.surname}</p>
            <p className="text-xs text-muted-foreground">{profile.yearGroup} {profile.school ? `· ${profile.school}` : ''}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => { setEditing(!editing); setConfirmDelete(false) }}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            {editing ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
          </button>
          <button onClick={() => setConfirmDelete(true)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {confirmDelete && !editing && (
        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 mb-3">
          <p className="text-sm text-destructive font-medium mb-2">Bu profili silmek istediğinden emin misin?</p>
          <div className="flex gap-2">
            <button onClick={() => setConfirmDelete(false)} className="flex-1 oak-btn-ghost text-xs py-1.5">İptal</button>
            <button onClick={() => deleteProfile(profile.id)} className="flex-1 px-3 py-1.5 bg-destructive text-white rounded-lg text-xs font-medium hover:bg-destructive/90">Sil</button>
          </div>
        </div>
      )}

      {!editing ? (
        <div className="space-y-1 text-sm text-muted-foreground">
          {profile.notes && <p className="italic">"{profile.notes}"</p>}
          {profile.hobbies?.length ? <p>Hobiler: {profile.hobbies.join(', ')}</p> : null}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Ad *</label>
              <input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Soyad</label>
              <input className={inp} value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Yıl Grubu</label>
              <select className={inp} value={form.yearGroup} onChange={(e) => setForm({ ...form, yearGroup: e.target.value })}>
                <option value="">Seç...</option>
                {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Doğum Tarihi</label>
              <input className={inp} placeholder="GG/AA/YYYY" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Okul</label>
            <input className={inp} value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Notlar</label>
            <textarea className={inp} rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Hobiler (virgülle ayır)</label>
            <input className={inp} placeholder="Yüzme, Satranç, Resim" value={form.hobbies} onChange={(e) => setForm({ ...form, hobbies: e.target.value })} />
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">PIN Değiştir</p>
            <div className="grid grid-cols-2 gap-3">
              <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="Yeni PIN" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g,'').slice(0,4) })} />
              <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="Tekrar" value={form.pinConfirm} onChange={(e) => setForm({ ...form, pinConfirm: e.target.value.replace(/\D/g,'').slice(0,4) })} />
            </div>
          </div>
          {error && <p className="text-destructive text-xs">{error}</p>}
          <div className="flex gap-2 pt-1">
            <button onClick={() => { setEditing(false); setError('') }} className="flex-1 oak-btn-ghost text-sm py-2">İptal</button>
            <button onClick={save} className="flex-1 oak-btn-primary text-sm py-2 flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Add child inline form ──────────────────────────────────────────────────
function AddChildForm({ parentId, onDone }: { parentId: string; onDone: () => void }) {
  const { addProfile, updateProfile, profiles } = useAppStore()
  const [form, setForm] = useState({ name: '', surname: '', yearGroup: '', school: '', pin: '', pinConfirm: '' })
  const [error, setError] = useState('')

  function save() {
    if (!form.name.trim()) { setError('Ad zorunlu'); return }
    if (!form.yearGroup) { setError('Yıl grubu zorunlu'); return }
    if (form.pin.length !== 4) { setError('PIN 4 haneli olmalı'); return }
    if (form.pin !== form.pinConfirm) { setError("PIN'ler eşleşmiyor"); return }

    const id = crypto.uuid()
    const initials = [form.name[0], form.surname?.[0]].filter(Boolean).join('').toUpperCase()
    addProfile({
      id,
      role: 'child',
      name: form.name.trim(),
      surname: form.surname.trim() || undefined,
      initials,
      color: getColor(id),
      pinHash: form.pin,
      yearGroup: form.yearGroup,
      school: form.school.trim() || undefined,
      createdAt: new Date().toISOString(),
    })
    // link to parent
    const parent = profiles.find((p) => p.id === parentId)
    if (parent) updateProfile(parentId, { childIds: [...(parent.childIds ?? []), id] })
    onDone()
  }

  return (
    <div className="oak-card p-5 border-dashed">
      <p className="text-sm font-semibold text-foreground mb-4">Yeni Çocuk</p>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Ad *</label>
            <input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Soyad</label>
            <input className={inp} value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Yıl Grubu *</label>
            <select className={inp} value={form.yearGroup} onChange={(e) => setForm({ ...form, yearGroup: e.target.value })}>
              <option value="">Seç...</option>
              {YEAR_GROUPS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Okul</label>
            <input className={inp} value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">PIN *</label>
          <div className="grid grid-cols-2 gap-3">
            <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="4 haneli PIN" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g,'').slice(0,4) })} />
            <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="Tekrar" value={form.pinConfirm} onChange={(e) => setForm({ ...form, pinConfirm: e.target.value.replace(/\D/g,'').slice(0,4) })} />
          </div>
        </div>
        {error && <p className="text-destructive text-xs">{error}</p>}
        <div className="flex gap-2 pt-1">
          <button onClick={onDone} className="flex-1 oak-btn-ghost text-sm py-2">İptal</button>
          <button onClick={save} className="flex-1 oak-btn-primary text-sm py-2 flex items-center justify-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Ekle
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Add parent inline form ─────────────────────────────────────────────────
function AddParentForm({ onDone }: { onDone: () => void }) {
  const { addProfile } = useAppStore()
  const [form, setForm] = useState({ name: '', surname: '', email: '', pin: '', pinConfirm: '' })
  const [error, setError] = useState('')

  function save() {
    if (!form.name.trim()) { setError('Ad zorunlu'); return }
    if (form.pin.length !== 4) { setError('PIN 4 haneli olmalı'); return }
    if (form.pin !== form.pinConfirm) { setError("PIN'ler eşleşmiyor"); return }
    const id = crypto.uuid()
    const initials = [form.name[0], form.surname?.[0]].filter(Boolean).join('').toUpperCase()
    addProfile({
      id,
      role: 'parent',
      name: form.name.trim(),
      surname: form.surname.trim() || undefined,
      email: form.email.trim() || undefined,
      initials,
      color: getColor(id),
      pinHash: form.pin,
      childIds: [],
      createdAt: new Date().toISOString(),
    })
    onDone()
  }

  return (
    <div className="oak-card p-5 border-dashed">
      <p className="text-sm font-semibold text-foreground mb-4">Yeni Veli</p>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Ad *</label>
            <input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Soyad</label>
            <input className={inp} value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">E-posta</label>
          <input className={inp} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">PIN *</label>
          <div className="grid grid-cols-2 gap-3">
            <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="4 haneli PIN" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g,'').slice(0,4) })} />
            <input className={inp} type="password" inputMode="numeric" maxLength={4} placeholder="Tekrar" value={form.pinConfirm} onChange={(e) => setForm({ ...form, pinConfirm: e.target.value.replace(/\D/g,'').slice(0,4) })} />
          </div>
        </div>
        {error && <p className="text-destructive text-xs">{error}</p>}
        <div className="flex gap-2 pt-1">
          <button onClick={onDone} className="flex-1 oak-btn-ghost text-sm py-2">İptal</button>
          <button onClick={save} className="flex-1 oak-btn-primary text-sm py-2 flex items-center justify-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Ekle
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Settings page ──────────────────────────────────────────────────────────
export function Settings() {
  const { profiles, activeProfileId } = useAppStore()
  const [addingChild, setAddingChild] = useState(false)
  const [addingParent, setAddingParent] = useState(false)

  const activeProfile = profiles.find((p) => p.id === activeProfileId)
  const isParent = activeProfile?.role === 'parent'

  const parents  = profiles.filter((p) => p.role === 'parent')
  const childIds = isParent ? (activeProfile?.childIds ?? []) : []
  const children = childIds.map((id) => profiles.find((p) => p.id === id)).filter(Boolean) as Profile[]

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-display font-semibold italic text-foreground">Ayarlar</h1>
        <p className="text-muted-foreground text-sm mt-1">Profilleri düzenle, PIN'leri güncelle.</p>
      </div>

      {/* Parents section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Veliler</h2>
          {!addingParent && (
            <button onClick={() => setAddingParent(true)}
              className="flex items-center gap-1.5 text-sm text-primary hover:opacity-80 font-medium transition-opacity">
              <Plus className="w-4 h-4" /> Veli Ekle
            </button>
          )}
        </div>
        {parents.map((p) => <ParentCard key={p.id} profile={p} />)}
        {addingParent && <AddParentForm onDone={() => setAddingParent(false)} />}
      </section>

      {/* Children section — only visible to parents */}
      {isParent && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Çocuklar</h2>
            {!addingChild && (
              <button onClick={() => setAddingChild(true)}
                className="flex items-center gap-1.5 text-sm text-primary hover:opacity-80 font-medium transition-opacity">
                <Plus className="w-4 h-4" /> Çocuk Ekle
              </button>
            )}
          </div>
          {children.map((c) => <ChildCard key={c.id} profile={c} />)}
          {addingChild && (
            <AddChildForm parentId={activeProfileId!} onDone={() => setAddingChild(false)} />
          )}
          {children.length === 0 && !addingChild && (
            <div className="oak-card p-8 text-center text-muted-foreground text-sm">
              Henüz çocuk eklenmemiş.
            </div>
          )}
        </section>
      )}
    </div>
  )
}
