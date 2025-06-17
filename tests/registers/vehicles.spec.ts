import { test } from '../helpers/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generate as generateCnpj, format as formatCnpj } from 'cnpj';

const vehicle1 = {
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

const vehicle2 = {
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
  owner: {
    name: "AutoTransporter " + faker.person.fullName(),
    surname: "AutoTransporter " + faker.person.firstName(),
    national_document: formatCnpj(generateCnpj()),
    state_document: faker.string.numeric({ length: 7 }),
    postal_code: '89700-055',
    local: 'Rua Marechal Deodoro',
    district: 'Centro',
    number: '1280',
    country: 'Brasil',
    state: 'SC',
    city_name: 'Concórdia',
    phone: '4934414120',
    cell: '(49) 9200-11913',
    email: faker.internet.email(),
  }
};

test('Create a first new Vehicle', async ({ page }) => {
  // acessando o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Veículos' }).click();

  // abre o cadastro
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // identificação
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(vehicle1.description);
  await page.getByRole('textbox', { name: 'Placa' }).click();
  await page.getByRole('textbox', { name: 'Placa' }).fill(vehicle1.plate);
  await page.getByRole('textbox', { name: 'RNTRC' }).click();
  await page.getByRole('textbox', { name: 'RNTRC' }).fill(vehicle1.rntrc);
  await page.getByRole('combobox', { name: 'UF' }).click();
  await page.getByRole('combobox', { name: 'UF' }).fill(vehicle1.uf);
  await page.getByText('Santa Catarina').click();
  await page.getByRole('textbox', { name: 'Renavam' }).click();
  await page.getByRole('textbox', { name: 'Renavam' }).fill(vehicle1.renavam);

  // proprietário
  await page.getByRole('textbox', { name: 'Proprietário' }).click();
  await page.getByRole('textbox', { name: 'Proprietário' }).fill('Bruno Fernando');
  await page.getByRole('button').filter({ hasText: 'search' }).click();
  await page.getByText('Zucchetti (Bruno Fernando) (').click();

  // informações do veículo
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).fill(vehicle1.tara);
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).fill(vehicle1.cap_kg);
  await page.getByRole('textbox', { name: 'Capacidade (m³)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (m³)' }).fill(vehicle1.cap_m3);
  await page.getByLabel('Tipo de rodado').getByText('Tipo de rodado').click();
  await page.getByText(vehicle1.wheelset_type).click();
  await page.getByLabel('Tipo de carroceria').getByText('Tipo de carroceria').click();
  await page.getByText(vehicle1.car_body_type).click();
  await page.getByRole('textbox', { name: 'Quantidade de eixos' }).click();
  await page.getByRole('textbox', { name: 'Quantidade de eixos' }).fill(vehicle1.axes_quantity);

  //salva o veículo
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('h1').filter({ hasText: 'Veículos' }).click();

  // verifica se foi criado
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle1.description);
  await page.waitForTimeout(2000);
  let isRegistered = await page.getByRole('heading', { name: new RegExp('(' + vehicle1.description + ')') }).isVisible();
  await expect(isRegistered).toBe(true);
});

test('Create a second new Vehicle', async ({ page }) => {
  // acessando o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Veículos' }).click();

  // abre o cadastro
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // identificação
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(vehicle2.description);
  await page.getByRole('textbox', { name: 'Placa' }).click();
  await page.getByRole('textbox', { name: 'Placa' }).fill(vehicle2.plate);
  await page.getByRole('textbox', { name: 'RNTRC' }).click();
  await page.getByRole('textbox', { name: 'RNTRC' }).fill(vehicle2.rntrc);
  await page.getByRole('combobox', { name: 'UF' }).click();
  await page.getByRole('combobox', { name: 'UF' }).fill(vehicle2.uf);
  await page.getByText('Santa Catarina').click();
  await page.getByRole('textbox', { name: 'Renavam' }).click();
  await page.getByRole('textbox', { name: 'Renavam' }).fill(vehicle2.renavam);
  await page.locator('label').filter({ hasText: 'Reboque' }).click();

  // proprietário
  await page.getByRole('button').filter({ hasText: 'add' }).click();
  await page.getByText('Pessoa jurídica').click();
  await page.getByRole('textbox', { name: 'Nome', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill(vehicle2.owner.name);
  await page.getByRole('textbox', { name: 'Nome Fantasia' }).click();
  await page.getByRole('textbox', { name: 'Nome Fantasia' }).fill(vehicle2.owner.surname);
  await page.getByRole('textbox', { name: 'CNPJ' }).click();
  await page.getByRole('textbox', { name: 'CNPJ' }).fill(vehicle2.owner.national_document);
  await page.getByRole('textbox', { name: 'IE' }).click();
  await page.getByRole('textbox', { name: 'IE' }).fill(vehicle2.owner.state_document);
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(vehicle2.owner.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(vehicle2.owner.number);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(vehicle2.owner.phone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(vehicle2.owner.cell);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(vehicle2.owner.email);
  // verifica o endereço do proprietário
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(vehicle2.owner.local);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(vehicle2.owner.district);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(vehicle2.owner.country)
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(vehicle2.owner.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(vehicle2.owner.city_name);
  // cadastra o proprietário
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // informações do veículo
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).fill(vehicle1.tara);
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).fill(vehicle1.cap_kg);
  await page.getByRole('textbox', { name: 'Capacidade (m³)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (m³)' }).fill(vehicle1.cap_m3);
  await page.getByLabel('Tipo de rodado').getByText('Tipo de rodado').click();
  await page.getByText(vehicle1.wheelset_type).click();
  await page.getByLabel('Tipo de carroceria').getByText('Tipo de carroceria').click();
  await page.getByText(vehicle1.car_body_type).click();
  await page.getByRole('textbox', { name: 'Quantidade de eixos' }).click();
  await page.getByRole('textbox', { name: 'Quantidade de eixos' }).fill(vehicle1.axes_quantity);

  //salva o veículo
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('h1').filter({ hasText: 'Veículos' }).click();

  // verifica se foi criado
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle1.description);
  await page.waitForTimeout(2000);
  let isRegistered = await page.getByRole('heading', { name: new RegExp('(' + vehicle1.description + ')') }).isVisible();
  await expect(isRegistered).toBe(true);
});

test('Edit Vehicle1', async ({ page }) => {
  //acessa o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Veículos' }).click();

  //pesquisa o veículo e clica em editar
  await page.locator('div').filter({ hasText: /^Digite para buscar\.\.\.$/ }).click();
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle1.description);
  await page.getByRole('heading', { name: new RegExp('(' + vehicle1.description + ')') }).click();
  await page.getByRole('button', { name: 'Editar' }).click();

  vehicle1.description = "Auto " + faker.vehicle.vehicle();
  vehicle1.tara = faker.string.numeric({ length: 4, allowLeadingZeros: false });
  vehicle1.cap_m3 = faker.string.numeric({ length: 4, allowLeadingZeros: false });

  // muda os dados no formulário
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(vehicle1.description);
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).fill(vehicle1.tara);
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).fill(vehicle1.cap_m3);

  //salva o veículo
  await page.getByRole('button', { name: 'Salvar' }).click();

  // verifica se foi criado
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle1.description);
  await page.waitForTimeout(2000);
  let isRegistered = await page.getByRole('heading', { name: new RegExp('(' + vehicle1.description + ')') }).isVisible();
  await expect(isRegistered).toBe(true);
});

test('Delete Vehicles', async ({ page }) => {
  // acessa o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Veículos' }).click();
  
  // cria uma lista de veículos
  let vehicles = [
    vehicle1,
    vehicle2
  ];

  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = vehicles[i];
      // pesquisa o veículo
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).click();
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle.description);
      await page.waitForTimeout(2000);
      if(!await page.locator('h3').filter({ hasText: 'Nada encontrado com "' + vehicle.description + '"' }).isVisible()) {
        await page.getByRole('heading', { name: new RegExp('(' + vehicle.description + ')') }).hover();
        await page.getByRole('navigation').filter({ hasText: new RegExp('(' + vehicle.description + ')') }).getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Excluir' }).click();
        await page.waitForTimeout(2000);
      }
      // deleta o veículo
      // verifica se o veículo foi deletado
      await expect(page.locator('h3')).toContainText('Nada encontrado com "'+vehicle.description+'"');
  }
});
