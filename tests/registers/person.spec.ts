import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';
import { generate as generateCpf } from 'gerador-validador-cpf'
import { faker } from '@faker-js/faker';
import { generate as generateCnpj, format as formatCnpj } from 'cnpj';
import { Person, Company, Seller, RuralProducer, Accountant, Transporter, Foreigner } from '../types/registers/person.type';
import 'dotenv/config';
import { Search } from '../types/general/search.type';

// cria uma pessoa para ser cadastrada
const person: Person = {
  type: 'Pessoa',
  name: "AutoPerson " + faker.person.fullName(),
  surname: "AutoPerson " + faker.person.firstName(),
  national_document: generateCpf({ format: true }),
  state_document: faker.string.numeric({ length: 7 }),
  birth_date: '05032000',
  crc: '123456789',
  postal_code: '89700-055',
  local: 'Rua Marechal Deodoro',
  district: 'Centro',
  number: '1280',
  country: 'Brasil',
  state: 'SC',
  city_name: 'Concórdia',
  phone: '4934414120',
  cell: '(49) 9200-11913',
  fax: '1234567',
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: faker.internet.email(),
  homepage: faker.internet.domainName(),
  secondary_email: {
    description: faker.person.firstName(),
    email: faker.internet.email()
  },
  obs: "AutoPerson " + faker.lorem.sentences(10, '\n')
}

//cria um vendedor para ser cadastrado
const seller: Seller = {
  type: 'Vendedor',
  name: "AutoSeller " + faker.person.fullName(),
  surname: "AutoSeller " + faker.person.firstName(),
  national_document: generateCpf({ format: true }),
  state_document: faker.string.numeric({ length: 7 }),
  birth_date: '05032000',
  postal_code: '89700-055',
  local: 'Rua Marechal Deodoro',
  district: 'Centro',
  number: '1280',
  country: 'Brasil',
  state: 'SC',
  city_name: 'Concórdia',
  comission: {
    product_cash_payment_commission: 5,
    product_future_payment_commission: 3,
    service_cash_payment_commission: 6,
    service_future_payment_commission: 4,
  },
  phone: '4934414120',
  cell: '(49) 9200-11913',
  fax: '1234567',
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: faker.internet.email(),
  homepage: faker.internet.domainName(),
  secondary_email: {
    description: faker.person.firstName(),
    email: faker.internet.email()
  },
  obs: "AutoSeller " + faker.lorem.sentences(10, '\n')
}

// cria uma empresa para ser cadastrada
const company: Company = {
  type: 'Empresa',
  name: "AutoCompany " + faker.company.name(),
  trade_name: "AutoCompany " + faker.company.name(),
  national_document: formatCnpj(generateCnpj()),
  state_document: faker.string.numeric({ length: 7 }),
  municipal_document: faker.string.numeric({ length: 7 }),
  suframa_number: faker.string.numeric({ length: 5 }),
  cnae: faker.string.numeric({ length: 7 }),
  person: {
    name: faker.person.fullName(),
    national_document: generateCpf({ format: true })
  },
  postal_code: '89700-055',
  local: 'Rua Marechal Deodoro',
  district: 'Centro',
  number: '1280',
  country: 'Brasil',
  state: 'SC',
  city_name: 'Concórdia',
  phone: '4934414120',
  cell: '(49) 9200-11913',
  fax: '1234567',
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: faker.internet.email(),
  homepage: faker.internet.domainName(),
  secondary_email: {
    description: faker.person.firstName(),
    email: faker.internet.email()
  },
  obs: "AutoCompany " + faker.lorem.sentences(10, '\n')
}

// cria um produtor rural
const rural_producer: RuralProducer = {
  type: 'Produtor Rural',
  name: "AutoRural " + faker.person.fullName(),
  surname: "AutoRural " + faker.person.firstName(),
  national_document: generateCpf({ format: true }),
  state_document: faker.string.numeric({ length: 7 }),
  birth_date: '05032000',
  postal_code: '88015-100',
  local: 'Avenida Prefeito Osmar Cunha',
  district: 'Centro',
  number: '77',
  country: 'Brasil',
  state: 'SC',
  city_name: 'Florianópolis',
  phone: '4934414120',
  cell: '(49) 9200-11913',
  fax: '1234567',
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: faker.internet.email(),
  homepage: faker.internet.domainName(),
  secondary_email: {
    description: faker.person.firstName(),
    email: faker.internet.email()
  },
  obs: "AutoRural " + faker.lorem.sentences(10, '\n')
}

// cria um contador
const accountant: Accountant = {
  type: 'Contador',
  name: "AutoAccountant " + faker.person.fullName(),
  surname: "AutoAccountant " + faker.person.firstName(),
  national_document: generateCpf({ format: true }),
  state_document: faker.string.numeric({ length: 7 }),
  birth_date: '05032000',
  crc: faker.string.numeric({ length: 9 }),
  postal_code: '89700-055',
  local: 'Rua Marechal Deodoro',
  district: 'Centro',
  number: '1280',
  country: 'Brasil',
  state: 'SC',
  city_name: 'Concórdia',
  phone: '4934414120',
  cell: '(49) 9200-11913',
  fax: '1234567',
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: faker.internet.email(),
  homepage: faker.internet.domainName(),
  secondary_email: {
    description: faker.person.firstName(),
    email: faker.internet.email()
  },
  obs: "AutoAccountant " + faker.lorem.sentences(10, '\n')
}

// cria uma transportadora
const transporter: Transporter = {
  type: 'Transportador',
  name: "AutoTransporter " + faker.person.fullName(),
  trade_name: "AutoTransporter " + faker.person.firstName(),
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
  fax: '1234567',
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: faker.internet.email(),
  homepage: faker.internet.domainName(),
  secondary_email: {
    description: faker.person.firstName(),
    email: faker.internet.email()
  },
  rntrc: faker.string.numeric({ length: 8 }),
  vehicle: {
    description: 'AutoVehicle ' + faker.vehicle.vehicle().slice(0, 17),
    plate: 'ABC-1234',
    rntrc: faker.string.numeric({ length: 8 }),
    renavam: faker.string.numeric({ length: 9 }),
    tara: faker.string.numeric({ length: 1 }) + ".000",
    cap_m3: faker.string.numeric({ length: 1 }) + ".000",
    cap_kg: faker.string.numeric({ length: 1 }) + ".000",
  },
  obs: "AutoTransporter " + faker.lorem.sentences(10, '\n')
}

const foreigner: Foreigner = {
  type: 'Estrangeiro',
  name: 'AutoForeigner from Gibraltar',
  surname: 'Auto Gibraltarian',
  document: faker.string.numeric({ length: 8 }),
  birth_date: '01/01/2000',
  local: 'John Mackintosh Square',
  district: 'Gibraltar GX11 1AA',
  number: '1',
  country: 'Gibraltar',
  state: 'EX',
  city_name: 'Exterior',
  phone: '4934414120',
  cell: '(49) 9200-11913',
  fax: '1234567',
}

// usuário administrador para ser editado
const adm = {
  surname: "Usuário administrador",
  national_document: generateCpf({ format: true }),
  state_document: faker.string.numeric({ length: 7 }),
  postal_code: '89701-875',
  local: 'Rua Sérgio Galvan',
  district: 'São Paulo',
  number: '94',
  country: 'Brasil',
  state: 'SC',
  city_name: 'Concórdia',
}

const addedData: { people: (Person | Company | Transporter | Accountant | Seller | RuralProducer | Foreigner)[] } = { people: [] };

const search_list: Search[] = [
  {
    searchFor: '2',
    shouldFind: '(Usuário Administrador)'
  },
];

test('Should create a new Person', async ({ page }) => {
  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // abre o cadastro de uma nova pessoa
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // clica nos checkboxes do cadastro
  await page.locator('label').filter({ hasText: 'Vendedor' }).click();
  await page.locator('label').filter({ hasText: 'Cliente' }).click();
  await page.locator('label').filter({ hasText: 'Fornecedor' }).click();
  await page.locator('label').filter({ hasText: 'Transportador' }).click();
  await page.locator('label').filter({ hasText: 'Condutor' }).click();
  await page.locator('label').filter({ hasText: 'Contador' }).click();

  //preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill(person.name);
  await page.getByRole('textbox', { name: 'Apelido' }).click();
  await page.getByRole('textbox', { name: 'Apelido' }).fill(person.surname);
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill(person.national_document);
  await page.getByRole('textbox', { name: 'RG' }).click();
  await page.getByRole('textbox', { name: 'RG' }).fill(person.state_document);
  await page.getByRole('textbox', { name: 'Data de nascimento' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento' }).fill(person.birth_date);
  await page.getByRole('textbox', { name: 'Contato' }).click();
  await page.getByRole('textbox', { name: 'Contato' }).fill(person.surname);

  //preenche dados do cliente
  await page.getByText('Dia de acertoDia de acerto').click();
  await page.getByRole('option', { name: '13' }).click();
  await page.getByRole('textbox', { name: 'Limite de crédito' }).click();
  await page.getByLabel('Tabela de preços preferencial').getByText('Tabela de preços preferencial').click();
  await page.getByRole('option', { name: 'Nenhuma' }).click();
  await page.locator('div').filter({ hasText: /^Vendedor$/ }).nth(1).click();
  await page.getByRole('option', { name: 'Não definido' }).click();

  // preenche dados do contador
  await page.getByRole('textbox', { name: 'CRC' }).click();
  await page.getByRole('textbox', { name: 'CRC' }).fill(person.crc!);

  // preenche dados do vendedor - playwright não consegue identificálos
  /*
  await page.locator('input[name="seller.cash_payment_commission"]').click();
  await page.locator('input[name="seller.cash_payment_commission"]').fill('5,00');
  await page.locator('input[name="seller.future_payment_commission"]').click();
  await page.locator('input[name="seller.future_payment_commission"]').fill('3,00');
  await page.locator('input[name="seller.service_commission"]').click();
  await page.locator('input[name="seller.service_commission"]').fill('6,00');
  await page.locator('input[name="seller.future_service_commission"]').click();
  await page.locator('input[name="seller.future_service_commission"]').fill('4,00');
  */

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(person.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(person.number);
  // verificações do preenchimento do CEP
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(person.local);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(person.district);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(person.country);
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(person.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(person.city_name);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(person.phone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(person.cell);
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill(person.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(person.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(person.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect.soft(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(person.secondary_cell.cell);

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(person.email);
  await page.getByRole('textbox', { name: 'Website' }).click();
  await page.getByRole('textbox', { name: 'Website' }).fill(person.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(person.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(person.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).click();
  await page.getByRole('textbox', { name: 'Observações' }).fill(person.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: person.name }).click();

  // valida os campos na página de visualização pós cadastro
  await expect.soft(page.getByText('Nome' + person.name)).toBeVisible();
  await expect.soft(page.getByText('Apelido' + person.surname)).toBeVisible();
  await expect.soft(page.getByText('CPF' + person.national_document)).toBeVisible();

  // valida endereço principal
  await expect(page.getByRole('heading', { name: 'Endereço principal' })).toBeVisible();
  await expect.soft(page.getByText('Logradouro' + person.local)).toBeVisible();
  await expect.soft(page.getByText('Número' + person.number)).toBeVisible();
  await expect.soft(page.getByText('Bairro' + person.district)).toBeVisible();
  await expect.soft(page.getByText('CEP' + person.postal_code)).toBeVisible();
  await expect.soft(page.getByText('UF' + person.state)).toBeVisible();
  await expect.soft(page.getByText('Município' + person.city_name)).toBeVisible();
  await expect.soft(page.getByText('País' + person.country)).toBeVisible();

  // adiciona a pessoa ao array de pessoas adicionadas
  addedData.people.push(person);
  search_list.push(
    {
      searchFor: person.national_document,
      shouldFind: person.name
    },
    {
      searchFor: person.phone,
      shouldFind: person.name
    },
    {
      searchFor: person.cell,
      shouldFind: person.name
    },
    {
      searchFor: person.fax,
      shouldFind: person.name
    },
    {
      searchFor: person.name,
      shouldFind: person.name
    },
  );
});

test('Should create a new Seller', async ({ page }) => {
  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // abre o cadastro de uma nova pessoa
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // clica nos checkboxes do cadastro
  await page.locator('label').filter({ hasText: 'Vendedor' }).click();

  //preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill(seller.name);
  await page.getByRole('textbox', { name: 'Apelido' }).click();
  await page.getByRole('textbox', { name: 'Apelido' }).fill(seller.surname);
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill(seller.national_document);
  await page.getByRole('textbox', { name: 'RG' }).click();
  await page.getByRole('textbox', { name: 'RG' }).fill(seller.state_document);
  await page.getByRole('textbox', { name: 'Data de nascimento' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento' }).fill(seller.birth_date);
  await page.getByRole('textbox', { name: 'Contato' }).click();
  await page.getByRole('textbox', { name: 'Contato' }).fill(seller.surname);

  // preenche dados do vendedor - playwright não consegue identificálos - GWB-370
  /*
  await page.locator('input[name="seller.cash_payment_commission"]').click();
  await page.locator('input[name="seller.cash_payment_commission"]').fill('5,00');
  await page.locator('input[name="seller.future_payment_commission"]').click();
  await page.locator('input[name="seller.future_payment_commission"]').fill('3,00');
  await page.locator('input[name="seller.service_commission"]').click();
  await page.locator('input[name="seller.service_commission"]').fill('6,00');
  await page.locator('input[name="seller.future_service_commission"]').click();
  await page.locator('input[name="seller.future_service_commission"]').fill('4,00');
  */

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(seller.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(seller.number);
  // verificações do preenchimento do CEP
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(seller.local);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(seller.district);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(seller.country);
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(seller.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(seller.city_name);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(seller.phone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(seller.cell);
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill(seller.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(seller.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(seller.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect.soft(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(seller.secondary_cell.cell);

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(seller.email);
  await page.getByRole('textbox', { name: 'Website' }).click();
  await page.getByRole('textbox', { name: 'Website' }).fill(seller.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(seller.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(seller.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).click();
  await page.getByRole('textbox', { name: 'Observações' }).fill(seller.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: seller.name }).click();

  // valida os campos na página de visualização pós cadastro
  await expect.soft(page.getByText('Nome' + seller.name)).toBeVisible();
  await expect.soft(page.getByText('Apelido' + seller.surname)).toBeVisible();
  await expect.soft(page.getByText('CPF' + seller.national_document)).toBeVisible();

  // valida endereço principal
  await expect(page.getByRole('heading', { name: 'Endereço principal' })).toBeVisible();
  await expect.soft(page.getByText('Logradouro' + seller.local)).toBeVisible();
  await expect.soft(page.getByText('Número' + seller.number)).toBeVisible();
  await expect.soft(page.getByText('Bairro' + seller.district)).toBeVisible();
  await expect.soft(page.getByText('CEP' + seller.postal_code)).toBeVisible();
  await expect.soft(page.getByText('UF' + seller.state)).toBeVisible();
  await expect.soft(page.getByText('Município' + seller.city_name)).toBeVisible();
  await expect.soft(page.getByText('País' + seller.country)).toBeVisible();

  // adiciona o vendedor ao array de pessoas adicionadas
  addedData.people.push(seller);
});

test('Should create a new company', async ({ page }) => {
  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // abre o cadastro de uma nova pessoa
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // marca CNPJ
  await page.getByText('Pessoa jurídica').click();

  // clica nos atributos
  await page.locator('label').filter({ hasText: 'Intermediador' }).click();

  // preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill(company.name);
  await page.getByRole('textbox', { name: 'Nome fantasia' }).click();
  await page.getByRole('textbox', { name: 'Nome fantasia' }).fill(company.trade_name);
  await page.getByRole('textbox', { name: 'CNPJ' }).click();
  await page.getByRole('textbox', { name: 'CNPJ' }).fill(company.national_document);
  await page.getByRole('textbox', { name: 'IE' }).click();
  await page.getByRole('textbox', { name: 'IE' }).fill(company.state_document);
  await page.getByRole('textbox', { name: 'IM' }).click();
  await page.getByRole('textbox', { name: 'IM' }).fill(company.municipal_document);
  await page.getByRole('textbox', { name: 'SUFRAMA' }).click();
  await page.getByRole('textbox', { name: 'SUFRAMA' }).fill(company.suframa_number);
  await page.getByRole('textbox', { name: 'CNAE' }).click();
  await page.getByRole('textbox', { name: 'CNAE' }).fill(company.cnae);
  await page.getByRole('textbox', { name: 'Nome do responsável' }).click();
  await page.getByRole('textbox', { name: 'Nome do responsável' }).fill(company.person.name);
  await page.getByRole('textbox', { name: 'CPF do responsável' }).click();
  await page.getByRole('textbox', { name: 'CPF do responsável' }).fill(company.person.national_document);

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(company.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(company.number);
  // verificações do preenchimento do CEP
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(company.local);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(company.district);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(company.country)
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(company.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(company.city_name);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(company.phone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(company.cell);
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill(company.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(company.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(company.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect.soft(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(company.secondary_cell.cell);

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(company.email);
  await page.getByRole('textbox', { name: 'Website' }).click();
  await page.getByRole('textbox', { name: 'Website' }).fill(company.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(company.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(company.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).click();
  await page.getByRole('textbox', { name: 'Observações' }).fill(company.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: company.name }).click();


  // valida os campos na página de visualização pós cadastro
  await expect.soft(page.getByText('Nome' + company.name)).toBeVisible();
  await expect.soft(page.getByText('Nome Comercial' + company.trade_name)).toBeVisible();
  await expect.soft(page.getByText('CNPJ' + company.national_document)).toBeVisible();
  await expect.soft(page.getByText('IE' + company.state_document)).toBeVisible();
  await expect.soft(page.getByText('IM' + company.municipal_document)).toBeVisible();
  await expect.soft(page.getByText('SUFRAMA' + company.suframa_number)).toBeVisible();
  await expect.soft(page.getByText('Nome do Responsável' + company.person.name)).toBeVisible();
  await expect.soft(page.getByText('CPF do Responsável' + company.person.national_document)).toBeVisible();

  // valida endereço principal
  await expect(page.getByRole('heading', { name: 'Endereço principal' })).toBeVisible();
  await expect.soft(page.getByText('Logradouro' + company.local)).toBeVisible();
  await expect.soft(page.getByText('Número' + company.number)).toBeVisible();
  await expect.soft(page.getByText('Bairro' + company.district)).toBeVisible();
  await expect.soft(page.getByText('CEP' + company.postal_code)).toBeVisible();
  await expect.soft(page.getByText('UF' + company.state)).toBeVisible();
  await expect.soft(page.getByText('Município' + company.city_name)).toBeVisible();
  await expect.soft(page.getByText('País' + company.country)).toBeVisible();

  addedData.people.push(company);
  search_list.push(
    {
      searchFor: company.national_document,
      shouldFind: company.name
    },
    {
      searchFor: company.trade_name,
      shouldFind: company.trade_name
    },
    {
      searchFor: company.email,
      shouldFind: company.name
    }
  );
});

test('Should create a new rural producer', async ({ page }) => {
  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // abre o cadastro de uma nova pessoa
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  //preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill(rural_producer.name);
  await page.getByRole('textbox', { name: 'Apelido' }).click();
  await page.getByRole('textbox', { name: 'Apelido' }).fill(rural_producer.surname);
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill(rural_producer.national_document);
  await page.getByRole('textbox', { name: 'RG' }).click();
  await page.getByRole('textbox', { name: 'RG' }).fill(rural_producer.state_document);
  await page.getByRole('textbox', { name: 'Data de nascimento' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento' }).fill(rural_producer.birth_date);
  await page.getByRole('textbox', { name: 'Contato' }).click();
  await page.getByRole('textbox', { name: 'Contato' }).fill(rural_producer.surname);

  // marca produtor rural
  await page.locator('label').filter({ hasText: 'Produtor Rural' }).click();

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(rural_producer.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(rural_producer.number);
  // verificações do preenchimento do CEP
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(rural_producer.local);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(rural_producer.district);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(rural_producer.country);
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(rural_producer.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(rural_producer.city_name);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(rural_producer.phone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(rural_producer.cell);
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill(rural_producer.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(rural_producer.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(rural_producer.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect.soft(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(rural_producer.secondary_cell.cell);

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(rural_producer.email);
  await page.getByRole('textbox', { name: 'Website' }).click();
  await page.getByRole('textbox', { name: 'Website' }).fill(rural_producer.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(rural_producer.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(rural_producer.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).click();
  await page.getByRole('textbox', { name: 'Observações' }).fill(rural_producer.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: rural_producer.name }).click();


  // valida os campos na página de visualização pós cadastro
  await expect.soft(page.getByText('Nome' + rural_producer.name)).toBeVisible();
  await expect.soft(page.getByText('Apelido' + rural_producer.surname)).toBeVisible();
  await expect.soft(page.getByText('CPF' + rural_producer.national_document)).toBeVisible();
  await expect.soft(page.getByText('Logradouro' + rural_producer.local)).toBeVisible();
  await expect.soft(page.getByText('Número' + rural_producer.number)).toBeVisible();
  await expect.soft(page.getByText('Bairro' + rural_producer.district)).toBeVisible();
  await expect.soft(page.getByText('CEP' + rural_producer.postal_code)).toBeVisible();
  await expect.soft(page.getByText('UF' + rural_producer.state)).toBeVisible();
  await expect.soft(page.getByText('Município' + rural_producer.city_name)).toBeVisible();
  await expect.soft(page.getByText('País' + rural_producer.country)).toBeVisible();

  addedData.people.push(rural_producer);
  search_list.push(
    {
      searchFor: rural_producer.city_name,
      shouldFind: rural_producer.name
    }
  );
});

test('Should create a new accountant', async ({ page }) => {
  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // abre o cadastro de uma nova pessoa
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  //marca como contador
  await page.locator('label').filter({ hasText: 'Contador' }).click();


  //preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill(accountant.name);
  await page.getByRole('textbox', { name: 'Apelido' }).click();
  await page.getByRole('textbox', { name: 'Apelido' }).fill(accountant.surname);
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill(accountant.national_document);
  await page.getByRole('textbox', { name: 'RG' }).click();
  await page.getByRole('textbox', { name: 'RG' }).fill(accountant.state_document);
  await page.getByRole('textbox', { name: 'Data de nascimento' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento' }).fill(accountant.birth_date);
  await page.getByRole('textbox', { name: 'Contato' }).click();
  await page.getByRole('textbox', { name: 'Contato' }).fill(accountant.surname);

  // preenche dados do contador
  await page.getByRole('textbox', { name: 'CRC' }).click();
  await page.getByRole('textbox', { name: 'CRC' }).fill(accountant.crc!);

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(accountant.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(accountant.number);
  // preenche manualmente os campos de endereço caso não sejam preenchidos automaticamente
  await page.getByRole('textbox', { name: 'Logradouro' }).click();
  await page.getByRole('textbox', { name: 'Logradouro' }).fill(accountant.local);
  await page.getByRole('textbox', { name: 'Bairro' }).click();
  await page.getByRole('textbox', { name: 'Bairro' }).fill(accountant.district);
  // verificações do preenchimento do CEP
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(accountant.local);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(accountant.district);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(accountant.country);
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(accountant.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(accountant.city_name);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(accountant.phone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(accountant.cell);
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill(accountant.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(accountant.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(accountant.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect.soft(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(accountant.secondary_cell.cell);

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(accountant.email);
  await page.getByRole('textbox', { name: 'Website' }).click();
  await page.getByRole('textbox', { name: 'Website' }).fill(accountant.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(accountant.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(accountant.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).click();
  await page.getByRole('textbox', { name: 'Observações' }).fill(accountant.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: accountant.name }).click();


  // valida os campos na página de visualização pós cadastro
  await expect.soft(page.getByText('Nome' + accountant.name)).toBeVisible();
  await expect.soft(page.getByText('Apelido' + accountant.surname)).toBeVisible();
  await expect.soft(page.getByText('CPF' + accountant.national_document)).toBeVisible();
  await expect.soft(page.getByText('Logradouro' + accountant.local)).toBeVisible();
  await expect.soft(page.getByText('Número' + accountant.number)).toBeVisible();
  await expect.soft(page.getByText('Bairro' + accountant.district)).toBeVisible();
  await expect.soft(page.getByText('CEP' + accountant.postal_code)).toBeVisible();
  await expect.soft(page.getByText('UF' + accountant.state)).toBeVisible();
  await expect.soft(page.getByText('Município' + accountant.city_name)).toBeVisible();
  await expect.soft(page.getByText('País' + accountant.country)).toBeVisible();

  addedData.people.push(accountant);
});

test('Should create a new transporter', async ({ page }) => {
  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // abre o cadastro de uma nova pessoa
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // marca como pessoa jurídica
  await page.getByText('Pessoa jurídica').click();

  //preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill(transporter.name);
  await page.getByRole('textbox', { name: 'Nome Fantasia' }).click();
  await page.getByRole('textbox', { name: 'Nome Fantasia' }).fill(transporter.trade_name);
  await page.getByRole('textbox', { name: 'CNPJ' }).click();
  await page.getByRole('textbox', { name: 'CNPJ' }).fill(transporter.national_document);
  await page.getByRole('textbox', { name: 'IE' }).click();
  await page.getByRole('textbox', { name: 'IE' }).fill(transporter.state_document);

  // marca transportador
  await page.locator('label').filter({ hasText: 'Transportador' }).click();

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(transporter.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(transporter.number);
  // verificações do preenchimento do CEP
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(transporter.local);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(transporter.district);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(transporter.country);
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(transporter.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(transporter.city_name);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(transporter.phone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(transporter.cell);
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill(transporter.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(transporter.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(transporter.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect.soft(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(transporter.secondary_cell.cell);

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(transporter.email);
  await page.getByRole('textbox', { name: 'Website' }).click();
  await page.getByRole('textbox', { name: 'Website' }).fill(transporter.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(transporter.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(transporter.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche transportador

  await page.getByRole('textbox', { name: 'RNTRC' }).click();
  await page.getByRole('textbox', { name: 'RNTRC' }).fill(transporter.rntrc!);
  await page.getByLabel('Tipo da transportadora').getByText('Tipo da transportadora').click();
  await page.getByRole('option', { name: 'TAC - Transportador Autônomo' }).click();
  await page.getByLabel('Tipo do proprietário').getByText('Tipo do proprietário').click();
  await page.getByRole('option', { name: 'TAC - independente' }).click();

  // preenche veículos
  await page.locator('mat-list').getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(transporter.vehicle!.description);
  await page.getByRole('textbox', { name: 'Placa' }).click();
  await page.getByRole('textbox', { name: 'Placa' }).fill(transporter.vehicle!.plate);
  await page.getByRole('combobox', { name: 'UF UF' }).locator('span').click();
  await page.getByRole('option', { name: 'SC' }).click();
  await page.getByRole('textbox', { name: 'RNTRC' }).click();
  await page.getByRole('textbox', { name: 'RNTRC' }).fill(transporter.vehicle!.rntrc);
  await page.getByRole('textbox', { name: 'Renavam' }).click();
  await page.getByRole('textbox', { name: 'Renavam' }).fill(transporter.vehicle!.renavam);
  await page.getByRole('textbox', { name: 'Tara(KG)' }).click();
  await page.getByRole('textbox', { name: 'Tara(KG)' }).fill(transporter.vehicle!.tara);
  await page.getByRole('textbox', { name: 'Capacidade(M3)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade(M3)' }).fill(transporter.vehicle!.cap_m3);
  await page.getByRole('textbox', { name: 'Capacidade(KG)' }).click();
  await page.getByRole('textbox', { name: 'Capacidade(KG)' }).fill(transporter.vehicle!.cap_kg);
  await page.getByLabel('Tipo de rodado').getByText('Tipo de rodado').click();
  await page.getByRole('option', { name: 'Truck' }).click();
  await page.getByLabel('Tipo de carroceria').getByText('Tipo de carroceria').click();
  await page.getByRole('option', { name: 'Aberta' }).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).click();
  await page.getByRole('textbox', { name: 'Observações' }).fill(transporter.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: transporter.name }).click();


  // valida os campos na página de visualização pós cadastro
  await expect.soft(page.getByText('Nome' + transporter.name)).toBeVisible();
  await expect.soft(page.getByText('Nome comercial' + transporter.trade_name)).toBeVisible();
  await expect.soft(page.getByText('CNPJ' + transporter.national_document)).toBeVisible();
  await expect.soft(page.getByText('Logradouro' + transporter.local)).toBeVisible();
  await expect.soft(page.getByText('Número' + transporter.number)).toBeVisible();
  await expect.soft(page.getByText('Bairro' + transporter.district)).toBeVisible();
  await expect.soft(page.getByText('CEP' + transporter.postal_code)).toBeVisible();
  await expect.soft(page.getByText('Município' + transporter.city_name)).toBeVisible();
  await expect.soft(page.getByText('País' + transporter.country)).toBeVisible();

  addedData.people.push(transporter);
});

test('Should create a new foreigner', async ({ page }) => {
  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // abre o cadastro de uma nova pessoa
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // troca o país para Gibraltar e cidade para Ex
  await page.getByRole('combobox', { name: 'País' }).click();
  await page.getByRole('combobox', { name: 'País' }).fill(foreigner.country);
  await page.getByText(foreigner.country).click();
  await page.getByRole('combobox', { name: 'Município' }).click();
  await page.getByText(foreigner.city_name + ' - ' + foreigner.state).click();

  // preenche dados gerais
  await page.getByRole('textbox', { name: 'Nome' }).click();
  await page.getByRole('textbox', { name: 'Nome' }).fill(foreigner.name);
  await page.getByRole('textbox', { name: 'Apelido' }).click();
  await page.getByRole('textbox', { name: 'Apelido' }).fill(foreigner.surname);
  await page.getByRole('textbox', { name: 'Documento de identificação' }).click();
  await page.getByRole('textbox', { name: 'Documento de identificação' }).fill(foreigner.document);
  await page.getByRole('textbox', { name: 'Data de nascimento' }).click();
  await page.getByRole('textbox', { name: 'Data de nascimento' }).fill(foreigner.birth_date);

  // preenche o resto do endereço
  await page.getByRole('textbox', { name: 'Logradouro' }).click();
  await page.getByRole('textbox', { name: 'Logradouro' }).fill(foreigner.local);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(foreigner.number);
  await page.getByRole('textbox', { name: 'Bairro' }).click();
  await page.getByRole('textbox', { name: 'Bairro' }).fill(foreigner.district);

  // preenche telefones
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(foreigner.phone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(foreigner.cell);
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill(foreigner.fax);

  //salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: foreigner.name }).click();


  // valida os campos na página de visualização pós cadastro
  await expect.soft(page.getByText('Nome' + foreigner.name)).toBeVisible();
  await expect.soft(page.getByText('Apelido' + foreigner.surname)).toBeVisible();
  await expect.soft(page.getByText('Documento de identificação' + foreigner.document)).toBeVisible();
  await expect.soft(page.getByText('Logradouro' + foreigner.local)).toBeVisible();
  await expect.soft(page.getByText('Número' + foreigner.number)).toBeVisible();
  await expect.soft(page.getByText('Bairro' + foreigner.district)).toBeVisible();
  await expect.soft(page.getByText('Município' + foreigner.city_name)).toBeVisible();
  await expect.soft(page.getByText('País' + foreigner.country)).toBeVisible();

  addedData.people.push(foreigner);
});

test('Should search people', async ({ page }) => {
  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // Pesquisa por (em ordem) código, CNPF/CNPJ, telefone, celular ou fax,
  // nome, fantasia/apelido, CPF/CNPJ, telefone, celular, fax, e-mail principal ou cidade.

  for (let i = 0; i < search_list.length; i++) {
    const item = search_list[i];

    // pesquisa a pessoa e espera 2 segundos para carregar a lista
    await page.getByRole('searchbox', { name: 'Digite para buscar...' }).click();
    await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(item.searchFor);
    await page.waitForTimeout(2000);

    // valida se a pesquisa encontrou o item
    if(item.searchFor === '2') {
      await expect.soft(page.getByText(item.shouldFind)).toBeVisible();
    } else {
      await expect.soft(page.getByRole('heading', { name: new RegExp(item.shouldFind) })).toBeVisible();
    }
  }

});

test('Should inactivate AutoPerson', async ({ page }) => {
  // navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // pesquisa a pessoa e espera 2 segundos para carregar a lista
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).click();
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(addedData.people[0].name);
  await page.waitForTimeout(2000);

  // abre para editar
  await page.getByRole('heading', { name: new RegExp(addedData.people[0].name) }).click();
  await page.getByRole('button', { name: 'Editar' }).click();

  //inativa e salva
  await page.locator('label').filter({ hasText: 'Ativo' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();

  // clica no nome para esperar carregar e verifica se está inativo
  await page.getByRole('heading', { name: addedData.people[0].name }).click();
  await expect(page.getByText('StatusInativo')).toBeVisible();

  // pesquisa se a pessoa ficou inativa na lista
  await page.getByRole('link', { name: 'Pessoas' }).click();
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).click();
  await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(addedData.people[0].name);
  await page.waitForTimeout(2000);
  await expect(page.getByRole('heading', { name: new RegExp('Inativo') })).toBeVisible();
});

test('Should edit user #2', async ({ page }) => {
  // navega para o cadastro
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/2/editar");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/2/editar");
  await page.getByRole('heading', { name: 'Editando cadastro de pessoa' }).click();

  // edita a pessoa
  await page.getByRole('textbox', { name: 'Apelido' }).click();
  await page.getByRole('textbox', { name: 'Apelido' }).fill(adm.surname);
  await page.getByRole('textbox', { name: 'CPF' }).click();
  await page.getByRole('textbox', { name: 'CPF' }).fill(adm.national_document);

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(adm.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(adm.number);
  // verificações do preenchimento do CEP
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(adm.local);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(adm.district);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(adm.country);
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(adm.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(adm.city_name);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('(' + adm.surname + ')')).toBeVisible();

  // valida os campos na página de visualização pós cadastro
  await expect.soft(page.getByText('Apelido' + adm.surname)).toBeVisible();
  await expect.soft(page.getByText('CPF' + adm.national_document)).toBeVisible();
  await expect.soft(page.getByText('Logradouro' + adm.local)).toBeVisible();
  await expect.soft(page.getByText('Número' + adm.number)).toBeVisible();
  await expect.soft(page.getByText('Bairro' + adm.district)).toBeVisible();
  await expect.soft(page.getByText('CEP' + adm.postal_code)).toBeVisible();
  await expect.soft(page.getByText('UF' + adm.state)).toBeVisible();
  await expect.soft(page.getByText('Município' + adm.city_name)).toBeVisible();
  await expect.soft(page.getByText('País' + adm.country)).toBeVisible();
});

test('Should delete People', async ({ page }) => {
  // acessa o menu
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();
  await page.waitForTimeout(2000);

  // deleta pessoas da lista acima
  for (let i = 0; i < addedData.people.length; i++) {
    const person = addedData.people[i];
    if (person.type === 'Transportador' && 'vehicle' in person && person.vehicle) {
      // deleta transportadora
      // deleta o veículo da transportadora
      // acessa o menu de veículos
      await page.getByRole('link', { name: 'Veículos' }).click();
      // esse clique aqui vai esperar carregar a página dos veículos
      await page.locator('h1').filter({ hasText: 'Veículos' }).click();
      // pesquisa o veículo
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).click();
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(person?.vehicle?.description ?? '');
      await page.waitForTimeout(2000);
      if (!await page.locator('h3').filter({ hasText: 'Nada encontrado com "' + person?.vehicle?.description + '"' }).isVisible()) {
        await page.getByRole('heading', { name: new RegExp('(' + person?.vehicle?.description + ')') }).hover();
        await page.getByRole('navigation').filter({ hasText: new RegExp('(' + person?.vehicle?.description + ')') }).getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Excluir' }).click();
        await page.waitForTimeout(2000);
      }
      // deleta o veículo
      // verifica se o veículo foi deletado
      await expect(page.locator('h3')).toContainText('Nada encontrado com "' + person?.vehicle?.description + '"');

      // deleta a pessoa transportadora
      await page.getByRole('link', { name: 'Pessoas' }).click();
      // pesquisa a pessoa transportadora
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(person!.name);
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).press('Tab');
      await page.waitForTimeout(2000);
      if (!await page.locator('h3').filter({ hasText: 'Nada encontrado com "' + person!.name + '"' }).isVisible()) {
        // deleta a pessoa transportadora
        await page.getByRole('heading', { name: new RegExp('(' + person!.name + ')') }).hover();
        await page.getByRole('navigation').filter({ hasText: new RegExp('(' + person!.name + ')') }).getByRole('button').click();
        await page.getByRole('menuitem', { name: 'Apagar' }).click();
        await page.getByRole('button', { name: 'Apagar' }).click();
        await page.waitForTimeout(2000);
      }

      // verifica se a pessoa transportadora foi deletada
      await expect(page.locator('h3')).toContainText('Nada encontrado com "' + person!.name + '"');
    } else {
      const name = person.name;

      // pesquisa a pessoa
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).click();
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(name);
      await page.getByRole('searchbox', { name: 'Digite para buscar...' }).press('Tab');
      await page.waitForTimeout(2000);

      // verifica se a pessoa foi encontrada
      let isDeleted = await page.locator('h3').filter({ hasText: 'Nada encontrado com "' + name + '"' }).isVisible();
      if (!isDeleted) {
        await page.getByRole('heading', { name: new RegExp('(' + name + ')') }).hover();
        await page.getByRole('navigation').filter({ hasText: new RegExp('(' + name + ')') }).getByRole('button').click();
        await page.getByRole('menuitem', { name: 'Apagar' }).click();
        await page.getByRole('button', { name: 'Apagar' }).click();
        await page.waitForTimeout(2000);
      }

      await expect(page.locator('h3')).toContainText('Nada encontrado com "' + name + '"');
    }
  }
});
