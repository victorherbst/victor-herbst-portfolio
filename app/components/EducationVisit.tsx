"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import VictorMonogram from "./VictorMonogram";

type Language = "pt" | "en";
type Answer = "do" | "make" | "ask";

const sceneCount = 4;
const hashPattern = /^#visit-education-([1-4])$/;

const copy = {
  pt: {
    entry: {
      eyebrow: "Visita guiada · prova de conceito",
      title: "Veja um problema de aprendizagem virar produto.",
      text: "Quatro cenas. Uma microdemonstração utilizável. Nenhum chatbot.",
      action: "Entrar no percurso",
    },
    chrome: {
      label: "Educação e aquisição de linguagem",
      close: "Sair da visita",
      previous: "Anterior",
      next: "Próxima cena",
      scene: "Cena",
    },
    problem: {
      kicker: "01 · O problema concreto",
      title: "O aluno sabe as palavras. A frase ainda não aparece.",
      text: "Quando alguém escreve “do a question”, o erro não está numa lista de vocabulário. Está na maneira como duas línguas organizam a mesma intenção.",
      label: "resposta observada",
      note: "A tradução palavra por palavra produz uma frase compreensível e ainda assim pouco natural.",
    },
    demo: {
      kicker: "02 · Microdemonstração",
      title: "Escolha a expressão que você usaria.",
      instruction: "Complete a frase. A devolutiva muda conforme sua hipótese.",
      sentenceStart: "Can I",
      sentenceEnd: "a question before we start?",
      prompt: "Escolha uma expressão",
      correct:
        "Você reconheceu a colocação natural: ask a question. O verbo já carrega a ação de formular a pergunta.",
      doFeedback:
        "“Do” herda a lógica de “fazer uma pergunta”. O sistema identifica transferência do português, não falta de vocabulário.",
      makeFeedback:
        "“Make” costuma criar ou produzir algo. Aqui, a ação linguística convencional é ask a question.",
      mechanism: "mecanismo diagnosticado",
      reset: "Tentar outra resposta",
      continueHint: "Escolha uma opção para continuar.",
    },
    model: {
      kicker: "03 · Diagnóstico, feedback e revisão",
      title: "Uma resposta alimenta quatro decisões.",
      text: "O produto preserva o raciocínio pedagógico entre a primeira tentativa e o próximo encontro.",
      stages: [
        [
          "Observação",
          "Registrar a expressão escolhida sem apagar a intenção comunicativa.",
        ],
        [
          "Diagnóstico",
          "Separar transferência lexical, colocação e domínio da estrutura interrogativa.",
        ],
        [
          "Feedback",
          "Explicar ask a question dentro da frase, sem reduzir a devolutiva a certo ou errado.",
        ],
        [
          "Revisão",
          "Testar a mesma construção com novo sujeito, contexto e distância temporal.",
        ],
      ],
      returnLabel: "próximo retorno",
      returnSentence: "Could I ask you something before we leave?",
    },
    synthesis: {
      kicker: "04 · Síntese",
      title: "Pedagogia, conteúdo e produto compartilham a mesma decisão.",
      text: "Este é o tipo de sistema que construo: a explicação nasce do erro real, a interface preserva o julgamento linguístico e a revisão verifica transferência.",
      principles: [
        ["01", "Erro como evidência"],
        ["02", "Feedback como mecanismo"],
        ["03", "Revisão como transferência"],
      ],
      cta: "Quero discutir um sistema de aprendizagem",
      exit: "Voltar ao portfólio",
      subject: "Projeto de educação e aquisição de linguagem",
    },
  },
  en: {
    entry: {
      eyebrow: "Guided visit · proof of concept",
      title: "Watch a learning problem become a product.",
      text: "Four scenes. One usable micro-demo. No chatbot.",
      action: "Enter the path",
    },
    chrome: {
      label: "Education and language acquisition",
      close: "Exit visit",
      previous: "Previous",
      next: "Next scene",
      scene: "Scene",
    },
    problem: {
      kicker: "01 · The concrete problem",
      title: "The learner knows the words. The sentence still does not appear.",
      text: "When someone writes “do a question”, the issue is not a vocabulary list. It is how two languages organize the same intention.",
      label: "observed response",
      note: "Word-for-word translation creates a sentence that is understandable and still unnatural.",
    },
    demo: {
      kicker: "02 · Micro-demo",
      title: "Choose the expression you would use.",
      instruction:
        "Complete the sentence. The feedback changes with your hypothesis.",
      sentenceStart: "Can I",
      sentenceEnd: "a question before we start?",
      prompt: "Choose an expression",
      correct:
        "You recognized the natural collocation: ask a question. The verb already carries the act of formulating the question.",
      doFeedback:
        "“Do” inherits the logic of the Portuguese phrase. The system identifies language transfer, not missing vocabulary.",
      makeFeedback:
        "“Make” usually creates or produces something. Here, the conventional language action is ask a question.",
      mechanism: "diagnosed mechanism",
      reset: "Try another answer",
      continueHint: "Choose an option to continue.",
    },
    model: {
      kicker: "03 · Diagnosis, feedback and review",
      title: "One response feeds four decisions.",
      text: "The product preserves pedagogical reasoning between the first attempt and the next encounter.",
      stages: [
        [
          "Observation",
          "Record the chosen expression without erasing the communicative intention.",
        ],
        [
          "Diagnosis",
          "Separate lexical transfer, collocation and command of the question structure.",
        ],
        [
          "Feedback",
          "Explain ask a question inside the sentence instead of reducing feedback to right or wrong.",
        ],
        [
          "Review",
          "Test the same construction with a new subject, context and time interval.",
        ],
      ],
      returnLabel: "next encounter",
      returnSentence: "Could I ask you something before we leave?",
    },
    synthesis: {
      kicker: "04 · Synthesis",
      title: "Pedagogy, content and product share the same decision.",
      text: "This is the kind of system I build: the explanation begins with a real error, the interface preserves linguistic judgment and review tests transfer.",
      principles: [
        ["01", "Error as evidence"],
        ["02", "Feedback as mechanism"],
        ["03", "Review as transfer"],
      ],
      cta: "Discuss a learning system",
      exit: "Return to portfolio",
      subject: "Education and language acquisition project",
    },
  },
} as const;

function readSceneFromHash() {
  if (typeof window === "undefined") return null;
  const match = window.location.hash.match(hashPattern);
  return match ? Number(match[1]) - 1 : null;
}

export default function EducationVisit({ language }: { language: Language }) {
  const [scene, setScene] = useState<number | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const stageRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const t = copy[language];

  const openScene = useCallback((next: number, replace = false) => {
    const bounded = Math.max(0, Math.min(sceneCount - 1, next));
    setScene(bounded);
    const hash = `#visit-education-${bounded + 1}`;
    if (window.location.hash !== hash) {
      window.history[replace ? "replaceState" : "pushState"](null, "", hash);
    }
  }, []);

  const close = useCallback(() => {
    setScene(null);
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#education-visit`,
    );
    document.body.classList.remove("education-visit-open");
    window.requestAnimationFrame(() =>
      launchRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  useEffect(() => {
    const sync = () => setScene(readSceneFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  useEffect(() => {
    if (scene === null) {
      document.body.classList.remove("education-visit-open");
      return;
    }
    stageRef.current?.showModal();
    document.body.classList.add("education-visit-open");
    window.requestAnimationFrame(() =>
      headingRef.current?.focus({ preventScroll: true }),
    );
    return () => document.body.classList.remove("education-visit-open");
  }, [scene]);

  useEffect(() => {
    if (scene === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowLeft" && scene > 0) {
        event.preventDefault();
        openScene(scene - 1);
        return;
      }
      if (
        event.key === "ArrowRight" &&
        scene < sceneCount - 1 &&
        (scene !== 1 || answer)
      ) {
        event.preventDefault();
        openScene(scene + 1);
        return;
      }
      if (event.key !== "Tab" || !stageRef.current) return;
      const focusable = Array.from(
        stageRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answer, close, openScene, scene]);

  const feedback =
    answer === "ask"
      ? t.demo.correct
      : answer === "make"
        ? t.demo.makeFeedback
        : t.demo.doFeedback;
  const observedAnswer = answer ?? "do";

  return (
    <>
      <section
        className="education-visit-entry shell"
        id="education-visit"
        aria-labelledby="education-visit-title"
      >
        <p className="eyebrow">{t.entry.eyebrow}</p>
        <div>
          <h2 id="education-visit-title">{t.entry.title}</h2>
          <p>{t.entry.text}</p>
        </div>
        <button ref={launchRef} type="button" onClick={() => openScene(0)}>
          {t.entry.action}
          <span aria-hidden="true">→</span>
        </button>
      </section>

      {scene !== null ? (
        <dialog
          ref={stageRef}
          className="education-stage"
          aria-labelledby="education-stage-title"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <header className="education-stage-header">
            <VictorMonogram className="education-stage-mark" />
            <p>{t.chrome.label}</p>
            <button type="button" onClick={close}>
              {t.chrome.close}
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div
            className="education-stage-progress"
            aria-label={`${t.chrome.scene} ${scene + 1} / ${sceneCount}`}
          >
            <span>{String(scene + 1).padStart(2, "0")}</span>
            <div>
              {Array.from({ length: sceneCount }, (_, index) => (
                <i className={index <= scene ? "is-reached" : ""} key={index} />
              ))}
            </div>
            <span>{String(sceneCount).padStart(2, "0")}</span>
          </div>

          <div className="education-stage-body" key={scene}>
            {scene === 0 ? (
              <section className="education-scene education-scene-problem">
                <div className="education-scene-copy">
                  <p className="education-scene-kicker">{t.problem.kicker}</p>
                  <h2 ref={headingRef} tabIndex={-1} id="education-stage-title">
                    {t.problem.title}
                  </h2>
                  <p>{t.problem.text}</p>
                </div>
                <div
                  className="education-problem-proof"
                  aria-label={t.problem.label}
                >
                  <span>{t.problem.label}</span>
                  <p>
                    Can I <strong>do</strong> a question before we start?
                  </p>
                  <i>{t.problem.note}</i>
                </div>
              </section>
            ) : null}

            {scene === 1 ? (
              <section className="education-scene education-scene-demo">
                <div className="education-scene-copy">
                  <p className="education-scene-kicker">{t.demo.kicker}</p>
                  <h2 ref={headingRef} tabIndex={-1} id="education-stage-title">
                    {t.demo.title}
                  </h2>
                  <p>{t.demo.instruction}</p>
                </div>
                <div className="education-demo" aria-label={t.demo.prompt}>
                  <div className="education-demo-sentence">
                    <span>{t.demo.sentenceStart}</span>
                    <strong className={answer ? "has-answer" : ""}>
                      {answer ?? "_____"}
                    </strong>
                    <span>{t.demo.sentenceEnd}</span>
                  </div>
                  <div
                    className="education-demo-options"
                    role="group"
                    aria-label={t.demo.prompt}
                  >
                    {(["do", "make", "ask"] as Answer[]).map((choice) => (
                      <button
                        type="button"
                        aria-pressed={answer === choice}
                        className={answer === choice ? "is-selected" : ""}
                        onClick={() => setAnswer(choice)}
                        key={choice}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                  {answer ? (
                    <div
                      className={`education-demo-feedback ${answer === "ask" ? "is-correct" : ""}`}
                      aria-live="polite"
                    >
                      <span>{t.demo.mechanism}</span>
                      <p>{feedback}</p>
                      <button type="button" onClick={() => setAnswer(null)}>
                        {t.demo.reset}
                      </button>
                    </div>
                  ) : (
                    <p className="education-demo-hint">{t.demo.continueHint}</p>
                  )}
                </div>
              </section>
            ) : null}

            {scene === 2 ? (
              <section className="education-scene education-scene-model">
                <header>
                  <p className="education-scene-kicker">{t.model.kicker}</p>
                  <h2 ref={headingRef} tabIndex={-1} id="education-stage-title">
                    {t.model.title}
                  </h2>
                  <p>{t.model.text}</p>
                </header>
                <div className="education-decision-line">
                  {t.model.stages.map(([title, text], index) => (
                    <article key={title}>
                      <span>0{index + 1}</span>
                      <h3>{title}</h3>
                      <p>
                        {index === 0
                          ? `${text} “${observedAnswer} a question”.`
                          : text}
                      </p>
                    </article>
                  ))}
                </div>
                <div className="education-return">
                  <span>{t.model.returnLabel}</span>
                  <p>{t.model.returnSentence}</p>
                </div>
              </section>
            ) : null}

            {scene === 3 ? (
              <section className="education-scene education-scene-synthesis">
                <div className="education-scene-copy">
                  <p className="education-scene-kicker">{t.synthesis.kicker}</p>
                  <h2 ref={headingRef} tabIndex={-1} id="education-stage-title">
                    {t.synthesis.title}
                  </h2>
                  <p>{t.synthesis.text}</p>
                </div>
                <ol>
                  {t.synthesis.principles.map(([number, label]) => (
                    <li key={number}>
                      <span>{number}</span>
                      {label}
                    </li>
                  ))}
                </ol>
                <div className="education-synthesis-actions">
                  <a href={language === "pt" ? "/#contato" : "/en#contato"}>
                    {t.synthesis.cta}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </section>
            ) : null}
          </div>

          <footer className="education-stage-footer">
            <button
              type="button"
              onClick={() => openScene(scene - 1)}
              disabled={scene === 0}
            >
              <span aria-hidden="true">←</span>
              {t.chrome.previous}
            </button>
            <span>
              {t.chrome.scene} {scene + 1} / {sceneCount}
            </span>
            {scene < sceneCount - 1 ? (
              <button
                type="button"
                className="education-stage-next"
                onClick={() => openScene(scene + 1)}
                disabled={scene === 1 && !answer}
              >
                {t.chrome.next}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button
                type="button"
                className="education-stage-next"
                onClick={close}
              >
                {t.chrome.close}
                <span aria-hidden="true">×</span>
              </button>
            )}
          </footer>
        </dialog>
      ) : null}
    </>
  );
}
