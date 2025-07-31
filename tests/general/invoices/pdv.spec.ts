// import { expect } from '@playwright/test';
// import { test } from '../helpers/fixtures';

// test('New sell NFC-e', async ({ page }) => {
//     await page.getByRole('button', { name: 'Movimentações' }).click();
//     await page.getByRole('link', { name: 'PDV' }).click();
//     await page.getByText('PDV livre').click();
//     await page.locator('body').press('F2');

//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).click();
//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).fill('6953961611850');
//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).press('Enter');
    
//     await expect(page.locator('#ticket')).toContainText('1#1 - Boné');
//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).press('F12');

//     await page.getByText('Detalhes da NFC-e').click();

//     await expect(page.locator('gw-view-person-summary')).toContainText('NomeConsumidor final');
//     await expect(page.locator('mat-card-content')).toContainText('Autorizado o uso da NF-e');
//     await expect(page.locator('gw-product-items-list')).toContainText('#1 - Boné');
//     await expect(page.getByRole('cell', { name: 'Dinheiro, à vista' })).toBeVisible();
// });

// test('New sell NFC-e with Client', async ({ page }) => {
//     await page.getByRole('button', { name: 'Movimentações' }).click();
//     await page.getByRole('link', { name: 'PDV' }).click();
//     await page.getByText('PDV livre').click();
//     await page.locator('body').press('F2');

//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).click();
//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).fill('6953961611850');
//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).press('Enter');
    
//     await expect(page.locator('#ticket')).toContainText('1#1 - Boné');

//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).press('F7');
//     await page.getByRole('combobox', { name: 'CPF/CNPJ, código, nome, e-' }).fill('bruno');
//     await page.getByRole('combobox', { name: 'CPF/CNPJ, código, nome, e-' }).press('Enter');
//     await page.getByRole('option', { name: 'Bruno Fernando Bevilaqua (' }).locator('span').first().click();

//     await page.getByRole('combobox', { name: 'Digite para buscar um produto' }).press('F12');

//     await page.getByText('Detalhes da NFC-e').click();

//     await expect(page.locator('mat-card-content')).toContainText('Autorizado o uso da NF-e');
//     await expect(page.locator('gw-view-person-summary')).toContainText('NomeBruno Fernando Bevilaqua');
//     await expect(page.locator('gw-view-person-summary')).toContainText('ApelidoJair Messias cigarrinho');
//     await expect(page.locator('gw-view-person-summary')).toContainText('CPF103.411.729-79');
//     await expect(page.locator('gw-product-items-list')).toContainText('#1 - Boné');
//     await expect(page.getByRole('cell', { name: 'Dinheiro, à vista' })).toBeVisible();
// });