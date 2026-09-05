"use client";

import { useState } from "react";
import TechnicalSignature from "./TechnicalSignature";

type Language = "pt" | "en";
type FidelityView = "rebuild" | "violations" | "measures" | "authorship";

const sourceExcerpt =
  "Ah, a casa da minha infância... deixa eu ver. Era uma casa simples, sabe, chão de terra batida, minha avó varria todo dia de manhãzinha e jogava água pra poeira não subir. Tinha o fogão a lenha que minha mãe acendia ainda no escuro, e o cheiro... ai, o cheiro do café coado no pano.";

const reconstructedSegments = [
  { kind: "adjusted", text: "A casa da minha infância" },
  { kind: "stitch", text: " " },
  { kind: "source", text: "era uma casa simples" },
  { kind: "adjusted", text: ", chão de terra batida" },
  { kind: "stitch", text: ". " },
  {
    kind: "source",
    text: "Minha avó varria todo dia de manhãzinha e jogava água pra poeira não subir",
  },
  { kind: "stitch", text: ". " },
  {
    kind: "source",
    text: "Tinha o fogão a lenha que minha mãe acendia ainda no escuro, e o cheiro",
  },
  { kind: "adjusted", text: " do café coado no pano" },
  { kind: "stitch", text: "." },
] as const;

const copy = {
  pt: {
    eyebrow: "Myriad · transformação textual com proveniência",
    title: "Cada versão sabe de onde veio.",
    intro:
      "Uma semente imutável ancora todas as versões. Transformações especializadas podem estruturar, desenvolver, lapidar ou ficcionalizar o texto dentro de limites explícitos. O histórico permanece íntegro e o autor conserva controle sobre a obra.",
    techLabel: "Arquitetura verificável",
    stack: [
      ["Núcleo", "TypeScript · Node.js"],
      ["Modelos", "Anthropic API · contratos por medida"],
      ["Integridade", "SHA-256 · operações tipadas"],
      ["Histórico", "JSONL append-only · node:test"],
    ],
    tabs: {
      rebuild: "Reconstrução",
      violations: "Violações",
      measures: "Medidas",
      authorship: "Autoria",
    },
    rebuild: {
      label: "PODER 01 / PROVENIÊNCIA",
      title: "O texto final se recompõe por operações tipadas.",
      note: "Cada cópia, ajuste e costura ocupa uma faixa exata da saída. Se a soma das operações divergir por um caractere, o artefato é rejeitado.",
      legend: [
        ["source", "fonte literal"],
        ["adjusted", "ajuste rastreável"],
        ["stitch", "costura e pontuação"],
      ],
      sourceLabel: "SEMENTE CONGELADA",
      resultLabel: "RECONSTRUÇÃO VERIFICADA",
      checksum: "Σ operações = saída · 100%",
    },
    violations: {
      label: "PODER 02 / GATES SEMÂNTICOS",
      title: "A infração aparece junto com a regra quebrada.",
      note: "A mesma alteração pode ser permitida numa medida e proibida em outra. O observador relata o que ocorreu; o contrato deriva a violação em código.",
      source: "O que a fonte permite",
      candidate: "Transformação recusada",
      blocked: "BLOQUEADA PELO CONTRATO",
      cases: [
        {
          short: "Certeza",
          axis: "MODALIDADE",
          source:
            "A gente se mudou pra Vila Sereno acho que em oitenta e três, oitenta e quatro, por aí.",
          candidate: "Mudamo-nos para Vila Sereno em 1983.",
          reason: "A transformação crava uma data que a fonte manteve incerta.",
        },
        {
          short: "Causa",
          axis: "RELAÇÃO CAUSAL",
          source: "O rio encheu. Nesse mesmo ano eu larguei da cachaça.",
          candidate: "A enchente me fez largar a cachaça.",
          reason:
            "Dois fatos próximos no tempo foram soldados por uma causa não declarada.",
        },
        {
          short: "Interioridade",
          axis: "ESTADO DE TERCEIRO",
          source: "A Neide passou o pano no balcão e depois ficou parada ali.",
          candidate: "Neide ficou paralisada de tristeza diante do balcão.",
          reason: "A frase atribui uma emoção que a fonte nunca nomeou.",
        },
      ],
      mutationNote:
        "Teste adversarial: 7 de 9 mutações detectadas. As 2 lacunas estruturais permanecem documentadas.",
    },
    measures: {
      label: "PODER 03 / TETO CRIATIVO",
      title: "A mesma semente produz trabalhos diferentes sem trocar de motor.",
      note: "Cada medida compila autoridade de voz, perspectiva, composição e permissão por dimensão semântica. Um teto inválido é barrado antes da geração.",
      columns: [
        {
          index: "M1",
          title: "Registro documental",
          mode: "teto: elaboração retórica",
          permissions: [
            "fatos: somente fonte",
            "emoções: somente fonte",
            "causalidade: somente fonte",
          ],
          sample:
            "Nós era em nove dentro de casa, mais os cachorro, mais uma tia que aparecia e sumia quando dava na telha dela.",
        },
        {
          index: "M2",
          title: "Ficção especulativa",
          mode: "teto: invenção aberta",
          permissions: [
            "mundo: inventar",
            "personagens: inventar",
            "causalidade: inventar",
          ],
          sample:
            "No Beco do Sabiá, ninguém chorava perto de vasilha vazia. Essa era a lei da casa, mais velha que a avó, mais velha que o mangue.",
        },
      ],
      receipt:
        "Piloto pareado: 14 gerações · 42 julgamentos · adjudicação humana 14/14",
    },
    authorship: {
      label: "PODER 04 / SOBERANIA DO AUTOR",
      title: "A máquina propõe. O histórico não apaga a decisão humana.",
      note: "Aceitar, editar, remover, desfazer e escrever diretamente são eventos novos. Desfazer não apaga o passado: acrescenta uma nova linha de linhagem.",
      flow: [
        [
          "01",
          "Semente imutável",
          "Fonte e contrato recebem identidade por conteúdo.",
        ],
        [
          "02",
          "Transformação",
          "A proposta chega separada do material autoral.",
        ],
        [
          "03",
          "Decisão do autor",
          "Aceite, edição ou recusa ficam registrados.",
        ],
        [
          "04",
          "Versão autorada",
          "O estado atual é reconstruído pelo histórico.",
        ],
      ],
      limitationLabel: "FRONTEIRA CONHECIDA",
      limitation:
        "Depois da escrita direta do autor, a linhagem do evento existe, mas a proveniência por trecho do texto final ainda precisa de uma ontologia própria.",
    },
    principles: [
      [
        "01",
        "Semente imutável",
        "A origem permanece recuperável em todas as versões.",
      ],
      [
        "02",
        "Transformações especializadas",
        "Cada tarefa opera sob permissões próprias.",
      ],
      [
        "03",
        "Registro verificável",
        "Hashes, recibos e decisões preservam a linhagem.",
      ],
      [
        "04",
        "Soberania do autor",
        "A máquina nunca converte proposta em autoria por decreto.",
      ],
    ],
    proof:
      "140 execuções instrumentadas · 127 saídas contratuais · testes adversariais",
    caveat:
      "Garantias determinísticas cobrem integridade, reconstrução, identidade e linhagem. A fiscalização semântica é probabilística e exige revisão humana em decisões editoriais.",
  },
  en: {
    eyebrow: "Myriad · provenance-aware text transformation",
    title: "Every version knows where it came from.",
    intro:
      "An immutable seed anchors every version. Specialized transformations can structure, develop, polish or fictionalize text within explicit boundaries. History stays intact and the author remains in control of the work.",
    techLabel: "Verifiable architecture",
    stack: [
      ["Core", "TypeScript · Node.js"],
      ["Models", "Anthropic API · measure contracts"],
      ["Integrity", "SHA-256 · typed operations"],
      ["History", "Append-only JSONL · node:test"],
    ],
    tabs: {
      rebuild: "Reconstruction",
      violations: "Violations",
      measures: "Measures",
      authorship: "Authorship",
    },
    rebuild: {
      label: "POWER 01 / PROVENANCE",
      title: "Typed operations rebuild the final text.",
      note: "Every copy, adjustment and stitch owns an exact range of the output. If the operations diverge by one character, the artifact is rejected.",
      legend: [
        ["source", "literal source"],
        ["adjusted", "traceable adjustment"],
        ["stitch", "stitching and punctuation"],
      ],
      sourceLabel: "FROZEN SEED",
      resultLabel: "VERIFIED RECONSTRUCTION",
      checksum: "Σ operations = output · 100%",
    },
    violations: {
      label: "POWER 02 / SEMANTIC GATES",
      title: "A breach is reported with the rule it broke.",
      note: "The same change may be allowed by one measure and forbidden by another. An observer reports what happened; the contract derives the violation in code.",
      source: "What the source allows",
      candidate: "Rejected transformation",
      blocked: "BLOCKED BY CONTRACT",
      cases: [
        {
          short: "Certainty",
          axis: "MODALITY",
          source:
            "We moved to Vila Sereno, I think in eighty-three, eighty-four, around then.",
          candidate: "We moved to Vila Sereno in 1983.",
          reason:
            "The transformation fixes a date that the source deliberately left uncertain.",
        },
        {
          short: "Cause",
          axis: "CAUSAL RELATION",
          source: "The river flooded. That same year I quit drinking.",
          candidate: "The flood made me quit drinking.",
          reason:
            "Two facts close in time were joined by a causal link the source never stated.",
        },
        {
          short: "Interiority",
          axis: "THIRD-PARTY STATE",
          source: "Neide wiped the counter and then stood still there.",
          candidate:
            "Neide stood paralyzed by sadness in front of the counter.",
          reason: "The sentence attributes an emotion the source never named.",
        },
      ],
      mutationNote:
        "Adversarial test: 7 of 9 mutations detected. The 2 structural gaps remain documented.",
    },
    measures: {
      label: "POWER 03 / CREATIVE CEILING",
      title: "The same seed supports different work without changing engines.",
      note: "Each measure compiles voice authority, perspective, composition and permission by semantic dimension. An invalid ceiling is blocked before generation.",
      columns: [
        {
          index: "M1",
          title: "Documentary record",
          mode: "ceiling: rhetorical elaboration",
          permissions: [
            "facts: source only",
            "emotions: source only",
            "causality: source only",
          ],
          sample:
            "There were nine of us in the house, plus the dogs, plus an aunt who came and went whenever she felt like it.",
        },
        {
          index: "M2",
          title: "Speculative fiction",
          mode: "ceiling: open invention",
          permissions: [
            "world: invent",
            "characters: invent",
            "causality: invent",
          ],
          sample:
            "In Beco do Sabiá, nobody cried near an empty vessel. That was the law of the house, older than the grandmother, older than the mangrove.",
        },
      ],
      receipt:
        "Paired pilot: 14 generations · 42 judgments · 14/14 human adjudication",
    },
    authorship: {
      label: "POWER 04 / AUTHOR SOVEREIGNTY",
      title: "The machine proposes. History does not erase human choice.",
      note: "Accepting, editing, removing, undoing and writing directly are new events. Undo never erases the past: it adds another line to the lineage.",
      flow: [
        [
          "01",
          "Immutable seed",
          "Source and contract receive content identities.",
        ],
        [
          "02",
          "Transformation",
          "The proposal stays separate from authored material.",
        ],
        [
          "03",
          "Author decision",
          "Acceptance, editing or rejection is recorded.",
        ],
        ["04", "Authored version", "Current state is rebuilt from history."],
      ],
      limitationLabel: "KNOWN FRONTIER",
      limitation:
        "After direct author writing, event lineage exists, but span-level provenance in the final text still needs its own ontology.",
    },
    principles: [
      [
        "01",
        "Immutable seed",
        "Origin remains recoverable across every version.",
      ],
      [
        "02",
        "Specialized transformations",
        "Each task operates under its own permissions.",
      ],
      [
        "03",
        "Verifiable record",
        "Hashes, receipts and decisions preserve lineage.",
      ],
      [
        "04",
        "Author sovereignty",
        "The machine never turns a proposal into authorship by decree.",
      ],
    ],
    proof:
      "140 instrumented runs · 127 contractual outputs · adversarial tests",
    caveat:
      "Deterministic guarantees cover integrity, reconstruction, identity and lineage. Semantic review is probabilistic and requires human review for editorial decisions.",
  },
} as const;

export default function FidelityEngine({ language }: { language: Language }) {
  const [view, setView] = useState<FidelityView>("rebuild");
  const [violationIndex, setViolationIndex] = useState(0);
  const t = copy[language];
  const violation = t.violations.cases[violationIndex];

  return (
    <section
      className="fidelity"
      id="fidelity-engine"
      aria-labelledby="fidelity-title"
    >
      <div className="fidelity-inner shell">
        <header className="fidelity-heading">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <p>{t.intro}</p>
          </div>
          <h2 id="fidelity-title">{t.title}</h2>
        </header>

        <TechnicalSignature
          label={t.techLabel}
          items={t.stack}
          className="fidelity-technical-signature"
        />

        <div className="fidelity-console">
          <nav className="fidelity-tabs" aria-label={t.eyebrow}>
            {(Object.keys(t.tabs) as FidelityView[]).map((key, index) => (
              <button
                key={key}
                type="button"
                aria-pressed={view === key}
                className={view === key ? "is-active" : ""}
                onClick={() => setView(key)}
              >
                <span>0{index + 1}</span>
                {t.tabs[key]}
              </button>
            ))}
          </nav>

          <div className="fidelity-display" aria-live="polite">
            {view === "rebuild" ? (
              <div className="fidelity-view fidelity-rebuild">
                <div className="fidelity-view-intro">
                  <span>{t.rebuild.label}</span>
                  <h3>{t.rebuild.title}</h3>
                  <p>{t.rebuild.note}</p>
                  <div
                    className="fidelity-legend"
                    aria-label="Provenance legend"
                  >
                    {t.rebuild.legend.map(([kind, label]) => (
                      <span key={kind} data-kind={kind}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="fidelity-rebuild-stage">
                  <div className="fidelity-source-line">
                    <span>{t.rebuild.sourceLabel}</span>
                    <p>{sourceExcerpt}</p>
                  </div>
                  <div className="fidelity-result-line">
                    <span>{t.rebuild.resultLabel}</span>
                    <p className="fidelity-prose">
                      {reconstructedSegments.map((segment, index) => (
                        <mark
                          data-kind={segment.kind}
                          key={`${segment.kind}-${index}`}
                        >
                          {segment.text}
                        </mark>
                      ))}
                    </p>
                  </div>
                  <strong className="fidelity-checksum">
                    {t.rebuild.checksum}
                  </strong>
                </div>
              </div>
            ) : null}

            {view === "violations" ? (
              <div className="fidelity-view fidelity-violations">
                <div className="fidelity-view-intro">
                  <span>{t.violations.label}</span>
                  <h3>{t.violations.title}</h3>
                  <p>{t.violations.note}</p>
                </div>
                <div className="fidelity-violation-lab">
                  <div className="fidelity-violation-tabs">
                    {t.violations.cases.map((item, index) => (
                      <button
                        key={item.axis}
                        type="button"
                        className={violationIndex === index ? "is-active" : ""}
                        aria-pressed={violationIndex === index}
                        onClick={() => setViolationIndex(index)}
                      >
                        <span>0{index + 1}</span>
                        {item.short}
                      </button>
                    ))}
                  </div>
                  <div className="fidelity-violation-compare">
                    <div>
                      <span>{t.violations.source}</span>
                      <blockquote>{violation.source}</blockquote>
                    </div>
                    <div>
                      <span>{t.violations.candidate}</span>
                      <blockquote>{violation.candidate}</blockquote>
                    </div>
                  </div>
                  <div className="fidelity-verdict">
                    <span>{t.violations.blocked}</span>
                    <strong>{violation.axis}</strong>
                    <p>{violation.reason}</p>
                  </div>
                  <p className="fidelity-mutation-note">
                    {t.violations.mutationNote}
                  </p>
                </div>
              </div>
            ) : null}

            {view === "measures" ? (
              <div className="fidelity-view fidelity-measures">
                <div className="fidelity-view-intro">
                  <span>{t.measures.label}</span>
                  <h3>{t.measures.title}</h3>
                  <p>{t.measures.note}</p>
                </div>
                <div className="fidelity-measure-stage">
                  <div className="fidelity-measure-grid">
                    {t.measures.columns.map((measure) => (
                      <article key={measure.index}>
                        <span>{measure.index}</span>
                        <h4>{measure.title}</h4>
                        <strong>{measure.mode}</strong>
                        <ul>
                          {measure.permissions.map((permission) => (
                            <li key={permission}>{permission}</li>
                          ))}
                        </ul>
                        <blockquote>{measure.sample}</blockquote>
                      </article>
                    ))}
                  </div>
                  <p className="fidelity-receipt">{t.measures.receipt}</p>
                </div>
              </div>
            ) : null}

            {view === "authorship" ? (
              <div className="fidelity-view fidelity-authorship">
                <div className="fidelity-view-intro">
                  <span>{t.authorship.label}</span>
                  <h3>{t.authorship.title}</h3>
                  <p>{t.authorship.note}</p>
                </div>
                <div className="fidelity-lineage-stage">
                  <ol className="fidelity-lineage">
                    {t.authorship.flow.map(([number, title, text]) => (
                      <li key={number}>
                        <span>{number}</span>
                        <div>
                          <strong>{title}</strong>
                          <p>{text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="fidelity-limitation">
                    <span>{t.authorship.limitationLabel}</span>
                    <p>{t.authorship.limitation}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="fidelity-principles">
          {t.principles.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <footer className="fidelity-proof">
          <strong>{t.proof}</strong>
          <span>{t.caveat}</span>
        </footer>
      </div>
    </section>
  );
}
