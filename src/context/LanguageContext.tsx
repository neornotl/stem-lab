"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Language, type TranslationKeys } from "@/lib/i18n";

interface LangCtx {
  lang: Language;
  t: TranslationKeys;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({
  lang: "vi",
  t: translations.vi,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("vi");
  return (
    <Ctx.Provider
      value={{
        lang,
        t: translations[lang],
        toggle: () => setLang((p) => (p === "vi" ? "en" : "vi")),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
