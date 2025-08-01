import { test } from "../../helpers/fixtures";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { generate as generateCNPJ, format as formatCNPJ } from "cnpj";
import {
  DeadlinePaymentMethod,
  ImmediatePaymentMethod,
  OtherPaymentMethod,
  PaymentMethodType,
  PosPaymentDevice,
  TefPaymentDevice,
} from "../../types/registers/payment-method.type";

const immediatePaymentMethod: ImmediatePaymentMethod = {
  name: "AutoImmediatePayment " + faker.number.int({min: 1000, max: 9999}),
  description: faker.lorem.sentence(),
  type: PaymentMethodType.A_VISTA,
  nfeRef: "Dinheiro",
  sendNFCeAfterPayment: false,
  financialAccountIndex: 0,
};

const deadlinePaymentMethod: DeadlinePaymentMethod = {
  name: "AutoDeadlinePayment " + faker.number.int({min: 1000, max: 9999}),
  description: faker.lorem.sentence(),
  type: PaymentMethodType.A_PRAZO,
  nfeRef: "Boleto",
  sendNFCeAfterPayment: true,
  duplicates: 5, // 5 parcelas
  interval: 30,
  intervalUnit: "Dia",
  initialDate: "config_geral",
};

const otherPaymentMethodPOS: OtherPaymentMethod = {
  name: "AutoOtherPayment " + faker.number.int({min: 1000, max: 9999}),
  description: faker.lorem.sentence(),
  type: PaymentMethodType.OUTROS,
  nfeRef: "Cartão de Crédito",
  sendNFCeAfterPayment: true,
  financialAccountIndex: 0,
  utilizeTEF: false,
  TEFInstitutionCNPJ: formatCNPJ(generateCNPJ()),
  paymentDevice: {
    type: "POS",
    name: "AutoPOSDevice " + faker.number.int({min: 1000, max: 9999}),
    integrator: "REDE" as any,
    serialNumber: faker.string.alphanumeric(10),
    printSellDocumentPOSNFCe: false,
    printSellDocumentPOSNFe: false,
    responsible: "Emissor",
  },
};

const otherPaymentMethodTEF: OtherPaymentMethod = {
  name: "AutoOtherPayment " + faker.number.int({min: 1000, max: 9999}),
  description: faker.lorem.sentence(),
  type: PaymentMethodType.OUTROS,
  nfeRef: "Cartão de Crédito",
  sendNFCeAfterPayment: true,
  financialAccountIndex: 0,
  utilizeTEF: true,
  TEFInstitutionCNPJ: formatCNPJ(generateCNPJ()),
  paymentDevice: {
    type: "TEF",
    name: "AutoTEFDevice " + faker.number.int({min: 1000, max: 9999}),
    companyCode: faker.string.numeric(15),
    branchCode: faker.string.numeric(15),
    terminalCode: faker.string.numeric(15),
    operatorCode: faker.string.numeric(5),
    pinPadUsbPort: "COM1",
    responsible: "Emissor",
  },
};

var registeredPaymentMethods: (
  | ImmediatePaymentMethod
  | DeadlinePaymentMethod
  | OtherPaymentMethod
)[] = [];

var registeredPaymentDevices: ((PosPaymentDevice | TefPaymentDevice) & {
  responsible: string;
})[] = [];

test("Should create a POS and TEF payment device", async ({ page }) => {
  const paymentDevices: (TefPaymentDevice | PosPaymentDevice)[] = [
    otherPaymentMethodPOS.paymentDevice as PosPaymentDevice,
    otherPaymentMethodTEF.paymentDevice as TefPaymentDevice,
  ];
  
  await page.getByRole("button", { name: "Cadastros" }).click();
  for (const paymentDevice of paymentDevices) {
    await page.getByRole("link", { name: "Pagamentos" }).click();

    if (paymentDevice) {
      if (paymentDevice.type === "POS") {
        await page.getByRole("link", { name: "Dispositivos" }).click();
        await page.locator("gw-device-list gw-create-action-button a").click();
        await page
          .getByRole("combobox", { name: "Tipo do dispositivo" })
          .click();
        await page.getByRole("option", { name: "POS" }).locator("span").click();
        await page
          .getByRole("textbox", { name: "Nome (Identificação)" })
          .click();
        await page
          .getByRole("textbox", { name: "Nome (Identificação)" })
          .fill(paymentDevice.name);
        await page.getByRole("combobox", { name: "Integradora" }).click();
        await page
          .getByRole("option", { name: (paymentDevice as PosPaymentDevice).integrator })
          .click();
        await page
          .getByRole("textbox", { name: "Número serial (POS)" })
          .click();
        await page
          .getByRole("textbox", { name: "Número serial (POS)" })
          .fill((paymentDevice as PosPaymentDevice).serialNumber);

        if ((paymentDevice as PosPaymentDevice).printSellDocumentPOSNFCe) {
          await page
            .getByRole("checkbox", {
              name: "Imprimir documento da venda no POS NFC-e",
            })
            .check();
        }
        if ((paymentDevice as PosPaymentDevice).printSellDocumentPOSNFe) {
          await page
            .getByRole("checkbox", {
              name: "Imprimir documento da venda no POS NFe",
            })
            .check();
        }
        await page.getByRole("button", { name: "Salvar" }).click();
        await expect(
          page.getByText("Cadastro salvo com sucesso")
        ).toBeVisible();
      } else {
        await page.getByRole("link", { name: "Dispositivos" }).click();
        await page.locator("gw-device-list gw-create-action-button a").click();
        await page
          .getByRole("combobox", { name: "Tipo do dispositivo" })
          .click();
        await page.getByRole("option", { name: "TEF" }).locator("span").click();
        await page
          .getByRole("textbox", { name: "Nome (Identificação)" })
          .click();
        await page
          .getByRole("textbox", { name: "Nome (Identificação)" })
          .fill(paymentDevice.name);
        await page.getByLabel("Código da empresa *").click();
        await page
          .getByLabel("Código da empresa *")
          .fill((paymentDevice as TefPaymentDevice).companyCode);
        await page.getByLabel("Código da filial *").click();
        await page
          .getByLabel("Código da filial *")
          .fill((paymentDevice as TefPaymentDevice).branchCode);
        await page.getByLabel("Código do terminal *").click();
        await page
          .getByLabel("Código do terminal *")
          .fill((paymentDevice as TefPaymentDevice).terminalCode);
        await page.getByLabel("Código do operador *").click();
        await page
          .getByLabel("Código do operador *")
          .fill((paymentDevice as TefPaymentDevice).operatorCode);
        await page.getByRole("combobox", { name: "Porta USB PinPad" }).click();
        await page
          .getByRole("option", {
            name: (paymentDevice as TefPaymentDevice).pinPadUsbPort, exact: true,
          })
          .click();
        await page.getByRole("button", { name: "Salvar" }).click();
        await expect(
          page.getByText("Cadastro salvo com sucesso")
        ).toBeVisible();
      }

      registeredPaymentDevices.push(
        paymentDevice as (PosPaymentDevice | TefPaymentDevice) & {
          responsible: string;
        }
      );
      console.log("Payment device registered: ", paymentDevice.name);
    }
  }
});

test("Should create a immediate payment method", async ({ page }) => {
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Pagamentos" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).click();

  // Nome da forma de pagamento
  await page
    .getByRole("textbox", { name: "Nome da forma de pagamento" })
    .click();
  await page
    .getByRole("textbox", { name: "Nome da forma de pagamento" })
    .fill(immediatePaymentMethod.name);

  // Descrição
  await page.getByRole("textbox", { name: "Descrição" }).click();
  await page
    .getByRole("textbox", { name: "Descrição" })
    .fill(immediatePaymentMethod.description);

  // Tipo de pagamento
  await page
    .getByLabel("Tipo de pagamento *")
    .getByText("Tipo de pagamento")
    .click();
  await page.getByText("À vista").click();

  // Referência NF-e
  await page
    .getByLabel("Referência na NF-e *")
    .getByText("Referência na NF-e")
    .click();
  await page.getByText(immediatePaymentMethod.nfeRef.toString()).click();

  // Conta financeira
  await page.getByRole("combobox", { name: "Conta financeira" }).click();
  await page
    .getByRole("option")
    .nth(immediatePaymentMethod.financialAccountIndex)
    .click();

  if (immediatePaymentMethod.sendNFCeAfterPayment) {
    if (
      !(await page
        .getByRole("checkbox", { name: "Emitir NFC-e ao finalizar venda" })
        .isChecked())
    ) {
      await page
        .getByText("Emitir NFC-e ao finalizar venda")
        .click();
    }
  }

  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Cadastro salvo com sucesso")).toBeVisible();
  registeredPaymentMethods.push(immediatePaymentMethod);
});

test("Should create a deadline payment method", async ({ page }) => {
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Pagamentos" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).click();

  // Nome da forma de pagamento
  await page
    .getByRole("textbox", { name: "Nome da forma de pagamento" })
    .click();
  await page
    .getByRole("textbox", { name: "Nome da forma de pagamento" })
    .fill(deadlinePaymentMethod.name);

  // Descrição
  await page.getByRole("textbox", { name: "Descrição" }).click();
  await page
    .getByRole("textbox", { name: "Descrição" })
    .fill(deadlinePaymentMethod.description);

  // Tipo de pagamento
  await page
    .getByLabel("Tipo de pagamento *")
    .getByText("Tipo de pagamento")
    .click();
  await page.getByText("A prazo").click();

  // Referência NF-e (Boleto nesse caso)
  await page
    .getByLabel("Referência na NF-e *")
    .getByText("Referência na NF-e")
    .click();
  await page.getByText(deadlinePaymentMethod.nfeRef.toString()).click();

  // Emite NFCe ao finalizar venda
  if (deadlinePaymentMethod.sendNFCeAfterPayment) {
    if (
      !(await page
        .getByRole("checkbox", { name: "Emitir NFC-e ao finalizar venda" })
        .isChecked())
    ) {
      await page
        .getByText("Emitir NFC-e ao finalizar venda")
        .click();
    }
  }

  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Cadastro salvo com sucesso")).toBeVisible();
  registeredPaymentMethods.push(deadlinePaymentMethod);
});

test("Should create an other payment method with POS device", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Pagamentos" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).click();

  // Nome da forma de pagamento
  await page
    .getByRole("textbox", { name: "Nome da forma de pagamento" })
    .click();
  await page
    .getByRole("textbox", { name: "Nome da forma de pagamento" })
    .fill(otherPaymentMethodPOS.name);

  // Descrição
  await page.getByRole("textbox", { name: "Descrição" }).click();
  await page
    .getByRole("textbox", { name: "Descrição" })
    .fill(otherPaymentMethodPOS.description);

  // Tipo de pagamento
  await page
    .getByLabel("Tipo de pagamento *")
    .getByText("Tipo de pagamento")
    .click();
  await page.getByText("Outros").click();

  // Referência NF-e
  await page
    .getByLabel("Referência na NF-e *")
    .getByText("Referência na NF-e")
    .click();
  await page.getByText(otherPaymentMethodPOS.nfeRef.toString()).click();
  if (
    otherPaymentMethodPOS.sendNFCeAfterPayment &&
    !(await page
      .getByRole("checkbox", { name: "Emitir NFC-e ao finalizar venda" })
      .isChecked())
  ) {
    await page
      .getByText("Emitir NFC-e ao finalizar venda")
      .click();
  }

  // Conta financeira
  await page.getByRole("combobox", { name: "Conta financeira" }).click();
  await page
    .getByRole("option")
    .nth(otherPaymentMethodPOS.financialAccountIndex)
    .click();

  // Dispositivo POS
  await page.getByRole("combobox", { name: "Dispositivo" }).click();
  await page
    .getByRole("option", { name: registeredPaymentDevices[0].name })
    .click();
  if ("responsible" in registeredPaymentDevices[0]!) {
    await page
      .getByRole("combobox", { name: "Responsável pelo parcelamento" })
      .click();
    await page
      .getByRole("option", {
        name: (registeredPaymentDevices[0] as any).responsible,
      })
      .click();
  }

    await page.getByRole("button", { name: "Salvar" }).click();
    await expect(page.getByText("Cadastro salvo com sucesso")).toBeVisible();
    registeredPaymentMethods.push(otherPaymentMethodPOS);
});

test("Should create an other payment method with TEF device", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Cadastros" }).click();
  await page.getByRole("link", { name: "Pagamentos" }).click();
  await page.getByRole("link").filter({ hasText: /^$/ }).click();

  // Nome da forma de pagamento
  await page
    .getByRole("textbox", { name: "Nome da forma de pagamento" })
    .click();
  await page
    .getByRole("textbox", { name: "Nome da forma de pagamento" })
    .fill(otherPaymentMethodTEF.name);

  // Descrição
  await page.getByRole("textbox", { name: "Descrição" }).click();
  await page
    .getByRole("textbox", { name: "Descrição" })
    .fill(otherPaymentMethodTEF.description);

  // Tipo de pagamento
  await page
    .getByLabel("Tipo de pagamento *")
    .getByText("Tipo de pagamento")
    .click();
  await page.getByText("Outros").click();

  // Referência NF-e
  await page
    .getByLabel("Referência na NF-e *")
    .getByText("Referência na NF-e")
    .click();
  await page.getByText(otherPaymentMethodPOS.nfeRef.toString()).click();

  // Utiliza Tef
  await page
    .getByText("Utilizar dispositivos TEF")
    .click();
  await page
    .getByRole("textbox", { name: "CNPJ da instituição" })
    .fill(otherPaymentMethodTEF.TEFInstitutionCNPJ!);

  // Emite NFCe ao finalizar venda
  if (
    otherPaymentMethodPOS.sendNFCeAfterPayment &&
    !(await page
      .getByRole("checkbox", { name: "Emitir NFC-e ao finalizar venda" })
      .isChecked())
  ) {
    await page
      .getByText("Emitir NFC-e ao finalizar venda")
      .click();
  }

  // Dispositivo TEF
  if ("responsible" in registeredPaymentDevices[1]!) {
    await page
      .getByRole("combobox", { name: "Responsável pelo parcelamento" })
      .click();
    await page
      .getByRole("option", {
        name: (registeredPaymentDevices[1] as any).responsible,
      })
      .click();
  }

  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Cadastro salvo com sucesso")).toBeVisible();
  registeredPaymentMethods.push(otherPaymentMethodTEF);
});

test("Should list all registered payment methods", async ({ page }) => {
    await page.getByRole("button", { name: "Cadastros" }).click();
    await page.getByRole("link", { name: "Pagamentos" }).click();
    await page.getByRole("searchbox", { name: "Buscar formas de pagamento" }).click();

    for(const paymentMethod of registeredPaymentMethods) {
        await page.getByRole("searchbox", { name: "Buscar formas de pagamento" }).fill(paymentMethod.name);
        await page.waitForTimeout(1000); // Wait for search results to update
        await expect(page.getByRole("heading", { name: paymentMethod.name })).toBeVisible();
    }
})

test("Should list all registered payment devices", async ({ page }) => {
    await page.getByRole("button", { name: "Cadastros" }).click();
    await page.getByRole("link", { name: "Pagamentos" }).click();
    await page.getByRole("link", { name: "Dispositivos" }).click();
    await page.getByRole("searchbox", { name: "Digite para buscar" }).click();

    for(const paymentDevice of registeredPaymentDevices) {
        await page.getByRole("searchbox", { name: "Digite para buscar" }).fill(paymentDevice.name);
        await page.waitForTimeout(1000); // Wait for search results to update
        await expect(page.getByRole("heading", { name: paymentDevice.name })).toBeVisible();
    }
})

test("Should delete all registered payment methods and devices", async ({ page }) => {
    await page.getByRole("button", { name: "Cadastros" }).click();
    await page.getByRole("link", { name: "Pagamentos" }).click();

    for (const paymentMethod of registeredPaymentMethods) {
        console.log("Deleting payment method: ", paymentMethod.name);
        await page.getByRole("searchbox", { name: "Buscar formas de pagamento" }).fill(paymentMethod.name);
        await page.waitForTimeout(1000); // Wait for search results to update
        await expect(page.getByText(paymentMethod.name)).toBeVisible();
        await page.getByRole("heading", { name: paymentMethod.name }).click();
        await page.getByRole("button", { name: "Excluir" }).click();
        await page.getByRole("button", { name: "Apagar" }).click();
        await expect(page.getByText("Apagado com sucesso")).toBeVisible();
    }

    await page.waitForTimeout(1000); // Wait for deletion to complete
    await page.getByRole("link", { name: "Dispositivos" }).click();

    // Adjustement needed because of the soft delete performed on payment method deletion
    // Card: GWB-432 - https://gdoor.atlassian.net/browse/GWB-432
    for (const paymentDevice of registeredPaymentDevices) {
        await page.getByRole("searchbox", { name: "Digite para buscar" }).fill(paymentDevice.name);
        await page.waitForTimeout(2000); // Wait for search results to update
        await expect(page.getByRole('heading', { name: paymentDevice.name})).toBeVisible();
        await page.getByRole('heading', { name: paymentDevice.name}).hover();
        await page.getByRole('navigation').filter({ hasText: paymentDevice.name }).getByRole('button').click();
        await page.getByRole('button', { name: 'Excluir' }).click();
        await page.waitForTimeout(2000); // Wait for search results to update

        if(await page.getByRole('heading', { name: 'Este registro está em uso e não pode ser apagado' }).isVisible()) {
            console.log("Payment device is in use, skipping deletion: ", paymentDevice.name);
            await page.getByRole('button', { name: 'OK' }).click();
            continue;
        } else {
          await expect(page.getByText(`Nada encontrado com "${paymentDevice.name}"`)).toBeVisible();
        }
    }
});