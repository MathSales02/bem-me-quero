import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Explore nosso catálogo completo de produtos. Filtre por categoria, busque pelo nome e encontre o que você procura.',
  openGraph: {
    title: 'Catálogo | Bem Me Quero',
    description: 'Explore nosso catálogo completo de produtos.',
  },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
