"use client";
import { useEffect, useRef, useState } from "react";
import { Lang, tr } from "@/lib/site";
const measures = [
  [
    ["C4", 1],
    ["D4", 1],
    ["E4", 2],
  ],
  [
    ["E4", 1],
    ["D4", 1],
    ["C4", 2],
  ],
  [
    ["C4", 1],
    ["E4", 1],
    ["F4", 1],
    ["E4", 1],
  ],
  [
    ["D4", 1],
    ["E4", 1],
    ["C4", 2],
  ],
] as const;
const frequency: Record<string, number> = {
  C4: 261.625565,
  D4: 293.664768,
  E4: 329.627557,
  F4: 349.228231,
};
export default function Music({ lang }: { lang: Lang }) {
  const [tempo, setTempo] = useState(72);
  const [loop, setLoop] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [measure, setMeasure] = useState(-1);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const context = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopped = useRef(true);
  function stop() {
    stopped.current = true;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    const ctx = context.current;
    context.current = null;
    if (ctx && ctx.state !== "closed") void ctx.close();
    setPlaying(false);
    setMeasure(-1);
  }
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const V = await import("vexflow");
      await Promise.all([
        document.fonts.load("20px Bravura"),
        document.fonts.load("12px Academico"),
      ]);
      if (cancelled) return;
      V.VexFlow.setFonts("Bravura", "Academico");
      measures.forEach((bar, i) => {
        const el = refs.current[i];
        if (!el) return;
        el.innerHTML = "";
        const renderer = new V.Renderer(el, V.Renderer.Backends.SVG);
        renderer.resize(300, 155);
        const ctx = renderer.getContext();
        ctx.setFillStyle("#123274").setStrokeStyle("#123274");
        const stave = new V.Stave(8, 12, 282);
        stave.addClef("treble");
        if (i === 0) stave.addTimeSignature("4/4");
        if (i === 3) stave.setEndBarType(V.BarlineType.END);
        stave.setContext(ctx).draw();
        const notes = bar.map(
          ([pitch, beats]) =>
            new V.StaveNote({
              clef: "treble",
              keys: [pitch[0].toLowerCase() + "/4"],
              duration: beats === 2 ? "h" : "q",
            }),
        );
        const voice = new V.Voice({ numBeats: 4, beatValue: 4 }).addTickables(
          notes,
        );
        new V.Formatter()
          .joinVoices([voice])
          .format([voice], i === 0 ? 183 : 205);
        voice.draw(ctx, stave);
        const svg = el.querySelector("svg");
        svg?.setAttribute("viewBox", "0 0 300 155");
        svg?.setAttribute("aria-hidden", "true");
      });
      setLoaded(true);
    })().catch(() => {
      if (!cancelled)
        setError(
          tr(
            lang,
            "A partitura não carregou. A sequência de notas continua disponível abaixo.",
            "The score did not load. The note sequence remains available below.",
          ),
        );
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);
  useEffect(() => {
    const hidden = () => {
      if (document.hidden) {
        stopped.current = true;
        if (timer.current) clearInterval(timer.current);
        if (context.current && context.current.state !== "closed")
          void context.current.close();
        context.current = null;
        setPlaying(false);
        setMeasure(-1);
      }
    };
    document.addEventListener("visibilitychange", hidden);
    return () => {
      document.removeEventListener("visibilitychange", hidden);
      stopped.current = true;
      if (timer.current) clearInterval(timer.current);
      if (context.current && context.current.state !== "closed")
        void context.current.close();
    };
  }, []);
  async function play() {
    try {
      stop();
      const ctx = new AudioContext();
      context.current = ctx;
      await ctx.resume();
      if (context.current !== ctx) return;
      stopped.current = false;
      setPlaying(true);
      setError("");
      const events = measures.flat();
      const spb = 60 / tempo;
      const start = ctx.currentTime + 0.1;
      let next = start,
        index = 0,
        complete = false;
      timer.current = setInterval(() => {
        if (stopped.current) return;
        const now = ctx.currentTime;
        while (!complete && next < now + 0.15) {
          const [pitch, beats] = events[index];
          const oscillator = ctx.createOscillator();
          const gain = ctx.createGain();
          oscillator.type = "triangle";
          oscillator.frequency.value = frequency[pitch];
          gain.gain.setValueAtTime(0, next);
          gain.gain.linearRampToValueAtTime(0.11, next + 0.018);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            next + beats * spb * 0.9,
          );
          oscillator.connect(gain);
          gain.connect(ctx.destination);
          oscillator.start(next);
          oscillator.stop(next + beats * spb);
          next += beats * spb;
          index++;
          if (index === events.length) {
            if (loop) index = 0;
            else complete = true;
          }
        }
        const beat = Math.max(0, (now - start) / spb);
        setMeasure(Math.floor((beat % 16) / 4));
        if (complete && now >= next) stop();
      }, 25);
    } catch {
      stop();
      setError(
        tr(
          lang,
          "Não foi possível iniciar o áudio neste navegador.",
          "Audio could not start in this browser.",
        ),
      );
    }
  }
  return (
    <div className="music-demo">
      <div className="music-top">
        <span className="cadencia-word">
          cadência<span>ESCOLA DE MÚSICA</span>
        </span>
        <span className="micro">
          {tr(
            lang,
            "Sala de estudo / Demonstração",
            "Practice room / Demonstration",
          )}
        </span>
      </div>
      <div className="music-layout">
        <div className="music-copy">
          <p className="micro">
            {tr(lang, "Piano · Estudo 01", "Piano · Study 01")}
          </p>
          <h3>
            Primeiro
            <br />
            <i>respiro.</i>
          </h3>
          <p>
            {tr(
              lang,
              "Quatro compassos para ouvir, acompanhar e repetir. Experimente um andamento mais lento.",
              "Four bars to listen to, follow and repeat. Try a slower tempo.",
            )}
          </p>
          <div className="music-transport">
            <button
              className="play-button"
              onClick={playing ? stop : play}
              aria-label={
                playing
                  ? tr(lang, "Parar reprodução", "Stop playback")
                  : tr(lang, "Ouvir estudo", "Play study")
              }
            >
              <span aria-hidden="true">{playing ? "■" : "▶"}</span>
              {playing
                ? tr(lang, "Parar", "Stop")
                : tr(lang, "Ouvir estudo", "Play study")}
            </button>
            <label className="loop-toggle">
              <input
                type="checkbox"
                checked={loop}
                disabled={playing}
                onChange={(e) => setLoop(e.target.checked)}
              />
              {tr(lang, "Repetir trecho", "Loop excerpt")}
            </label>
          </div>
          <label className="tempo-label" htmlFor="demo-tempo">
            {tr(lang, "Andamento", "Tempo")}
            <output>{tempo} BPM</output>
          </label>
          <input
            id="demo-tempo"
            aria-label={tr(lang, "Andamento em BPM", "Tempo in BPM")}
            type="range"
            min="48"
            max="112"
            step="4"
            value={tempo}
            onChange={(e) => {
              stop();
              setTempo(Number(e.target.value));
            }}
          />
          <div className="tempo-scale">
            <span>48</span>
            <span>112</span>
          </div>
          <p className="demo-disclosure">
            {tr(
              lang,
              "Som sintetizado. O áudio só começa quando você toca em ouvir.",
              "Synthesised sound. Audio only starts when you press play.",
            )}
          </p>
        </div>
        <div className="score-panel">
          <div className="score-heading">
            <strong>Primeiro respiro</strong>
            <span>4/4 · ♩ = {tempo}</span>
          </div>
          <div
            className="score-bars"
            aria-label={tr(
              lang,
              "Partitura de quatro compassos",
              "Four-bar musical score",
            )}
          >
            {measures.map((_, i) => (
              <div
                className={`score-bar ${measure === i ? "current" : ""}`}
                key={i}
              >
                <span className="bar-number">0{i + 1}</span>
                <div
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                />
                <span className="sr-only">
                  {tr(lang, "Compasso", "Bar")} {i + 1}
                </span>
              </div>
            ))}
          </div>
          {!loaded && !error && (
            <p className="demo-disclosure">
              {tr(lang, "Carregando notação…", "Loading notation…")}
            </p>
          )}
          <div className="score-footer">
            <span role="status">
              {playing
                ? `${tr(lang, "Compasso", "Bar")} ${measure + 1} / 4`
                : tr(lang, "Pronto para tocar", "Ready to play")}
            </span>
            <span>
              {tr(
                lang,
                "Estudo original · CADÊNCIA",
                "Original study · CADÊNCIA",
              )}
            </span>
          </div>
          <details className="note-sequence">
            <summary>
              {tr(lang, "Ler a sequência de notas", "Read the note sequence")}
            </summary>
            <p>
              {tr(
                lang,
                "1: Dó, Ré, Mi (2 tempos). 2: Mi, Ré, Dó (2 tempos). 3: Dó, Mi, Fá, Mi. 4: Ré, Mi, Dó (2 tempos). Demais notas: 1 tempo.",
                "1: C, D, E (2 beats). 2: E, D, C (2 beats). 3: C, E, F, E. 4: D, E, C (2 beats). All other notes: 1 beat.",
              )}
            </p>
          </details>
        </div>
      </div>
      {error && (
        <p className="demo-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
