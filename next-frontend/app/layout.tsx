// app/layout.tsx
import './globals.css';
import ReactQueryProvider from '@/providers/QueryClientProvider';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AppProvider>
            <Header />
            <main style={{ padding: '20px' }}>{children}</main>
          </AppProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}