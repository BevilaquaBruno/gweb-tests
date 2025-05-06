import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';
import { generate as generateCpf } from 'gerador-validador-cpf'
import { faker } from '@faker-js/faker';
import { generate as generateCnpj, format as formatCnpj } from 'cnpj';
import 'dotenv/config';

// cria uma pessoa para ser cadastrada
let person = {
  name: "Auto " + faker.person.fullName(),
  surname: "Auto " + faker.person.firstName(),
  national_document: generateCpf({ format: true }),
  state_document: faker.string.numeric({ length: 7}),
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
  obs: "Auto " + faker.lorem.sentences(10, '\n')
}

// cria uma empresa para ser cadastrada
let company = {
  id: "0",
  name: "Auto " + faker.company.name(),
  trade_name: "Auto " + faker.company.name(),
  national_document: formatCnpj(generateCnpj()),
  state_document: faker.string.numeric({ length: 7}),
  municipal_document: faker.string.numeric({ length: 7}),
  suframa_number: faker.string.numeric({ length: 5}),
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
  obs: "Auto " + faker.lorem.sentences(10, '\n')
}

test('Create a new Person', async ({ page }) => {
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
  await page.getByRole('textbox', { name: 'Data de nascimento' }).press('Tab');
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
  await page.getByRole('textbox', { name: 'CRC' }).fill(person.crc);

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
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(person.number);
  // verificações do preenchimento do CEP
  await expect(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(person.local);
  await expect(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(person.district);
  await expect(page.getByRole('combobox', { name: 'País' })).toHaveValue(person.country)
  await expect(page.getByRole('combobox', { name: 'UF' })).toHaveValue(person.state);
  await expect(page.getByRole('combobox', { name: 'Município' })).toHaveValue(person.city_name);

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
  await expect(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(person.secondary_cell.cell);

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

  // valida os campos na página de visualização pós cadastro
  await expect(page.getByText('Nome'+person.name)).toBeVisible();
  await expect(page.getByText('Apelido'+person.surname)).toBeVisible();
  await expect(page.getByText('CPF'+person.national_document)).toBeVisible();
  await expect(page.getByText('Logradouro'+person.local)).toBeVisible();
  await expect(page.getByText('Número'+person.number)).toBeVisible();
  await expect(page.getByText('Bairro'+person.district)).toBeVisible();
  await expect(page.getByText('CEP'+person.postal_code)).toBeVisible();
  await expect(page.getByText('UF'+person.state)).toBeVisible();
  await expect(page.getByText('Município'+person.city_name)).toBeVisible();
  await expect(page.getByText('País'+person.country)).toBeVisible();
});

test('Create a new company', async ({ page }) => {
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
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(company.number);
  // verificações do preenchimento do CEP
  await expect(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(company.local);
  await expect(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(company.district);
  await expect(page.getByRole('combobox', { name: 'País' })).toHaveValue(company.country)
  await expect(page.getByRole('combobox', { name: 'UF' })).toHaveValue(company.state);
  await expect(page.getByRole('combobox', { name: 'Município' })).toHaveValue(company.city_name);

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
  await expect(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(company.secondary_cell.cell);

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

  // valida os campos na página de visualização pós cadastro
  await expect(page.getByText('Nome'+company.name)).toBeVisible();
  await expect(page.getByText('Nome Comercial'+company.trade_name)).toBeVisible();
  await expect(page.getByText('CNPJ'+company.national_document)).toBeVisible();
  await expect(page.getByText('IE'+company.state_document)).toBeVisible();
  await expect(page.getByText('IM'+company.municipal_document)).toBeVisible();
  await expect(page.getByText('SUFRAMA'+company.suframa_number)).toBeVisible();
  await expect(page.getByText('Nome do Responsável'+company.person.name)).toBeVisible();
  await expect(page.getByText('CPF do Responsável'+company.person.national_document)).toBeVisible();
  await expect(page.getByText('Logradouro'+company.local)).toBeVisible();
  await expect(page.getByText('Número'+company.number)).toBeVisible();
  await expect(page.getByText('Bairro'+company.district)).toBeVisible();
  await expect(page.getByText('CEP'+company.postal_code)).toBeVisible();
  await expect(page.getByText('UF'+company.state)).toBeVisible();
  await expect(page.getByText('Município'+company.city_name)).toBeVisible();
  await expect(page.getByText('País'+company.country)).toBeVisible();
});
