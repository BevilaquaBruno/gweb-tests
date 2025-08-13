import { expect, Page } from '@playwright/test';
import { test } from '../../helpers/fixtures';
import 'dotenv/config';
import { Quotation } from '../../types/movements/quotation.type';

var quotation_sell_price: Quotation = {
   price_origin: 'Preço de venda',
   client: 'Pessoa Física de SC Santa Catarina',
   products: [
      { description: 'Produto Normal', quantity: 2 },
      { description: 'Produto Preço de Atacado', quantity: 1 },
   ],
   payments: [
      { name: 'Dinheiro, à vista' }
   ],
   additional_information: 'Informações adicionais do orçamento com preço de venda',
};

var quotation_table_price: Quotation = {
   price_origin: 'Tabela de preços',
   price_table: 'Tabela de preço 1',
   client: 'Pessoa Jurídica Empresa de SC Santa Catarina',
   products: [
      { description: 'Produto Normal', quantity: 2 },
      { description: 'Produto Preço de Atacado', quantity: 1 },
   ],
   services: [
      { description: 'Serviço de desenvolvimento de sistemas' }
   ],
   additional_information: 'Informações adicionais do orçamento com tabela de preço',
   payments: [
      { name: 'À vista no cartão de crédito', value: '100,00' },
      { name: 'Parcelado no cartão de crédito', type: 'Parcelado', value: '280,00' }
   ],
};

var quotation_wholesale_price: Quotation = {
   price_origin: 'Preço de atacado',
   client: 'Pessoa Física do RS Rio Grande do Sul',
   products: [
      { description: 'Produto Preço de Atacado', quantity: 1, value: '89,99' },
      { description: 'Produto Grade - Marca 1, Tamanho 2', quantity: 3 },
   ],
   additional_information: 'Informações adicionais do orçamento com preço de atacado',
   payments: [
      { name: 'Dinheiro, à vista' }
   ],
};

var quotation_with_service: Quotation = {
   client: 'Pessoa Jurídica Empresa de SP São Paulo',
   products: [],
   services: [
      { description: 'Serviço de desenvolvimento de sistemas' }
   ],
   additional_information: 'Informações adicionais do orçamento com apenas um serviço',
   payments: [
      { name: 'Dinheiro, à vista' }
   ],
}

test('Create quotation with sell price', async ({ page }) => {
   // Acessa o menu de orçamentos
   await page.getByRole('button', { name: 'Movimentações' }).click();
   await page.getByRole('link', { name: 'Orçamentos' }).click();
   await page.getByRole('link').filter({ hasText: /^$/ }).click();

   // Faz todo o registro padrão
   await registerQuotation(page, quotation_sell_price);
});

test('Create quotation with table price', async ({ page }) => {
   // Acessa o menu de orçamentos
   await page.getByRole('button', { name: 'Movimentações' }).click();
   await page.getByRole('link', { name: 'Orçamentos' }).click();
   await page.getByRole('link').filter({ hasText: /^$/ }).click();

   await registerQuotation(page, quotation_table_price);
});

test('Create quotation with wholesale price', async ({ page }) => {
   // Acessa o menu de orçamentos
   await page.getByRole('button', { name: 'Movimentações' }).click();
   await page.getByRole('link', { name: 'Orçamentos' }).click();
   await page.getByRole('link').filter({ hasText: /^$/ }).click();

   await registerQuotation(page, quotation_wholesale_price);
});

test('Create quotation with service', async ({ page }) => {
   // Acessa o menu de orçamentos
   await page.getByRole('button', { name: 'Movimentações' }).click();
   await page.getByRole('link', { name: 'Orçamentos' }).click();
   await page.getByRole('link').filter({ hasText: /^$/ }).click();

   await registerQuotation(page, quotation_with_service);
});

async function registerQuotation(page: Page, quotation: Quotation) {
   // Altera a origem do preço, se ela tiver sido informada
   if (undefined != quotation.price_origin) {
      await page.getByText('Preço de vendaOrigem do preço').click();
      await page.getByRole('option', { name: quotation.price_origin }).click();
   }

   // Altera a tabela de preço se a origem do preço for tabela de preço e a tabela de preço foi informada
   if (
      'Tabela de preços' == quotation.price_origin
      && undefined != quotation.price_table
   ) {
      await page.getByLabel('Selecione a tabela de preços').getByText('Selecione a tabela de preços').click();
      await page.getByRole('option', { name: quotation.price_table }).click();
   }

   // Insere o cliente
   await page.getByRole('textbox', { name: 'Cliente' }).click();
   await page.getByRole('textbox', { name: 'Cliente' }).fill(quotation.client);
   await page.getByRole('textbox', { name: 'Cliente' }).press('Enter');
   await page.getByRole('option', { name: quotation.client }).locator('span').first().click();

   // Lançamento dos produtos, da um for nos produtos
   for (let i = 0; i < quotation.products.length; i++) {
      // Inicia a variável e da um clique para aguardar
      const product = quotation.products[i];
      await page.getByRole('heading', { name: 'Novo orçamento' }).click();

      // Se for o primeiro produto (i = 0), ele testa abrir o modal de produtos pelo botão
      if (i == 0) {
         await page.locator('mat-card').filter({ hasText: 'ItemProdutoCód. barrasOrigem' }).locator('button').first().click();
      // Se não for o primeiro, ele abre o modal pelo botão INSERT pra testar
      } else {
         await page.locator('body').press('Insert');
      }

      // Pesquisa o item e seleciona
      await page.getByRole('combobox', { name: 'Produto' }).click();
      await page.getByRole('combobox', { name: 'Produto' }).fill(product.description);
      await page.getByText(product.description).click();

      // Clica na quantidade e deleta o que tem hoje
      await page.getByRole('textbox', { name: 'Quantidade', exact: true }).click();
      await page.getByRole('textbox', { name: 'Quantidade', exact: true }).press('Delete');

      // Pega a quantidade lançada, transforma em string e da um split, isso cria uma lista de strings, cada string é um dígito da quantidade
      let quantity_list = product.quantity.toString().split('');
      // Para cada item clica no botão do número para lançar o item, não tem problema ter vírgula Ex: 89,99.
      for (let i2 = 0; i2 < quantity_list.length; i2++) {
         const number = quantity_list[i2];
         await page.getByRole('textbox', { name: 'Quantidade', exact: true }).press(number);
      }
      // Confirma e termina o lançamento do produto
      await page.getByRole('button', { name: 'Confirmar' }).click();
   }

   // Lançamento dos serviços, se tiver serviços
   if (undefined != quotation.services) {
      // Da um for em cada serviço
      for (let i = 0; i < quotation.services.length; i++) {
         // Cria a variável e clica para aguardar
         const service = quotation.services[i];
         await page.getByRole('heading', { name: 'Novo orçamento' }).click();

         // Se for o primeiro serviço ( i = 0), ele testa abrir o modal de serviços pelo botão
         if (i == 0) {
            await page.locator('gw-quotation-form-services').getByRole('button').click();
            // Se não for o primeiro, ele abre o modal pelo botão SHIFT + INSERT pra testar
         } else {
            await page.locator('body').press('Shift+Insert');
         }

         // Pesquisa o serviço e insere
         await page.getByRole('combobox', { name: 'Nome do serviço' }).click();
         await page.getByRole('combobox', { name: 'Nome do serviço' }).fill(service.description);
         await page.getByRole('option', { name: service.description }).click();
         await page.getByRole('textbox', { name: 'Quantidade' }).click();
         await page.getByRole('button', { name: 'Confirmar' }).click();
      }
   }

   // Insere os pagamentos, se existir
   if (undefined != quotation.payments) {
      // Da um for na lista de pagamentos
      for (let i = 0; i < quotation.payments.length; i++) {
         const payment = quotation.payments[i];
         
         // Clica no botão para adicionar um novo pagamento, espera 1 segundo para carregar
         // as formas de pagamento e clica em Adicionar pagamento para esperar o modal
         await page.locator('gw-document-payments-form-card').getByRole('button').first().click();
         await page.waitForTimeout(1000);
         await page.getByRole('heading', { name: 'Adicionar pagamento' }).click();

         // Clica nas opções de pagamento e seleciona
         await page.getByLabel('Forma de pagamento *').getByText('Forma de pagamento').click();
         await page.getByRole('option', { name: payment.name }).click();

         // Se tiver valor informado, entra aqui
         if (undefined != payment.value) {
            await page.getByRole('textbox', { name: 'Valor' }).click();
            
            // Separa os dígitos do pagamento em um array de dígitos e clica cada um deles
            let digits_list = payment.value?.split('');
            for (let i2 = 0; i2 < digits_list.length; i2++) {
               const digit = digits_list[i2];
               await page.getByRole('textbox', { name: 'Valor' }).press(digit);
            }
         }

         // Se tiver tipo do pagamento informado, cai aqui
         if (undefined != payment.type) {
            // Se o tipo for parcelado, coloca 3 parcelas com intervalo de 1 mês por padrão
            if ('Parcelado' == payment.type) {
               // Coloca 3 parcelas
               await page.getByRole('textbox', { name: 'Nº de parcelas' }).click();
               await page.getByRole('textbox', { name: 'Nº de parcelas' }).press('3');
               
               // Coloca o intervalo de 1 mês
               await page.getByRole('textbox', { name: 'Intervalo' }).click();
               await page.getByRole('textbox', { name: 'Intervalo' }).press('1');
               await page.getByLabel('Período').getByText('Período').click();
               await page.getByRole('option', { name: 'Mês' }).click();
            }
         }
         await page.getByRole('button', { name: 'Confirmar' }).click();
      }
   }

   // Se tiver informação adicional, adiciona ela
   if (undefined != quotation.additional_information) {
      await page.getByRole('textbox', { name: 'Informações adicionais' }).click();
      await page.getByRole('textbox', { name: 'Informações adicionais' }).fill(quotation.additional_information);
   }

   // Salva e espera carregar a visualização
   await page.getByRole('button', { name: 'Salvar' }).click();
   await page.getByText('Nome' + quotation.client).click();

   // Valida os dados
   await expect(page.getByText('Nome' + quotation.client)).toBeVisible();

   // Valida a origem do preço
   if (undefined != quotation.price_origin && 'Preço de venda' != quotation.price_origin) {
      if ('Tabela de preço' == quotation.price_origin) {
         await expect(page.getByText('TP-' + quotation.price_table)).toBeVisible();
      } else if ('Preço de atacado' == quotation.price_origin) {
         await expect(page.getByText('Atacado', { exact: true })).toBeVisible();
      }
   }

   // Valida os produtos da lista
   for (let i = 0; i < quotation.products.length; i++) {
      const product = quotation.products[i];
      // Valida o nome do produto
      await expect(page.getByText(product.description)).toBeVisible();
      // Valida o valor do produto, se tiver
      if (undefined != product.value)
         await expect(page.getByRole('cell', { name: 'R$ ' + product.value }).first()).toBeVisible();
   }

   // Valida os serviços da lista, se tiver
   if (undefined != quotation.services) {
      for (let i = 0; i < quotation.services.length; i++) {
         const service = quotation.services[i];
         // Valida o nome 
         await expect(page.getByText(service.description)).toBeVisible();
      }
   }

   // Valida os pagamentos, se tiver
   if (undefined != quotation.payments) {
      for (let i = 0; i < quotation.payments.length; i++) {
         const payment = quotation.payments[i];
         await expect(page.getByRole('cell', { name: payment.name })).toBeVisible();
         if (undefined != payment.value) {
            await expect(page.getByRole('cell', { name: 'R$ ' + payment.value }).first()).toBeVisible();
         }
      }
   }

   // Valida as informações adicionais, se tiver
   if (undefined != quotation.additional_information)
      await expect(page.getByText(quotation.additional_information)).toBeVisible();
}
