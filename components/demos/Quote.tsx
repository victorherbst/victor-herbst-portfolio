"use client";
import { useState } from "react";
import { Lang, money, tr } from "@/lib/site";
import { Arrow } from "../Chrome";
export default function Quote({ lang }: { lang: Lang }) {
  const [view, setView] = useState<"workshop" | "client">("workshop");
  const [finish, setFinish] = useState("natural");
  const [quantity, setQuantity] = useState(1);
  const [approved, setApproved] = useState(false);
  const [review, setReview] = useState(false);
  const unit = finish === "natural" ? 280000 : 310000;
  const total = unit * quantity + 18000;
  const reset = () => {
    setApproved(false);
    setReview(false);
    setQuantity(1);
    setFinish("natural");
    setView("workshop");
  };
  return (
    <div className="quote-demo">
      <aside className="quote-sidebar">
        <span className="oficio-word">
          ofício<sup>↗</sup>
        </span>
        <p className="micro">{tr(lang, "Oficina Bento", "Bento Workshop")}</p>
        <div
          role="group"
          aria-label={tr(lang, "Ponto de vista", "Perspective")}
          className="quote-perspectives"
        >
          <button
            aria-pressed={view === "workshop"}
            onClick={() => setView("workshop")}
          >
            {tr(lang, "Na oficina", "At the workshop")}
            <span>01</span>
          </button>
          <button
            aria-pressed={view === "client"}
            onClick={() => setView("client")}
          >
            {tr(lang, "Com o cliente", "With the client")}
            <span>02</span>
          </button>
        </div>
        <div className="quote-sidebar-note">
          <span aria-hidden="true">↳</span>
          <p>
            {tr(
              lang,
              "A mesma proposta. Duas perspectivas.",
              "The same proposal. Two perspectives.",
            )}
          </p>
        </div>
        <button className="reset-demo" onClick={reset}>
          {tr(lang, "Recomeçar demonstração", "Restart demonstration")} ↺
        </button>
      </aside>
      <div className="quote-main">
        <div className="quote-top">
          <span className="micro">
            OB-0044 /{" "}
            {view === "workshop"
              ? tr(lang, "Gestão", "Management")
              : tr(lang, "Área do cliente", "Client area")}
          </span>
          <span
            className={`quote-status ${approved ? "approved" : ""}`}
            role="status"
          >
            {approved
              ? tr(lang, "Aprovado", "Approved")
              : review
                ? tr(lang, "Em aprovação", "In review")
                : tr(lang, "Em preparação", "Draft")}
          </span>
        </div>
        <h3>{tr(lang, "Bancada do ateliê", "Studio workbench")}</h3>
        <p className="quote-description">
          {tr(
            lang,
            "Clara Almeida · Marcenaria sob medida · Dados fictícios",
            "Clara Almeida · Custom furniture · Fictional data",
          )}
        </p>
        {view === "workshop" ? (
          <>
            <div className="quote-fields">
              <label>
                {tr(lang, "Acabamento", "Finish")}
                <select
                  aria-label={tr(lang, "Acabamento", "Finish")}
                  value={finish}
                  disabled={approved}
                  onChange={(e) => {
                    setFinish(e.target.value);
                    setReview(false);
                  }}
                >
                  <option value="natural">
                    {tr(lang, "Madeira natural", "Natural wood")}
                  </option>
                  <option value="painted">
                    {tr(lang, "Pintura acetinada", "Satin finish")}
                  </option>
                </select>
              </label>
              <label>
                {tr(lang, "Quantidade", "Quantity")}
                <select
                  aria-label={tr(lang, "Quantidade", "Quantity")}
                  value={quantity}
                  disabled={approved}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value));
                    setReview(false);
                  }}
                >
                  {[1, 2, 3].map((n) => (
                    <option value={n} key={n}>
                      {n}{" "}
                      {tr(
                        lang,
                        n === 1 ? "unidade" : "unidades",
                        n === 1 ? "unit" : "units",
                      )}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="quote-context">
              {approved
                ? tr(
                    lang,
                    "Clara aprovou esta versão. Escopo e valor ficam registrados para a produção.",
                    "Clara approved this version. Scope and value are recorded for production.",
                  )
                : tr(
                    lang,
                    "Ajuste a proposta e veja como ela chega para quem encomendou.",
                    "Adjust the proposal and see how it looks to the person who ordered.",
                  )}
            </p>
          </>
        ) : (
          <div className="client-quote">
            <p>
              {tr(
                lang,
                "Olá, Clara. Sua proposta está aqui.",
                "Hi Clara. Your proposal is ready.",
              )}
            </p>
            <dl>
              <div>
                <dt>{tr(lang, "Peça", "Item")}</dt>
                <dd>
                  {quantity} ×{" "}
                  {tr(
                    lang,
                    "bancada de madeira, 160 × 60 cm",
                    "wood workbench, 160 × 60 cm",
                  )}
                </dd>
              </div>
              <div>
                <dt>{tr(lang, "Acabamento", "Finish")}</dt>
                <dd>
                  {finish === "natural"
                    ? tr(lang, "Madeira natural", "Natural wood")
                    : tr(lang, "Pintura acetinada", "Satin finish")}
                </dd>
              </div>
            </dl>
          </div>
        )}
        <div className="quote-price">
          <span>
            {tr(lang, "Peças", "Items")}
            <strong>{money(unit * quantity)}</strong>
          </span>
          <span>
            {tr(lang, "Entrega e montagem", "Delivery and assembly")}
            <strong>{money(18000)}</strong>
          </span>
          <span className="quote-total">
            Total<strong>{money(total)}</strong>
          </span>
        </div>
        {view === "workshop" ? (
          <button
            className="button quote-action"
            onClick={() => {
              setReview(true);
              setView("client");
            }}
          >
            {approved
              ? tr(lang, "Ver aprovação do cliente", "View client approval")
              : tr(lang, "Revisar como cliente", "Review as client")}
            <Arrow />
          </button>
        ) : (
          <button
            className="button quote-action"
            disabled={approved || !review}
            onClick={() => setApproved(true)}
          >
            {approved
              ? tr(lang, "Proposta aprovada ✓", "Proposal approved ✓")
              : tr(
                  lang,
                  "Aprovar proposta simulada",
                  "Approve simulated proposal",
                )}
            <Arrow />
          </button>
        )}
        {view === "client" && !review && (
          <p className="demo-disclosure">
            {tr(
              lang,
              "Prepare a proposta na oficina para liberar a aprovação.",
              "Prepare the proposal in the workshop to enable approval.",
            )}
          </p>
        )}
        <p className="demo-disclosure">
          {tr(
            lang,
            "Simulação independente. Não envia mensagens nem altera pedidos reais.",
            "Independent simulation. No messages are sent or real orders changed.",
          )}
        </p>
      </div>
    </div>
  );
}
