//creacion del tipo de factura

export type InvoiceStatus = 'Paid' | 'Unpaid';

export interface Invoice {
  id: string;       
  number: string;   
  clientName: string;
  date: string;     
  status: InvoiceStatus;
  amount: number;   
}