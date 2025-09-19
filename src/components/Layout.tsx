import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="p-3 border-bottom bg-white">
        <div className="container">
          <strong>CustomsCity — Admin</strong>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
