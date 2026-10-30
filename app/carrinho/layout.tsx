import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrinho',
  description: 'Revise seus itens e finalize seu pedido pelo WhatsApp.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
