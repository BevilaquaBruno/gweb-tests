import { expect, Page } from '@playwright/test';
import { test } from '../helpers/fixtures';
import 'dotenv/config';

test('Import XML to register products', async ({ page }) => {
   // Acessa as configurações
   await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/movimentos/compras");
   await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/movimentos/compras");
   await page.locator('h1').filter({ hasText: 'Compras' }).click();

   // Importa o XML
   await page.getByText('Importar XML').click();
   await page.locator('input[type="file"]').setInputFiles('tests/assets/xml/xml_new_accounts.xml');

   // Espera carregar a página
   await page.getByRole('heading', { name: 'Nota não destinada a esta' }).click();
   await page.getByRole('button', { name: 'Prosseguir' }).click();

   // Espera identificar o fornecedor não cadastrado
   await page.getByRole('heading', { name: 'Cadastrar pessoa' }).click();
   await page.getByRole('button', { name: 'Confirmar' }).click();

   // Informa o preço dos produtos

   await editProductPrice(page, 'ROSCA SALGADA');
   await editProductPrice(page, 'TORTA DE FRANGO (FATIA)');
   await editProductPrice(page, 'CAPSULA CAFE CAPP TRES H DLEITE 8X10X11G');
   await editProductPrice(page, 'EMPADA DE FRANGO');
   await editProductPrice(page, 'CAFE COADO');
   await editProductPrice(page, 'MINI COXINHA');
   await editProductPrice(page, 'PAO LUA DE MEL ( CHOCOLATE )');

   // Salva e conclui a nota
   await page.getByRole('button', { name: 'Salvar e Concluir' }).click();
   await page.getByRole('button', { name: 'Cadastrar' }).click();
   await page.getByRole('button', { name: 'Confirmar' }).click();

   // Clica na parte de "Cadastrada por" para esperar a visualização da nota ser carregada
   await page.getByText('Cadastrada por').click();
});

test('Config NFC-e', async ({ page }) => {
   // Configura nfc-e
   // Acessa as configurações
   await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/movimentos/pdv/configurar/nfc-e");
   await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/movimentos/pdv/configurar/nfc-e");
   await page.locator('#content').getByText('Configurações da NFC-e').click();
   await page.waitForTimeout(2000);

   // Preenche a série e numeração da NF-e
   await page.getByRole('textbox', { name: 'Série da NFC-e' }).click();
   let serie_nfce: string[] = (process.env.PLAYWRIGHT_NFCE_SERIE || '1').split('');
   for (let i = 0; i < serie_nfce.length; i++) {
      const digit = serie_nfce[i];
      await page.getByRole('textbox', { name: 'Série da NFC-e' }).press(digit);
   }

   await page.getByRole('textbox', { name: 'Nº da próxima NFC-e' }).click();
   let number_nfce: string[] = (process.env.PLAYWRIGHT_NFCE_NEXT_NUMBER || '1').split('');
   for (let i = 0; i < number_nfce.length; i++) {
      const digit = number_nfce[i];
      await page.getByRole('textbox', { name: 'Nº da próxima NFC-e' }).press(digit);
   }

   await page.getByRole('textbox', { name: 'Token ID' }).fill(process.env.PLAYWRIGHT_NFCE_TOKEN_ID || '');
   await page.getByRole('textbox', { name: 'Código CSC' }).fill(process.env.PLAYWRIGHT_NFCE_CSC || '');

   // Salva a configuração
   await page.locator('form[name="environment"]').getByRole('button', { name: 'Salvar' }).click();
});

test('Config NF-e', async ({ page }) => {

   // Configura a NF-e
   // Acessa as configurações
   await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/movimentos/nf-e/configurar");
   await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/movimentos/nf-e/configurar");
   await page.locator('h1').filter({ hasText: 'Configurações da NF-e' }).click();
   await page.waitForTimeout(2000);

   // Preenche a série e numeração da NF-e
   await page.getByRole('textbox', { name: 'Série da NF-e' }).click();
   let serie_nfe: string[] = (process.env.PLAYWRIGHT_NFE_SERIE || '1').split('');
   for (let i = 0; i < serie_nfe.length; i++) {
      const digit = serie_nfe[i];
      await page.getByRole('textbox', { name: 'Série da NF-e' }).press(digit);
   }
   await page.getByRole('textbox', { name: 'Nº da próxima NF-e' }).click();
   let number_nfe: string[] = (process.env.PLAYWRIGHT_NFE_NEXT_NUMBER || '1').split('');
   for (let i = 0; i < number_nfe.length; i++) {
      const digit = number_nfe[i];
      await page.getByRole('textbox', { name: 'Nº da próxima NF-e' }).press(digit);
   }

   // Salva a configuração
   await page.locator('mat-card-actions').filter({ hasText: 'Desfazer Salvar' }).getByRole('button').nth(1).click();
});

async function editProductPrice(page: Page, productName: string) {
   // edita o produto
   await page.getByText(productName).click();
   await page.getByText('Alterar produto').click();

   await page.getByRole('textbox', { name: 'Novo preço de venda' }).click();
   await page.getByRole('textbox', { name: 'Novo preço de venda' }).press('1');
   await page.getByRole('textbox', { name: 'Novo preço de venda' }).press('0');
   await page.getByRole('textbox', { name: 'Novo preço de venda' }).press('0');
   await page.getByRole('textbox', { name: 'Novo preço de venda' }).press(',');
   await page.getByRole('textbox', { name: 'Novo preço de venda' }).press('0');
   await page.getByRole('textbox', { name: 'Novo preço de venda' }).press('0');
   // Confirma a alteração do produto
   await page.getByRole('button', { name: 'Confirmar' }).click();
   await page.waitForTimeout(1000);
}