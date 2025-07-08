import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';
import { Service } from '../types/registers/service.type';

var service: Service = {
    name: 'Serviço de desenvolvimento de software',
    activity_code: '01.01.01',
    cnae: '6203-1/1',
    value: '100,26',
    comission: '23,00',
    service_code_city: '010101',
    tax_rule: 'Tributação Padrão'
}

test('Register a new Service', async ({ page }) => {
    //acessa o cadastro de serviços
    await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/servicos/novo");
    await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/servicos/novo");
    await page.getByRole('heading', { name: 'Novo serviço' }).click();

    await page.getByRole('textbox', { name: 'Nome do serviço' }).fill(service.name);
    await page.getByRole('combobox', { name: 'Código da Atividade' }).fill(service.activity_code);
    await page.getByRole('combobox', { name: 'Código da Atividade' }).click();
    await page.getByText(service.activity_code).click();
    await page.getByRole('textbox', { name: 'CNAE' }).fill(service.cnae);

    // não tem como preencher o preço dos serviços ainda
    //await page.getByRole('textbox', { name: 'Valor do serviço' }).fill(service.value);
    // await page.getByRole('textbox', { name: 'Comissão' }).fill(service.comission);
    await page.getByRole('textbox', { name: 'Código do serviço no município' }).fill(service.service_code_city);

    // salvar
    await page.getByRole('button', { name: 'Salvar' }).click();
})