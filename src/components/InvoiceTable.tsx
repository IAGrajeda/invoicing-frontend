import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { useInvoices } from '../store/useInvoices';
import type { Invoice } from '../types';
import { formatUSD, formatDate } from '../utils/format';

// estilos AG Grid

export default function InvoiceTable() {
  const invoices = useInvoices((s) => s.invoices);
  const filter = useInvoices((s) => s.filter);

  const rowData = useMemo(() => {
    return invoices.filter((inv) => {
      if (filter.status && filter.status !== 'All' && inv.status !== filter.status) return false;
      if (filter.dateFrom && inv.date < filter.dateFrom) return false;
      if (filter.dateTo && inv.date > filter.dateTo) return false;
      return true;
    });
  }, [invoices, filter]);

  const columnDefs = useMemo<ColDef<Invoice>[]>(() => [
    { headerName: 'Invoice', field: 'number', sortable: true, filter: true, minWidth: 130 },
    { headerName: 'Client', field: 'clientName', sortable: true, filter: true, flex: 1, minWidth: 220 },
    { headerName: 'Date', field: 'date', sortable: true, minWidth: 140, valueFormatter: p => formatDate(String(p.value)) },
    { headerName: 'Status', field: 'status', sortable: true, minWidth: 120 },
    {
      headerName: 'Amount (USD)', field: 'amount', sortable: true, minWidth: 160,
      valueFormatter: (p) => formatUSD(Number(p.value)),
      cellClass: 'ag-right-aligned-cell'
    },
  ], []);

  return (
    <div className="ag-theme-alpine" style={{ width: '100%', height: 520 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ resizable: true }}
      />
    </div>
  );
}
