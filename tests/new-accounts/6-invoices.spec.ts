import { expect, Page } from '@playwright/test';
import { test } from '../helpers/fixtures';

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