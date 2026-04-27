import { useAppStore } from '@/state/store'
import { translate, type TKey } from './i18n'

/** Returns a `t(key, vars?)` translation function bound to the current language */
export function useLang() {
  const lang = useAppStore((s) => s.lang)
  return {
    lang,
    t: (key: TKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
  }
}
