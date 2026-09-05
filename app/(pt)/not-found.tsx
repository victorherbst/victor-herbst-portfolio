import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found shell">
      <p className="eyebrow">404</p>
      <h1>Esse caminho ainda não existe.</h1>
      <Link className="button primary" href="/">
        Voltar ao início →
      </Link>
    </main>
  );
}
