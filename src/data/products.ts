import { Product } from '@/types/product';

/**
 * Catálogo de demonstração — Bem Me Quero
 * ⚠️ Estes são produtos ilustrativos para desenvolvimento.
 * Os preços são fictícios e devem ser substituídos por dados reais.
 * As imagens devem ser trocadas pelas fotografias oficiais dos produtos.
 */
export const products: Product[] = [
  {
    id: 'prod-001',
    slug: 'fone-bluetooth-premium',
    name: 'Fone Bluetooth Premium',
    description:
      'Fone de ouvido sem fio com cancelamento de ruído ativo, bateria de longa duração e almofadas confortáveis. Ideal para quem busca qualidade sonora e praticidade no dia a dia.',
    category: 'audio',
    priceInCents: 29990,
    images: ['/products/headphones.jpg'],
    available: true,
    variations: [
      {
        id: 'var-color',
        name: 'Cor',
        type: 'color',
        options: [
          { id: 'opt-preto', label: 'Preto', value: 'preto', additionalPriceInCents: 0, available: true },
          { id: 'opt-branco', label: 'Branco', value: 'branco', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-10-01T10:00:00Z',
    published: true,
    tags: ['destaque', 'novidade'],
  },
  {
    id: 'prod-002',
    slug: 'smartphone-tela-amoled',
    name: 'Smartphone Tela AMOLED 6.5"',
    description:
      'Smartphone com tela AMOLED de 6.5 polegadas, câmera tripla de alta resolução e processador de última geração. Desempenho fluido para todas as tarefas.',
    category: 'celulares-e-acessorios',
    priceInCents: 189990,
    previousPriceInCents: 219990,
    images: ['/products/smartphone.jpg'],
    available: true,
    variations: [
      {
        id: 'var-storage',
        name: 'Armazenamento',
        type: 'storage',
        options: [
          { id: 'opt-128gb', label: '128 GB', value: '128gb', additionalPriceInCents: 0, available: true },
          { id: 'opt-256gb', label: '256 GB', value: '256gb', additionalPriceInCents: 20000, available: true },
        ],
      },
    ],
    createdAt: '2026-10-05T10:00:00Z',
    published: true,
    tags: ['destaque'],
  },
  {
    id: 'prod-003',
    slug: 'caixa-de-som-portatil',
    name: 'Caixa de Som Portátil',
    description:
      'Caixa de som Bluetooth portátil com som 360°, resistente à água e bateria para até 12 horas de reprodução. Leve para qualquer lugar.',
    category: 'audio',
    priceInCents: 34990,
    images: ['/products/speaker.jpg'],
    available: true,
    createdAt: '2026-10-10T10:00:00Z',
    published: true,
    tags: ['destaque', 'novidade'],
  },
  {
    id: 'prod-004',
    slug: 'smartwatch-esportivo',
    name: 'Smartwatch Esportivo',
    description:
      'Relógio inteligente com monitor cardíaco, GPS integrado, resistência à água e diversas opções de mostrador. Acompanhe seus treinos e notificações.',
    category: 'eletronicos',
    priceInCents: 49990,
    images: ['/products/smartwatch.jpg'],
    available: true,
    variations: [
      {
        id: 'var-size',
        name: 'Tamanho da Pulseira',
        type: 'size',
        options: [
          { id: 'opt-p', label: 'P', value: 'p', additionalPriceInCents: 0, available: true },
          { id: 'opt-m', label: 'M', value: 'm', additionalPriceInCents: 0, available: true },
          { id: 'opt-g', label: 'G', value: 'g', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-10-12T10:00:00Z',
    published: true,
    tags: ['destaque'],
  },
  {
    id: 'prod-005',
    slug: 'fone-intra-auricular-sem-fio',
    name: 'Fone Intra-auricular Sem Fio',
    description:
      'Fones de ouvido intra-auriculares com estojo de carregamento, som cristalino e encaixe confortável. Perfeitos para o uso diário.',
    category: 'audio',
    priceInCents: 15990,
    images: ['/products/earbuds.jpg'],
    available: true,
    createdAt: '2026-10-15T10:00:00Z',
    published: true,
    tags: ['novidade'],
  },
  {
    id: 'prod-006',
    slug: 'teclado-mecanico-compacto',
    name: 'Teclado Mecânico Compacto',
    description:
      'Teclado mecânico 75% em alumínio, switches de alta qualidade e iluminação personalizável. Experiência de digitação premium para trabalho e jogos.',
    category: 'informatica',
    priceInCents: 44990,
    images: ['/products/keyboard.jpg'],
    available: true,
    variations: [
      {
        id: 'var-switch',
        name: 'Switch',
        type: 'other',
        options: [
          { id: 'opt-red', label: 'Linear (Red)', value: 'red', additionalPriceInCents: 0, available: true },
          { id: 'opt-brown', label: 'Tátil (Brown)', value: 'brown', additionalPriceInCents: 0, available: true },
          { id: 'opt-blue', label: 'Clicky (Blue)', value: 'blue', additionalPriceInCents: 0, available: false },
        ],
      },
    ],
    createdAt: '2026-10-18T10:00:00Z',
    published: true,
    tags: ['novidade'],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug && p.published);
}

export function getPublishedProducts(): Product[] {
  return products.filter((p) => p.published);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.published && p.tags?.includes('destaque'));
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.published && p.tags?.includes('novidade'));
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return getPublishedProducts();
  
  return getPublishedProducts().filter(
    (p) =>
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery)
  );
}
