import { Category, CategorySlug } from '@/types/product';

export const categories: Category[] = [
  {
    slug: 'eletronicos',
    name: 'Eletrônicos',
    description: 'Tecnologia e gadgets para o dia a dia',
    icon: 'Cpu',
  },
  {
    slug: 'celulares-e-acessorios',
    name: 'Celulares e Acessórios',
    description: 'Smartphones e complementos para o seu celular',
    icon: 'Smartphone',
  },
  {
    slug: 'audio',
    name: 'Áudio',
    description: 'Fones, caixas de som e equipamentos de áudio',
    icon: 'Headphones',
  },
  {
    slug: 'informatica',
    name: 'Informática',
    description: 'Equipamentos e acessórios para computador',
    icon: 'Monitor',
  },
  {
    slug: 'casa-e-utilidades',
    name: 'Casa e Utilidades',
    description: 'Produtos úteis para o seu dia a dia em casa',
    icon: 'Home',
  },
  {
    slug: 'beleza-e-cuidados',
    name: 'Beleza e Cuidados Pessoais',
    description: 'Produtos de cuidados pessoais e bem-estar',
    icon: 'Sparkles',
  },
  {
    slug: 'moda-e-acessorios',
    name: 'Moda e Acessórios',
    description: 'Peças e acessórios com estilo',
    icon: 'Shirt',
  },
  {
    slug: 'novidades',
    name: 'Novidades',
    description: 'Produtos recém-chegados ao catálogo',
    icon: 'Zap',
  },
];

export function getCategoryBySlug(slug: CategorySlug | string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: CategorySlug | string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}
