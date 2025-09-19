import { useEffect, useMemo, useState } from 'react';
import { useInvoices } from '../store/useInvoices';
import seed from '../data/seed';
import InvoiceTable from '../components/InvoiceTable';
import CSVImportModal from '../components/CSVImportModal';

// CoreUI Free
import {
    CContainer, CRow, CCol, CCard, CCardBody,
    CFormSelect, CFormInput, CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CToaster, CToast, CToastHeader, CToastBody
} from '@coreui/react';
import InvoiceForm from '../components/InvoiceForm';


export default function InvoicesPage() {
    const seedAction = useInvoices((s) => s.seed);
    const filter = useInvoices((s) => s.filter);
    const setFilter = useInvoices((s) => s.setFilter);
    const clearFilter = useInvoices((s) => s.clearFilter);

    //estado para controlar el modal
    const [open, setOpen] = useState(false);

    // estado para los toasts
    const [toasts, setToasts] = useState<{ title: string; body: string }[]>([]);

    const [openCsv, setOpenCsv] = useState(false);

    useEffect(() => {
        seedAction(seed);
    }, [seedAction]);

    function showToast(title: string, body: string) {
        setToasts((t) => [...t, { title, body }]);
    }

    const canClear = useMemo(
        () => !!((filter.status && filter.status !== 'All') || filter.dateFrom || filter.dateTo),
        [filter]
    );

    return (
        <CContainer className="py-4 ">
            <CRow className="mb-3">
               
                <div className='row '>
                    <CCol md={2}>
                        <label className="form-label">Status</label>
                        <CFormSelect
                            value={filter.status ?? 'All'}
                            onChange={(e) => setFilter({ status: e.target.value as any })}
                        >
                            <option value="All">All</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </CFormSelect>
                    </CCol>
                    <CCol md={2}>
                        <label className="form-label">From</label>
                        <CFormInput
                            type="date"
                            value={filter.dateFrom ?? ''}
                            onChange={(e) => setFilter({ dateFrom: e.target.value || undefined })}
                        />
                    </CCol>
                    <CCol md={2}>
                        <label className="form-label">To</label>
                        <CFormInput
                            type="date"
                            value={filter.dateTo ?? ''}
                            onChange={(e) => setFilter({ dateTo: e.target.value || undefined })}
                        />
                    </CCol>
                    <CCol md={5} className="d-flex align-items-end justify-content-end gap-2">
                        <CButton color="primary" onClick={() => setOpen(true)}>New Invoice</CButton>
                        <CButton color="secondary" className='' variant="outline" disabled={!canClear} onClick={() => clearFilter()}>
                            Clear Filter
                        </CButton>
                        <CButton color="info" variant="outline" onClick={() => setOpenCsv(true)}>Import CSV</CButton>
                    </CCol>
                </div>

            </CRow>
            <CCard>
                <CModal visible={open} onClose={() => setOpen(false)} alignment="center">
                    <CModalHeader closeButton>
                        <CModalTitle>New invoice</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <InvoiceForm
                            onSubmitted={() => setOpen(false)}
                            onCreated={(inv) => showToast('Factura creada', `${inv.number} — ${inv.clientName}`)}
                        />
                    </CModalBody>
                </CModal>
                <CSVImportModal
                    visible={openCsv}
                    onClose={() => setOpenCsv(false)}
                    onImported={(count) => showToast('Importación completa', `Se importaron ${count} factura(s).`)}
                />
                <CToaster placement="top-end">
                    {toasts.map((t, i) => (
                        <CToast key={i} autohide visible>
                            <CToastHeader closeButton>{t.title}</CToastHeader>
                            <CToastBody>{t.body}</CToastBody>
                        </CToast>
                    ))}
                </CToaster>
                <CCardBody>
                    <InvoiceTable />
                </CCardBody>
            </CCard>
        </CContainer>
    );
}
