type BasePerson = {
  type: string,
  name: string;
  national_document: string;
  state_document: string;
  postal_code: string;
  local: string;
  district: string;
  number: string;
  country: string;
  state: string;
  city_name: string;
  phone: string;
  cell: string;
  fax: string;
  secondary_cell: {
    description: string;
    cell: string;
  };
  email: string;
  homepage: string;
  secondary_email: {
    description: string;
    email: string;
  };
  obs: string;
}

export type Person = BasePerson & {
  surname: string;
  birth_date: string;
  crc?: string;
  comission?: {
    product_cash_payment_commission: number;
    product_future_payment_commission: number;
    service_cash_payment_commission: number;
    service_future_payment_commission: number;
  },
  rntrc?: string;
  vehicle?: {
    description: string;
    plate: string;
    rntrc: string;
    renavam: string;
    tara: string;
    cap_m3: string;
    cap_kg: string;
  }
};

export type Seller = BasePerson & {
  surname: string,
  birth_date: string,
  comission: {
    product_cash_payment_commission: number,
    product_future_payment_commission: number,
    service_cash_payment_commission: number,
    service_future_payment_commission: number,
  },
};

export type Company = BasePerson & {
  trade_name: string;
  municipal_document: string;
  suframa_number: string;
  cnae: string;
  person: {
    name: string;
    national_document: string;
  };
};

export type RuralProducer = BasePerson & {
  surname: string,
  birth_date: string,
}

export type Accountant = BasePerson & {
  surname: string,
  birth_date: string,
  crc: string,
}

export type Transporter = BasePerson & {
  trade_name: string,
  rntrc: string,
  vehicle: {
    description: string,
    plate: string,
    rntrc: string,
    renavam: string,
    tara: string,
    cap_m3: string,
    cap_kg: string,
  }
}

export type Foreigner = {
  type: string,
  name: string,
  surname: string,
  document: string,
  birth_date: string,
  local: string;
  district: string;
  number: string;
  country: string;
  state: string;
  city_name: string;
  phone: string;
  cell: string;
  fax: string;
}