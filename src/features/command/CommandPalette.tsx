import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { Plus, LogOut } from 'lucide-react'
import { useAppStore } from '@/state/store'
import { useLang } from '@/lib/useLang'
import { Avatar } from '@/components/Avatar'
import { OakwoodAssetIcon, type OakwoodAssetIconType } from '@/components/brand/OakwoodAssetIcon'

interface CommandPaletteProps { open: boolean; onOpenChange: (open: boolean) => void }

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const { profiles, activeProfileId, activeChildId, setActiveProfile, setActiveChild } = useAppStore()
  const { t } = useLang()

  const activeProfile = profiles.find((p) => p.id === activeProfileId)
  const isParent = activeProfile?.role === 'parent'
  const childIds = activeProfile?.childIds ?? []
  const children = childIds.map((id) => profiles.find((p) => p.id === id)).filter(Boolean)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); onOpenChange(true) }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onOpenChange])

  function run(to: string) { navigate(to); onOpenChange(false) }
  function logout() { setActiveProfile(null); navigate('/'); onOpenChange(false) }

  const NAV = isParent ? [
    { label: t('nav.familyHub'),   icon: 'family-hub', to: '/app/dashboard' },
    { label: t('nav.children'),    icon: 'family-hub', to: '/app/children' },
    { label: t('nav.quizzes'),     icon: 'quiz',       to: '/app/quizzes' },
    { label: t('nav.homework'),    icon: 'homework',   to: '/app/homework' },
    { label: t('nav.subjects'),    icon: 'lessons',    to: '/app/subjects' },
    { label: t('nav.reports'),     icon: 'report',     to: '/app/reports' },
    { label: t('nav.messages'),    icon: 'messages',   to: '/app/messages' },
    { label: t('nav.settings'),    icon: 'settings',   to: '/app/settings' },
  ] : [
    { label: t('nav.today'),          icon: 'family-hub', to: '/app/dashboard' },
    { label: t('nav.myAssessments'), icon: 'quiz',       to: '/app/quizzes' },
    { label: t('nav.myAssignments'), icon: 'homework',   to: '/app/homework' },
    { label: t('nav.mySubjects'),    icon: 'lessons',    to: '/app/subjects' },
    { label: t('nav.myProgress'),    icon: 'report',     to: '/app/reports' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-lg overflow-hidden">
        <Command className="rounded-lg">
          <CommandInput placeholder={t('cmd.placeholder')} />
          <CommandList>
            <CommandEmpty>{t('cmd.noResults')}</CommandEmpty>
            <CommandGroup heading={t('cmd.pages')}>
              {NAV.map(({ label, icon, to }) => (
                <CommandItem key={to} onSelect={() => run(to)}>
                  <OakwoodAssetIcon type={icon as OakwoodAssetIconType} className="mr-2 h-4 w-4" size={18} alt={`${label} icon`} /> {label}
                </CommandItem>
              ))}
            </CommandGroup>

            {isParent && children.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading={t('cmd.learners')}>
                  {children.map((c) => c && (
                    <CommandItem key={c.id} onSelect={() => { setActiveChild(c.id); run('/app/dashboard') }}>
                      <Avatar profile={c} size="sm" className="mr-2" />
                      {c.name} <span className="ml-1 text-muted-foreground text-xs">{c.yearGroup}</span>
                      {activeChildId === c.id && <CommandShortcut>{t('cmd.active')}</CommandShortcut>}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {isParent && (
              <>
                <CommandSeparator />
                <CommandGroup heading={t('cmd.actions')}>
                  <CommandItem onSelect={() => run('/app/quizzes/new')}>
                    <Plus className="mr-2 h-4 w-4" /> {t('cmd.newAssessment')}
                    <CommandShortcut>{t('cmd.newAssessmentShortcut')}</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={() => run('/app/settings')}>
                    <OakwoodAssetIcon type="settings" className="mr-2 h-4 w-4" size={18} alt="Settings icon" /> {t('cmd.editProfile')}
                  </CommandItem>
                </CommandGroup>
              </>
            )}

            <CommandSeparator />
            <CommandGroup>
              <CommandItem onSelect={logout} className="text-destructive data-[selected]:text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> {t('cmd.signOut')}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
