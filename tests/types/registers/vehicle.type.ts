export type Vehicle = {
  description: string;
  plate: string;
  uf: string;
  rntrc: string;
  renavam: string;
  tara: string;
  cap_m3: string;
  cap_kg: string;
  wheelset_type: string;
  car_body_type: string;
  axes_quantity: string;
  owner: Owner;
}

type Owner = {
  name: string;
  id?: string;
  surname?: string;
  national_document?: string;
  state_document?: string;
  postal_code?: string;
  local?: string;
  district?: string;
  number?: string;
  country?: string;
  state?: string;
  city_name?: string;
  phone?: string;
  cell?: string;
  email?: string;
}