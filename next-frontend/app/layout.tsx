// app/layout.tsx
import './globals.css';
import ReactQueryProvider from '@/providers/QueryClientProvider';
import { CartProvider } from '@/context/CartContext';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AppProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
            </CartProvider>
          </AppProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}