import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const data = async (path, type) =>
  "data:" + type + ";base64," + (await fs.readFile(path)).toString("base64");
const font = await data("public/fonts/Bricolage.ttf", "font/ttf");
const bodyFont = await data("public/fonts/Manrope.ttf", "font/ttf");
const portrait = await data("public/work/maia-portrait.webp", "image/webp");
const logo = await data("public/brand/maia.svg", "image/svg+xml");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(
  `<!doctype html><html lang="pt-BR"><head><style>@font-face{font-family:Bricolage;src:url('${font}');font-weight:200 800}@font-face{font-family:Manrope;src:url('${bodyFont}');font-weight:200 800}*{box-sizing:border-box}body{margin:0;background:#f1f2ee;color:#382538;font-family:Manrope}main{width:1200px;height:630px;padding:43px 46px;position:relative}.brand{font:650 31px Bricolage;letter-spacing:-1.5px}.brand span{color:#ad3321}.meta{position:absolute;top:54px;right:47px;font-size:11px;text-transform:uppercase;letter-spacing:1px}.line{height:1px;background:#cbc9c9;margin-top:24px}.copy{position:absolute;left:46px;top:159px}.copy h1{font:600 112px/.98 Bricolage;letter-spacing:-5px;margin:0}.copy h1 span{color:#ad3321}.copy p{font:400 15px/1.6 Manrope;max-width:330px;margin-top:26px}.image{position:absolute;right:46px;top:147px;width:460px;height:395px;overflow:hidden;background:#f3dae2}.image>img{width:100%;height:100%;object-fit:cover;object-position:center 29%}.logo{position:absolute;bottom:17px;left:17px;right:17px;padding:3px 8px;background:#f3dae2}.logo img{height:58px;width:100%}.footer{position:absolute;bottom:37px;left:46px;right:46px;display:flex;justify-content:space-between;font-size:11px}.dot{display:inline-block;background:#ff684b;width:10px;height:10px;border-radius:50%;margin-right:8px}</style></head><body><main><div class="brand">victor/herbst<span>.</span></div><div class="meta">Design & desenvolvimento independente</div><div class="line"></div><div class="copy"><h1>Da ideia<br>ao clique<span>.</span></h1><p>Marcas, sites e plataformas<br>com personalidade.</p></div><div class="image"><img src="${portrait}" alt=""><div class="logo"><img src="${logo}" alt=""></div></div><div class="footer"><span><span class="dot"></span>victorherbst.com.br</span><span>Brasil, para qualquer lugar ↗</span></div></main></body></html>`,
);
await page.evaluate(() =>
  Promise.all([
    document.fonts.ready,
    ...Array.from(document.images).map((im) => im.decode()),
  ]),
);
await page.screenshot({ path: "public/og.png" });
await browser.close();
