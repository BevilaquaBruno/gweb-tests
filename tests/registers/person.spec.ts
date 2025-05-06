import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';
import { generate as generateCpf } from 'gerador-validador-cpf'
import { faker } from '@faker-js/faker';
import { generate as generateCnpj, format as formatCnpj } from 'cnpj';
import 'dotenv/config';

test('Create a new Person with CPF', async ({ page }) => {

  // cria uma pessoa para ser cadastrada
  let person = {
    name: "Auto " + faker.person.fullName(),
    surname: "Auto " + faker.person.firstName(),
    cpf: generateCpf({ format: true }),
    rg: faker.string.numeric({ length: 7}),
    birth_date: '05032000',
    crc: '123456789',
    cep: '89700-055',
    street: 'Rua Marechal Deodoro',
    neighborhood: 'Centro',
    number: '1280',
    country: 'Brasil',
    state: 'SC',
    city: 'Concórdia',
    telephone: '4934414120',
    cellphone: '(49) 9200-11913',
    fax: '1234567',
    secondary_cellphone: {
      description: 'Cel2',
      cellphone: '(49) 9123-45678'
    },
    email: faker.internet.email(),
    website: faker.internet.domainName(),
    secondary_email: {
      description: faker.person.firstName(),
      email: faker.internet.email()
    },
    obs: "Auto " + faker.lorem.sentences(10, '\n')
  }

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
  await page.getByRole('textbox', { name: 'CPF' }).fill(person.cpf);
  await page.getByRole('textbox', { name: 'RG' }).click();
  await page.getByRole('textbox', { name: 'RG' }).fill(person.rg);
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
  await page.getByRole('textbox', { name: 'CEP' }).fill(person.cep);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.getByRole('textbox', { name: 'Número' }).click();
  await page.getByRole('textbox', { name: 'Número' }).fill(person.number);
  // verificações do preenchimento do CEP
  await expect.soft(page.getByRole('textbox', { name: 'Logradouro' })).toHaveValue(person.street);
  await expect.soft(page.getByRole('textbox', { name: 'Bairro' })).toHaveValue(person.neighborhood);
  await expect.soft(page.getByRole('combobox', { name: 'País' })).toHaveValue(person.country)
  await expect.soft(page.getByRole('combobox', { name: 'UF' })).toHaveValue(person.state);
  await expect.soft(page.getByRole('combobox', { name: 'Município' })).toHaveValue(person.city);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(person.telephone);
  await page.getByRole('textbox', { name: 'Celular' }).click();
  await page.getByRole('textbox', { name: 'Celular' }).fill(person.cellphone);
  await page.getByRole('textbox', { name: 'Fax' }).click();
  await page.getByRole('textbox', { name: 'Fax' }).fill(person.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(person.secondary_cellphone.description);
  await page.getByRole('textbox', { name: 'Telefone' }).click();
  await page.getByRole('textbox', { name: 'Telefone' }).fill(person.secondary_cellphone.cellphone);
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue('(49) 91234-5678');

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(person.email);
  await page.getByRole('textbox', { name: 'Website' }).click();
  await page.getByRole('textbox', { name: 'Website' }).fill(person.website);
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
  await expect(page.getByText('CPF'+person.cpf)).toBeVisible();
  await expect(page.getByText('Logradouro'+person.street)).toBeVisible();
  await expect(page.getByText('Número'+person.number)).toBeVisible();
  await expect(page.getByText('Bairro'+person.neighborhood)).toBeVisible();
  await expect(page.getByText('CEP'+person.cep)).toBeVisible();
  await expect(page.getByText('UF'+person.state)).toBeVisible();
  await expect(page.getByText('Município'+person.city)).toBeVisible();
  await expect(page.getByText('País'+person.country)).toBeVisible();
});

test('Create a new Person with CNPJ', async ({ page }) => {
  // cria uma pessoa para ser cadastrada
  let company = {
    name: "Auto " + faker.company.name(),
    surname: "Auto " + faker.company.name(),
    cnpj: formatCnpj(generateCnpj()),
    ie: faker.string.numeric({ length: 7}),
    im: faker.string.numeric({ length: 7}),
    suframa: faker.string.numeric({ length: 5}),
    cnae: faker.string.numeric({ length: 7 }),
    person: {
      name: faker.person.fullName()
    },
    cep: '89700-055',
    street: 'Rua Marechal Deodoro',
    neighborhood: 'Centro',
    number: '1280',
    country: 'Brasil',
    state: 'SC',
    city: 'Concórdia',
    telephone: '4934414120',
    cellphone: '(49) 9200-11913',
    fax: '1234567',
    secondary_cellphone: {
      description: 'Cel2',
      cellphone: '(49) 9123-45678'
    },
    email: faker.internet.email(),
    website: faker.internet.domainName(),
    secondary_email: {
      description: faker.person.firstName(),
      email: faker.internet.email()
    },
    obs: "Auto " + faker.lorem.sentences(10, '\n')
  }

  //navega para o menu de pessoa
  await page.getByRole('button', { name: 'Cadastros' }).click();
  await page.getByRole('link', { name: 'Pessoas' }).click();

  // abre o cadastro de uma nova pessoa
  await page.getByRole('link').filter({ hasText: /^$/ }).click();

  // marca CNPJ
  await page.getByText('Pessoa jurídica').click();


  await page.getByRole('textbox', { name: 'Nome', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill(company.name);
  await page.getByRole('textbox', { name: 'Nome fantasia' }).click();
  await page.getByRole('textbox', { name: 'Nome fantasia' }).fill(company.surname);
  await page.getByRole('textbox', { name: 'CNPJ' }).click();
  await page.getByRole('textbox', { name: 'CNPJ' }).fill(company.cnpj);
  await page.getByRole('textbox', { name: 'IE' }).click();
  await page.getByRole('textbox', { name: 'IE' }).fill(company.ie);
  await page.getByRole('textbox', { name: 'IM' }).click();
  await page.getByRole('textbox', { name: 'IM' }).fill(company.im);
  await page.getByRole('textbox', { name: 'SUFRAMA' }).click();
  await page.getByRole('textbox', { name: 'SUFRAMA' }).fill(company.suframa);
  await page.getByRole('textbox', { name: 'CNAE' }).click();
  await page.getByRole('textbox', { name: 'CNAE' }).fill(company.cnae);
  await page.getByRole('textbox', { name: 'Nome do responsável' }).click();
  await page.getByRole('textbox', { name: 'Nome do responsável' }).fill(company.person.name);
  await page.getByRole('textbox', { name: 'CPF do responsável' }).click();
  await page.getByRole('textbox', { name: 'CPF do responsável' }).fill('312.312.312-312');
});
