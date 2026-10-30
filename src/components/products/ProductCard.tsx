'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  /** visual variant */
  variant?: 'default' | 'featured';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) return;
    addItem(product.id);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const isFeatured = variant === 'featured';

  return (
    <article
      className={`group relative flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        isFeatured ? 'shadow-sm' : 'shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}
    >
      {/* Image */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-ivory-warm"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <Image
          src={product.images[0] || '/products/placeholder.jpg'}
          alt={product.name}
          fill
          sizes={isFeatured ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-graphite/40">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-graphite">
              Indisponível
            </span>
          </div>
        )}
        {product.previousPriceInCents && product.available && (
          <span className="absolute top-3 left-3 rounded-full bg-terracotta px-2.5 py-1 text-[11px] font-bold text-white">
            {Math.round(
              ((product.previousPriceInCents - product.priceInCents) / product.previousPriceInCents) * 100
            )}% OFF
          </span>
        )}

        {/* Quick view overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-graphite/0 group-hover:bg-graphite/10 transition-colors opacity-0 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-graphite shadow-sm">
            <Eye size={14} />
            Ver detalhes
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/produto/${product.slug}`}
          className="text-sm font-medium text-graphite line-clamp-2 hover:text-forest transition-colors leading-snug"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-forest tabular-nums">
            {formatPrice(product.priceInCents)}
          </span>
          {product.previousPriceInCents && (
            <span className="text-xs text-graphite-muted line-through tabular-nums">
              {formatPrice(product.previousPriceInCents)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.available || added}
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${
              !product.available
                ? 'bg-ivory-warm text-graphite-muted cursor-not-allowed'
                : added
                  ? 'bg-forest text-white'
                  : 'bg-forest/5 text-forest hover:bg-forest hover:text-white'
            }`}
            aria-label={
              !product.available
                ? `${product.name} indisponível`
                : added
                  ? `${product.name} adicionado ao carrinho`
                  : `Adicionar ${product.name} ao carrinho`
            }
          >
            {added ? (
              <>
                <Check size={16} />
                Adicionado
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                {product.available ? 'Adicionar' : 'Indisponível'}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
