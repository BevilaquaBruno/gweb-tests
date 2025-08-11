import { expect } from '@playwright/test';
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
   additional_information: 'Informações adicionais do orçamento com preço de venda',
   payments: [
      { name: 'Dinheiro, à vista', type: 'Cash' }
   ],
};

var quotation_table_price: Quotation = {
   price_origin: 'Tabela de preço',
   price_table: 'Tabela de preço 1',
   client: 'Pessoa Física de SC Santa Catarina',
   products: [
      { description: 'Produto Normal', quantity: 2 },
      { description: 'Produto Preço de Atacado', quantity: 1 },
   ],
   additional_information: 'Informações adicionais do orçamento',
   payments: [
      { name: 'À vista no cartão de crédito', type: 'Card'}
   ],
};

var quotation_wholesale_price: Quotation = {
   price_origin: 'Preço de atacado',
   client: 'Pessoa Física de SC Santa Catarina',
   products: [
      { description: 'Produto Normal', quantity: 2 },
      { description: 'Produto Grade - Marca 1, Tamanho 2', quantity: 3 },
   ],
   additional_information: 'Informações adicionais do orçamento',
   payments: [
      { name: 'Dinheiro, à vista', type: 'Cash' },
      { name: 'À vista no cartão de crédito', type: 'Card' }
   ],
};

var quotation_list = [
   quotation_sell_price,
   quotation_table_price,
   quotation_wholesale_price
];

test('First Test', async ({ page }) => {

});
