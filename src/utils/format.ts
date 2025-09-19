// src/utils/format.ts
export function formatUSD(value: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' }).format(value);
}

export function formatDate(value: string) {
  // value viene en ISO YYYY-MM-DD
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}
