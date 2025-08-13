export type Quotation = {
   id?: number,
   price_origin?: string,
   price_table?: string,
   client: string,
   products: { description: string, quantity: number, value?: string }[],
   services?: { description: string }[],
   payments?: { name: string, type?: string, value?: string }[]
   additional_information?: string,
}