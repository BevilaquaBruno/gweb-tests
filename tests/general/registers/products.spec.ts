import { expect } from '@playwright/test';
import { test } from '../../helpers/fixtures';
import { faker, fakerPT_BR } from '@faker-js/faker';

const cost = faker.number.float({ min: 0, max: 100, fractionDigits: 2 });

const product = {
    name: faker.commerce.productName(),
    unit: "UNID - UNIDADE",
    type: "00",
    comission: 5,
    observations: faker.lorem.paragraph(),
    category: "Auto",
    details: {
        additionalDescription: faker.lorem.paragraph(),
        gtin: faker.number.int({ min: 1000000000000, max: 9999999999999 }).toString(),
        reference: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
        netWeight: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
        grossWeight: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
        stockQty: faker.number.int({ min: 0, max: 100 }),
        minStock: faker.number.int({ min: 0, max: 100 }),
        cost: cost,
        mediumCost: cost,
        price: cost * 1.5,
        salePrice: cost * 1.2,
        minStockPDV: faker.number.int({ min: 0, max: 5 }),
        expireDays: faker.number.int({ min: 0, max: 100 }),
    },
    taxInfo: {
        origin: "0",
        ncm: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
        cest: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
        anp: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
        relevantScale: "0",
        producerCNPJ: '00000000000000',
    }
}

test('should create a price table', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastros' }).click();
    await page.getByRole('link', { name: 'Produtos' }).click();
    await page.getByRole('link', { name: 'Tabelas de preços' }).click();
    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox', { name: 'Nome da tabela de preços' }).click();
    await page.getByRole('textbox', { name: 'Nome da tabela de preços' }).fill('Auto ' + faker.commerce.productName());
    await page.getByRole('textbox', { name: 'Fator de ajuste' }).click();
    await page.locator('#mat-select-value-7').click();
    await page.getByText('Desconto').click();
    await page.getByRole('button', { name: 'Adicionar produtos' }).click();
    await page.getByRole('combobox', { name: 'Todos' }).locator('div').nth(2).click();
    await page.getByRole('option', { name: 'Todos' }).locator('span').click();
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('button', { name: 'Calcular valores' }).click();
    await page.getByRole('button', { name: 'continuar' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForURL('https://app.gdoorweb.com.br/cadastros/produtos/tabelas-de-precos');
    await expect(page.getByText('Tabela de preços salva com')).toBeVisible();
})

test('should create a product category', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastros' }).click();
    await page.getByRole('link', { name: 'Produtos' }).click();
    await page.getByRole('link', { name: 'Categorias' }).click();
    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('Auto ' + faker.commerce.department());
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForURL('https://app.gdoorweb.com.br/cadastros/produtos/categorias');
    await expect(page.getByText('Categoria cadastrada com')).toBeVisible();
})

test('should create a kit', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastros' }).click();
    await page.getByLabel('Cadastros').getByRole('link', { name: 'Produtos' }).click();
    await page.getByRole('link', { name: 'Kits' }).click();
    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('Autokit ' + faker.commerce.productName());
    await page.getByRole('textbox', { name: 'Observações' }).click();
    await page.getByRole('textbox', { name: 'Observações' }).fill(faker.lorem.paragraph());
    await page.locator('mat-card').filter({ hasText: 'Nenhum item no kit' }).getByRole('button').click();
    await page.getByRole('combobox', { name: 'Produto' }).click();
    await page.getByRole('combobox', { name: 'Produto' }).fill('1');
    await page.waitForTimeout(2000);
    await page.getByRole('option').nth(0).click();
    await page.getByRole('textbox', { name: 'Quantidade' }).click();
    await page.getByRole('textbox', { name: 'Quantidade' }).fill('2');
    await page.getByRole('textbox', { name: 'Valor unitário' }).click();
    await page.getByRole('textbox', { name: 'Valor unitário' }).fill('10');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.locator('mat-card').getByRole('button').click();
    await page.getByRole('combobox', { name: 'Produto' }).fill('2');
    await page.waitForTimeout(2000);
    await page.getByRole('option').nth(0).click();
    await page.getByRole('textbox', { name: 'Quantidade' }).click();
    await page.getByRole('textbox', { name: 'Quantidade' }).fill('3');
    await page.getByRole('textbox', { name: 'Valor unitário' }).click();
    await page.getByRole('textbox', { name: 'Valor unitário' }).fill('5');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Cadastro salvo com sucesso')).toBeVisible();
});

test('should create a grid', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastros' }).click();
    await page.getByRole('link', { name: 'Produtos' }).click();
    await page.getByRole('link', { name: 'Grades' }).click();
    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('AutoGrid ' + faker.number.binary(10));
    await page.getByRole('textbox', { name: 'Título para as linhas' }).click();
    await page.getByRole('textbox', { name: 'Título para as linhas' }).fill('tamanho');
    await page.getByRole('textbox', { name: 'Título para as colunas' }).click();
    await page.getByRole('textbox', { name: 'Título para as colunas' }).fill('cor');
    await page.getByRole('row', { name: 'tamanho\\cor' }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'Nome da dimensão' }).fill('azul');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('row', { name: 'tamanho\\cor azul' }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'Nome da dimensão' }).fill('verde');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('row', { name: 'tamanho\\cor azul   verde' }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'Nome da dimensão' }).fill('amarelo');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('row').filter({ hasText: /^$/ }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'Nome da dimensão' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nome da dimensão' }).fill('P');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('row').filter({ hasText: /^$/ }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'Nome da dimensão' }).fill('M');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('row').filter({ hasText: /^$/ }).getByRole('button').click();
    await page.getByRole('textbox', { name: 'Nome da dimensão' }).fill('G');
    await page.getByRole('button', { name: 'Confirmar' }).click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Cadastro salvo com sucesso')).toBeVisible();
});

// GWB-325
// Campos numéricos não são preenchidos por conta de não possuírem identificadores
test('should create a product', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastros' }).click();
    await page.getByRole('link', { name: 'Produtos' }).click();
    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('Auto ' + product.name);
    await page.locator('#mat-select-value-5').click();
    await page.getByRole('option', { name: 'UNID - UNIDADE' }).locator('span').click();
    await page.getByRole('textbox', { name: 'Comissão' }).click();
    await page.getByRole('textbox', { name: 'Comissão' }).fill(product.comission.toString());
    await page.getByRole('textbox', { name: 'Observações' }).click();
    await page.getByRole('textbox', { name: 'Observações' }).fill(product.observations);
    await page.getByRole('combobox', { name: 'Nova categoria...' }).click();
    await page.getByRole('combobox', { name: 'Nova categoria...' }).fill('Auto ' + product.category);
    await page.getByRole('textbox', { name: 'Descrição adicional' }).click();
    await page.getByRole('textbox', { name: 'Descrição adicional' }).fill(product.details.additionalDescription);
    await page.getByRole('textbox', { name: 'GTIN, EAN, UPC, etc.' }).click();
    await page.getByRole('textbox', { name: 'GTIN, EAN, UPC, etc.' }).fill(product.details.gtin);
    await page.getByRole('textbox', { name: 'Referência' }).click();
    await page.getByRole('textbox', { name: 'Referência' }).fill(product.details.reference);
    await page.getByRole('textbox', { name: 'Peso líquido' }).click();
    await page.getByRole('textbox', { name: 'Peso líquido' }).fill(product.details.netWeight.toString());
    await page.getByRole('textbox', { name: 'Peso bruto' }).click();
    await page.getByRole('textbox', { name: 'Peso bruto' }).fill(product.details.grossWeight.toString());
    await page.getByRole('textbox', { name: 'Peso líquido' }).click();
    await page.getByRole('textbox', { name: 'Quantidade em estoque' }).click();
    await page.getByRole('textbox', { name: 'Quantidade em estoque' }).fill(product.details.stockQty.toString());
    await page.getByRole('textbox', { name: 'Quantidade mínima', exact: true }).click();
    await page.getByRole('textbox', { name: 'Quantidade mínima', exact: true }).fill(product.details.minStock.toString());
    await page.getByRole('textbox', { name: 'Custo de compra' }).click();
    await page.getByRole('textbox', { name: 'Custo de compra' }).fill(product.details.cost.toString());
    await page.getByRole('textbox', { name: 'Custo médio' }).click();
    await page.getByRole('textbox', { name: 'Custo médio' }).fill(product.details.mediumCost.toString());
    await page.getByRole('textbox', { name: 'Preço de venda' }).click();
    await page.getByRole('textbox', { name: 'Preço de venda' }).fill(product.details.price.toString());
    await page.getByRole('textbox', { name: 'Preço de atacado' }).click();
    await page.getByRole('textbox', { name: 'Preço de atacado' }).fill(product.details.salePrice.toString());
    await page.getByRole('textbox', { name: 'Quantidade mínima (PDV)' }).click();
    await page.getByRole('textbox', { name: 'Quantidade mínima (PDV)' }).fill(product.details.minStockPDV.toString());
    await page.getByRole('textbox', { name: 'Validade (dias)' }).click();
    await page.getByRole('textbox', { name: 'Validade (dias)' }).fill(product.details.expireDays.toString());
    await page.getByText('0 - Nacional, exceto as').click();
    await page.getByRole('option', { name: '0 - Nacional, exceto as' }).locator('span').click();
    await page.getByRole('textbox', { name: 'NCM' }).click();
    await page.getByRole('textbox', { name: 'NCM' }).fill(product.taxInfo.ncm);
    await page.getByRole('textbox', { name: 'CEST' }).click();
    await page.getByRole('textbox', { name: 'CEST' }).fill(product.taxInfo.cest);
    await page.getByRole('textbox', { name: 'ANP' }).click();
    await page.getByRole('textbox', { name: 'ANP' }).fill(product.taxInfo.anp);
    await page.getByLabel('Escala Relevante').getByText('Escala Relevante').click();
    await page.getByText('Produzido em Escala Relevante').click();
    await page.getByRole('textbox', { name: 'CNPJ do fabricante' }).click();
    await page.getByRole('textbox', { name: 'CNPJ do fabricante' }).fill(product.taxInfo.producerCNPJ);
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page.getByText('Cadastro salvo com sucesso')).toBeVisible();
});

test('Weighable product - should not be able to change the product barcode', async ({ page }) => {
    await page.getByRole('button', { name: 'Cadastros' }).click();
    await page.getByRole('link', { name: 'Produtos' }).click();
    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('Auto ' + product.name);
    await page.locator('#mat-select-value-5').click();
    await page.getByText('KG - QUILOGRAMA').click();
    await page.getByRole('textbox', { name: 'GTIN, EAN, UPC, etc.' }).click();
    await page.getByRole('textbox', { name: 'GTIN, EAN, UPC, etc.' }).fill('123123123');
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForTimeout(2000);
    if (await page.getByRole('heading', { name: 'Houve um problema ao salvar o' }).isHidden()) {
        await page.locator('gw-product-details').getByRole('button').click();
        await page.getByRole('menuitem', { name: 'Editar' }).click();
        await expect(page.getByRole('textbox', { name: 'GTIN, EAN, UPC, etc.' })).toBeEnabled();
    } else {
        throw new Error('Houve um problema ao salvar o produto.');
    }
});
