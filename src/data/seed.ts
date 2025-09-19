import type { Invoice } from '../types';

const seed: Invoice[] = [
  { id: '1', number: 'INV-0001', clientName: 'Acme Corp',        date: '2025-07-05', status: 'Paid',   amount: 1200.50 },
  { id: '2', number: 'INV-0002', clientName: 'Globex LLC',       date: '2025-07-15', status: 'Unpaid', amount: 450.00  },
  { id: '3', number: 'INV-0003', clientName: 'Umbrella Inc',     date: '2025-08-01', status: 'Paid',   amount: 980.99  },
  { id: '4', number: 'INV-0004', clientName: 'Wayne Enterprises',date: '2025-08-12', status: 'Unpaid', amount: 2100.00 },
  { id: '5', number: 'INV-0005', clientName: 'Stark Industries', date: '2025-08-20', status: 'Paid',   amount: 750.25  },
  { id: '6', number: 'INV-0006', clientName: 'Hooli',            date: '2025-09-01', status: 'Unpaid', amount: 1320.00 },
  { id: '7', number: 'INV-0007', clientName: 'Oscorp',           date: '2025-09-03', status: 'Paid',   amount: 300.00  },
  { id: '8', number: 'INV-0008', clientName: 'Initech',          date: '2025-09-05', status: 'Paid',   amount: 620.30  },
  { id: '9', number: 'INV-0009', clientName: 'Soylent',          date: '2025-09-06', status: 'Unpaid', amount: 155.75  },
  { id: '10', number: 'INV-0010', clientName: 'Aperture Labs',   date: '2025-09-09', status: 'Unpaid', amount: 1999.99 },
];

export default seed;
