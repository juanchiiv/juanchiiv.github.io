import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'es';

/** Any string a visitor reads exists in both languages. There is no fallback on purpose:
 *  a missing translation should be a type error, not a silent English leak. */
export type LText = Record<Lang, string>;

const STORAGE_KEY = 'jdvp.lang';

function detect(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    /* private mode — fall through to the browser preference */
  }
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')) return 'es';
  return 'en';
}

interface LangValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangValue>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* nothing to do — the choice just will not persist */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = useCallback((text: LText) => text[lang], [lang]);
  return { lang, setLang, t };
}
