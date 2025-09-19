# Frontend Developer Challenge — Invoicing Module

## Demo
**Live**:
- https://invoicing-frontend.vercel.app/
- https://invoicing-frontend.netlify.app/

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

INV-0113,Cyberdyne Systems,2025-09-12,Pagada,722.1
INV-0114,Blue Sun,12/09/2025,No pagada,87.65
INV-0115,Wonka Industries,2025-09-13,Paid,505.05
