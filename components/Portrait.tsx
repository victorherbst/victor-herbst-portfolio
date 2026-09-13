import { Lang, tr } from "@/lib/site";
import { WorkImage } from "./ProjectArt";

export default function Portrait({
  lang,
  tone,
  className,
  sizes,
  priority = false,
}: {
  lang: Lang;
  tone: "color" | "mono";
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`editorial-portrait ${className}`}>
      <div className="portrait-frame">
        <WorkImage
          name={`victor-editorial-${tone === "color" ? "cor" : "pb"}`}
          priority={priority}
          alt={tr(
            lang,
            "Victor Herbst sentado junto à janela, com as mãos em repouso, olhando para a câmera.",
            "Victor Herbst seated by a window, hands resting naturally, looking at the camera.",
          )}
          sizes={sizes}
        />
      </div>
      <figcaption className="portrait-caption">
        <span>Victor Herbst</span>
        <span>
          {tr(lang, "Brasil · Trabalho remoto", "Brazil · Working remotely")}
        </span>
      </figcaption>
    </figure>
  );
}
