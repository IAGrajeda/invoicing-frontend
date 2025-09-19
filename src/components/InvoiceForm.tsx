import { Formik } from 'formik';
import * as Yup from 'yup';
import { useInvoices } from '../store/useInvoices';
import type { Invoice } from '../types';
import {
  CForm, CFormInput, CFormSelect, CButton
} from '@coreui/react';

const schema = Yup.object({
  clientName: Yup.string().required('Requerido'),
  date: Yup.string().required('Requerido'),
  amount: Yup.number().typeError('Debe ser número').moreThan(0, 'Debe ser > 0').required('Requerido'),
  status: Yup.mixed<'Paid' | 'Unpaid'>().oneOf(['Paid', 'Unpaid']).required('Requerido'),
});

type FormValues = {
  clientName: string;
  date: string;
  amount: number | '';
  status: 'Paid' | 'Unpaid';
};

const initialValues: FormValues = {
  clientName: '',
  date: '',
  amount: '',
  status: 'Unpaid',
};

function uuid() {
  return (globalThis.crypto && 'randomUUID' in globalThis.crypto)
    ? crypto.randomUUID()
    : 'id-' + Math.random().toString(36).slice(2);
}

function nextInvoiceNumber(existing: Invoice[]) {
  const nums = existing
    .map(i => parseInt(String(i.number).replace(/\D/g, ''), 10))
    .filter(n => !isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `INV-${String(next).padStart(4, '0')}`;
}

export default function InvoiceForm({ onSubmitted, onCreated }: { onSubmitted?: () => void; onCreated?: (inv: Invoice) => void }) {
  const add = useInvoices(s => s.add);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        const state = useInvoices.getState();
        const inv: Invoice = {
          id: uuid(),
          number: nextInvoiceNumber(state.invoices),
          clientName: values.clientName.trim(),
          date: values.date,
          status: values.status,
          amount: Number(values.amount),
        };
        add(inv);
        onCreated?.(inv);
        resetForm();
        onSubmitted?.();
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <CForm onSubmit={handleSubmit} className="mb-0">
          <div className="mb-3">
            <label className="form-label">Cliente</label>
            <CFormInput
              name="clientName"
              placeholder="Acme Corp"
              value={values.clientName}
              onChange={handleChange}
            />
            {touched.clientName && errors.clientName && (
              <small className="text-danger">{errors.clientName}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha</label>
            <CFormInput
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
            />
            {touched.date && errors.date && (
              <small className="text-danger">{errors.date}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Monto (USD)</label>
            <CFormInput
              type="number"
              step="0.01"
              min="0"
              name="amount"
              value={values.amount}
              onChange={handleChange}
            />
            {touched.amount && errors.amount && (
              <small className="text-danger">{errors.amount}</small>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Estado</label>
            <CFormSelect name="status" value={values.status} onChange={handleChange}>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </CFormSelect>
            {touched.status && errors.status && (
              <small className="text-danger">{errors.status}</small>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <CButton color="primary" type="submit" disabled={isSubmitting}>
              Guardar factura
            </CButton>
          </div>
        </CForm>
      )}
    </Formik>
  );
}