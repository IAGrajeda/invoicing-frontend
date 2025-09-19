import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import InvoiceForm from '../components/InvoiceForm';

const meta: Meta<typeof InvoiceForm> = {
  title: 'Invoices/InvoiceForm',
  component: InvoiceForm,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof InvoiceForm>;

export const Default: Story = {
  args: {
    onSubmitted: fn(),
    onCreated: fn(),
  },
};
