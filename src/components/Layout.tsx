import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <header className="p-3 border-bottom bg-white shadow-sm mb-4">
        <div className="container">
          <strong >CustomsCity — Panel Admin</strong>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
