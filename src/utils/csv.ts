import type { Invoice, InvoiceStatus } from '../types';

export type CsvRow = {
  number: string;      
  clientName: string;   
  date: string;        
  status: string;      
  amount: string;       
};


// aqui van funciones para convertir los strings del CSV a los tipos correctos
export function toISODate(input: string): string | null {
  if (!input) return null;

  // Aqui acepto YYYY-MM-DD directo
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;

  // Aqui damos el formato DD/MM/YYYY
  // Ejemplo: 31/12/2023
  // Nota: no valido que el dia y mes sean correctos, solo el formato
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(input)) {
    const [dd, mm, yyyy] = input.split('/').map(Number);
    if (!dd || !mm || !yyyy) return null;
    const d = new Date(yyyy, mm - 1, dd);
    if (isNaN(d.getTime())) return null;
    return [
      String(d.getFullYear()),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0'),
    ].join('-');
  }

  // Intento genérico
  const d = new Date(input);
  if (isNaN(d.getTime())) return null;
  return [
    String(d.getFullYear()),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');
}

export function toStatus(input: string): InvoiceStatus | null {
  const s = String(input || '').trim().toLowerCase();
  if (['paid', 'pagada'].includes(s)) return 'Paid';
  if (['unpaid', 'no pagada', 'nopagada', 'no_pagada'].includes(s)) return 'Unpaid';
  return null;
}

export function toAmount(input: string): number | null {
  if (input == null) return null;
  const cleaned = String(input).replace(/[,$\s]/g, '');
  const n = Number(cleaned);
  if (!isFinite(n) || n <= 0) return null;
  return n;
}

export function csvRowToInvoice(row: CsvRow): Invoice | null {
  const number = String(row.number || '').trim();
  const clientName = String(row.clientName || '').trim();

  const date = toISODate(String(row.date || '').trim());
  const status = toStatus(String(row.status || '').trim());
  const amount = toAmount(String(row.amount || '').trim());

  if (!number || !clientName || !date || !status || amount == null) {
    return null;
  }

  return {
    id: crypto.randomUUID?.() ?? 'id-' + Math.random().toString(36).slice(2),
    number,
    clientName,
    date,
    status,
    amount,
  };
}
