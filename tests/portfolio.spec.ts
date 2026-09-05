import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const slugList = [
  "maia-ventura",
  "ceu-canto",
  "oficio",
  "cadencia",
  "forno-da-lia",
  "avesso",
  "nitida",
];
test("shopping: validation, size guide, persistent bag, totals and simulated checkout", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Adicionar à sacola", exact: true })
    .click();
  await expect(page.locator('.shop-demo [role="alert"]')).toContainText(
    "Escolha um tamanho",
  );
  await expect(
    page.getByRole("button", { name: "GG — indisponível", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Guia de medidas", exact: true })
    .click();
  const guide = page.getByRole("dialog", { name: "Guia de medidas" });
  await expect(guide).toBeVisible();
  await expect(
    guide.getByRole("columnheader", { name: "Busto" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(guide).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Guia de medidas", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page
    .getByRole("button", { name: "Adicionar à sacola", exact: true })
    .click();
  let bag = page.getByRole("dialog", { name: "Sua sacola" });
  await expect(bag).toBeVisible();
  await expect(bag.getByText("R$ 418,00", { exact: true })).toBeVisible();
  await bag.getByRole("button", { name: "Aumentar quantidade M" }).click();
  await expect(bag.getByText("R$ 816,00", { exact: true })).toBeVisible();
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBeTruthy();
  }
  await page.reload();
  await page.getByRole("button", { name: "Abrir sacola: 2" }).click();
  bag = page.getByRole("dialog", { name: "Sua sacola" });
  await expect(bag.getByText("R$ 816,00", { exact: true })).toBeVisible();
  await bag.getByRole("button", { name: "Concluir compra simulada" }).click();
  await expect(bag.getByText("Experiência concluída.")).toBeVisible();
  await expect(bag.getByText(/nada foi cobrado/)).toBeVisible();
  await bag.getByRole("button", { name: "Continuar explorando" }).click();
  await expect(
    page.getByRole("button", { name: "Abrir sacola: 0" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Abrir sacola: 0" }).click();
  await expect(bag.getByText("Uma sacola de possibilidades.")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.evaluate(() =>
    localStorage.setItem(
      "vh:maia-bag:v1",
      '[{"size":"GG","quantity":7},{"size":"broken","quantity":-3}]',
    ),
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Abrir sacola: 0" }),
  ).toBeVisible();
});
test("quote: both perspectives, calculations, approval lock and reset", async ({
  page,
}) => {
  await page.goto("/?demo=quote#experiencias");
  await expect(page.getByRole("tab", { name: /OFÍCIO/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.getByLabel("Acabamento", { exact: true }).selectOption("painted");
  await page.getByLabel("Quantidade", { exact: true }).selectOption("2");
  await expect(page.getByText("R$ 6.380,00", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Revisar como cliente" }).click();
  await expect(
    page.getByText("Olá, Clara. Sua proposta está aqui."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Aprovar proposta simulada" }).click();
  await expect(
    page.getByRole("button", { name: "Proposta aprovada ✓" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Na oficina", exact: false }).click();
  await expect(page.getByLabel("Acabamento", { exact: true })).toBeDisabled();
  await expect(page.getByText(/Clara aprovou esta versão/)).toBeVisible();
  await page.getByRole("button", { name: /Recomeçar demonstração/ }).click();
  await expect(page.getByLabel("Acabamento", { exact: true })).toBeEnabled();
  await expect(page.getByText("R$ 2.980,00", { exact: true })).toBeVisible();
});
test("music: score renders, playback advances, tempo and cleanup", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/?demo=music#experiencias");
  await expect(page.getByRole("tab", { name: /CADÊNCIA/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator(".score-bars svg")).toHaveCount(4);
  await expect(
    page.getByText("Pronto para tocar", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ouvir estudo", exact: true }).click();
  await expect(page.getByText("Compasso 1 / 4", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("checkbox", { name: "Repetir trecho" }),
  ).toBeDisabled();
  await expect(page.getByText("Compasso 2 / 4", { exact: true })).toBeVisible({
    timeout: 6000,
  });
  await page.getByRole("button", { name: "Parar reprodução" }).click();
  await expect(
    page.getByText("Pronto para tocar", { exact: true }),
  ).toBeVisible();
  await page.getByRole("slider", { name: "Andamento em BPM" }).fill("48");
  await expect(page.getByText("48 BPM", { exact: true })).toBeVisible();
  await page.getByRole("checkbox", { name: "Repetir trecho" }).check();
  await page.getByRole("button", { name: "Ouvir estudo", exact: true }).click();
  await page.getByRole("tab", { name: /MAIA STUDIO/ }).click();
  await expect(page.locator(".music-demo")).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("project index: filters, search, empty state and every case", async ({
  page,
}) => {
  await page.goto("/projetos");
  await expect(page.locator(".work-grid article")).toHaveCount(7);
  await page
    .getByRole("button", { name: "Plataformas 3", exact: true })
    .click();
  await expect(page.locator(".work-grid article")).toHaveCount(3);
  await page
    .getByRole("searchbox", { name: "Buscar projeto" })
    .fill("nenhumcase");
  await expect(
    page.getByText("Ainda não há um projeto com esse nome."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator(".work-grid article")).toHaveCount(7);
  await page
    .getByRole("searchbox", { name: "Buscar projeto" })
    .fill("cadencia");
  await expect(page.locator(".work-grid article")).toHaveCount(1);
  for (const slug of slugList) {
    const r = await page.goto("/projetos/" + slug);
    expect(r?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page
      .locator(".case-page img")
      .evaluateAll((ims) =>
        ims.forEach((im) => ((im as HTMLImageElement).loading = "eager")),
      );
    await expect
      .poll(() =>
        page
          .locator(".case-page img")
          .evaluateAll((ims) =>
            ims.every((im) => (im as HTMLImageElement).naturalWidth > 0),
          ),
      )
      .toBeTruthy();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://victorherbst.com.br/projetos/" + slug,
    );
  }
});
test("contact: native validation, reviewable message and honest destination", async ({
  page,
}) => {
  await page.goto("/#contato");
  await page.getByRole("button", { name: "Preparar conversa" }).click();
  await expect(page.locator(".contact-ready")).toHaveCount(0);
  await page.getByLabel("Site ou loja", { exact: true }).check();
  await page.getByRole("textbox", { name: "Seu nome" }).fill("Ana");
  await page
    .getByRole("textbox", { name: "Um pouco sobre a ideia" })
    .fill("Quero uma loja para minha marca, com lançamento em novembro.");
  await page.getByRole("button", { name: "Preparar conversa" }).click();
  await expect(page.locator(".contact-ready")).toContainText(
    "Oi, Victor! Sou Ana.",
  );
  const href = await page
    .getByRole("link", { name: "Abrir no WhatsApp" })
    .getAttribute("href");
  expect(href?.startsWith("https://wa.me/5532985155063?text=")).toBeTruthy();
  expect(decodeURIComponent(href || "")).toContain("Quero uma loja");
  await page.getByRole("textbox", { name: "Seu nome" }).fill("Ana Maria");
  await expect(page.locator(".contact-ready")).toHaveCount(0);
});
test("language remains in English after reload and across project routes", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle(/Independent design/);
  await page.reload();
  await expect(page.locator("h1")).toContainText("From idea");
  await page.goto("/en/work/cadencia");
  await expect(page.locator("h1")).toHaveText("CADÊNCIA");
  await page.getByRole("link", { name: "Mudar para português" }).click();
  await expect(page).toHaveURL("/projetos/cadencia");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});
test("lab: guided visit, focus, text demonstration and PDF downloads", async ({
  page,
  request,
}) => {
  await page.goto("/laboratorio");
  const launch = page.locator(".education-visit-entry button");
  await launch.click();
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await page.locator(".education-stage-next").click();
  await page.getByRole("button", { name: "do", exact: true }).click();
  await expect(page.locator(".education-demo-feedback")).toBeVisible();
  await page.locator(".education-stage-next").click();
  await page.keyboard.press("Escape");
  await expect(modal).toHaveCount(0);
  await expect(launch).toBeFocused();
  await page.getByRole("tab", { name: /Myriad/ }).click();
  await page.getByRole("button", { name: "02 Violações", exact: true }).click();
  await expect(
    page.getByText("BLOQUEADA PELO CONTRATO", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Causa/, exact: false }).click();
  await expect(page.getByText(/causa não declarada/)).toBeVisible();
  await page.getByRole("tab", { name: /Livro Pronto/ }).click();
  await page.getByRole("button", { name: "Prosa", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Baixar publicação" }),
  ).toHaveAttribute("href", "/editorial/prose.pdf");
  for (const url of [
    "/editorial/technical.pdf",
    "/editorial/prose.pdf",
    "/editorial/poetry.pdf",
    "/downloads/maia-media-kit.pdf",
  ]) {
    const r = await request.get(url);
    expect(r.status()).toBe(200);
    expect((await r.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
});
test("responsive, keyboard, reduced motion and accessibility", async ({
  page,
}) => {
  const issues = [];
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await page
      .locator("img")
      .evaluateAll((ims) =>
        ims.forEach((im) => ((im as HTMLImageElement).loading = "eager")),
      );
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((ims) =>
            ims.every((im) => (im as HTMLImageElement).naturalWidth > 0),
          ),
      )
      .toBeTruthy();
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
    if (width === 390) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await expect(
        page.getByRole("link", { name: "Projetos07", exact: true }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toBeFocused();
    }
    if (width === 1440 || width === 390) {
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      issues.push(
        ...axe.violations.map((v) => ({
          width,
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      );
    }
  }
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  expect(issues).toEqual([]);
});
