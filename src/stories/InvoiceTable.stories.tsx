import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';
import InvoiceTable from '../components/InvoiceTable';
import { useInvoices } from '../store/useInvoices';
import seed from '../data/seed';

function WithSeed() {
  const seededRef = useRef(false);
  const seedAction = useInvoices((s) => s.seed);

  useEffect(() => {
    if (!seededRef.current) {
      seedAction(seed);
      seededRef.current = true;
    }
  }, [seedAction]);

  return (
    <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
      <InvoiceTable />
    </div>
  );
}

const meta: Meta<typeof WithSeed> = {
  title: 'Invoices/InvoiceTable',
  component: WithSeed,
};
export default meta;

type Story = StoryObj<typeof WithSeed>;
export const Default: Story = {};
