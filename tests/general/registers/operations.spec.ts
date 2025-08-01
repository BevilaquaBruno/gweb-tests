import { expect } from "@playwright/test";
import { test } from "../../helpers/fixtures";
import { faker } from "@faker-js/faker";

const operations = [
  {
    name: "Auto Compra",
    description: faker.lorem.sentence(),
    type: "Entrada",
    operationType: [],
    stockMovement: true,
    features: [],
  },
  {
    name: "Auto Venda",
    description: faker.lorem.sentence(),
    type: "Saída",
    operationType: [],
    stockMovement: true,
    features: [],
  },
  {
    name: "Auto Compra Não Movimenta",
    description: faker.lorem.sentence(),
    type: "Entrada",
    operationType: [],
    stockMovement: false,
    features: [],
  },
  {
    name: "Auto Venda Não Movimenta",
    description: faker.lorem.sentence(),
    type: "Saída",
    operationType: [],
    stockMovement: false,
    features: [],
  },
  {
    name: "Auto Devolução Venda",
    description: faker.lorem.sentence(),
    type: "Entrada",
    operationType: [],
    stockMovement: true,
    features: [, "Devolução"],
  },
  {
    name: "Auto Devolução Compra",
    description: faker.lorem.sentence(),
    type: "Saída",
    operationType: [],
    stockMovement: true,
    features: [, "Devolução"],
  },
  {
    name: "Auto Entrada para Consumo",
    description: faker.lorem.sentence(),
    type: "Entrada",
    operationType: [],
    stockMovement: true,
    features: [, "Entrada para Consumo"],
  },
  {
    name: "Auto Saída para Consumo",
    description: faker.lorem.sentence(),
    type: "Saída",
    operationType: [],
    stockMovement: true,
    features: [, "Saída para consumo"],
  },
  {
    name: "Auto Complemento Saída",
    description: faker.lorem.sentence(),
    type: "Saída",
    operationType: ["Operação de complemento"],
    stockMovement: false,
    features: [],
  },
  {
    name: "Auto Complemento Entrada",
    description: faker.lorem.sentence(),
    type: "Entrada",
    operationType: ["Operação de complemento"],
    stockMovement: false,
    features: [],
  },
  {
    name: "Auto Ajuste Saída",
    description: faker.lorem.sentence(),
    type: "Saída",
    operationType: ["Operação de ajuste"],
    stockMovement: false,
    features: [],
  },
  {
    name: "Auto Ajuste Entrada",
    description: faker.lorem.sentence(),
    type: "Entrada",
    operationType: ["Operação de ajuste"],
    stockMovement: false,
    features: [],
  },
  {
    name: "Auto Exportação",
    description: faker.lorem.sentence(),
    type: "Saída",
    operationType: ["Exportação"],
    stockMovement: true,
    features: [],
  },
  {
    name: "Auto Importação",
    description: faker.lorem.sentence(),
    type: "Entrada",
    operationType: ["Importação"],
    stockMovement: true,
    features: [],
  },
];

// GWB-343
// Add identifiers to checkboxes
test("Operations - Should be able to create", async ({ page }) => {
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Operações" }).click();
  await page.waitForTimeout(2000);

  var createdOperations: String[] = [];

  for (let i = 0; i < operations.length; i++) {
    await page.getByRole("searchbox", { name: "Buscar operações" }).click();
    await page
      .getByRole("searchbox", { name: "Buscar operações" })
      .fill(operations[i].name);
    await page
      .getByRole("searchbox", { name: "Buscar operações" })
      .press("Enter");

    let notFound = false;
    try {
      await expect(
        page.getByText(
          `Nada encontrado com "${operations[i].name}" Nova operação`
        )
      ).toBeVisible({ timeout: 5000 });
      notFound = true;
    } catch (e) {
      await page
        .locator("span")
        .filter({ hasText: `${operations[i].name}` })
        .first()
        .click();
      await page.getByRole("button", { name: "Excluir" }).click();
      await page.getByRole("button", { name: "Apagar" }).click();
      await expect(page.getByText("Apagado com sucesso")).toBeVisible({ timeout: 15000});
      await page.waitForTimeout(2000);
      notFound = true;
    }

    if (notFound) {
      await page.getByRole("link").filter({ hasText: /^$/ }).click();
      await page.getByRole("textbox", { name: "Nome da operação" }).click();
      await page
        .getByRole("textbox", { name: "Nome da operação" })
        .fill(operations[i].name);
      await page.locator("div").filter({ hasText: "Descrição" }).nth(4).click();
      await page
        .getByRole("textbox", { name: "Descrição" })
        .fill(operations[i].description);

      if (operations[i].type == "Entrada") {
        await page.getByText("Entrada", { exact: true }).click();
      } else {
        await page.getByText("Saída", { exact: true }).click();
      }

      if (operations[i].operationType.length > 0) {
        operations[i].operationType.forEach(async (feature) => {
          await page.locator("label").filter({ hasText: feature }).click();
        });
      }

      if(!operations[i].stockMovement) {
        await page
          .locator("label")
          .filter({ hasText: "Movimenta estoque" })
          .click();
      }

      if (operations[i].features.length > 0) {
        operations[i].features.forEach(async (feature) => {
          await page.locator("label").filter({ hasText: feature }).click();
        });
      }

      await page.getByRole("button", { name: "Salvar" }).click();
      await expect(page.getByText("Cadastro salvo com sucesso")).toBeVisible();
      createdOperations.push(operations[i].name);
    }
  }
  console.log("Created operations: ", createdOperations);
});

test("Operations - Check if default operations are present", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Operações" }).click();
  const defaultOperations = ["Venda de mercadorias", "Compra de mercadorias"];

    await page
      .getByRole("searchbox", { name: "Buscar operações" })
      .fill(defaultOperations[0]);
    await page
      .getByRole("searchbox", { name: "Buscar operações" })
      .press("Enter");
    await page.waitForTimeout(2000);
    await expect(
      page
      .getByRole("heading")
      .filter({ hasText: new RegExp(`\\d+\\s+${defaultOperations[0]}`) })
    ).toBeVisible();
    
    await page
    .getByRole("searchbox", { name: "Buscar operações" })
    .fill(defaultOperations[1]);
    await page
    .getByRole("searchbox", { name: "Buscar operações" })
    .press("Enter");
    await page.waitForTimeout(2000);
    await expect(
      page
        .getByRole("heading")
        .filter({ hasText: new RegExp(`\\d+\\s+${defaultOperations[1]}`) })
    ).toBeVisible();

  });
