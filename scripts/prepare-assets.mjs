import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const workspace = path.resolve("../..");
const assets = {
  "maia-portrait": "outputs/maia-ventura/public/images/maia-portrait.webp",
  "maia-campaign": "outputs/maia-ventura/public/images/studio-campaign.webp",
  "maia-kyoto": "outputs/maia-ventura/public/images/maia-kyoto.webp",
  "maia-food": "outputs/maia-ventura/public/images/salvador-food.webp",
  "maia-shirt": "outputs/maia-ventura/public/images/camisa-manha-front.webp",
  "maia-shirt-detail":
    "outputs/maia-ventura/public/images/camisa-manha-detail.webp",
  "maia-home": "work/maia-screens/home-desktop.png",
  "maia-shop": "work/maia-screens/studio-desktop.png",
  "maia-mobile": "work/maia-screens/product-mobile.png",
  "oficio-home": "outputs/oficio/portfolio/captures/gestao-overview.png",
  "oficio-quote": "outputs/oficio/portfolio/captures/gestao-orcamento.png",
  "oficio-client": "outputs/oficio/portfolio/captures/cliente-proposta.png",
  "oficio-mobile": "outputs/oficio/portfolio/captures/cliente-home-mobile.png",
  "cadencia-home": "outputs/cadencia/portfolio/source/site-desktop.png",
  "cadencia-score": "outputs/cadencia/portfolio/source/partitura.png",
  "cadencia-student": "outputs/cadencia/portfolio/source/aluna-desktop.png",
  "cadencia-admin": "outputs/cadencia/portfolio/source/financeiro-admin.png",
  "cadencia-mobile": "outputs/cadencia/portfolio/source/aluna-mobile.png",
  "avesso-campaign": "outputs/avesso/public/images/campaign.webp",
  "avesso-home": "work/avesso-qa/home-desktop.png",
  "avesso-product": "work/avesso-product-desktop.png",
  "lia-box": "outputs/forno-da-lia/assets/photos/caixa-celebrar-com-marca.webp",
  "lia-brand": "outputs/forno-da-lia/portfolio/02-identidade.png",
  "lia-packaging":
    "outputs/forno-da-lia/portfolio/03-embalagens-e-impressos.png",
  "lia-social": "outputs/forno-da-lia/portfolio/04-instagram-e-pedidos.png",
  "nitida-eye": "outputs/nitida/public/images/olhar.webp",
  "nitida-home":
    "outputs/revisao-99freelas/novos-cases/nitida/01-nitida-jornada.png",
  "nitida-flow":
    "outputs/revisao-99freelas/novos-cases/nitida/03-nitida-agendamento.png",
  "ceu-home":
    "outputs/revisao-99freelas/novos-cases/ceu-canto/01-ceu-canto.png",
  "ceu-practice":
    "outputs/revisao-99freelas/backup/ceu-revisao/01-frase-interface.png",
  "ceu-feedback":
    "outputs/revisao-99freelas/backup/ceu-revisao/03-feedback-linguistico.png",
  victor: "outputs/victor-portfolio/public/portfolio/victor-editorial-v2.png",
};
await fs.mkdir("public/work", { recursive: true });
const manifest = {};
for (const [name, source] of Object.entries(assets)) {
  try {
    const result = await sharp(await fs.readFile(path.join(workspace, source)))
      .rotate()
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({
        quality:
          name.includes("home") ||
          name.includes("score") ||
          name.includes("client")
            ? 88
            : 83,
      })
      .toFile(`public/work/${name}.webp`);
    manifest[name] = { width: result.width, height: result.height };
  } catch (error) {
    console.error(name, error.message);
  }
}
await fs.mkdir("lib", { recursive: true });
await fs.writeFile("lib/image-sizes.json", JSON.stringify(manifest, null, 2));
await fs.mkdir("public/fonts", { recursive: true });
for (const name of [
  "Manrope.ttf",
  "OFL-Manrope.txt",
  "bravura.woff2",
  "OFL-Bravura.txt",
  "academico.woff2",
  "OFL-Academico.txt",
]) {
  await fs.copyFile(
    path.join(workspace, "outputs/cadencia/public/brand", name),
    path.join("public/fonts", name),
  );
}
await fs.mkdir("public/downloads", { recursive: true });
await fs.copyFile(
  path.join(
    workspace,
    "outputs/maia-ventura/public/downloads/maia-ventura-media-kit.pdf",
  ),
  "public/downloads/maia-media-kit.pdf",
);
const font = await fetch(
  "https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/BricolageGrotesque%5Bopsz%2Cwdth%2Cwght%5D.ttf",
);
if (!font.ok) throw new Error("Font unavailable");
await fs.writeFile(
  "public/fonts/Bricolage.ttf",
  Buffer.from(await font.arrayBuffer()),
);
const license = await fetch(
  "https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/OFL.txt",
);
if (!license.ok) throw new Error("Font license unavailable");
await fs.writeFile("public/fonts/OFL-Bricolage.txt", await license.text());
console.log(`Prepared ${Object.keys(manifest).length} images and local fonts.`);
