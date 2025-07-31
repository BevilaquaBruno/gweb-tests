import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';
import { Vehicle } from '../types/registers/vehicle.type';

var vehicle: Vehicle = {
    description: 'Veículo novo',
    plate: 'ABC-1234',
    uf: 'SC',
    rntrc: '12345678',
    renavam: '986745326',
    tara: '1234',
    cap_m3: '123',
    cap_kg: '456',
    wheelset_type: 'Utilitário',
    car_body_type: 'Aberta',
    axes_quantity: '1',
    owner: {
        id: '1',
        name: 'Emitente'
    }
}

test('Set Company #1 as Trasporter and Register new vehicle', async ({ page }) => {
    //acessa o emitente
    await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/configuracoes/emitente");
    await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/configuracoes/emitente");
    await page.getByRole('heading', { name: 'Editando emitente' }).click();

    // marca como transportador
    let isTransporter = await page.getByText('Veículos live_help', { exact: true }).isVisible();
    if(!isTransporter){
        await page.getByText('Transportador').click();
        await page.getByRole('button', { name: 'Salvar' }).click();
        await page.waitForTimeout(1000);
        await page.getByText("Atualizado com sucesso").click();
    }

    //acessa um novo veículo
    await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/veiculos/novo");
    await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/cadastros/veiculos/novo");
    await page.getByRole('heading', { name: 'Novo cadastro' }).click();

    // identificação
    await page.getByRole('textbox', { name: 'Descrição' }).fill(vehicle.description);
    await page.getByRole('textbox', { name: 'Placa' }).fill(vehicle.plate);
    await page.getByRole('textbox', { name: 'RNTRC' }).fill(vehicle.rntrc);
    await page.getByRole('combobox', { name: 'UF' }).click();
    await page.getByRole('combobox', { name: 'UF' }).fill(vehicle.uf);
    await page.getByText('Santa Catarina').click();
    await page.getByRole('textbox', { name: 'Renavam' }).fill(vehicle.renavam);

    // proprietário
    await page.getByRole('textbox', { name: 'Proprietário' }).click();
    await page.getByRole('textbox', { name: 'Proprietário' }).fill(vehicle?.owner?.id ?? '1');
    await page.getByRole('textbox', { name: 'Proprietário' }).press('Enter');
    await page.waitForTimeout(3000);

    // informações do veículo
    await page.getByRole('textbox', { name: 'Tara (Kg)' }).fill(vehicle.tara);
    await page.getByRole('textbox', { name: 'Capacidade (Kg)' }).fill(vehicle.cap_kg);
    await page.getByRole('textbox', { name: 'Capacidade (m³)' }).fill(vehicle.cap_m3);
    await page.getByLabel('Tipo de rodado').getByText('Tipo de rodado').click();
    await page.getByText(vehicle.wheelset_type).click();
    await page.waitForTimeout(2000);
    await page.getByLabel('Tipo de carroceria').getByText('Tipo de carroceria').click();
    await page.getByText(vehicle.car_body_type).click();
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'Quantidade de eixos' }).fill(vehicle.axes_quantity);

    //salva o veículo
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.locator('h1').filter({ hasText: 'Veículos' }).click();

    // verifica se foi criado
    await page.getByRole('searchbox', { name: 'Digite para buscar...' }).fill(vehicle.description);
    await page.waitForTimeout(5000);
    let isRegistered = await page.getByRole('heading', { name: new RegExp('(' + vehicle.description + ')') }).isVisible();
    await expect(isRegistered).toBe(true);
});