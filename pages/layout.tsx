
import React from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
};

export default function RotaLayout({ children }: LayoutProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Rota Management</h1>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
            <li>
              <Link href="/rota">Home</Link>
            </li>
            <li>
              <Link href="/rota/profile">Profile</Link>
            </li>
            <li>
              <Link href="/rota/holidays">Holidays</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem', background: '#f5f5f5', flex: '1' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ padding: '1rem', background: '#333', color: '#fff', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Rota Management System</p>
      </footer>
    </div>
  );
}
