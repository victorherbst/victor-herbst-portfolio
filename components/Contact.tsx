"use client";
import { useState } from "react";
import { contacts, Lang, tr } from "@/lib/site";
import { Arrow } from "./Chrome";
export default function Contact({ lang }: { lang: Lang }) {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const edit = () => setReady(false);
  const full = tr(
    lang,
    `Oi, Victor! Sou ${name.trim()}. Quero conversar sobre ${service.toLowerCase()}.\n\n${message.trim()}`,
    `Hi Victor! I’m ${name.trim()}. I’d like to discuss ${service.toLowerCase()}.\n\n${message.trim()}`,
  );
  const options =
    lang === "pt"
      ? [
          "Identidade visual",
          "Site ou loja",
          "Plataforma",
          "Uma ideia diferente",
        ]
      : [
          "Brand identity",
          "Website or store",
          "Platform",
          "Something different",
        ];
  return (
    <section
      className="contact-section"
      id="contato"
      aria-labelledby="contact-heading"
    >
      <span id="work-with-me" />
      <div className="contact-inner shell">
        <div className="contact-copy">
          <p className="eyebrow">
            05 / {tr(lang, "Próximo projeto", "Next project")}
          </p>
          <h2 id="contact-heading">
            {tr(lang, "A próxima", "The next")}
            <br />
            {tr(lang, "boa ideia", "good idea")}
            <br />
            <span className="serif-em">
              {tr(lang, "pode ser sua.", "could be yours.")}
            </span>
          </h2>
          <a href={`mailto:${contacts.email}`} className="contact-email">
            {contacts.email}
            <Arrow diagonal />
          </a>
          <p className="contact-note">
            {tr(
              lang,
              "Me conte o que você tem em mente. A conversa pode começar com um rascunho.",
              "Tell me what you have in mind. A conversation can start with a rough sketch.",
            )}
          </p>
        </div>
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            setReady(true);
          }}
        >
          <fieldset>
            <legend>
              {tr(lang, "O que vamos criar?", "What are we creating?")}
            </legend>
            <div className="contact-options">
              {options.map((option) => (
                <label
                  key={option}
                  className={service === option ? "chosen" : ""}
                >
                  <input
                    required
                    type="radio"
                    name="service"
                    value={option}
                    checked={service === option}
                    onChange={() => {
                      setService(option);
                      edit();
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="field-label" htmlFor="contact-name">
            {tr(lang, "Seu nome", "Your name")}
          </label>
          <input
            id="contact-name"
            autoComplete="name"
            name="name"
            maxLength={80}
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              edit();
            }}
            placeholder={tr(
              lang,
              "Como posso chamar você?",
              "What should I call you?",
            )}
            pattern=".*\S.*"
          />
          <label className="field-label" htmlFor="contact-message">
            {tr(lang, "Um pouco sobre a ideia", "A little about your idea")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={3}
            required
            minLength={10}
            maxLength={1600}
            value={message}
            onChange={(e) => {
              e.target.setCustomValidity(
                e.target.value.trim().length < 10
                  ? tr(
                      lang,
                      "Conte um pouco mais: use pelo menos 10 caracteres.",
                      "Tell me a little more: use at least 10 characters.",
                    )
                  : "",
              );
              setMessage(e.target.value);
              edit();
            }}
            placeholder={tr(
              lang,
              "O que você precisa? Tem um prazo em mente?",
              "What do you need? Do you have a timeline in mind?",
            )}
          />
          <button className="button contact-submit" type="submit">
            {tr(lang, "Preparar conversa", "Prepare conversation")}
            <Arrow diagonal />
          </button>
          <p className="form-note">
            {tr(
              lang,
              "Você revisa a mensagem antes de abrir o WhatsApp. Nada é enviado por este formulário.",
              "Review your message before opening WhatsApp. This form sends nothing.",
            )}
          </p>
          {ready && (
            <div className="contact-ready" role="status">
              <strong>
                {tr(
                  lang,
                  "Mensagem pronta. Vamos conversar?",
                  "Your message is ready. Shall we talk?",
                )}
              </strong>
              <p>{full}</p>
              <a
                className="button primary"
                href={`${contacts.whatsapp}?text=${encodeURIComponent(full)}`}
                target="_blank"
                rel="noreferrer"
              >
                {tr(lang, "Abrir no WhatsApp", "Open in WhatsApp")}
                <Arrow diagonal />
              </a>
              <p className="form-note">
                {tr(
                  lang,
                  "O envio acontece quando você confirmar no WhatsApp.",
                  "The message is sent only when you confirm in WhatsApp.",
                )}
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
