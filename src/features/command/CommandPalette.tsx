import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from '@/components/ui/command'
import {
  LayoutDashboard, Users, ClipboardList, FileText,
  BookOpen, BarChart3, MessageSquare, Settings,
  Plus, LogOut,
} from 'lucide-react'
import { useAppStore } from '@/state/store'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const { profiles, activeProfileId, activeChildId, setActiveProfile, setActiveChild } = useAppStore()

  const activeProfile = profiles.find((p) => p.id === activeProfileId)
  const isParent = activeProfile?.role === 'parent'
  const childIds = activeProfile?.childIds ?? []
  const children = childIds.map((id) => profiles.find((p) => p.id === id)).filter(Boolean)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(true)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onOpenChange])

  function run(to: string) {
    navigate(to)
    onOpenChange(false)
  }

  function logout() {
    setActiveProfile(null)
    navigate('/')
    onOpenChange(false)
  }

  const NAV = isParent ? [
    { label: 'Aile Merkezi',      icon: LayoutDashboard, to: '/app/dashboard' },
    { label: 'Çocuklar',          icon: Users,            to: '/app/children' },
    { label: 'Sınavlar',          icon: ClipboardList,    to: '/app/quizzes' },
    { label: 'Ödevler',           icon: FileText,         to: '/app/homework' },
    { label: 'Dersler',           icon: BookOpen,         to: '/app/subjects' },
    { label: 'Raporlar',          icon: BarChart3,        to: '/app/reports' },
    { label: 'Mesajlar',          icon: MessageSquare,    to: '/app/messages' },
    { label: 'Ayarlar',           icon: Settings,         to: '/app/settings' },
  ] : [
    { label: 'Bugün',             icon: LayoutDashboard,  to: '/app/dashboard' },
    { label: 'Sınavlarım',        icon: ClipboardList,    to: '/app/quizzes' },
    { label: 'Ödevlerim',         icon: FileText,         to: '/app/homework' },
    { label: 'Derslerim',         icon: BookOpen,         to: '/app/subjects' },
    { label: 'Sonuçlarım',        icon: BarChart3,        to: '/app/reports' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-lg overflow-hidden">
        <Command className="rounded-lg">
          <CommandInput placeholder="Sayfa, çocuk veya komut ara..." />
          <CommandList>
            <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>

            <CommandGroup heading="Sayfalar">
              {NAV.map(({ label, icon: Icon, to }) => (
                <CommandItem key={to} onSelect={() => run(to)}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>

            {isParent && children.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Çocuğu Seç">
                  {children.map((c) => c && (
                    <CommandItem key={c.id} onSelect={() => { setActiveChild(c.id); run('/app/dashboard') }}>
                      <span className="mr-2 text-sm font-semibold w-4 h-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                        {c.name[0]}
                      </span>
                      {c.name} <span className="ml-1 text-muted-foreground text-xs">{c.yearGroup}</span>
                      {activeChildId === c.id && <CommandShortcut>Aktif</CommandShortcut>}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {isParent && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Hızlı Eylemler">
                  <CommandItem onSelect={() => run('/app/quizzes/new')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Sınav Oluştur
                    <CommandShortcut>⌘N</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={() => run('/app/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Profil Düzenle
                  </CommandItem>
                </CommandGroup>
              </>
            )}

            <CommandSeparator />
            <CommandGroup>
              <CommandItem onSelect={logout} className="text-destructive data-[selected]:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış Yap
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
