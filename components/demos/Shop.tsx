"use client";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Lang, money, tr } from "@/lib/site";
import { WorkImage } from "../ProjectArt";
import { Arrow } from "../Chrome";
import Dialog from "./Dialog";
type Item = { size: string; quantity: number };
const stock: Record<string, number> = { PP: 2, P: 4, M: 5, G: 3, GG: 0 };
const KEY = "vh:maia-bag:v1";
const get = () => {
  try {
    return localStorage.getItem(KEY) || "[]";
  } catch {
    return "[]";
  }
};
const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener("vh:bag", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("vh:bag", cb);
  };
};
function decode(value: string): Item[] {
  try {
    const data = JSON.parse(value);
    if (!Array.isArray(data)) return [];
    return data
      .filter(
        (i: Item, index: number, all: Item[]) =>
          i &&
          typeof i.size === "string" &&
          stock[i.size] > 0 &&
          Number.isInteger(i.quantity) &&
          i.quantity > 0 &&
          all.findIndex((x) => x?.size === i.size) === index,
      )
      .map((i: Item) => ({
        size: i.size,
        quantity: Math.min(stock[i.size], i.quantity),
      }));
  } catch {
    return [];
  }
}
export default function Shop({ lang }: { lang: Lang }) {
  const raw = useSyncExternalStore(subscribe, get, () => "[]");
  const cart = useMemo(() => decode(raw), [raw]);
  const [fallback, setFallback] = useState<Item[] | null>(null);
  const items = fallback || cart;
  const [size, setSize] = useState("");
  const [detail, setDetail] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [guide, setGuide] = useState(false);
  const [receipt, setReceipt] = useState<number | null>(null);
  const [error, setError] = useState("");
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = count * 39800;
  const total = subtotal + (count ? 2000 : 0);
  const write = (next: Item[]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("vh:bag"));
    } catch {
      setFallback(next);
    }
  };
  const change = (chosen: string, delta: number) =>
    write(
      items
        .map((item) =>
          item.size === chosen
            ? {
                ...item,
                quantity: Math.min(stock[chosen], item.quantity + delta),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  function add() {
    if (!size) {
      setError(
        tr(
          lang,
          "Escolha um tamanho para continuar.",
          "Choose a size to continue.",
        ),
      );
      return;
    }
    const existing = items.find((i) => i.size === size);
    if (existing && existing.quantity >= stock[size]) {
      setError(
        tr(
          lang,
          "Limite disponível deste tamanho na demonstração.",
          "Available size limit reached in this demonstration.",
        ),
      );
      return;
    }
    write(
      existing
        ? items.map((i) =>
            i.size === size ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...items, { size, quantity: 1 }],
    );
    setError("");
    setReceipt(null);
    setDrawer(true);
  }
  return (
    <div className="shop-demo">
      <div className="shop-demo-photo">
        <WorkImage
          name={detail ? "maia-shirt-detail" : "maia-shirt"}
          alt={tr(
            lang,
            detail
              ? "Detalhe do linho e dos botões da Camisa Manhã"
              : "Camisa Manhã em linho lima suave",
            detail
              ? "Detail of the linen and buttons on the Manhã shirt"
              : "Manhã shirt in soft lime linen",
          )}
          sizes="(max-width:760px) 90vw, 40vw"
        />
        <button
          className="photo-toggle"
          onClick={() => setDetail(!detail)}
          aria-pressed={detail}
        >
          {detail
            ? tr(lang, "Ver a peça inteira", "See full garment")
            : tr(lang, "Ver de perto", "Take a closer look")}
          <span aria-hidden="true">{detail ? "−" : "+"}</span>
        </button>
      </div>
      <div className="shop-demo-info">
        <div className="shop-top">
          <span className="micro">
            MAIA STUDIO / {tr(lang, "Demonstração", "Demo")}
          </span>
          <button
            type="button"
            className="bag-button"
            onClick={() => {
              setDrawer(true);
              setReceipt(null);
            }}
            aria-label={`${tr(lang, "Abrir sacola", "Open bag")}: ${count}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            <span>{count}</span>
          </button>
        </div>
        <div className="shop-product-title">
          <p className="micro">
            {tr(lang, "Coleção Primeiro Percurso", "First Journey collection")}
          </p>
          <h3>Camisa Manhã</h3>
          <p>{money(39800)}</p>
        </div>
        <p className="shop-description">
          {tr(
            lang,
            "Linho, gola aberta e espaço para o corpo respirar. A primeira peça da mala.",
            "Linen, an open collar and room to breathe. The first piece in your suitcase.",
          )}
        </p>
        <div className="size-heading">
          <span>
            {tr(lang, "Tamanho", "Size")}
            {size ? `: ${size}` : ""}
          </span>
          <button onClick={() => setGuide(true)}>
            {tr(lang, "Guia de medidas", "Size guide")}
          </button>
        </div>
        <div
          className="size-buttons"
          role="group"
          aria-label={tr(lang, "Escolher tamanho", "Choose a size")}
        >
          {Object.entries(stock).map(([s, available]) => (
            <button
              key={s}
              disabled={!available}
              onClick={() => {
                setSize(s);
                setError("");
              }}
              aria-pressed={s === size}
              aria-label={`${s}${!available ? tr(lang, " — indisponível", " — unavailable") : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="size-note">
          {tr(
            lang,
            "GG indisponível nesta demonstração.",
            "GG is unavailable in this demonstration.",
          )}
        </p>
        <button className="button shop-add" onClick={add}>
          {tr(lang, "Adicionar à sacola", "Add to bag")}
          <Arrow />
        </button>
        {error && (
          <p role="alert" className="demo-error">
            {error}
          </p>
        )}
        <p className="demo-disclosure">
          {tr(
            lang,
            "Peça e preço fictícios. Nenhuma compra real.",
            "Fictional product and price. No real purchase.",
          )}
        </p>
      </div>
      <Dialog
        open={drawer}
        close={() => setDrawer(false)}
        title={tr(lang, "Sua sacola", "Your bag")}
        lang={lang}
        className="cart-drawer"
      >
        {receipt !== null ? (
          <div className="receipt">
            <span className="receipt-check" aria-hidden="true">
              ✓
            </span>
            <h4>
              {tr(lang, "Experiência concluída.", "Experience complete.")}
            </h4>
            <p>
              {tr(
                lang,
                "Você percorreu a compra. Nenhum pedido foi enviado e nada foi cobrado.",
                "You walked through a purchase. No order was sent and nothing was charged.",
              )}
            </p>
            <p>
              {tr(lang, "Total simulado", "Simulated total")}:{" "}
              <strong>{money(receipt)}</strong>
            </p>
            <button
              className="button primary"
              onClick={() => {
                setDrawer(false);
                setReceipt(null);
              }}
            >
              {tr(lang, "Continuar explorando", "Keep exploring")}
              <Arrow />
            </button>
          </div>
        ) : count === 0 ? (
          <div className="empty-bag">
            <span aria-hidden="true">( 0 )</span>
            <h4>
              {tr(
                lang,
                "Uma sacola de possibilidades.",
                "A bag of possibilities.",
              )}
            </h4>
            <p>
              {tr(
                lang,
                "Escolha um tamanho e experimente adicionar a peça.",
                "Choose a size and try adding the garment.",
              )}
            </p>
            <button className="button primary" onClick={() => setDrawer(false)}>
              {tr(lang, "Voltar para a peça", "Back to the garment")}
              <Arrow />
            </button>
          </div>
        ) : (
          <>
            <p className="cart-disclaimer">
              {tr(
                lang,
                "DEMONSTRAÇÃO · SEM COBRANÇA",
                "DEMONSTRATION · NO CHARGE",
              )}
            </p>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.size}>
                  <WorkImage
                    name="maia-shirt"
                    alt="Camisa Manhã"
                    sizes="90px"
                  />
                  <div>
                    <h4>Camisa Manhã</h4>
                    <p>
                      {tr(lang, "Tamanho", "Size")} {item.size} · {money(39800)}
                    </p>
                    <div className="quantity">
                      <button
                        onClick={() => change(item.size, -1)}
                        aria-label={`${tr(lang, "Diminuir quantidade", "Decrease quantity")} ${item.size}`}
                      >
                        −
                      </button>
                      <output aria-label={tr(lang, "Quantidade", "Quantity")}>
                        {item.quantity}
                      </output>
                      <button
                        onClick={() => change(item.size, 1)}
                        disabled={item.quantity >= stock[item.size]}
                        aria-label={`${tr(lang, "Aumentar quantidade", "Increase quantity")} ${item.size}`}
                      >
                        +
                      </button>
                      <button
                        className="remove-item"
                        onClick={() =>
                          write(items.filter((i) => i.size !== item.size))
                        }
                        aria-label={`${tr(lang, "Remover", "Remove")} Camisa Manhã ${item.size}`}
                      >
                        {tr(lang, "Remover", "Remove")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <p>
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </p>
              <p>
                <span>
                  {tr(lang, "Frete ilustrativo", "Illustrative shipping")}
                </span>
                <span>{money(2000)}</span>
              </p>
              <p className="total-line">
                <strong>Total</strong>
                <strong>{money(total)}</strong>
              </p>
              <button
                className="button primary"
                onClick={() => {
                  setReceipt(total);
                  write([]);
                }}
              >
                {tr(
                  lang,
                  "Concluir compra simulada",
                  "Complete simulated purchase",
                )}
                <Arrow />
              </button>
              <p className="form-note">
                {tr(
                  lang,
                  "Sem pagamento ou dados pessoais. A sacola é salva apenas neste navegador.",
                  "No payment or personal details. The bag is saved only in this browser.",
                )}
              </p>
            </div>
          </>
        )}
      </Dialog>
      <Dialog
        open={guide}
        close={() => setGuide(false)}
        title={tr(lang, "Guia de medidas", "Size guide")}
        lang={lang}
        className="size-guide"
      >
        <p>
          {tr(
            lang,
            "Medidas do corpo em centímetros. Referência ilustrativa da coleção.",
            "Body measurements in centimetres. An illustrative collection reference.",
          )}
        </p>
        <table>
          <caption className="sr-only">
            {tr(lang, "Medidas por tamanho", "Measurements by size")}
          </caption>
          <thead>
            <tr>
              {(lang === "pt"
                ? ["Tamanho", "Busto", "Cintura", "Quadril"]
                : ["Size", "Bust", "Waist", "Hips"]
              ).map((t) => (
                <th key={t} scope="col">
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["PP", "80–84", "62–66", "88–92"],
              ["P", "85–89", "67–71", "93–97"],
              ["M", "90–94", "72–76", "98–102"],
              ["G", "95–101", "77–83", "103–109"],
              ["GG", "102–108", "84–90", "110–116"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th scope="row" key={i}>
                      {cell}
                    </th>
                  ) : (
                    <td key={i}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Dialog>
    </div>
  );
}
