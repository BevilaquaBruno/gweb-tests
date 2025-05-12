import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';

test('New NF-e', async ({ page }) => {
    // Acessa o menu
    await page.getByRole('button', { name: 'Movimentações' }).click();
    await page.getByRole('link', { name: 'NF-e' }).click();

    // Configura a numeração
    /*
    await page.getByRole('link', { name: 'Configurações da NF-e' }).click();
    await page.getByRole('textbox', { name: 'Série da NF-e' }).click();
    await page.getByRole('textbox', { name: 'Série da NF-e' }).fill('99');
    await page.getByRole('textbox', { name: 'Nº da próxima NF-e' }).click();
    await page.getByRole('textbox', { name: 'Nº da próxima NF-e' }).fill('815020');
    await page.getByText('HomologaçãoAmbiente de emissão').click();
    await page.getByRole('option', { name: 'Produção' }).click();
    await page.getByText('ProduçãoAmbiente de emissão').click();
    await page.getByRole('option', { name: 'Homologação' }).click();
    await page.locator('mat-card-actions').filter({ hasText: 'Desfazer Salvar' }).getByRole('button').nth(1).click();
    await page.locator('Button[class="mat-accent"]').filter({ hasText: 'Salvar' }).click();
    */

    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox', { name: 'Cliente' }).click();
    await page.getByRole('textbox', { name: 'Cliente' }).fill('Bruno');
    await page.getByRole('textbox', { name: 'Cliente' }).press('Enter');
    await page.getByText('Bruno Fernando Bevilaqua (').click();
    await page.locator('mat-card').filter({ hasText: 'ItemProdutoCód. barrasOrigem' }).getByRole('button').click();
    await page.getByRole('combobox', { name: 'Produto' }).click();
    await page.getByRole('combobox', { name: 'Produto' }).fill('bon');
    await page.getByText('#1.Boné').click();
    await page.getByRole('tab', { name: 'Tributos' }).click();
    await page.getByRole('tab', { name: 'Adicionais' }).click();
    await page.getByRole('tab', { name: 'Identificação' }).click();
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('textbox', { name: 'Seguro' }).click();
    await page.getByRole('textbox', { name: 'Seguro' }).fill('10,00');
    await page.getByRole('button', { name: 'Salvar e transmitir' }).click();

    // Verifica dados da nota

    await page.getByText('Número', { exact: true }).click();
    await expect.soft(page.locator('mat-card-content')).toContainText('SituaçãoAutorizado o uso da NF-e');
    await expect.soft(page.locator('gw-product-items-list')).toContainText('#1 - Boné');
    await expect.soft(page.locator('gw-document-payments-list')).toContainText('Dinheiro, à vista');
});
