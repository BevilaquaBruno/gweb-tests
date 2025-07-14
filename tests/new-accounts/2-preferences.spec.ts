import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';

test('Should set block screen to "never"', async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/usuario/preferencias");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/usuario/preferencias");
  await page.getByRole('heading', { name: 'Preferências do usuário' }).click();

  await page.locator('mat-select[id="preferences.lock_screen_timeout"]').click();
  
  //await page.getByRole('combobox', { name: '15 minutos' });
  //await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Nunca' }).click();
  await page.waitForTimeout(1500);
});