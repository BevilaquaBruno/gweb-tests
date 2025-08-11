export type Quotation = {
   price_origin?: string,
   price_table?: string,
   client: string | number,
   products: { description: string, quantity: number }[],
   services?: string[],
   payments?: { name: string, type: string }[]
   additional_information?: string,
}