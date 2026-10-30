import type { MetadataRoute } from 'next';
import { getPublishedProducts } from '@/data/products';
import { categories } from '@/data/categories';

const BASE_URL = 'https://bemmequero.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getPublishedProducts();

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/produto/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/catalogo?categoria=${cat.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalogo`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/carrinho`,
      changeFrequency: 'always',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/sobre`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacidade`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/termos`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...categoryUrls,
    ...productUrls,
  ];
}
