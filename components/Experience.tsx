"use client";
import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Lang, paths, tr } from "@/lib/site";
import { Arrow } from "./Chrome";
import Shop from "./demos/Shop";
import Quote from "./demos/Quote";
import dynamic from "next/dynamic";
const Music = dynamic(() => import("./demos/Music"), {
  loading: () => (
    <p className="demo-loading" role="status">
      CADÊNCIA · …
    </p>
  ),
});
const subscribeUrl = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};
const getDemo = () =>
  new URLSearchParams(window.location.search).get("demo") || "";
export default function Experience({ lang }: { lang: Lang }) {
  const initial = useSyncExternalStore(subscribeUrl, getDemo, () => "");
  const [selected, setActive] = useState<number | null>(null);
  const active =
    selected ?? (initial === "quote" ? 1 : initial === "music" ? 2 : 0);
  const items = [
    {
      title: "MAIA STUDIO",
      sub: tr(lang, "Escolha. Adicione. Confira.", "Choose. Add. Review."),
      slug: "maia-ventura",
    },
    {
      title: "OFÍCIO",
      sub: tr(lang, "Uma aprovação. Dois lados.", "One approval. Two sides."),
      slug: "oficio",
    },
    {
      title: "CADÊNCIA",
      sub: tr(lang, "Veja a música acontecer.", "Watch the music happen."),
      slug: "cadencia",
    },
  ];
  return (
    <section
      className="experience-section"
      id="experiencias"
      aria-labelledby="experience-heading"
    >
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              02 /{" "}
              {tr(
                lang,
                "Menos discurso, mais clique",
                "Less talk, more interaction",
              )}
            </p>
            <h2 id="experience-heading">
              {tr(lang, "Bonito de ver.", "Good to look at.")}
              <br />
              <span className="serif-em">
                {tr(lang, "Melhor de usar.", "Better to use.")}
              </span>
            </h2>
          </div>
          <p className="section-aside">
            {tr(
              lang,
              "Pequenos recortes dos projetos, funcionando aqui. Pode mexer — é para isso mesmo.",
              "Small excerpts of the projects, working right here. Go ahead and try them — that’s the point.",
            )}
          </p>
        </div>
        <div
          className="experience-tabs"
          role="tablist"
          aria-label={tr(
            lang,
            "Escolher demonstração",
            "Choose a demonstration",
          )}
        >
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`demo-tab-${i}`}
              aria-controls={`demo-panel-${i}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight") next = (i + 1) % 3;
                else if (e.key === "ArrowLeft") next = (i + 2) % 3;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = 2;
                else return;
                e.preventDefault();
                setActive(next);
                document.getElementById(`demo-tab-${next}`)?.focus();
              }}
            >
              <span className="micro">0{i + 1}</span>
              <strong>{item.title}</strong>
              <span>{item.sub}</span>
              <Arrow diagonal />
            </button>
          ))}
        </div>
        <div
          className="experience-panel"
          role="tabpanel"
          id={`demo-panel-${active}`}
          aria-labelledby={`demo-tab-${active}`}
          tabIndex={0}
        >
          {active === 0 ? (
            <Shop lang={lang} />
          ) : active === 1 ? (
            <Quote lang={lang} />
          ) : (
            <Music lang={lang} />
          )}
        </div>
        <div className="experience-foot">
          <p>
            {tr(
              lang,
              "Demonstrações locais. Sem compras, envios ou alterações nos projetos originais.",
              "Local demonstrations. No purchases, submissions or changes to the original projects.",
            )}
          </p>
          <Link
            href={`${paths(lang).work}/${items[active].slug}`}
            className="text-link"
          >
            {tr(lang, "Conheça o projeto completo", "Explore the full project")}
            <Arrow diagonal />
          </Link>
        </div>
      </div>
    </section>
  );
}
