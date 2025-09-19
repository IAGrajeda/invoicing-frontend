import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { useInvoices } from '../store/useInvoices';
import type { Invoice } from '../types';

// Estilos de AG Grid
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function formatUSD(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function InvoiceTable() {
  const invoices = useInvoices((s) => s.invoices);
  const filter = useInvoices((s) => s.filter);

  const rowData = useMemo(() => {
    return invoices.filter((inv) => {
      // status
      if (filter.status && filter.status !== 'All' && inv.status !== filter.status) return false;
      // rango fechas (comparación de strings ISO YYYY-MM-DD funciona)
      if (filter.dateFrom && inv.date < filter.dateFrom) return false;
      if (filter.dateTo && inv.date > filter.dateTo) return false;
      return true;
    });
  }, [invoices, filter]);

  const columnDefs = useMemo<ColDef<Invoice>[]>(() => [
    { headerName: 'Invoice #', field: 'number', sortable: true, filter: true, minWidth: 140 },
    { headerName: 'Client', field: 'clientName', sortable: true, filter: true, flex: 1 },
    { headerName: 'Date', field: 'date', sortable: true, minWidth: 130 },
    { headerName: 'Status', field: 'status', sortable: true, minWidth: 120 },
    {
      headerName: 'Amount (USD)', field: 'amount', sortable: true, minWidth: 160,
      valueFormatter: (p) => formatUSD(p.value as number), cellClass: 'ag-right-aligned-cell'
    },
  ], []);

  return (
    <div className="ag-theme-alpine" style={{ width: '100%', height: 520 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} animateRows />
    </div>
  );
}
