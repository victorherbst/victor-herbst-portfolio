"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import neoColorSource from "../data/neo-color-proof.json";
import neoMotionSource from "../data/neo-motion-proof.json";

type Language = "pt" | "en";

type ColorState = {
  estado: number;
  rotulo: string;
  grade: string[];
};

type MotionState = {
  rotulo: string;
  angulo_nucleo: number;
  core_area: number;
  atraso_medio: number;
  atraso_max: number;
  overshoot_medio: number;
  pontas_contadas: number;
};

type ColorProof = {
  version: string;
  ceu: string;
  paleta: Record<string, string>;
  counts: Record<string, Record<string, number>>;
  estados: ColorState[];
};

type MotionProof = {
  version: string;
  regime: string;
  invariante: string;
  core_area_media: number;
  estados: MotionState[];
};

const colorProof = neoColorSource as ColorProof;
const motionProof = neoMotionSource as MotionProof;

const stateNames = {
  pt: ["espécie", "carga", "giro", "overshoot"],
  en: ["species", "load", "turn", "overshoot"],
} as const;

const boardImages = [
  { src: "/portfolio/pets/haru-anatomy.png", width: 2370, height: 1030, key: "anatomy" },
  { src: "/portfolio/pets/haru-onion.png", width: 1222, height: 658, key: "onion" },
  { src: "/portfolio/pets/bori-acting.png", width: 1056, height: 1150, key: "acting" },
] as const;

function NeoCanvas({ frame, metric, large = false, label }: {
  frame: ColorState;
  metric: MotionState;
  large?: boolean;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const cell = canvas.width / 48;
    const pixels: Array<{ x: number; y: number }> = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#0b1612";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = false;

    context.strokeStyle = large ? "rgba(128, 146, 178, 0.1)" : "rgba(128, 146, 178, 0.07)";
    context.lineWidth = 1;
    for (let point = 0; point <= 48; point += 4) {
      context.beginPath();
      context.moveTo(point * cell, 0);
      context.lineTo(point * cell, canvas.height);
      context.stroke();
      context.beginPath();
      context.moveTo(0, point * cell);
      context.lineTo(canvas.width, point * cell);
      context.stroke();
    }

    frame.grade.forEach((row, y) => {
      [...row].forEach((token, x) => {
        if (token === ".") return;
        pixels.push({ x, y });
        context.fillStyle = colorProof.paleta[token] ?? "#fff";
        context.fillRect(x * cell, y * cell, cell, cell);
      });
    });

    if (!large || pixels.length === 0) return;

    const centerX = pixels.reduce((sum, point) => sum + point.x, 0) / pixels.length + 0.5;
    const centerY = pixels.reduce((sum, point) => sum + point.y, 0) / pixels.length + 0.5;
    const cx = centerX * cell;
    const cy = centerY * cell;
    const angle = metric.angulo_nucleo * Math.PI / 180;

    context.save();
    context.translate(cx, cy);
    context.rotate(angle);
    context.setLineDash([5, 7]);
    context.strokeStyle = "rgba(103, 235, 114, 0.6)";
    context.lineWidth = 1.25;
    for (let tip = 0; tip < 5; tip += 1) {
      const ray = -Math.PI / 2 + tip * (Math.PI * 2 / 5);
      context.beginPath();
      context.moveTo(Math.cos(ray) * 4.5 * cell, Math.sin(ray) * 4.5 * cell);
      context.lineTo(Math.cos(ray) * 12 * cell, Math.sin(ray) * 12 * cell);
      context.stroke();
    }
    context.restore();

    context.setLineDash([]);
    context.strokeStyle = "rgba(237, 85, 40, 0.92)";
    context.lineWidth = 2;
    context.beginPath();
    const arcStart = -Math.PI * 0.72;
    const arcEnd = angle === 0 ? arcStart + Math.PI * 0.5 : arcStart + angle;
    context.arc(cx, cy, 8.5 * cell, arcStart, arcEnd, angle < 0);
    context.stroke();

    const coreRadius = Math.sqrt(metric.core_area / Math.PI) * cell;
    context.strokeStyle = "rgba(214, 227, 244, 0.86)";
    context.lineWidth = 1.25;
    context.beginPath();
    context.arc(cx, cy, coreRadius, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.moveTo(cx - 7, cy);
    context.lineTo(cx + 7, cy);
    context.moveTo(cx, cy - 7);
    context.lineTo(cx, cy + 7);
    context.stroke();
  }, [frame, metric, large]);

  return <canvas ref={canvasRef} width={large ? 672 : 288} height={large ? 672 : 288} aria-label={label} />;
}

export default function PetBlueprints({ language }: { language: Language }) {
  const [selected, setSelected] = useState(2);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSelected((current) => (current + 1) % colorProof.estados.length);
    }, 1050);
    return () => window.clearInterval(timer);
  }, [playing]);

  const copy = language === "pt" ? {
    plate: "DOSSIÊ DE MOVIMENTO · NEO / V3.11",
    intent: "O núcleo inicia o giro; cinco pontas desiguais atrasam, atravessam a direção e retornam em overshoot.",
    active: "estado em prova",
    play: "reproduzir sequência",
    pause: "pausar sequência",
    core: "área do núcleo",
    angle: "rotação",
    lag: "atraso máx.",
    overshoot: "overshoot",
    tips: "pontas auditadas",
    invariant: "invariante",
    invariantText: "núcleo rígido + cinco raízes; só as pontas flexionam",
    palette: "propagação cromática · céu Vaga-lume",
    pixels: "pixels",
    process: "atlas de desenvolvimento",
    processNote: "A forja registra anatomia, transferência de massa, transições e atuação antes de exportar cada ciclo.",
    boards: {
      anatomy: ["01 / Haru · anatomia", "cabeça · tronco · cauda · membrana · apoio"],
      onion: ["02 / Haru · onion skin", "sete transições e correções de trajetória"],
      acting: ["03 / Bori · atuação", "microgestos, pausas, passos e ciclos narrativos"],
    },
  } : {
    plate: "MOTION DOSSIER · NEO / V3.11",
    intent: "The core initiates the turn; five unequal tips lag, cross the direction and return in overshoot.",
    active: "state under test",
    play: "play sequence",
    pause: "pause sequence",
    core: "core area",
    angle: "rotation",
    lag: "max lag",
    overshoot: "overshoot",
    tips: "audited tips",
    invariant: "invariant",
    invariantText: "rigid core + five roots; only the tips flex",
    palette: "chromatic propagation · Firefly sky",
    pixels: "pixels",
    process: "development atlas",
    processNote: "The forge records anatomy, weight transfer, transitions and acting before each cycle is exported.",
    boards: {
      anatomy: ["01 / Haru · anatomy", "head · torso · tail · membrane · support"],
      onion: ["02 / Haru · onion skin", "seven transitions and trajectory corrections"],
      acting: ["03 / Bori · acting", "micro-gestures, pauses, steps and narrative cycles"],
    },
  };

  const activeFrame = colorProof.estados[selected];
  const activeMetric = motionProof.estados[selected];
  const activeCounts = colorProof.counts[String(selected)] ?? {};

  return (
    <figure className="pet-blueprints">
      <figcaption>
        <span>{copy.plate}</span>
        <p>{copy.intent}</p>
      </figcaption>

      <div className="neo-workbench">
        <div className="neo-stage">
          <div className="neo-stage-head">
            <span>NEO–0{selected + 1}</span>
            <strong>{stateNames[language][selected]}</strong>
            <button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>
              <i className={playing ? "is-playing" : ""} aria-hidden="true" />
              {playing ? copy.pause : copy.play}
            </button>
          </div>
          <div className="neo-canvas-wrap">
            <NeoCanvas frame={activeFrame} metric={activeMetric} large label={`Neo: ${stateNames[language][selected]}, 48 by 48 semantic grid`} />
            <span className="neo-callout neo-core-callout">{copy.core} · {activeMetric.core_area}px</span>
            <span className="neo-callout neo-angle-callout">{activeMetric.angulo_nucleo > 0 ? "+" : ""}{activeMetric.angulo_nucleo.toFixed(1)}°</span>
          </div>
        </div>

        <aside className="neo-metrics" aria-label={copy.active}>
          <span>{copy.active}</span>
          <strong>{stateNames[language][selected]}</strong>
          <dl>
            <div><dt>{copy.angle}</dt><dd>{activeMetric.angulo_nucleo > 0 ? "+" : ""}{activeMetric.angulo_nucleo.toFixed(1)}°</dd></div>
            <div><dt>{copy.lag}</dt><dd>{Math.abs(activeMetric.atraso_max).toFixed(1)}°</dd></div>
            <div><dt>{copy.overshoot}</dt><dd>{Math.max(0, activeMetric.overshoot_medio).toFixed(1)}°</dd></div>
            <div><dt>{copy.tips}</dt><dd>0{activeMetric.pontas_contadas}</dd></div>
          </dl>
          <p><small>{copy.invariant}</small>{copy.invariantText}</p>
          <em>{motionProof.core_area_media.toFixed(1)}px · core area mean</em>
        </aside>
      </div>

      <div className="neo-state-rail" role="tablist" aria-label="Neo motion states">
        {colorProof.estados.map((frame, index) => (
          <button key={frame.estado} type="button" role="tab" aria-selected={selected === index} className={selected === index ? "is-active" : ""} onClick={() => { setSelected(index); setPlaying(false); }}>
            <span>0{index + 1}</span>
            <NeoCanvas frame={frame} metric={motionProof.estados[index]} label={`Neo: ${stateNames[language][index]}`} />
            <strong>{stateNames[language][index]}</strong>
            <small>{motionProof.estados[index].angulo_nucleo > 0 ? "+" : ""}{motionProof.estados[index].angulo_nucleo.toFixed(0)}°</small>
          </button>
        ))}
      </div>

      <div className="neo-palette-ledger">
        <div>
          <span>{copy.palette}</span>
          <strong>#67EB72</strong>
        </div>
        <div className="neo-swatches">
          {Object.entries(colorProof.paleta).map(([token, color]) => (
            <i key={token} style={{ background: color }} title={`${token} · ${color}`}>
              <b>{token}</b><small>{activeCounts[token] ?? 0} {copy.pixels}</small>
            </i>
          ))}
        </div>
      </div>

      <section className="production-proof">
        <header><span>{copy.process}</span><p>{copy.processNote}</p></header>
        <div className="production-proof-wall">
          {boardImages.map((board) => {
            const [title, note] = copy.boards[board.key];
            return (
              <article className={`proof-sheet proof-${board.key}`} key={board.key}>
                <Image src={board.src} alt={`${title}: ${note}`} width={board.width} height={board.height} sizes="(max-width: 620px) 88vw, (max-width: 980px) 76vw, 760px" />
                <div><strong>{title}</strong><span>{note}</span></div>
              </article>
            );
          })}
        </div>
      </section>
    </figure>
  );
}
