import { ReactNode } from 'react'; 
import Header from './Header';       

/**
 * Layout component wraps all pages with common UI:
 * - Site header
 * - Main content container
 */
export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // Full-screen container with light gray background
    <div className="min-h-screen bg-gray-50">
      {/* Site header (logo, nav, search, etc.) */}
      <Header />

      {/* 
        Main content area:
        - Centered horizontally (mx-auto)
        - Maximum width for readability
        - Padding for spacing
      */}
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
