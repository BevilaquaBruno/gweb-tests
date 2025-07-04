import { test } from '../../helpers/fixtures';
import { expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generate as generateCnpj, format as formatCnpj } from 'cnpj';
import { generate as generateCPF } from 'gerador-validador-cpf';

type Vehicle = {
  description: string;
  plate: string;
  uf: string;
  rntrc: string;
  renavam: string;
  tara: string;
  cap_m3: string;
  cap_kg: string;
  wheelset_type: "Utilitário";
  car_body_type: "Aberta";
  axes_quantity: string;
  owner: Owner; // Pode ser um objeto Owner ou uma string com o nome do proprietário
}

type Owner = {
  name: string;
  surname?: string;
  national_document?: string;
  state_document?: string;
  postal_code?: string;
  local?: string;
  district?: string;
  number?: string;
  country?: string;
  state?: string;
  city_name?: string;
  phone?: string;
  cell?: string;
  email?: string;
}

const owner: Owner = {
  name: "Zucchetti (Bruno Fernando)",
  surname: "Zucchetti (Bruno Fernando)",
  national_document: generateCPF(),
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

const vehicle1: Vehicle = {
  description: "AutoVehicle " + faker.vehicle.vehicle().slice(0, 17),
  plate: faker.word.sample({ length: 3 }) + "-" + faker.string.numeric({ length: 4 }),
  uf: "SC",
  rntrc: faker.string.numeric({ length: 8 }),
  renavam: faker.string.numeric({ length: 9 }),
  tara: faker.string.numeric({ length: 4, allowLeadingZeros: false }),
  cap_m3: faker.string.numeric({ length: 3, allowLeadingZeros: false }),
  cap_kg: faker.string.numeric({ length: 3, allowLeadingZeros: false }),
  wheelset_type: "Utilitário",
  car_body_type: "Aberta",
  axes_quantity: faker.string.numeric({length: 1, allowLeadingZeros: false}),
  owner: { name: "Zucchetti (Bruno Fernando)"}
};

const vehicle2: Vehicle = {
  description: "AutoVehicle " + faker.vehicle.vehicle().slice(0, 17),
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
    name: "AutoTransporter " + faker.person.firstName(),
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

var vehicles: Vehicle[] = [];

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
  await page.getByRole('textbox', { name: 'Proprietário' }).fill(vehicle1.owner.name);
  await page.getByRole('button').filter({ hasText: 'search' }).click();
  await page.waitForTimeout(2000);
  // verifica se o proprietário já existe
  let isOwnerRegistered = await page.getByRole('option', { name: vehicle1.owner.name }).isVisible();
  if (!isOwnerRegistered) {
    await AddOwner(page);
  } else {
    await page.getByRole('option', { name: vehicle1.owner.name }).click();
  }

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
  await page.waitForTimeout(3000);
  let isRegistered = await page.getByRole('heading', { name: new RegExp('(' + vehicle1.description + ')') }).isVisible();
  await expect(isRegistered).toBe(true);
  vehicles.push(vehicle1);
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
  await page.getByRole('textbox', { name: 'Nome Fantasia' }).fill(vehicle2.owner.surname!);
  await page.getByRole('textbox', { name: 'CNPJ' }).click();
  await page.getByRole('textbox', { name: 'CNPJ' }).fill(vehicle2.owner.national_document!);
  await page.getByRole('textbox', { name: 'IE' }).click();
  await page.getByRole('textbox', { name: 'IE' }).fill(vehicle2.owner.state_document!);
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(vehicle2.owner.postal_code!);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(vehicle2.owner.number!);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(vehicle2.owner.phone!);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(vehicle2.owner.cell!);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(vehicle2.owner.email!);
  // verifica o endereço do proprietário
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(vehicle2.owner.local!);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(vehicle2.owner.district!);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(vehicle2.owner.country!)
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(vehicle2.owner.state!);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(vehicle2.owner.city_name!);
  // cadastra o proprietário
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // informações do veículo
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).fill(vehicle2.tara);
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).fill(vehicle2.cap_kg);
  await page.getByRole('textbox', { name: 'Capacidade (m³)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (m³)' }).fill(vehicle2.cap_m3);
  await page.getByLabel('Tipo de rodado').getByText('Tipo de rodado').click();
  await page.getByText(vehicle2.wheelset_type).click();
  await page.getByLabel('Tipo de carroceria').getByText('Tipo de carroceria').click();
  await page.getByText(vehicle2.car_body_type).click();
  await page.getByRole('textbox', { name: 'Quantidade de eixos' }).click();
  await page.getByRole('textbox', { name: 'Quantidade de eixos' }).fill(vehicle2.axes_quantity);

  //salva o veículo
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.locator('h1').filter({ hasText: 'Veículos' }).click();

  // verifica se foi criado
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle2.description);
  await page.waitForTimeout(2000);
  let isRegistered = await page.getByRole('heading', { name: new RegExp('(' + vehicle2.description + ')') }).isVisible();
  await expect(isRegistered).toBe(true);
  vehicles.push(vehicle2);
});

test('Edit Vehicle1', async ({ page }) => {
  //acessa o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Veículos' }).click();

  if(vehicles.length === 0) {
    throw new Error("No vehicles to edit. Please create vehicles first.");
  }

  //pesquisa o veículo e clica em editar
  await page.locator('div').filter({ hasText: /^Digite para buscar\.\.\.$/ }).click();
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicles[0].description);
  await page.waitForTimeout(2500);
  await page.getByRole('heading', { name: new RegExp('(' + vehicles[0].description + ')') }).click();
  await page.getByRole('button', { name: 'Editar' }).click();

  vehicles[0].description = "AutoVehicle " + faker.vehicle.vehicle().slice(0, 17);
  vehicles[0].tara = faker.string.numeric({ length: 4, allowLeadingZeros: false });
  vehicles[0].cap_m3 = faker.string.numeric({ length: 4, allowLeadingZeros: false });

  // muda os dados no formulário
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(vehicles[0].description);
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Tara (Kg)' }).fill(vehicles[0].tara);
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).fill(vehicles[0].cap_m3);

  //salva o veículo
  await page.getByRole('button', { name: 'Salvar' }).click();

  // verifica se foi criado
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicles[0].description);
  await page.waitForTimeout(2000);
  let isRegistered = await page.getByRole('heading', { name: new RegExp('(' + vehicles[0].description + ')') }).isVisible();
  await expect(isRegistered).toBe(true);
});

test('Delete Vehicles', async ({ page }) => {
  // acessa o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Veículos' }).click();

  // verifica se existem veículos cadastrados
  if (vehicles.length === 0) {
    throw new Error("No vehicles to delete. Please create vehicles first.");
  }

  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = vehicles[i];
    // pesquisa o veículo
    await page.getByRole('searchbox', { name: 'Digite para buscar...' }).click();
    await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle.description);
    await page.waitForTimeout(2000);
    if (!await page.locator('h3').filter({ hasText: 'Nada encontrado com "' + vehicle.description + '"' }).isVisible()) {
      await page.getByRole('heading', { name: new RegExp(vehicle.description) }).hover();
      await page.getByRole('navigation').filter({ hasText: new RegExp(vehicle.description) }).getByRole('button').nth(1).click();
      await page.getByRole('button', { name: 'Excluir' }).click();
      await page.waitForTimeout(2500);
    }
    // deleta o veículo
    // verifica se o veículo foi deletado
    await expect(page.locator('h3')).toContainText('Nada encontrado com "' + vehicle.description + '"');
  }

  // deleta a pessoa transportadora
  await page.getByRole('link', { name: 'Pessoas' }).click();
  // pesquisa a pessoa transportadora
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle2.owner.name);
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).press('Tab');
  await page.waitForTimeout(2000);
  if (!await page.locator('h3').filter({ hasText: 'Nada encontrado com "' + vehicle2.owner.name + '"' }).isVisible()) {
    // deleta a pessoa transportadora
    await page.getByRole('heading', { name: new RegExp('(' + vehicle2.owner.name + ')') }).hover();
    await page.getByRole('navigation').filter({ hasText: new RegExp('(' + vehicle2.owner.name + ')') }).getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Apagar' }).click();
    await page.getByRole('button', { name: 'Apagar' }).click();
    await page.waitForTimeout(2000);
  }

  // verifica se a pessoa transportadora foi deletada
  await expect(page.locator('h3')).toContainText('Nada encontrado com "' + vehicle2.owner.name + '"');
});

async function AddOwner(page: Page) {
  await page.getByRole('button', { name: 'Cadastrar pessoa' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill(owner.name);
  await page.getByRole('textbox', { name: 'Apelido' }).click();
  await page.getByRole('textbox', { name: 'Apelido' }).fill(owner.surname!);
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill(owner.national_document!);
  await page.getByRole('textbox', { name: 'RG' }).click();
  await page.getByRole('textbox', { name: 'RG' }).fill(owner.state_document!);
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(owner.postal_code!);
  await page.getByRole('textbox', { name: 'Logradouro' }).click();
  await page.getByRole('textbox', { name: 'Logradouro' }).fill(owner.local!);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(owner.number!);
  await page.getByRole('textbox', { name: 'Complemento' }).click();
  await page.getByRole('textbox', { name: 'Complemento' }).fill('Casa 1');
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(owner.phone!);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(owner.cell!);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(owner.email!);
  await page.getByLabel('Cadastrar pessoa').getByRole('button', { name: 'Confirmar' }).click();
  await expect(page.getByText('Pessoa cadastrada com sucesso').isVisible()).toBeTruthy();
}