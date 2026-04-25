import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  BarChart3,
  BookOpen,
  Settings,
  Plus,
} from 'lucide-react'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NAV_COMMANDS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/app/dashboard' },
  { label: 'Sınavlar', icon: ClipboardList, to: '/app/quizzes' },
  { label: 'Ödevler', icon: FileText, to: '/app/homework' },
  { label: 'Dersler', icon: BookOpen, to: '/app/subjects' },
  { label: 'Raporlar', icon: BarChart3, to: '/app/reports' },
  { label: 'Ayarlar', icon: Settings, to: '/app/settings' },
]

const ACTION_COMMANDS = [
  { label: 'Yeni Sınav Oluştur', icon: Plus, to: '/app/quizzes/new', shortcut: '⌘N' },
  { label: 'Yeni Ödev Ekle', icon: Plus, to: '/app/homework/new' },
]

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-lg overflow-hidden">
        <Command className="rounded-lg">
          <CommandInput placeholder="Ara veya komut gir..." />
          <CommandList>
            <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>

            <CommandGroup heading="Sayfalar">
              {NAV_COMMANDS.map(({ label, icon: Icon, to }) => (
                <CommandItem key={to} onSelect={() => run(to)}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Aksiyonlar">
              {ACTION_COMMANDS.map(({ label, icon: Icon, to, shortcut }) => (
                <CommandItem key={to} onSelect={() => run(to)}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                  {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
