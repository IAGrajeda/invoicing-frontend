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
