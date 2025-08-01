import { expect, Page } from "@playwright/test";
import { test } from "../../helpers/fixtures";
import { faker, fakerPT_BR } from "@faker-js/faker";
import cnae from "../../assets/CNAE.json";
import serviceGroup from "../../assets/services.json";
import { randomInt } from "crypto";

test("Should activate the service module", async ({ page }) => {
    await page.getByRole('button', { name: 'Configurações' }).click();
    await page.getByRole('link', { name: 'Geral' }).click();
    await expect(page.getByText('Habilitar o uso de serviços')).toBeVisible();
    if(
        await page.getByRole('switch', { name: 'Habilitar o uso de serviços no sistema' }).isChecked()
    ) {
        // Uncheck the switch if it is checked
        await page.getByText('Habilitar o uso de serviços').click();
        await page.getByText('ServiçosConfigurações de uso de serviços em documentos fiscais Habilitar o uso').getByRole('button').filter({ hasText: 'Salvar' }).click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('Configurações alteradas com')).toBeVisible();
    }
    // Check the switch again
    await page.waitForTimeout(2000);
    await page.getByText('Habilitar o uso de serviços').click();
    await page.getByText('ServiçosConfigurações de uso de serviços em documentos fiscais Habilitar o uso').getByRole('button').filter({ hasText: 'Salvar' }).click();
    await expect(page.getByText('Configurações alteradas com')).toBeVisible();
});

test("Should create a new tax rule for services", async ({ page }) => {
  const cfopServicos: string[] = [
    "5251", // Prestação de serviço de comunicação para execução de serviço da mesma natureza
    "5351", // Prestação de serviço de comunicação a estabelecimento comercial
    "5352", // Prestação de serviço de comunicação a estabelecimento de outro contribuinte
    "5353", // Prestação de serviço de comunicação a não contribuinte
    "5359", // Prestação de serviço de comunicação por meio de satélite
    "5152", // Prestação de serviço de transporte para contribuinte
    "5153", // Prestação de serviço de transporte para não contribuinte
    "5356", // Prestação de serviço de comunicação de rádio chamada
    "5357", // Prestação de serviço de comunicação simultânea (voz/dados/imagem)
    "5358", // Prestação de serviço de comunicação para acesso à Internet
  ];

  await page.getByRole("button", { name: "Configurações" }).click();
  await page.getByRole("link", { name: "Impostos" }).click();
  await page.getByRole("link", { name: "Tributação de serviços" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).click();
  await page.getByRole("textbox", { name: "Nome" }).click();
  await page.getByRole("textbox", { name: "Nome" }).fill("Auto " + fakerPT_BR.word.noun() + " " + fakerPT_BR.word.noun());
  await page.getByRole("textbox", { name: "CFOP preferencial" }).click();
  await page.getByRole("textbox", { name: "CFOP preferencial" }).fill(cfopServicos[randomInt(0, cfopServicos.length - 1)]);
  await page.getByRole("textbox", { name: "Descrição" }).click();
  await page
    .getByRole("textbox", { name: "Descrição" })
    .fill(faker.lorem.paragraph({ min: 1, max: 2 }));
  await page
    .getByLabel("CST de PIS/COFINS")
    .getByText("CST de PIS/COFINS")
    .click();
//   await page.getByText("01 - Operação Tributável com").click();
  await page.getByRole('listbox', { name: 'CST de PIS/COFINS'}).locator('span').nth(randomInt(0,11)).click();
  await page.getByRole("textbox", { name: "% BC PIS/COFINS" }).click();
  await page
    .getByRole("textbox", { name: "% BC PIS/COFINS" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% Alíquota PIS" }).click();
  await page
    .getByRole("textbox", { name: "% Alíquota PIS" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% Alíquota COFINS" }).click();
  await page
    .getByRole("textbox", { name: "% Alíquota COFINS" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% PIS" }).click();
  await page
    .getByRole("textbox", { name: "% PIS" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% COFINS" }).click();
  await page
    .getByRole("textbox", { name: "% COFINS" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% CSLL" }).click();
  await page
    .getByRole("textbox", { name: "% CSLL" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% BC IR" }).click();
  await page
    .getByRole("textbox", { name: "% BC IR" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% IR" }).click();
  await page
    .getByRole("textbox", { name: "% IR" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "R$ Dispensar IR" }).click();
  await page
    .getByRole("textbox", { name: "R$ Dispensar IR" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% BC Previdência" }).click();
  await page
    .getByRole("textbox", { name: "% BC Previdência" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "% Previdência" }).click();
  await page
    .getByRole("textbox", { name: "% Previdência" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.locator("gw-rules-cities-form").getByRole("button").click();
  await page.getByRole("combobox", { name: "Município" }).click();
  await page.getByRole("combobox", { name: "Município" }).fill("Concór");
  await page.getByText("Concórdia - SC").click();
  await page.getByRole("textbox", { name: "% Alíq. ISS" }).click();
  await page.getByRole("textbox", { name: "% Alíq. ISS" }).fill("2");
  await page.getByRole("textbox", { name: "% Retenção de ISS" }).click();
  await page.getByRole("textbox", { name: "% Retenção de ISS" }).fill("2");
  await page.getByRole("button", { name: "Confirmar" }).click();
  await expect(
    page.getByRole("cell", { name: "Concórdia - SC" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Cadastro salvo com sucesso")).toBeVisible();
});

test("Should create a new service", async ({ page }) => {
  const randomIndex = serviceGroup.length == 1 ? 0 : randomInt(0, serviceGroup.length - 1);
  const randomServiceIndex = serviceGroup[randomIndex].services.length == 1 ? 0 : randomInt(0, serviceGroup[randomIndex].services.length - 1);

  const serviceCode =
    serviceGroup[randomIndex].services[randomServiceIndex].code;
    
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Serviços" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).click();
  await page.getByRole("textbox", { name: "Nome do serviço" }).click();
  await page
    .getByRole("textbox", { name: "Nome do serviço" })
    .fill("Auto " + fakerPT_BR.word.noun() + " " + fakerPT_BR.word.noun());
  await page.getByRole("combobox", { name: "Código da Atividade" }).click();
  await page
    .getByRole("combobox", { name: "Código da Atividade" })
    .fill(serviceCode);
  await page.getByText(serviceCode).click();
  await page.getByRole("textbox", { name: "CNAE" }).click();
  await page
    .getByRole("textbox", { name: "CNAE" })
    .fill(cnae[randomInt(0, cnae.length)].CODIGO);
  await page.getByRole("textbox", { name: "Valor do serviço" }).click();
  await page
    .getByRole("textbox", { name: "Valor do serviço" })
    .fill(
      fakerPT_BR.number.float({ min: 100, max: 10000 }).toFixed(2).toString()
    );
  await page.getByRole("textbox", { name: "Comissão" }).click();
  await page
    .getByRole("textbox", { name: "Comissão" })
    .fill(fakerPT_BR.number.int({ min: 1, max: 100 }).toString());
  await page
    .getByRole("textbox", { name: "Código do serviço no município" })
    .click();
  await page
    .getByRole("textbox", { name: "Código do serviço no município" })
    .fill(fakerPT_BR.number.int({ min: 1000, max: 9999 }).toString());
  await page.locator("#mat-select-value-5").click();
  await page.getByRole("option").nth(0).locator("span").click();
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Cadastro salvo com sucesso")).toBeVisible();
});

test("Should edit a service", async ({ page }) => {
  const randomIndex = serviceGroup.length == 1 ? 0 : randomInt(0, serviceGroup.length - 1);
  const randomServiceIndex = serviceGroup[randomIndex].services.length == 1 ? 0 : randomInt(0, serviceGroup[randomIndex].services.length - 1);

  const serviceCode =
    serviceGroup[randomIndex].services[randomServiceIndex].code;
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Serviços" }).click();
  await expect(
    page.getByRole("heading").filter({ hasText: "#" }).nth(0)
  ).toBeVisible();
  await page.getByRole("heading").filter({ hasText: "#" }).nth(0).hover();
  await page
    .getByRole("navigation")
    .filter({ hasText: "#" })
    .nth(0)
    .getByRole("button")
    .first()
    .click();
  await page.getByRole("textbox", { name: "Nome do serviço" }).click();
  await page
    .getByRole("textbox", { name: "Nome do serviço" })
    .fill("Auto " + fakerPT_BR.word.noun() + " " + fakerPT_BR.word.noun());
  await page.getByRole("combobox", { name: "Código da Atividade" }).click();
  await page
    .getByRole("combobox", { name: "Código da Atividade" })
    .fill(serviceCode);
  await page.getByText(serviceCode).click();
  await page.getByRole("textbox", { name: "CNAE" }).click();
  await page
    .getByRole("textbox", { name: "CNAE" })
    .fill(cnae[randomInt(0, cnae.length)].CODIGO);
  await page.getByRole("textbox", { name: "Valor do serviço" }).click();
  await page
    .getByRole("textbox", { name: "Valor do serviço" })
    .fill(fakerPT_BR.number.float({ min: 0, max: 100 }).toFixed(2).toString());
  await page.getByRole("textbox", { name: "Comissão" }).click();
  await page
    .getByRole("textbox", { name: "Comissão" })
    .fill(fakerPT_BR.number.int({ min: 1, max: 100 }).toString());
  await page
    .getByRole("textbox", { name: "Código do serviço no município" })
    .click();
  await page
    .getByRole("textbox", { name: "Código do serviço no município" })
    .fill(fakerPT_BR.number.int({ min: 1000, max: 9999 }).toString());
  await page.locator("#mat-select-value-5").click();
  await page.getByRole("option").nth(0).locator("span").click();
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Cadastro atualizado com")).toBeVisible();
});

test("Should delete a service", async ({ page }) => {
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Serviços" }).click();
  await page.getByRole("searchbox", { name: "Digite para buscar..." }).click();
  await page
    .getByRole("searchbox", { name: "Digite para buscar..." })
    .fill("Auto");
  await page.waitForTimeout(2000);
  await expect(
    page.getByRole("heading").filter({ hasText: "Auto" }).nth(0)
  ).toBeVisible();
  await page.getByRole("heading").filter({ hasText: "Auto" }).nth(0).hover();
  await page
    .getByRole("navigation")
    .filter({ hasText: "Auto" })
    .nth(0)
    .getByRole("button")
    .nth(1)
    .click();
  await page.getByRole("menuitem", { name: "Apagar" }).click();
  await page.getByRole("button", { name: "Apagar" }).click();
  await page.waitForTimeout(2000);
  if (
    await page
      .getByRole("heading", { name: "Este registro está em uso e n" })
      .isVisible()
  ) {
    await page.getByRole("button", { name: "Ok" }).click();
    if (
      await page
        .getByRole("navigation")
        .filter({ hasText: "Auto" })
        .nth(1)
        .isVisible()
    ) {
      await page
        .getByRole("navigation")
        .filter({ hasText: "Auto" })
        .nth(1)
        .getByRole("button")
        .nth(1)
        .click();
      await page.getByRole("menuitem", { name: "Apagar" }).click();
      await page.getByRole("button", { name: "Apagar" }).click();
      await expect(page.getByText("Apagado com sucesso")).toBeVisible();
    } else {
      await createServiceToDelete(page);
      await page.getByRole("button", { name: "Cadastros" }).click();
      await page.getByRole("link", { name: "Serviços" }).click();
      await page
        .getByRole("searchbox", { name: "Digite para buscar..." })
        .click();
      await page
        .getByRole("searchbox", { name: "Digite para buscar..." })
        .fill("Auto Service To Delete");
      await page.waitForTimeout(2000);
      await expect(
        page
          .getByRole("heading")
          .filter({ hasText: "Auto Service To Delete" })
          .nth(0)
      ).toBeVisible();
      await page
        .getByRole("heading")
        .filter({ hasText: "Auto Service To Delete" })
        .nth(0)
        .hover();
      await page
        .getByRole("navigation")
        .filter({ hasText: "Auto Service To Delete" })
        .nth(0)
        .getByRole("button")
        .nth(1)
        .click();
      await page.getByRole("menuitem", { name: "Apagar" }).click();
      await page.getByRole("button", { name: "Apagar" }).click();
      await expect(page.getByText("Apagado com sucesso")).toBeVisible();
    }
  }
});

async function createServiceToDelete(page: Page) {
  const randomIndex = randomInt(0, serviceGroup.length);
  const randomServiceIndex = randomInt(
    0,
    serviceGroup[randomIndex].services.length - 1
  );
  const serviceCode =
    serviceGroup[randomIndex].services[randomServiceIndex].code;

  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Serviços" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).click();
  await page.getByRole("textbox", { name: "Nome do serviço" }).click();
  await page
    .getByRole("textbox", { name: "Nome do serviço" })
    .fill("Auto Service To Delete");
  await page.getByRole("combobox", { name: "Código da Atividade" }).click();
  await page
    .getByRole("combobox", { name: "Código da Atividade" })
    .fill(serviceCode);
  await page.getByText(serviceCode).click();
  await page.getByRole("textbox", { name: "CNAE" }).click();
  await page
    .getByRole("textbox", { name: "CNAE" })
    .fill(cnae[randomInt(0, cnae.length)].CODIGO);
  await page.getByRole("textbox", { name: "Valor do serviço" }).click();
  await page
    .getByRole("textbox", { name: "Valor do serviço" })
    .fill(
      fakerPT_BR.number.float({ min: 100, max: 10000 }).toFixed(2).toString()
    );
  await page.getByRole("textbox", { name: "Comissão" }).click();
  await page
    .getByRole("textbox", { name: "Comissão" })
    .fill(fakerPT_BR.number.int({ min: 1, max: 100 }).toString());
  await page
    .getByRole("textbox", { name: "Código do serviço no município" })
    .click();
  await page
    .getByRole("textbox", { name: "Código do serviço no município" })
    .fill(fakerPT_BR.number.int({ min: 1000, max: 9999 }).toString());
  await page.locator("#mat-select-value-5").click();
  await page.getByRole("option").nth(0).locator("span").click();
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Cadastro salvo com sucesso")).toBeVisible();
}
