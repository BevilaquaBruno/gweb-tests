import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';

test('test', async ({ page }) => {
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
    await page.getByRole('textbox', { name: 'Nº da próxima NF-e' }).click();
    await page.getByText('HomologaçãoAmbiente de emissão').click();
    await page.getByRole('option', { name: 'Produção' }).click();
    await page.getByText('ProduçãoAmbiente de emissão').click();
    await page.getByRole('option', { name: 'Homologação' }).click();
    await page.locator('mat-card-actions').filter({ hasText: 'Desfazer Salvar' }).getByRole('button').nth(1).click();
    await page.locator('Button[class="mat-accent"]').filter({ hasText: 'Salvar' }).click();
    */

    // emite uma NF-e
    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox', { name: 'Cliente' }).click();
    await page.getByRole('textbox', { name: 'Cliente' }).fill('Bruno');
    await page.getByRole('textbox', { name: 'Cliente' }).press('Enter');
    await page.getByText('Bruno Fernando Bevilaqua (').click();
    await page.locator('mat-card').filter({ hasText: 'ItemProdutoCód. barrasOrigem' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await page.locator('body').press('Insert');
    await page.locator('div').filter({ hasText: /^Produto$/ }).nth(3).click();
    await page.getByRole('combobox', { name: 'Produto' }).fill('bon');
    await page.getByText('#1.Boné').click();
    await page.getByRole('tab', { name: 'Tributos' }).click();
    await page.getByRole('tab', { name: 'Adicionais' }).click();
    await page.getByRole('tab', { name: 'Identificação' }).click();
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('textbox', { name: 'Seguro' }).click();
    await page.getByRole('textbox', { name: 'Seguro' }).fill('10,00');
    await page.locator('gw-document-payments-form-card').getByRole('button').click();
    await page.getByLabel('Forma de pagamento *').getByText('Forma de pagamento').click();
    await page.getByText('Prazo loja').click();
    await page.getByRole('textbox', { name: 'Nº de parcelas' }).click();
    await page.getByRole('textbox', { name: 'Nº de parcelas' }).fill('4');
    await page.getByText('R$ 47,45').first().click();
    await page.getByText('R$ 47,45').first().fill('50');
    await page.getByText('R$ 50,00').click();
    await page.getByText('R$ 50,00').press('Tab');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('button', { name: 'Salvar e transmitir' }).click();

    // Verifica dados da nota
    await page.getByText('815016', { exact: true }).click();
    await expect(page.locator('mat-card-content')).toContainText('SituaçãoAutorizado o uso da NF-e');
    await expect(page.locator('gw-product-items-list')).toContainText('#1 - Boné');
    await expect(page.locator('gw-product-items-list')).toContainText('R$ 89,90');
    await expect(page.locator('gw-product-items-list')).toContainText('2,000 UNID');
    await expect(page.locator('gw-product-items-list')).toContainText('R$ 179,80');
    await expect(page.locator('gw-document-payments-list')).toContainText('Prazo loja');
    await expect(page.locator('gw-document-payments-list')).toContainText('R$ 189,80');
    await expect(page.locator('gw-document-payments-list')).toContainText('4 parcelas');

});