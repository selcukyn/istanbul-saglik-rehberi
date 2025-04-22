import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'İstanbul Rehberi',
  description: 'İstanbul\'daki sağlık kurumlarını kolayca bulun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">İstanbul Rehberi</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
