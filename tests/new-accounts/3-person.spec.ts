import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';
import 'dotenv/config';
import { Company, Person, RuralProducer } from '../types/registers/person.type';
import { generate as generateCpf } from 'gerador-validador-cpf'
import { generate as generateCnpj, format as formatCnpj } from 'cnpj';

var person_from_sc: Person = {
  type: 'Pessoa',
  name: "Pessoa Física de SC Santa Catarina",
  surname: "Pessoa Física de SC Santa Catarina",
  national_document: generateCpf({ format: true }),
  state_document: '6844322',
  birth_date: '01012000',
  postal_code: '89700-055',
  local: 'Rua Marechal Deodoro',
  district: 'Centro',
  number: '1280',
  country: 'Brasil',
  state: 'SC',
  city_name: 'Concórdia',
  phone: '4934414120',
  cell: '(49) 91234-4321',
  fax: '1234567',
  secondary_email: {
    description: "dev",
    email: "devs@gdoor.com.br"
  },
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: "rosana@gdoor.com.br",
  homepage: "gdoor.com.br",
  obs: "Observação do cliente de Santa Catarina"
}

var person_from_rs: Person = {
  type: 'Pessoa',
  name: "Pessoa Física do RS Rio Grande do Sul",
  surname: "Pessoa Física do RS Rio Grande do Sul",
  national_document: generateCpf({ format: true }),
  state_document: '6844322',
  birth_date: '01012000',
  postal_code: '90010-170',
  local: 'Praça Montevidéo',
  district: 'Centro Histórico',
  number: '10',
  country: 'Brasil',
  state: 'RS',
  city_name: 'Porto Alegre',
  phone: '4934414120',
  cell: '(49) 91234-4321',
  fax: '1234567',
  secondary_email: {
    description: "dev",
    email: "devs@gdoor.com.br"
  },
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: "rosana@gdoor.com.br",
  homepage: "gdoor.com.br",
  obs: "Observação do cliente do Rio Grande do Sul"
}

var company_from_sc: Company = {
  type: 'Empresa',
  name: "Pessoa Jurídica Empresa de SC Santa Catarina",
  trade_name: "Pessoa Jurídica Empresa de SC Santa Catarina",
  national_document: formatCnpj(generateCnpj()),
  state_document: "125693875",
  municipal_document: "4583169",
  suframa_number: "1963546",
  cnae: "5645-6/49",
  person: {
    name: "Gdoor Devs",
    national_document: generateCpf({ format: true })
  },
  postal_code: '89700-900',
  local: 'Rua Leonel Mosele',
  district: 'Centro',
  number: '1',
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
  email: "rosana@gdoor.com.br",
  homepage: "gdoor.com.br",
  secondary_email: {
    description: "dev",
    email: "dev@gdoor.com.br"
  },
  obs: "Observação da Pessoa Jurídica de SC Santa Catarina"
}

var company_from_sp: Company = {
  type: 'Empresa',
  name: "Pessoa Jurídica Empresa de SP São Paulo",
  trade_name: "Pessoa Jurídica Empresa de SP São Paulo",
  national_document: "61.432.506/0004-07",
  state_document: "241229797110",
  municipal_document: "4583169",
  suframa_number: "1963546",
  cnae: "5645-6/49",
  person: {
    name: "Gdoor Devs",
    national_document: generateCpf({ format: true })
  },
  postal_code: '07775-240',
  local: 'Avenida Ribeirão dos Cristais',
  district: 'Empresarial Paineira (Jordanésia)',
  number: '200',
  country: 'Brasil',
  state: 'SP',
  city_name: 'Cajamar',
  phone: '4934414120',
  cell: '(49) 92001-1913',
  fax: '1234567',
  secondary_cell: {
    description: 'Cel2',
    cell: '(49) 91234-5678'
  },
  email: "rosana@gdoor.com.br",
  homepage: "gdoor.com.br",
  secondary_email: {
    description: "dev",
    email: "dev@gdoor.com.br"
  },
  obs: "Observação da Pessoa Jurídica de SP São Paulo"
}

let rural_producer: RuralProducer = {
  type: 'Produtor Rural',
  name: "Pessoa Produtor Rural",
  surname: "Pessoa Produtor Rural",
  national_document: generateCpf({ format: true }),
  state_document: "456936985",
  birth_date: '05032000',
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
  email: "rosana@gdoor.com.br",
  homepage: "gdoor.com.br",
  secondary_email: {
    description: "dev",
    email: "dev@gdoor.com.br"
  },
  obs: "Pessoa Produtor Rural"
}

test('Register new Person from SC', async ({ page }) => {
  //acessa o cadastro de pessoa
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.getByRole('heading', { name: 'Novo Cadastro' }).click();

  // clica nos checkboxes do cadastro
  await page.locator('label').filter({ hasText: 'Cliente' }).click();
  await page.locator('label').filter({ hasText: 'Fornecedor' }).click();

  //preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome' }).fill(person_from_sc.name);
  await page.getByRole('textbox', { name: 'Apelido' }).fill(person_from_sc.surname);
  await page.getByRole('textbox', { name: 'CPF' }).fill(person_from_sc.national_document);
  await page.getByRole('textbox', { name: 'RG' }).fill(person_from_sc.state_document);
  await page.getByRole('textbox', { name: 'Data de nascimento' }).fill(person_from_sc.birth_date);
  await page.getByRole('textbox', { name: 'Contato' }).fill(person_from_sc.surname);

  //preenche dados do cliente
  await page.getByText('Dia de acertoDia de acerto').click();
  await page.getByRole('option', { name: '13' }).click();
  await page.getByRole('textbox', { name: 'Limite de crédito' }).click();
  await page.getByLabel('Tabela de preços preferencial').getByText('Tabela de preços preferencial').click();
  await page.getByRole('option', { name: 'Nenhuma' }).click();
  await page.locator('div').filter({ hasText: /^Vendedor$/ }).nth(1).click();
  await page.getByRole('option', { name: 'Não definido' }).click();

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).fill(person_from_sc.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Número' }).fill(person_from_sc.number);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).fill(person_from_sc.phone);
  await page.getByRole('textbox', { name: 'Celular' }).fill(person_from_sc.cell);
  await page.getByRole('textbox', { name: 'Fax' }).fill(person_from_sc.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(person_from_sc.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).fill(person_from_sc.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).fill(person_from_sc.email);
  await page.getByRole('textbox', { name: 'Website' }).fill(person_from_sc.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(person_from_sc.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).fill(person_from_sc.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).fill(person_from_sc.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: person_from_sc.name }).click();

  // valida os campos na página de visualização pós cadastro
  await expect(page.getByText('Nome' + person_from_sc.name)).toBeVisible();
});

test('Register new Person from RS', async ({ page }) => {
  //acessa o cadastro de pessoa
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.getByRole('heading', { name: 'Novo Cadastro' }).click();

  // clica nos checkboxes do cadastro
  await page.locator('label').filter({ hasText: 'Cliente' }).click();
  await page.locator('label').filter({ hasText: 'Fornecedor' }).click();

  //preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome' }).fill(person_from_rs.name);
  await page.getByRole('textbox', { name: 'Apelido' }).fill(person_from_rs.surname);
  await page.getByRole('textbox', { name: 'CPF' }).fill(person_from_rs.national_document);
  await page.getByRole('textbox', { name: 'RG' }).fill(person_from_rs.state_document);
  await page.getByRole('textbox', { name: 'Data de nascimento' }).fill(person_from_rs.birth_date);
  await page.getByRole('textbox', { name: 'Contato' }).fill(person_from_rs.surname);

  //preenche dados do cliente
  await page.getByText('Dia de acertoDia de acerto').click();
  await page.getByRole('option', { name: '13' }).click();
  await page.getByRole('textbox', { name: 'Limite de crédito' }).click();
  await page.getByLabel('Tabela de preços preferencial').getByText('Tabela de preços preferencial').click();
  await page.getByRole('option', { name: 'Nenhuma' }).click();
  await page.locator('div').filter({ hasText: /^Vendedor$/ }).nth(1).click();
  await page.getByRole('option', { name: 'Não definido' }).click();

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).fill(person_from_rs.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Número' }).fill(person_from_rs.number);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).fill(person_from_rs.phone);
  await page.getByRole('textbox', { name: 'Celular' }).fill(person_from_rs.cell);
  await page.getByRole('textbox', { name: 'Fax' }).fill(person_from_rs.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(person_from_rs.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).fill(person_from_rs.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).fill(person_from_rs.email);
  await page.getByRole('textbox', { name: 'Website' }).fill(person_from_rs.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(person_from_rs.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).fill(person_from_rs.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).fill(person_from_rs.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: person_from_rs.name }).click();

  // valida os campos na página de visualização pós cadastro
  await expect(page.getByText('Nome' + person_from_rs.name)).toBeVisible();
});

test('Register new Company from SC', async ({ page }) => {
  //acessa o cadastro de pessoa
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.getByRole('heading', { name: 'Novo Cadastro' }).click();

  // clica nos checkboxes do cadastro
  await page.locator('label').filter({ hasText: 'Cliente' }).click();
  await page.locator('label').filter({ hasText: 'Fornecedor' }).click();

  // marca CNPJ
  await page.getByText('Pessoa jurídica').click();

  // preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill(company_from_sc.name);
  await page.getByRole('textbox', { name: 'Nome fantasia' }).fill(company_from_sc.trade_name);
  await page.getByRole('textbox', { name: 'CNPJ' }).fill(company_from_sc.national_document);
  await page.getByRole('textbox', { name: 'IE' }).fill(company_from_sc.state_document);
  await page.getByRole('textbox', { name: 'IM', exact: true }).fill(company_from_sc.municipal_document);
  await page.getByRole('textbox', { name: 'SUFRAMA' }).fill(company_from_sc.suframa_number);
  await page.getByRole('textbox', { name: 'CNAE' }).fill(company_from_sc.cnae);
  await page.getByRole('textbox', { name: 'Nome do responsável' }).fill(company_from_sc.person.name);
  await page.getByRole('textbox', { name: 'CPF do responsável' }).fill(company_from_sc.person.national_document);

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(company_from_sc.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Número' }).fill(company_from_sc.number);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).fill(company_from_sc.phone);
  await page.getByRole('textbox', { name: 'Celular' }).fill(company_from_sc.cell);
  await page.getByRole('textbox', { name: 'Fax' }).fill(company_from_sc.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(company_from_sc.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).fill(company_from_sc.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).fill(company_from_sc.email);
  await page.getByRole('textbox', { name: 'Website' }).fill(company_from_sc.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(company_from_sc.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).fill(company_from_sc.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).fill(company_from_sc.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: company_from_sc.name }).click();


  // valida os campos na página de visualização pós cadastro
  await expect(page.getByText('Nome' + company_from_sc.name)).toBeVisible();
});

test('Register new Company from SP', async ({ page }) => {
  //acessa o cadastro de pessoa
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.getByRole('heading', { name: 'Novo Cadastro' }).click();

  // clica nos checkboxes do cadastro
  await page.locator('label').filter({ hasText: 'Cliente' }).click();
  await page.locator('label').filter({ hasText: 'Fornecedor' }).click();

  // marca CNPJ
  await page.getByText('Pessoa jurídica').click();

  // preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill(company_from_sp.name);
  await page.getByRole('textbox', { name: 'Nome fantasia' }).fill(company_from_sp.trade_name);
  await page.getByRole('textbox', { name: 'CNPJ' }).fill(company_from_sp.national_document);
  await page.getByRole('textbox', { name: 'IE' }).fill(company_from_sp.state_document);
  await page.getByRole('textbox', { name: 'IM', exact: true }).fill(company_from_sp.municipal_document);
  await page.getByRole('textbox', { name: 'SUFRAMA' }).fill(company_from_sp.suframa_number);
  await page.getByRole('textbox', { name: 'CNAE' }).fill(company_from_sp.cnae);
  await page.getByRole('textbox', { name: 'Nome do responsável' }).fill(company_from_sp.person.name);
  await page.getByRole('textbox', { name: 'CPF do responsável' }).fill(company_from_sp.person.national_document);

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).click();
  await page.getByRole('textbox', { name: 'CEP' }).fill(company_from_sp.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Número' }).fill(company_from_sp.number);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).fill(company_from_sp.phone);
  await page.getByRole('textbox', { name: 'Celular' }).fill(company_from_sp.cell);
  await page.getByRole('textbox', { name: 'Fax' }).fill(company_from_sp.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(company_from_sp.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).fill(company_from_sp.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).fill(company_from_sp.email);
  await page.getByRole('textbox', { name: 'Website' }).fill(company_from_sp.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(company_from_sp.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).fill(company_from_sp.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).fill(company_from_sp.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: company_from_sp.name }).click();


  // valida os campos na página de visualização pós cadastro
  await expect(page.getByText('Nome' + company_from_sp.name)).toBeVisible();
});

test('Register new rural producer from SC', async ({ page }) => {
  //acessa o cadastro de pessoa
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.getByRole('heading', { name: 'Novo Cadastro' }).click();

  // marca produtor rural
  await page.locator('label').filter({ hasText: 'Produtor Rural' }).click();

  // clica nos checkboxes do cadastro
  await page.locator('label').filter({ hasText: 'Cliente' }).click();
  await page.locator('label').filter({ hasText: 'Fornecedor' }).click();

  //preenche campos de identificação
  await page.getByRole('textbox', { name: 'Nome' }).fill(rural_producer.name);
  await page.getByRole('textbox', { name: 'Apelido' }).fill(rural_producer.surname);
  await page.getByRole('textbox', { name: 'CPF' }).fill(rural_producer.national_document);
  await page.getByRole('textbox', { name: 'IE' }).fill(rural_producer.state_document);
  await page.getByRole('textbox', { name: 'Data de nascimento' }).fill(rural_producer.birth_date);
  await page.getByRole('textbox', { name: 'Contato' }).fill(rural_producer.surname);

  // preenche endereço
  await page.getByRole('textbox', { name: 'CEP' }).fill(rural_producer.postal_code);
  await page.getByRole('textbox', { name: 'CEP' }).press('Tab');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Número' }).fill(rural_producer.number);

  // preenche telefone
  await page.getByRole('textbox', { name: 'Telefone' }).fill(rural_producer.phone);
  await page.getByRole('textbox', { name: 'Celular' }).fill(rural_producer.cell);
  await page.getByRole('textbox', { name: 'Fax' }).fill(rural_producer.fax);
  // inclui telefone secundário
  await page.locator('mat-card').filter({ hasText: 'TelefoneCelularFax' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(rural_producer.secondary_cell.description);
  await page.getByRole('textbox', { name: 'Telefone' }).fill(rural_producer.secondary_cell.cell);
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect.soft(page.locator('div').filter({ hasText: /^Cel2$/ })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Cel2' })).toHaveValue(rural_producer.secondary_cell.cell);

  // preencher endereços eletrônicos
  await page.getByRole('textbox', { name: 'E-mail' }).fill(rural_producer.email);
  await page.getByRole('textbox', { name: 'Website' }).fill(rural_producer.homepage);
  // incluir email secundario
  await page.locator('mat-card').filter({ hasText: 'E-mailWebsite' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill(rural_producer.secondary_email.description);
  await page.getByRole('textbox', { name: 'E-mail' }).fill(rural_producer.secondary_email.email);
  await page.getByRole('button', { name: 'Confirmar' }).click();

  // preenche observacoes
  await page.getByRole('textbox', { name: 'Observações' }).fill(rural_producer.obs);

  // salva a pessoa
  await page.getByRole('button', { name: 'Salvar' }).click();
  await page.getByRole('heading', { name: rural_producer.name }).click();

  // valida os campos na página de visualização pós cadastro
  await expect(page.getByText('Nome' + rural_producer.name)).toBeVisible();
});

test('Register new Seller with just a name', async ({ page }) => {
  // Acessa o cadastro de pessoa
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/pessoas/nova");
  await page.getByRole('heading', { name: 'Novo Cadastro' }).click();

  // Marca como vendedor
  await page.locator('label').filter({ hasText: 'Vendedor' }).click();

  // Preenche o nome
  await page.getByRole('textbox', { name: 'Nome' }).fill('Pessoa Vendedor');

  // Salva
  await page.getByRole('button', { name: 'Salvar' }).click();

  // Espera carregar
  await page.getByRole('heading', { name: 'Pessoa Vendedor' }).click();

  // Valida os campos na página de visualização pós cadastro
  await expect(page.getByText('NomePessoa Vendedor')).toBeVisible();
});
