import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { CartProvider } from '@/contexts/CartContext';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Bem Me Quero — Produtos que combinam com você',
    template: '%s | Bem Me Quero',
  },
  description:
    'Descubra produtos de beleza e autocuidado escolhidos com carinho. Cosméticos, skincare, cuidados capilares e corporais. Monte seu pedido e finalize pelo WhatsApp.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Bem Me Quero',
    title: 'Bem Me Quero — Beleza & Autocuidado sob demanda',
    description:
      'Descubra produtos de beleza, skincare e autocuidado escolhidos com carinho. Monte seu pedido e finalize pelo WhatsApp.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={sora.variable}>
      <body className="min-h-screen flex flex-col bg-ivory text-graphite font-body antialiased selection:bg-bronze selection:text-white">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
