import Image from "next/image";
import type { Project } from "@/lib/projects";
import sizes from "@/lib/image-sizes.json";
export function WorkImage({
  name,
  alt,
  className = "",
  priority = false,
  sizes: imageSizes = "(max-width: 760px) 100vw, 85vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const dim = sizes[name as keyof typeof sizes] || {
    width: 1440,
    height: 1000,
  };
  return (
    <Image
      src={`/work/${name}.webp`}
      width={dim.width}
      height={dim.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      sizes={imageSizes}
    />
  );
}
export default function ProjectArt({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const p = project;
  const screen = ["oficio", "cadencia", "ceu-canto"].includes(p.slug);
  return (
    <div
      className={`project-art art-${p.slug} ${screen ? "screen-art" : ""}`}
      style={
        {
          "--project-bg": p.color,
          "--project-ink": p.ink,
        } as React.CSSProperties
      }
    >
      <WorkImage
        name={p.cover}
        alt=""
        priority={priority}
        sizes="(max-width: 760px) 100vw, 55vw"
      />
      {p.slug === "maia-ventura" && (
        <span className="maia-signature" aria-hidden="true">
          <Image src="/brand/maia.svg" width={1200} height={250} alt="" />
        </span>
      )}
      {p.slug === "cadencia" && (
        <span className="art-label" aria-hidden="true">
          <Image src="/brand/cadencia.svg" width={3368} height={900} alt="" />
          <span>ESCOLA DE MÚSICA</span>
        </span>
      )}
      {p.slug === "oficio" && (
        <span className="art-label" aria-hidden="true">
          <Image src="/brand/oficio.svg" width={540} height={190} alt="" />
          <span>CADA ETAPA, NO SEU LUGAR.</span>
        </span>
      )}
      {p.slug === "avesso" && (
        <span className="avesso-signature" aria-hidden="true">
          AVESSO
        </span>
      )}
      {p.slug === "nitida" && (
        <span className="nitida-signature" aria-hidden="true">
          NÍTIDA<span>UM NOVO OLHAR.</span>
        </span>
      )}
    </div>
  );
}
