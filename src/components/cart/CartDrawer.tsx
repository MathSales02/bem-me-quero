'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/format';

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    itemsWithProducts,
    itemCount,
    totalInCents,
    updateQuantity,
    removeItem,
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, closeCart]);

  // Focus trap
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Carrinho de compras">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-graphite/30 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-ivory shadow-2xl flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light">
          <h2 className="font-display text-xl font-bold text-graphite flex items-center gap-2">
            <ShoppingBag size={20} />
            Seu carrinho
            {itemCount > 0 && (
              <span className="text-sm font-body font-normal text-graphite-muted">
                ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-graphite-light hover:text-graphite hover:bg-ivory-warm transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {itemsWithProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={48} className="text-border mb-4" />
              <p className="text-graphite-light font-medium mb-1">Seu carrinho está vazio</p>
              <p className="text-sm text-graphite-muted mb-6">Explore nossos produtos e encontre o que procura.</p>
              <Link
                href="/catalogo"
                onClick={closeCart}
                className="inline-flex items-center gap-2 rounded-lg bg-forest px-5 py-2.5 text-sm font-medium text-white hover:bg-forest-light transition-colors"
              >
                Ver catálogo
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {itemsWithProducts.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-4 rounded-lg bg-white p-3 shadow-sm"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-ivory-warm">
                    <Image
                      src={item.product.images[0] || '/products/placeholder.jpg'}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/produto/${item.product.slug}`}
                      onClick={closeCart}
                      className="text-sm font-medium text-graphite hover:text-forest transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-0.5 text-sm font-semibold text-forest">
                      {formatPrice(item.product.priceInCents)}
                    </p>

                    {/* Quantity controls */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-0.5 rounded-lg border border-border bg-ivory">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-graphite-light hover:text-graphite transition-colors"
                          aria-label={`Diminuir quantidade de ${item.product.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-graphite-light hover:text-graphite transition-colors"
                          aria-label={`Aumentar quantidade de ${item.product.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-graphite tabular-nums">
                          {formatPrice(item.product.priceInCents * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-graphite-muted hover:text-terracotta hover:bg-terracotta/5 transition-colors"
                          aria-label={`Remover ${item.product.name} do carrinho`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {itemsWithProducts.length > 0 && (
          <div className="border-t border-border-light px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite-light">Total dos produtos</span>
              <span className="text-lg font-bold text-graphite tabular-nums">
                {formatPrice(totalInCents)}
              </span>
            </div>
            <Link
              href="/carrinho"
              onClick={closeCart}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest py-3.5 text-sm font-semibold text-white hover:bg-forest-light transition-colors"
            >
              Ver carrinho completo
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
