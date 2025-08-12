export type Quotation = {
   price_origin?: string,
   price_table?: string,
   client: string,
   products: { description: string, quantity: number, value?: string }[],
   services?: { description: string }[],
   payments?: { name: string }[]
   additional_information?: string,
}