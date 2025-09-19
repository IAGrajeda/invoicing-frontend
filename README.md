# Frontend Developer Challenge — Invoicing Module (Softwareland)

## Demo
- **Live**: 

## Stack
React + Vite + TypeScript · CoreUI (Free) · Zustand · Formik + Yup · AG Grid · PapaParse (CSV) · Storybook

## Scripts
npm run dev       # desarrollo
npm run build     # compilar
npm run preview   # previsualizar build
npm run storybook # UI de componentes

Estructura
src/
  components/ (InvoiceTable, InvoiceForm, CSVImportModal, Layout)
  pages/ (InvoicesPage)
  store/ (useInvoices.ts)
  data/ (seed.ts)
  utils/ (format.ts, csv.ts)

Funcionalidad
Tabla con AG Grid: sort + filtros por estado y rango de fechas.
Formulario (Formik + Yup) en modal CoreUI: crea facturas (Zustand).
Importación CSV (PapaParse) con previsualización y merge por number.
Storybook: InvoiceForm, InvoiceTable

CSV import funciona - Aqui la muestra para utilizar
[invoices_sample.csv](https://github.com/user-attachments/files/22435618/invoices_sample.csv)
number,clientName,date,status,amount
INV-0101,Acme Corp,2025-09-10,Paid,1200.5
INV-0102,Globex LLC,10/09/2025,Unpaid,450.0
INV-0103,Initech,2025-09-08,Pagada,800.0
INV-0104,Wayne Enterprises,08/09/2025,No pagada,300.75
INV-0105,Umbrella Inc,2025-09-05,Paid,980.99
INV-0106,Stark Industries,05/09/2025,Unpaid,750.25
INV-0107,Hooli,2025-09-03,Paid,1320.0
INV-0108,Oscorp,03/09/2025,No pagada,300.0
INV-0109,Soylent,2025-09-02,Unpaid,155.75
INV-0110,Aperture Labs,02/09/2025,Paid,1999.99
INV-0111,Tyrell Corp,2025-09-11,Paid,640.0
INV-0112,Massive Dynamic,11/09/2025,Unpaid,121.3
INV-0113,Cyberdyne Systems,2025-09-12,Pagada,722.1
INV-0114,Blue Sun,12/09/2025,No pagada,87.65
INV-0115,Wonka Industries,2025-09-13,Paid,505.05
