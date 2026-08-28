"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Language = "pt" | "en";
type SkyFamily = "night" | "day";

type Sky = {
  id: string;
  name: string;
  family: SkyFamily;
  pair: string;
  vars: {
    fundo: string;
    superficie: string;
    superficie2: string;
    linha: string;
    ceu: string;
    ceu2?: string;
    ceuTinta: string;
    texto: string;
    textoSuave: string;
  };
  action: { bg: string; fg: string };
  identity: string;
};

const TEXT_NIGHT = "oklch(0.91 0.02 85)";
const TEXT_SOFT_NIGHT = "oklch(0.640 0.022 80)";

const SKIES: Sky[] = [
  { id: "noite", name: "Noite", family: "night", pair: "Grafite", vars: { fundo: "oklch(0.19 0.012 78)", superficie: "oklch(0.225 0.016 78)", superficie2: "oklch(0.26 0.018 78)", linha: "oklch(0.31 0.018 78)", ceu: "oklch(0.72 0.06 82)", ceuTinta: "oklch(0.17 0.03 82)", texto: TEXT_NIGHT, textoSuave: TEXT_SOFT_NIGHT }, action: { bg: "oklch(0.741 0.088 79.1)", fg: "oklch(0.18 0.05 79)" }, identity: "#2A49CF" },
  { id: "alvorada", name: "Alvorada", family: "night", pair: "Algodão", vars: { fundo: "oklch(0.19 0.017 30)", superficie: "oklch(0.226 0.021 28)", superficie2: "oklch(0.262 0.024 28)", linha: "oklch(0.31 0.028 27)", ceu: "oklch(0.72 0.115 22)", ceuTinta: "oklch(0.17 0.05 24)", texto: TEXT_NIGHT, textoSuave: TEXT_SOFT_NIGHT }, action: { bg: "oklch(0.75 0.125 40)", fg: "oklch(0.20 0.05 40)" }, identity: "oklch(0.48 0.14 20)" },
  { id: "sertao", name: "Sertão", family: "night", pair: "Girassol", vars: { fundo: "oklch(0.215 0.028 85)", superficie: "oklch(0.25 0.032 83)", superficie2: "oklch(0.285 0.035 83)", linha: "oklch(0.34 0.04 82)", ceu: "oklch(0.74 0.15 70)", ceu2: "oklch(0.78 0.135 100)", ceuTinta: "oklch(0.18 0.06 75)", texto: "oklch(0.90 0.04 90)", textoSuave: "oklch(0.657 0.05 88)" }, action: { bg: "oklch(0.70 0.185 45)", fg: "oklch(0.17 0.06 45)" }, identity: "oklch(0.45 0.13 60)" },
  { id: "mata", name: "Mata", family: "night", pair: "Hortelã", vars: { fundo: "oklch(0.19 0.015 150)", superficie: "oklch(0.225 0.019 150)", superficie2: "oklch(0.26 0.022 150)", linha: "oklch(0.31 0.024 150)", ceu: "oklch(0.72 0.105 152)", ceuTinta: "oklch(0.17 0.05 152)", texto: TEXT_NIGHT, textoSuave: TEXT_SOFT_NIGHT }, action: { bg: "oklch(0.78 0.14 130)", fg: "oklch(0.20 0.06 140)" }, identity: "oklch(0.42 0.10 152)" },
  { id: "vagalume", name: "Vaga-lume", family: "night", pair: "Limão", vars: { fundo: "oklch(0.155 0.012 150)", superficie: "oklch(0.19 0.018 150)", superficie2: "oklch(0.225 0.022 150)", linha: "oklch(0.28 0.03 150)", ceu: "oklch(0.84 0.20 145)", ceuTinta: "oklch(0.15 0.06 150)", texto: "oklch(0.88 0.05 145)", textoSuave: "oklch(0.607 0.07 148)" }, action: { bg: "oklch(0.86 0.19 140)", fg: "oklch(0.16 0.07 145)" }, identity: "oklch(0.45 0.14 145)" },
  { id: "mare", name: "Maré", family: "night", pair: "Lagoa", vars: { fundo: "oklch(0.19 0.014 210)", superficie: "oklch(0.225 0.017 208)", superficie2: "oklch(0.26 0.02 208)", linha: "oklch(0.31 0.022 206)", ceu: "oklch(0.73 0.095 204)", ceuTinta: "oklch(0.17 0.05 206)", texto: TEXT_NIGHT, textoSuave: TEXT_SOFT_NIGHT }, action: { bg: "oklch(0.72 0.135 35)", fg: "oklch(0.20 0.05 35)" }, identity: "oklch(0.42 0.09 205)" },
  { id: "algodao", name: "Algodão", family: "day", pair: "Alvorada", vars: { fundo: "oklch(0.965 0.012 350)", superficie: "oklch(0.99 0.006 350)", superficie2: "oklch(0.94 0.02 350)", linha: "oklch(0.88 0.03 350)", ceu: "oklch(0.575 0.15 355)", ceuTinta: "oklch(0.99 0.01 350)", texto: "oklch(0.32 0.06 350)", textoSuave: "oklch(0.528 0.05 350)" }, action: { bg: "oklch(0.572 0.17 355)", fg: "oklch(0.98 0.01 350)" }, identity: "oklch(0.55 0.16 355)" },
  { id: "tangerina", name: "Tangerina", family: "day", pair: "Cerrado", vars: { fundo: "oklch(0.965 0.016 60)", superficie: "oklch(0.987 0.009 60)", superficie2: "oklch(0.935 0.024 58)", linha: "oklch(0.875 0.03 57)", ceu: "oklch(0.570 0.15 50)", ceuTinta: "oklch(0.99 0.012 60)", texto: "oklch(0.30 0.05 45)", textoSuave: "oklch(0.52 0.05 48)" }, action: { bg: "oklch(0.572 0.155 45)", fg: "oklch(0.99 0.012 55)" }, identity: "oklch(0.52 0.14 48)" },
  { id: "girassol", name: "Girassol", family: "day", pair: "Sertão", vars: { fundo: "oklch(0.965 0.02 95)", superficie: "oklch(0.985 0.01 95)", superficie2: "oklch(0.935 0.028 93)", linha: "oklch(0.87 0.035 92)", ceu: "oklch(0.558 0.13 90)", ceuTinta: "oklch(0.99 0.012 95)", texto: "oklch(0.29 0.045 85)", textoSuave: "oklch(0.51 0.05 87)" }, action: { bg: "oklch(0.48 0.09 75)", fg: "oklch(0.98 0.012 90)" }, identity: "oklch(0.50 0.11 88)" },
  { id: "lagoa", name: "Lagoa", family: "day", pair: "Maré", vars: { fundo: "oklch(0.96 0.016 195)", superficie: "oklch(0.984 0.009 195)", superficie2: "oklch(0.93 0.022 195)", linha: "oklch(0.868 0.028 196)", ceu: "oklch(0.54 0.10 200)", ceuTinta: "oklch(0.98 0.01 195)", texto: "oklch(0.28 0.04 210)", textoSuave: "oklch(0.50 0.04 205)" }, action: { bg: "oklch(0.46 0.10 198)", fg: "oklch(0.97 0.01 195)" }, identity: "oklch(0.46 0.09 200)" },
  { id: "amanhecer", name: "Amanhecer", family: "day", pair: "Garoa", vars: { fundo: "oklch(0.945 0.018 225)", superficie: "oklch(0.975 0.01 220)", superficie2: "oklch(0.915 0.022 222)", linha: "oklch(0.86 0.03 230)", ceu: "oklch(0.78 0.115 85)", ceu2: "oklch(0.62 0.11 235)", ceuTinta: "oklch(0.30 0.06 85)", texto: "oklch(0.30 0.04 250)", textoSuave: "oklch(0.506 0.04 245)" }, action: { bg: "oklch(0.542 0.12 240)", fg: "oklch(0.97 0.01 230)" }, identity: "oklch(0.45 0.09 240)" },
  { id: "lavanda", name: "Lavanda", family: "day", pair: "Serpentina", vars: { fundo: "oklch(0.958 0.013 300)", superficie: "oklch(0.983 0.008 300)", superficie2: "oklch(0.928 0.02 300)", linha: "oklch(0.87 0.028 300)", ceu: "oklch(0.56 0.13 300)", ceuTinta: "oklch(0.98 0.01 300)", texto: "oklch(0.29 0.05 305)", textoSuave: "oklch(0.51 0.05 302)" }, action: { bg: "oklch(0.50 0.13 300)", fg: "oklch(0.97 0.01 300)" }, identity: "oklch(0.47 0.12 300)" },
];

function styleFor(sky: Sky) {
  return {
    "--sky-bg": sky.vars.fundo,
    "--sky-surface": sky.vars.superficie,
    "--sky-surface-2": sky.vars.superficie2,
    "--sky-line": sky.vars.linha,
    "--sky-color": sky.vars.ceu,
    "--sky-color-2": sky.vars.ceu2 ?? sky.vars.ceu,
    "--sky-ink": sky.vars.ceuTinta,
    "--sky-text": sky.vars.texto,
    "--sky-muted": sky.vars.textoSuave,
    "--sky-action": sky.action.bg,
    "--sky-action-text": sky.action.fg,
    "--sky-identity": sky.identity,
  } as CSSProperties;
}

export default function SkyAtlas({ language }: { language: Language }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const selected = SKIES.find((sky) => sky.id === selectedId) ?? null;
  const isOpen = selectedId !== null;
  const copy = language === "pt" ? {
    open: "Abrir atmosfera", close: "Fechar atmosfera", family: "família", pair: "par",
    night: "noite", day: "dia", source: "tokens canônicos do produto", preview: "prévia aplicada",
    lesson: "A próxima coisa certa", sentence: "Revise o que voltou. Depois, avance uma peça.",
    progress: "7 palavras reencontradas", action: "Continuar a jornada", next: "Próximo céu",
    tokens: "Tokens emitidos", hint: "Escolha um céu para aplicar seus tokens reais.",
  } : {
    open: "Open atmosphere", close: "Close atmosphere", family: "family", pair: "pair",
    night: "night", day: "day", source: "canonical production tokens", preview: "applied preview",
    lesson: "The next right thing", sentence: "Review what returned. Then move forward one piece.",
    progress: "7 words recovered", action: "Continue the journey", next: "Next sky",
    tokens: "Emitted tokens", hint: "Choose a sky to apply its real tokens.",
  };

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [isOpen]);

  const chooseNext = () => {
    const currentIndex = SKIES.findIndex((sky) => sky.id === selectedId);
    setSelectedId(SKIES[(currentIndex + 1) % SKIES.length].id);
  };

  return (
    <>
      <p className="sky-atlas-hint">{copy.hint}</p>
      <div className="sky-grid" aria-label={copy.hint}>
        {SKIES.map((sky) => (
          <button
            className={`sky-tile sky-${sky.family}`}
            key={sky.id}
            type="button"
            style={{ background: `linear-gradient(145deg, ${sky.vars.fundo} 42%, ${sky.vars.ceu2 ?? sky.vars.ceu})` }}
            onClick={() => setSelectedId(sky.id)}
            aria-label={`${copy.open}: ${sky.name}`}
          >
            <span>{sky.name}</span>
            <small>{copy[sky.family]} · {copy.pair} {sky.pair}</small>
          </button>
        ))}
      </div>

      {selected && (
        <div className="sky-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedId(null); }}>
          <section ref={modalRef} className="sky-modal" role="dialog" aria-modal="true" aria-labelledby="sky-modal-title" style={styleFor(selected)}>
            <header className="sky-modal-head">
              <div><span>{copy.source}</span><h3 id="sky-modal-title">{selected.name}</h3><p>{copy.family} {copy[selected.family]} · {copy.pair} {selected.pair}</p></div>
              <button ref={closeRef} type="button" onClick={() => setSelectedId(null)} aria-label={copy.close}>×</button>
            </header>
            <div className="sky-modal-body">
              <div className="sky-live-preview">
                <div className="sky-preview-nav"><b>C</b><span>{copy.preview}</span><i /></div>
                <div className="sky-preview-content">
                  <span className="sky-preview-kicker">CÉU {selected.name}</span>
                  <h4>{copy.lesson}</h4>
                  <p>{copy.sentence}</p>
                  <div className="sky-preview-card"><span>{copy.progress}</span><strong>72%</strong><i /></div>
                  <span className="sky-preview-action">{copy.action}</span>
                </div>
              </div>
              <div className="sky-token-panel">
                <div className="sky-token-heading"><h4>{copy.tokens}</h4><button type="button" onClick={chooseNext}>{copy.next} <span aria-hidden="true">→</span></button></div>
                <dl>
                  {[
                    ["fundo", selected.vars.fundo], ["superfície", selected.vars.superficie],
                    ["superfície 2", selected.vars.superficie2], ["linha", selected.vars.linha],
                    ["texto", selected.vars.texto], ["texto suave", selected.vars.textoSuave],
                    ["céu", selected.vars.ceu], ...(selected.vars.ceu2 ? [["céu 2", selected.vars.ceu2]] : []),
                    ["ação", selected.action.bg], ["ação · tinta", selected.action.fg], ["identidade", selected.identity],
                  ].map(([name, value]) => <div key={name}><dt>{name}</dt><dd><i style={{ background: value }} /><code>{value}</code></dd></div>)}
                </dl>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
