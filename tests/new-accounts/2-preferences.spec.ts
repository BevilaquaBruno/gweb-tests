import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';

test('Should set block screen to "never"', async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/usuario/preferencias");
  await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/usuario/preferencias");
  await page.getByRole('heading', { name: 'Preferências do usuário' }).click();
  
});