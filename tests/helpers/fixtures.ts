import { test as base } from "@playwright/test";
import "dotenv/config";

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }, use) => {
      // This code runs before every test.
      await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/login");
      await page.getByRole("textbox", { name: "E-mail" }).click();
      await page
        .getByRole("textbox", { name: "E-mail" })
        .fill(process.env.PLAYWRIGHT_GWEB_LOGIN || "");
      await page.getByRole("button", { name: "Próximo" }).click();
      await page
        .getByRole("textbox", { name: "Senha" })
        .fill(process.env.PLAYWRIGHT_GWEB_PASSWORD || "");
      await page.getByRole("button", { name: "Entrar" }).click();
      //espera carregar a página de selecionar conta
      await page.getByText('Selecionar conta').click();

      // seleciona a empresa
      await page.getByRole('combobox', { name: 'Digite para buscar a conta' }).click();
      await page.getByRole("heading", { name: process.env.PLAYWRIGHT_GWEB_ACCOUNT }).click();
      await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL || "");
      // follows next tests
      await use();
    },
    { auto: true },
  ], // automatically starts for every test.
});
