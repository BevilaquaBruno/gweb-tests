import { expect } from '@playwright/test';
import { test } from '../../helpers/fixtures';
import 'dotenv/config';

test('Put .pfx in account', async ({ page }) => {
  await page.getByRole('button', { name: 'Configurações' }).click();
  await page.getByRole('link', { name: 'Geral' }).click();

  // verifica se já tem certificado e se já tem, remove ele
  await page.getByRole('heading', { name: 'Configurações gerais' }).click();
  let hasCertificate = await page.getByRole('textbox', { name: 'Emitido para' }).isVisible();

  if (hasCertificate) {
    await page.getByRole('button').filter({ hasText: 'close' }).click();
    await page.getByRole('button', { name: 'Remover' }).click();
  }

  await page.getByRole('button', { name: 'Carregar certificado' }).click();
  await page.locator('input[type="file"][name="certFile"]').setInputFiles('tests/assets/certificate/' + process.env.PLAYWRIGHT_CERT_FILE);
  await page.getByRole('textbox', { name: 'Senha do certificado (' }).click();
  await page.getByRole('textbox', { name: 'Senha do certificado (' }).fill(process.env.PLAYWRIGHT_CERT_PASSWORD || '');
  await page.getByRole('button', { name: 'Enviar' }).click();

  await expect.soft(page.locator('gw-general-settings')).toContainText('Emitido para');
});

test('Allow negative stock', async ({ page }) => {
  await page.getByRole('button', { name: 'Configurações' }).click();
  await page.getByRole('link', { name: 'Geral' }).click();
  await page.getByRole('heading', { name: 'Configurações gerais' }).click();
  let allow_negative_stock = await page.locator('.mat-checkbox-inner-container').first().isChecked();
  if (!allow_negative_stock) {
    await page.locator('label').filter({ hasText: 'Permitir estoque negativo' }).click();
    await page.locator('mat-card-actions').filter({ hasText: 'Desfazer Salvar' }).getByRole('button').nth(1).click();
  }
  allow_negative_stock = await page.locator('.mat-checkbox-inner-container').first().isChecked();
  expect(allow_negative_stock).toEqual(true);
});
