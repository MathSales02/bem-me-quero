import { Category, CategorySlug } from '@/types/product';

export const categories: Category[] = [
  {
    slug: 'skincare',
    name: 'Skincare & Rosto',
    description: 'Séruns, hidratantes faciais e proteção solar para sua pele brilhar',
    icon: 'Sparkles',
  },
  {
    slug: 'cabelos',
    name: 'Cabelos & Fios',
    description: 'Óleos nutritivos, máscaras reconstrutoras e tratamentos capilares',
    icon: 'Heart',
  },
  {
    slug: 'corpo-e-banho',
    name: 'Corpo & Banho',
    description: 'Hidratação profunda, esfoliantes corporais e rituais de banho',
    icon: 'Droplets',
  },
  {
    slug: 'maquiagem',
    name: 'Maquiagem',
    description: 'Batons, acabamentos aveludados e realce da sua beleza',
    icon: 'Palette',
  },
  {
    slug: 'perfumaria',
    name: 'Perfumaria & Aromas',
    description: 'Fragrâncias envolventes, body splashes e bem-estar',
    icon: 'Flower2',
  },
];

export function getCategoryBySlug(slug: CategorySlug | string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: CategorySlug | string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}
