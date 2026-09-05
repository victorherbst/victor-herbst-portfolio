import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("supporting controls and mobile purchase behave as labelled", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Mostrar Forno da Lia" }).click();
  await expect(
    page.getByRole("link", { name: "Conhecer Forno da Lia" }),
  ).toHaveAttribute("href", "/projetos/forno-da-lia");
  await page.getByRole("button", { name: "Mostrar CADÊNCIA" }).click();
  await expect(
    page.getByRole("link", { name: "Conhecer CADÊNCIA" }),
  ).toHaveAttribute("href", "/projetos/cadencia");
  await page.getByRole("button", { name: "Mostrar MAIA VENTURA" }).click();
  const details = page.locator(".service-row").first();
  await details.locator("summary").click();
  await expect(details.locator(".service-description")).toBeVisible();
  await details.locator("summary").press("Enter");
  await expect(details.locator(".service-description")).not.toBeVisible();
  await page.locator("#demo-tab-0").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#demo-tab-1")).toBeFocused();
  await expect(page.locator(".quote-demo")).toBeVisible();
  await page.keyboard.press("Home");
  await expect(page.locator("#demo-tab-0")).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .getByRole("button", { name: "Ver de perto", exact: false })
    .click();
  await expect(page.locator(".shop-demo-photo img")).toHaveAttribute(
    "src",
    /maia-shirt-detail/,
  );
  await page.getByRole("button", { name: "P", exact: true }).click();
  await page.getByRole("button", { name: "Adicionar à sacola" }).click();
  await expect(page.getByRole("dialog", { name: "Sua sacola" })).toBeVisible();
  await page.getByRole("button", { name: "Concluir compra simulada" }).click();
  await expect(page.getByText("Experiência concluída.")).toBeVisible();
  await page.keyboard.press("Escape");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await page.goto("/#contato");
  await page.getByLabel("Site ou loja", { exact: true }).check();
  await page.getByLabel("Seu nome", { exact: true }).fill("Ana");
  await page
    .getByLabel("Um pouco sobre a ideia", { exact: true })
    .fill("            ");
  await page.getByRole("button", { name: "Preparar conversa" }).click();
  await expect(page.locator(".contact-ready")).toHaveCount(0);
});
test("accessibility across cases, demonstrations, dialogs and laboratory", async ({
  page,
}) => {
  const failures: unknown[] = [];
  const inspect = async (label: string) => {
    const r = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    failures.push(
      ...r.violations.map((v) => ({
        label,
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    );
  };
  for (const url of [
    "/sobre",
    "/projetos",
    "/projetos/maia-ventura",
    "/en",
    "/?demo=quote#experiencias",
    "/?demo=music#experiencias",
  ]) {
    await page.goto(url);
    if (url.includes("quote")) {
      await expect(page.locator("#demo-tab-1")).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await expect(page.locator(".quote-demo")).toBeVisible();
    }
    if (url.includes("music"))
      await expect(page.locator(".score-bars svg")).toHaveCount(4);
    await inspect(url);
  }
  await page.goto("/");
  await page
    .getByRole("button", { name: "Guia de medidas", exact: true })
    .click();
  await inspect("size guide");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "M", exact: true }).click();
  await page.getByRole("button", { name: "Adicionar à sacola" }).click();
  await inspect("cart");
  await page.keyboard.press("Escape");
  await page.goto("/laboratorio");
  await page.locator(".education-visit-entry button").click();
  await inspect("guided visit");
  await page.keyboard.press("Escape");
  await page.getByRole("tab", { name: /Myriad/ }).click();
  await expect(page.locator(".fidelity-tabs")).toBeVisible();
  await inspect("Myriad source");
  await page.getByRole("button", { name: "02 Violações", exact: true }).click();
  await inspect("Myriad violations");
  await page.getByRole("tab", { name: /Livro Pronto/ }).click();
  await inspect("PDFs");
  expect(failures).toEqual([]);
});
test("mobile case and lab layouts contain their content", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "/projetos",
    "/projetos/maia-ventura",
    "/projetos/forno-da-lia",
    "/en/about",
    "/laboratorio",
    "/?demo=quote#experiencias",
    "/?demo=music#experiencias",
  ]) {
    await page.goto(path);
    if (path.includes("music"))
      await expect(page.locator(".score-bars svg")).toHaveCount(4);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
});
