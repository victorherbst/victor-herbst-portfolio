"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contacts, Lang, paths, tr } from "@/lib/site";
import { projects } from "@/lib/projects";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
export function Mark() {
  return (
    <span className="wordmark">
      victor
      <span className="mark-slash" aria-hidden="true">
        /
      </span>
      herbst
      <span className="mark-dot" aria-hidden="true">
        .
      </span>
    </span>
  );
}
export function Header({ lang }: { lang: Lang }) {
  const route = usePathname();
  const p = paths(lang);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const alternate =
    lang === "pt"
      ? route
          .replace(/^\/projetos/, "/en/work")
          .replace(/^\/sobre/, "/en/about")
          .replace(/^\/laboratorio/, "/en/lab")
          .replace(/^\/$/, "/en")
      : route
          .replace(/^\/en\/work/, "/projetos")
          .replace(/^\/en\/about/, "/sobre")
          .replace(/^\/en\/lab/, "/laboratorio")
          .replace(/^\/en\/?$/, "/");
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href={p.home}
          className="brand-link"
          aria-label={tr(
            lang,
            "Victor Herbst — início",
            "Victor Herbst — home",
          )}
          onClick={() => setOpen(false)}
        >
          <Mark />
        </Link>
        <nav
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label={tr(lang, "Principal", "Main")}
          id="main-nav"
        >
          <Link
            onClick={() => setOpen(false)}
            href={p.work}
            aria-current={route.startsWith(p.work) ? "page" : undefined}
          >
            {tr(lang, "Projetos", "Work")}
            <span>{String(projects.length).padStart(2,"0")}</span>
          </Link>
          <Link onClick={() => setOpen(false)} href={`${p.home}#experiencias`}>
            {tr(lang, "Experimente", "Try it")}
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href={p.about}
            aria-current={route === p.about ? "page" : undefined}
          >
            {tr(lang, "Sobre", "About")}
          </Link>
        </nav>
        <div className="header-actions">
          <Link
            href={alternate}
            className="language-link"
            hrefLang={lang === "pt" ? "en" : "pt-BR"}
            aria-label={tr(lang, "Switch to English", "Mudar para português")}
          >
            {lang === "pt" ? "EN" : "PT"}
          </Link>
          <Link
            href={`${p.home}#contato`}
            className="header-contact"
            onClick={() => setOpen(false)}
          >
            <span className="contact-full">
              {tr(lang, "Vamos conversar", "Let’s talk")}
            </span>
            <span className="contact-short">
              {tr(lang, "Contato", "Contact")}
            </span>
            <Arrow diagonal />
          </Link>
          <button
            ref={menuButton}
            className="menu-button"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(!open)}
            aria-label={
              open
                ? tr(lang, "Fechar menu", "Close menu")
                : tr(lang, "Abrir menu", "Open menu")
            }
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
export function Footer({ lang }: { lang: Lang }) {
  const p = paths(lang);
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <Link
          href={p.home}
          aria-label={tr(lang, "Ir para o início", "Go to home")}
        >
          <Mark />
        </Link>
        <p>
          {tr(
            lang,
            "Independente na criação. Perto em cada etapa.",
            "Independent in craft. Close at every step.",
          )}
        </p>
        <a href="#top" className="back-top">
          {tr(lang, "Ao topo", "Back to top")} ↑
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Victor Herbst · Brasil</span>
        <div>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={contacts.freelance} target="_blank" rel="noreferrer">
            99Freelas ↗
          </a>
          <Link href={p.lab}>{tr(lang, "Laboratório", "Lab")} ↗</Link>
        </div>
        <span>{tr(lang, "Feito com intenção.", "Made with intention.")}</span>
      </div>
    </footer>
  );
}
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add("will-reveal");
        observer.observe(el);
      }
    });
    return () => {
      observer.disconnect();
      elements.forEach((el) => el.classList.remove("will-reveal"));
    };
  }, [pathname]);
  return null;
}

export function LegacyLinks({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const p = paths(lang);
    if (pathname !== p.home) return;
    const follow = () => {
      const hash = window.location.hash;
      if (hash === "#ceucanto") router.replace(p.work + "/ceu-canto");
      else if (
        ["#fidelity-engine", "#editorial-engine", "#education-visit"].includes(
          hash,
        ) ||
        hash.startsWith("#visit-education-")
      )
        router.replace(p.lab + hash);
    };
    follow();
    window.addEventListener("hashchange", follow);
    return () => window.removeEventListener("hashchange", follow);
  }, [pathname, lang, router]);
  return null;
}
