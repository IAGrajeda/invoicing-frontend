import { create } from 'zustand';
import type { Invoice, InvoiceStatus } from '../types';


// Estado del filtro
export type FilterState = {
  status?: InvoiceStatus | 'All';
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string;   // YYYY-MM-DD
};

// Estado global y acciones
type State = {
  invoices: Invoice[];
  filter: FilterState;
};

// Acciones para modificar el estado
type Actions = {
  seed: (data: Invoice[]) => void;
  add: (invoice: Invoice) => void; // lo usaremos en la Fase 3
  setFilter: (f: Partial<FilterState>) => void;
  clearFilter: () => void;
};

// Hook de Zustand para manejar el estado global de facturas y filtro
export const useInvoices = create<State & Actions>((set) => ({
  invoices: [],
  filter: { status: 'All' },
  seed: (data) => set({ invoices: data }),
  add: (inv) => set((s) => ({ invoices: [inv, ...s.invoices] })),
  setFilter: (f) => set((s) => ({ filter: { ...s.filter, ...f } })),
  clearFilter: () => set({ filter: { status: 'All' } }),
}));
