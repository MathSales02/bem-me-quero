'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getProductBySlug, getProductsByCategory } from '@/data/products';
import { getCategoryName } from '@/data/categories';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/products/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center py-20 text-center px-4">
        <h1 className="font-display text-2xl font-bold text-graphite mb-2">
          Produto não encontrado
        </h1>
        <p className="text-graphite-light mb-6">
          O produto que você procura não está disponível.
        </p>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 rounded-lg bg-forest px-5 py-2.5 text-sm font-medium text-white hover:bg-forest-light transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product.available) return;
    addItem(product.id, quantity, Object.keys(selectedVariations).length > 0 ? selectedVariations : undefined);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  const handleVariationChange = (variationId: string, optionValue: string) => {
    setSelectedVariations((prev) => ({ ...prev, [variationId]: optionValue }));
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? product.images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImageIndex((i) => (i === product.images.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="bg-ivory-warm border-b border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-graphite-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-graphite transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-graphite transition-colors">
              Catálogo
            </Link>
            <span>/</span>
            <Link
              href={`/catalogo?categoria=${product.category}`}
              className="hover:text-graphite transition-colors"
            >
              {getCategoryName(product.category)}
            </Link>
            <span>/</span>
            <span className="text-graphite truncate max-w-[160px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back button mobile */}
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-graphite-light hover:text-graphite transition-colors mb-6 lg:hidden"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm">
              <Image
                src={product.images[currentImageIndex] || '/products/placeholder.jpg'}
                alt={`${product.name} — imagem ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />

              {!product.available && (
                <div className="absolute inset-0 flex items-center justify-center bg-graphite/40">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-graphite">
                    Indisponível
                  </span>
                </div>
              )}

              {product.previousPriceInCents && product.available && (
                <span className="absolute top-4 left-4 rounded-full bg-terracotta px-3 py-1 text-xs font-bold text-white">
                  {Math.round(
                    ((product.previousPriceInCents - product.priceInCents) /
                      product.previousPriceInCents) *
                      100
                  )}
                  % OFF
                </span>
              )}

              {/* Gallery navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-graphite shadow-sm hover:bg-white transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-graphite shadow-sm hover:bg-white transition-colors"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${
                      index === currentImageIndex
                        ? 'border-forest'
                        : 'border-border hover:border-forest-light'
                    }`}
                    aria-label={`Ver imagem ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} — miniatura ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-graphite-muted mb-2">
              {getCategoryName(product.category)}
            </span>

            <h1 className="font-display text-2xl font-bold text-graphite sm:text-3xl lg:text-4xl leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-forest tabular-nums sm:text-3xl">
                {formatPrice(product.priceInCents)}
              </span>
              {product.previousPriceInCents && (
                <span className="text-lg text-graphite-muted line-through tabular-nums">
                  {formatPrice(product.previousPriceInCents)}
                </span>
              )}
            </div>

            {/* Availability */}
            <div className="mt-3">
              {product.available ? (
                <span className="inline-flex items-center gap-1.5 text-sm text-forest font-medium">
                  <span className="h-2 w-2 rounded-full bg-forest" />
                  Disponível
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm text-graphite-muted font-medium">
                  <span className="h-2 w-2 rounded-full bg-graphite-muted" />
                  Indisponível no momento
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-graphite-light leading-relaxed">
              {product.description}
            </p>

            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div className="mt-6 space-y-4">
                {product.variations.map((variation) => (
                  <div key={variation.id}>
                    <label className="text-sm font-medium text-graphite mb-2 block">
                      {variation.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variation.options.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() =>
                            option.available && handleVariationChange(variation.name, option.label)
                          }
                          disabled={!option.available}
                          className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                            selectedVariations[variation.name] === option.label
                              ? 'border-forest bg-forest/5 text-forest font-medium'
                              : option.available
                                ? 'border-border bg-white text-graphite hover:border-forest-light'
                                : 'border-border-light bg-ivory-warm text-graphite-muted cursor-not-allowed line-through'
                          }`}
                          aria-label={`${variation.name}: ${option.label}${
                            !option.available ? ' (indisponível)' : ''
                          }`}
                        >
                          {option.label}
                          {option.additionalPriceInCents > 0 && option.available && (
                            <span className="text-xs text-graphite-muted ml-1">
                              (+{formatPrice(option.additionalPriceInCents)})
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity selector + Add to cart */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-graphite">Quantidade:</label>
                <div className="flex items-center gap-0.5 rounded-lg border border-border bg-white">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center text-graphite-light hover:text-graphite transition-colors disabled:opacity-40"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="flex h-10 w-10 items-center justify-center text-graphite-light hover:text-graphite transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.available || added}
                className={`flex w-full items-center justify-center gap-2.5 rounded-lg py-4 text-base font-semibold transition-all duration-200 ${
                  !product.available
                    ? 'bg-ivory-warm text-graphite-muted cursor-not-allowed'
                    : added
                      ? 'bg-forest text-white'
                      : 'bg-forest text-white hover:bg-forest-light shadow-sm hover:shadow-md'
                }`}
                aria-label={
                  !product.available
                    ? 'Produto indisponível'
                    : added
                      ? 'Adicionado ao carrinho'
                      : 'Adicionar ao carrinho'
                }
              >
                {added ? (
                  <>
                    <Check size={20} />
                    Adicionado ao carrinho
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    {product.available ? 'Adicionar ao carrinho' : 'Indisponível'}
                  </>
                )}
              </button>
            </div>

            {/* Product details note */}
            <p className="mt-6 text-xs text-graphite-muted leading-relaxed">
              Os valores apresentados se referem somente aos produtos. Frete e condições de pagamento
              serão combinados diretamente com o vendedor.
            </p>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="font-display text-2xl font-bold text-graphite mb-8">
              Produtos relacionados
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
