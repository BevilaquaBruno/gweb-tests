export type BasePaymentDevice = {
  type: "TEF" | "POS";
  name: string;
};

export type PosPaymentDevice = BasePaymentDevice & {
  integrator: "STONE" | "PAGBANK" | "BANRISUL" | "REDE" | "CIELO" | "CAIXA" | "BIN" | "SICREDI";
  serialNumber: string;
  printSellDocumentPOSNFCe: boolean;
  printSellDocumentPOSNFe: boolean;
};

export type TefPaymentDevice = BasePaymentDevice & {
  companyCode: string;
  branchCode: string;
  terminalCode: string;
  operatorCode: string;
  pinPadUsbPort: "COM1" | "COM2" | "COM3" | "COM4" | "COM5" | "COM6" | "COM7" | "COM8" | "COM9" | "COM10" | "COM11" | "COM12" | "COM13";
};

export enum PaymentMethodType {
  A_VISTA,
  A_PRAZO,
  OUTROS,
}

export type BasePaymentMethod = {
  name: string;
  description: string;
  type: PaymentMethodType;
  nfeRef: "Dinheiro" | "Cartão de Crédito" | "Cartão de Débito" | "Boleto" | "Cartão da Loja" | "Crédito Loja" | "Cheque" | "Vale Alimentação" | "Vale Refeição" | "Vale Presente" | "Vale Combustível" | "Depósito Bancário" | "Pagamento Instantâneo (PIX) - Dinâmico" | "Pagamento Instantâneo (PIX) - Estático" | "Pagamento Eletrônico não Informado - falha de hardware do sistema emissor" | "Transferência bancária, Carteira Digital" | "Programa de fidelidade, Cashback, Crédito Virtual" | "Outros";
  sendNFCeAfterPayment: boolean;
};

export type ImmediatePaymentMethod = BasePaymentMethod & {
  financialAccountIndex: number;
  utilizeTEF?: boolean;
  TEFInstitutionCNPJ?: string;
  paymentDevice?:
    | PosPaymentDevice
    | (TefPaymentDevice & {
        responsible: "Emissor" | "Lojista";
      });
};

export type DeadlinePaymentMethod = BasePaymentMethod & {
  duplicates: number;
  interval: number;
  intervalUnit: "Dia" | "Semana" | "Mês";
  initialDate: "config_geral" | "data_mov" | "apos_primeiro_periodo";
  utilizeTEF?: boolean;
  TEFInstitutionCNPJ?: string;
  paymentDevice?:
    | PosPaymentDevice
    | (TefPaymentDevice & {
        responsible: "Emissor" | "Lojista";
      });
};

export type OtherPaymentMethod = BasePaymentMethod & {
  financialAccountIndex: number;
  utilizeTEF?: boolean;
  TEFInstitutionCNPJ?: string;
  paymentDevice?:
    | PosPaymentDevice
    | (TefPaymentDevice & {
        responsible: "Emissor" | "Lojista";
      });
};
