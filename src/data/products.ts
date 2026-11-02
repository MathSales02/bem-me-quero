import { Product } from '@/types/product';

/**
 * Catálogo de demonstração — Bem Me Quero
 * ⚠️ Estes são produtos ilustrativos para desenvolvimento.
 * Os preços são fictícios e devem ser substituídos por dados reais.
 * As imagens devem ser trocadas pelas fotografias oficiais dos produtos.
 */
export const products: Product[] = [
  {
    id: 'prod-celimax',
    slug: 'celimax-retinal-shot-tightening-booster',
    name: 'Celimax Retinal Shot Tightening Booster 20,250 A-Shot™',
    description:
      'Booster coreano de alta tecnologia para firmeza, elasticidade e renovação celular intensiva. Formulado com 0.1% de Retinal estabilizado de ação rápida, 20.250 microespículas patenteadas A-Shot™ para infusão celular profunda, 1% de Pantenol e 3% de complexo peptídico Matrixyl® 3000. Preserva a luminosidade e a textura aveludada da pele.',
    category: 'skincare',
    priceInCents: 18990,
    previousPriceInCents: 22990,
    images: ['/products/celimax-retinal-shot.png'],
    available: true,
    variations: [
      {
        id: 'var-tamanho',
        name: 'Apresentação',
        type: 'size',
        options: [
          { id: 'opt-30g', label: 'Tubo Oficial 30g', value: '30g', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-11-01T12:00:00Z',
    published: true,
    tags: ['destaque', 'novidade'],
  },
  {
    id: 'prod-fino-hair-mask',
    slug: 'fino-premium-touch-hair-mask',
    name: 'Fino Premium Touch Hair Mask Shiseido 230g',
    description:
      'A lendária máscara capilar japonesa mais premiada da Ásia. Formulada com 6 tipos de essências de beleza, incluindo Geleia Real EX, Trealose, Esqualano e PCA hidratante. Reparação profunda que penetra no córtex do fio, derretendo o ressecamento e transformando cabelos danificados em fios incrivelmente sedosos, encorpados e com brilho espelhado.',
    category: 'cabelos',
    priceInCents: 11990,
    previousPriceInCents: 14990,
    images: ['/products/fino-premium-touch.jpg'],
    available: true,
    variations: [
      {
        id: 'var-fino-tamanho',
        name: 'Tamanho',
        type: 'size',
        options: [
          { id: 'opt-fino-230g', label: 'Pote 230g', value: '230g', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-11-01T18:00:00Z',
    published: true,
    tags: ['destaque', 'novidade'],
  },
  {
    id: 'prod-tsubaki-3x-mask',
    slug: 'tsubaki-premium-ex-repair-mask-3x',
    name: 'Shiseido Tsubaki Premium EX Repair Mask 3X 180g',
    description:
      'Tratamento intensivo capilar japonês com inovadora tecnologia de penetração iônica imediata 3X. Enriquecida com óleo puro de camélia dourada, pérola hidrolisada e geleia real. Proporciona efeito de salão instantâneo em casa sem tempo de pausa: aplicação e enxágue imediato com ultra nutrição e maciez extrema.',
    category: 'cabelos',
    priceInCents: 12990,
    previousPriceInCents: 15990,
    images: ['/products/tsubaki-mask.webp'],
    available: true,
    variations: [
      {
        id: 'var-tsubaki-tamanho',
        name: 'Tamanho',
        type: 'size',
        options: [
          { id: 'opt-tsubaki-180g', label: 'Pote 180g', value: '180g', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-11-01T18:30:00Z',
    published: true,
    tags: ['destaque', 'novidade'],
  },
  {
    id: 'prod-victoria-secret-body-splash',
    slug: 'victoria-secret-body-splash-fragrance-mist',
    name: "Victoria's Secret Body Splash Fragrance Mist 250ml",
    description:
      "O clássico e irresistível Body Splash Victoria's Secret para envolver seu corpo em uma nuvem perfumada e refrescante. Fórmula suave com aloe vera e camomila condicionante para uma sensação aveludada e fixação deliciosa ao longo de todo o dia.",
    category: 'perfumaria',
    priceInCents: 12990,
    previousPriceInCents: 14990,
    images: ['/products/victoria-secret-body-splash.jpg'],
    available: true,
    variations: [
      {
        id: 'var-vs-fragrancia',
        name: 'Fragrância',
        type: 'other',
        options: [
          { id: 'opt-amber-vanilla', label: 'Amber Vanilla Blossom', value: 'amber-vanilla', additionalPriceInCents: 0, available: true },
          { id: 'opt-bare-vanilla', label: 'Bare Vanilla', value: 'bare-vanilla', additionalPriceInCents: 0, available: true },
          { id: 'opt-pure-seduction', label: 'Pure Seduction', value: 'pure-seduction', additionalPriceInCents: 0, available: true },
          { id: 'opt-velvet-petals', label: 'Velvet Petals', value: 'velvet-petals', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-11-01T19:00:00Z',
    published: true,
    tags: ['destaque', 'novidade'],
  },
  {
    id: 'prod-001',
    slug: 'serum-facial-antioxidante-vitamina-c',
    name: 'Sérum Facial Antioxidante Vitamina C 10%',
    description:
      'Sérum concentrado com Vitamina C pura e Ácido Hialurônico. Promove luminosidade imediata, uniformiza o tom da pele, combate radicais livres e estimula a produção de colágeno. Textura leve e de rápida absorção, ideal para todos os tipos de pele.',
    category: 'skincare',
    priceInCents: 8990,
    previousPriceInCents: 10990,
    images: ['/products/serum-facial.jpg'],
    available: true,
    variations: [
      {
        id: 'var-volume',
        name: 'Volume',
        type: 'size',
        options: [
          { id: 'opt-30ml', label: '30 ml', value: '30ml', additionalPriceInCents: 0, available: true },
          { id: 'opt-50ml', label: '50 ml', value: '50ml', additionalPriceInCents: 3500, available: true },
        ],
      },
    ],
    createdAt: '2026-10-01T10:00:00Z',
    published: true,
    tags: ['destaque', 'novidade'],
  },
  {
    id: 'prod-002',
    slug: 'oleo-reparador-capilar-nutritivo',
    name: 'Óleo Reparador Capilar Nutritivo com Argan & Macadâmia',
    description:
      'Tratamento capilar nutritivo com blend de óleos nobres. Elimina o frizz, sela pontas duplas e confere brilho espelhado sem pesar os fios. Proteção térmica até 230°C.',
    category: 'cabelos',
    priceInCents: 6490,
    images: ['/products/oleo-capilar.jpg'],
    available: true,
    variations: [
      {
        id: 'var-tipo',
        name: 'Indicação',
        type: 'other',
        options: [
          { id: 'opt-todos', label: 'Todos os tipos de cabelo', value: 'todos', additionalPriceInCents: 0, available: true },
          { id: 'opt-danificados', label: 'Fios Quimicamente Tratados', value: 'danificados', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-10-05T10:00:00Z',
    published: true,
    tags: ['destaque'],
  },
  {
    id: 'prod-003',
    slug: 'manteiga-hidratante-corporal-karite',
    name: 'Manteiga Hidratante Corporal Karité & Baunilha Dourada',
    description:
      'Hidratação profunda e aveludada por até 48 horas. Formulada com manteiga pura de karité, óleo de amêndoas e notas aconchegantes de baunilha. Toque seco e pele incrivelmente perfumada.',
    category: 'corpo-e-banho',
    priceInCents: 5800,
    images: ['/products/hidratante-corporal.jpg'],
    available: true,
    variations: [
      {
        id: 'var-aroma',
        name: 'Fragrância',
        type: 'other',
        options: [
          { id: 'opt-baunilha', label: 'Baunilha Dourada', value: 'baunilha', additionalPriceInCents: 0, available: true },
          { id: 'opt-lavanda', label: 'Lavanda & Camomila', value: 'lavanda', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-10-10T10:00:00Z',
    published: true,
    tags: ['destaque'],
  },
  {
    id: 'prod-004',
    slug: 'batom-liquido-matte-aveludado',
    name: 'Batom Líquido Matte Conforto Aveludado',
    description:
      'Alta pigmentação com conforto extremo. Não resseca e não transfere, com textura aveludada que desliza facilmente nos lábios. Enriquecido com manteiga de cacau e vitamina E.',
    category: 'maquiagem',
    priceInCents: 4290,
    images: ['/products/batom-matte.jpg'],
    available: true,
    variations: [
      {
        id: 'var-tom',
        name: 'Tom',
        type: 'color',
        options: [
          { id: 'opt-nude', label: 'Nude Clássico', value: 'nude', additionalPriceInCents: 0, available: true },
          { id: 'opt-vermelho', label: 'Vermelho Nobre', value: 'vermelho', additionalPriceInCents: 0, available: true },
          { id: 'opt-terracota', label: 'Terracota Suave', value: 'terracota', additionalPriceInCents: 0, available: true },
        ],
      },
    ],
    createdAt: '2026-10-12T10:00:00Z',
    published: true,
    tags: ['destaque', 'novidade'],
  },
  {
    id: 'prod-005',
    slug: 'eau-de-parfum-floral-luminoso',
    name: 'Eau de Parfum Floral Luminoso 50ml',
    description:
      'Fragrância autoral e sofisticada, combinando acordes florais de jasmim branco e peônia com notas de fundo amadeiradas de cedro e âmbar. Fixação prolongada e presença memorável.',
    category: 'perfumaria',
    priceInCents: 13990,
    previousPriceInCents: 16990,
    images: ['/products/perfume-floral.jpg'],
    available: true,
    createdAt: '2026-10-15T10:00:00Z',
    published: true,
    tags: ['destaque'],
  },
  {
    id: 'prod-006',
    slug: 'mascara-facial-argila-rosa-detox',
    name: 'Máscara Facial Argila Rosa Efeito Glow & Detox',
    description:
      'Máscara facial purificante indicada para peles delicadas. Desobstrui poros, reduz a oleosidade excessiva e devolve o viço natural em apenas 15 minutos de autocuidado semanal.',
    category: 'skincare',
    priceInCents: 4990,
    images: ['/products/mascara-facial.jpg'],
    available: true,
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
