import { useMemo, useState } from 'react';
import Papa from 'papaparse';
import { useInvoices } from '../store/useInvoices';
import type { CsvRow } from '../utils/csv';
import { csvRowToInvoice } from '../utils/csv';
import {
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CButton, CAlert, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react';

// Cabeceras esperadas (en inglés, consistentes con el reto)
const REQUIRED_HEADERS = ['number', 'clientName', 'date', 'status', 'amount'] as const;

export default function CSVImportModal({
  visible,
  onClose,
  onImported,
}: {
  visible: boolean;
  onClose: () => void;
  onImported?: (count: number) => void;
}) {
  const addMany = useInvoices(s => s.addMany);
  const [rawRows, setRawRows] = useState<CsvRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');

  function handleFile(file: File) {
    setErrors([]);
    setFileName(file.name);
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const headers = res.meta.fields ?? [];
        const missing = REQUIRED_HEADERS.filter(h => !headers.includes(h));
        if (missing.length) {
          setErrors([`Faltan columnas: ${missing.join(', ')}`]);
          setRawRows([]);
          return;
        }
        setRawRows(res.data || []);
      },
      error: (err) => {
        setErrors([`Error al leer CSV: ${err.message}`]);
        setRawRows([]);
      }
    });
  }

  const { valids, invalidCount } = useMemo(() => {
    const ok = [];
    let bad = 0;
    for (const r of rawRows) {
      const inv = csvRowToInvoice(r);
      if (inv) ok.push(inv);
      else bad++;
    }
    return { valids: ok, invalidCount: bad };
  }, [rawRows]);

  function onImport() {
    if (!valids.length) {
      setErrors(['No hay filas válidas para importar. Verifica columnas y datos.']);
      return;
    }
    addMany(valids);
    onImported?.(valids.length);
    onClose();
    // limpiar estado
    setRawRows([]);
    setErrors([]);
    setFileName('');
  }

  return (
    <CModal visible={visible} onClose={onClose} alignment="center">
      <CModalHeader closeButton>
        <CModalTitle>Importar CSV</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p className="mb-2">
          Sube un archivo CSV con columnas: <code>number, clientName, date, status, amount</code>.
        </p>

        <div className="mb-3">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {fileName && <small className="text-muted ms-2">{fileName}</small>}
        </div>

        {errors.map((msg, i) => (
          <CAlert key={i} color="danger">{msg}</CAlert>
        ))}

        {rawRows.length > 0 && (
          <>
            <CAlert color={invalidCount > 0 ? 'warning' : 'success'} className="py-2">
              {rawRows.length} filas leídas — {valids.length} válidas{invalidCount > 0 ? `, ${invalidCount} inválidas` : ''}.
            </CAlert>

            {/* Previsualización de las primeras 5 filas válidas */}
            {valids.length > 0 && (
              <div className="border rounded">
                <CTable small responsive align="middle" className="mb-0">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Factura</CTableHeaderCell>
                      <CTableHeaderCell>Cliente</CTableHeaderCell>
                      <CTableHeaderCell>Fecha</CTableHeaderCell>
                      <CTableHeaderCell>Estado</CTableHeaderCell>
                      <CTableHeaderCell className="text-end">Monto</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {valids.slice(0, 5).map((v) => (
                      <CTableRow key={v.id}>
                        <CTableDataCell>{v.number}</CTableDataCell>
                        <CTableDataCell>{v.clientName}</CTableDataCell>
                        <CTableDataCell>{v.date}</CTableDataCell>
                        <CTableDataCell>{v.status}</CTableDataCell>
                        <CTableDataCell className="text-end">{v.amount}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            )}
          </>
        )}

        <div className="mt-3">
          <details>
            <summary>Ver plantilla CSV (copiar y pegar)</summary>
            <pre className="mt-2 mb-0" style={{ whiteSpace: 'pre-wrap' }}>
{`number,clientName,date,status,amount
INV-0101,Acme Corp,2025-09-10,Paid,1200.50
INV-0102,Globex LLC,10/09/2025,Unpaid,450
INV-0103,Initech,2025-09-08,Pagada,800
INV-0104,Wayne Enterprises,08/09/2025,No pagada,300.75`}
            </pre>
          </details>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" variant="outline" onClick={onClose}>Cancelar</CButton>
        <CButton color="primary" onClick={onImport} disabled={!rawRows.length}>Importar</CButton>
      </CModalFooter>
    </CModal>
  );
}
