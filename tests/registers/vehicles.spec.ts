import { test } from '../helpers/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


const car1 = {
  description: "Auto " + faker.vehicle.vehicle(),
  plate: faker.word.sample({ length: 3}) + "-" + faker.string.numeric({ length: 4 }),
  uf: "SC",
  rntrc: faker.string.numeric({ length: 8 }),
  renavam: faker.string.numeric({ length: 9 }),
  tara: faker.string.numeric({ length: 4, allowLeadingZeros: false }),
  cap_m3: faker.string.numeric({ length: 3, allowLeadingZeros: false }),
  cap_kg: faker.string.numeric({ length: 3, allowLeadingZeros: false }),
  wheelset_type: "Utilitário",
  car_body_type: "Aberta",
  axes_quantity: faker.string.numeric({length: 1, allowLeadingZeros: false}),
  owner: "Zucchetti (Bruno Fernando)"
};

test('Create a first new Vehicle', async ({ page }) => {
  // acessando o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Veículos' }).click();

  // abre o cadastro
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // identificação
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(car1.description);
  await page.getByRole('textbox', { name: 'Placa' }).click();
  await page.getByRole('textbox', { name: 'Placa' }).fill(car1.plate);
  await page.getByRole('textbox', { name: 'RNTRC' }).click();
  await page.getByRole('textbox', { name: 'RNTRC' }).fill(car1.rntrc);
  await page.getByRole('combobox', { name: 'UF' }).click();
  await page.getByRole('combobox', { name: 'UF' }).fill(car1.uf);
  await page.getByText('Santa Catarina').click();
  await page.getByRole('textbox', { name: 'Renavam' }).click();
  await page.getByRole('textbox', { name: 'Renavam' }).fill(car1.renavam);

  // proprietário
  await page.getByRole('textbox', { name: 'Proprietário' }).click();
  await page.getByRole('textbox', { name: 'Proprietário' }).fill('Bruno Fernando');
  await page.getByRole('button').filter({ hasText: 'search' }).click();
  await page.getByText('Zucchetti (Bruno Fernando) (').click();

  // informações do veículo
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).fill(car1.tara);
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).fill(car1.cap_kg);
  await page.getByRole('textbox', { name: 'Capacidade (m³)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (m³)' }).fill(car1.cap_m3);
  await page.getByLabel('Tipo de rodado').getByText('Tipo de rodado').click();
  await page.getByText(car1.wheelset_type).click();
  await page.getByLabel('Tipo de carroceria').getByText('Tipo de carroceria').click();
  await page.getByText(car1.car_body_type).click();
  await page.getByRole('textbox', { name: 'Quantidade de eixos' }).click();
  await page.getByRole('textbox', { name: 'Quantidade de eixos' }).fill(car1.axes_quantity);

  //salva o veículo
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('h1').filter({ hasText: 'Veículos' }).click();

  // verifica se foi criado
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(car1.description);
  await page.waitForTimeout(2000);
  let isRegistered = await page.getByRole('heading', { name: new RegExp('(' + car1.description + ')') }).isVisible();
  await expect(isRegistered).toBe(true);
});

test('Delete Vehicle', async ({ page }) => {

  // acessa o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Veículos' }).click();

  // pesquisa o veículo
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).click();
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(car1.description);
  await page.waitForTimeout(2000);
  if(!await page.locator('h3').filter({ hasText: 'Nada encontrado com "' + car1.description + '"' }).isVisible()) {
    await page.getByRole('heading', { name: new RegExp('(' + car1.description + ')') }).hover();
    await page.getByRole('navigation').filter({ hasText: new RegExp('(' + car1.description + ')') }).getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Excluir' }).click();
    await page.waitForTimeout(2000);
  }
  // deleta o veículo
  // verifica se o veículo foi deletado
  await expect(page.locator('h3')).toContainText('Nada encontrado com "'+car1.description+'"');
});