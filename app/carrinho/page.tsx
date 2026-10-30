'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, calculateSubtotal } from '@/lib/format';
import { buildWhatsAppUrl, isWhatsAppConfigured } from '@/lib/whatsapp';

type CartStep = 'cart' | 'review';

export default function CartPage() {
  const {
    itemsWithProducts,
    itemCount,
    totalInCents,
    updateQuantity,
    removeItem,
    clearCart,
    isHydrated,
  } = useCart();

  const [step, setStep] = useState<CartStep>('cart');
  const [whatsappError, setWhatsappError] = useState<string | null>(null);

  const handleFinalize = () => {
    if (!isWhatsAppConfigured()) {
      setWhatsappError(
        'O número de WhatsApp do vendedor não está configurado. Entre em contato por outro canal.'
      );
      return;
    }

    // Check product availability
    const unavailable = itemsWithProducts.filter((item) => !item.product.available);
    if (unavailable.length > 0) {
      setWhatsappError(
        `Os seguintes produtos não estão mais disponíveis: ${unavailable
          .map((i) => i.product.name)
          .join(', ')}. Remova-os antes de finalizar.`
      );
      return;
    }

    setWhatsappError(null);
    setStep('review');
  };

  const handleWhatsAppSubmit = () => {
    const url = buildWhatsAppUrl(itemsWithProducts);
    if (!url) {
      setWhatsappError(
        'Não foi possível gerar o link do WhatsApp. Verifique se o número está configurado.'
      );
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Loading state before hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-pulse text-graphite-muted">Carregando carrinho...</div>
      </div>
    );
  }

  // Empty cart
  if (itemsWithProducts.length === 0) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag size={64} className="mx-auto text-border mb-6" />
          <h1 className="font-display text-2xl font-bold text-graphite sm:text-3xl mb-3">
            Seu carrinho está vazio
          </h1>
          <p className="text-graphite-light mb-8 max-w-md mx-auto">
            Explore nossos produtos e encontre o que você procura. Quando adicionar algo,
            ele aparecerá aqui.
          </p>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-white hover:bg-forest-light transition-colors"
          >
            Explorar catálogo
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
      <div className="bg-ivory-warm border-b border-border-light">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold text-graphite">
            {step === 'review' ? 'Revisão do pedido' : 'Seu carrinho'}
          </h1>
          <p className="mt-2 text-graphite-light">
            {step === 'review'
              ? 'Confira os itens antes de enviar para o vendedor.'
              : `${itemCount} ${itemCount === 1 ? 'item' : 'itens'} no carrinho`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => setStep('cart')}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              step === 'cart' ? 'text-forest' : 'text-graphite-muted hover:text-graphite'
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === 'cart' ? 'bg-forest text-white' : 'bg-ivory-warm text-graphite-muted'
              }`}
            >
              1
            </span>
            Carrinho
          </button>
          <div className="w-12 h-px bg-border" />
          <button
            type="button"
            onClick={() => step === 'review' || handleFinalize()}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              step === 'review' ? 'text-forest' : 'text-graphite-muted hover:text-graphite'
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === 'review' ? 'bg-forest text-white' : 'bg-ivory-warm text-graphite-muted'
              }`}
            >
              2
            </span>
            Revisão
          </button>
        </div>

        {step === 'cart' ? (
          /* ── CART STEP ─────────────────────────────────────── */
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {itemsWithProducts.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 rounded-xl bg-white p-4 shadow-sm sm:gap-5 sm:p-5"
                >
                  {/* Image */}
                  <Link
                    href={`/produto/${item.product.slug}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-ivory-warm sm:h-28 sm:w-28"
                  >
                    <Image
                      src={item.product.images[0] || '/products/placeholder.jpg'}
                      alt={item.product.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/produto/${item.product.slug}`}
                        className="text-sm font-medium text-graphite hover:text-forest transition-colors line-clamp-2 sm:text-base"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-graphite-muted hover:text-terracotta hover:bg-terracotta/5 transition-colors"
                        aria-label={`Remover ${item.product.name} do carrinho`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-forest">
                      {formatPrice(item.product.priceInCents)}
                    </p>

                    {!item.product.available && (
                      <span className="mt-1 inline-flex items-center gap-1 text-xs text-terracotta font-medium">
                        <AlertTriangle size={12} />
                        Indisponível
                      </span>
                    )}

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-0.5 rounded-lg border border-border bg-ivory">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center text-graphite-light hover:text-graphite transition-colors"
                          aria-label={`Diminuir quantidade de ${item.product.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-9 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center text-graphite-light hover:text-graphite transition-colors"
                          aria-label={`Aumentar quantidade de ${item.product.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-sm font-bold text-graphite tabular-nums">
                        {formatPrice(calculateSubtotal(item.product.priceInCents, item.quantity))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-1.5 text-sm text-graphite-light hover:text-graphite transition-colors"
                >
                  <ArrowLeft size={14} />
                  Continuar comprando
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm text-terracotta hover:text-terracotta-light transition-colors font-medium"
                >
                  Limpar carrinho
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm space-y-4">
                <h2 className="font-display text-lg font-bold text-graphite">
                  Resumo do pedido
                </h2>

                <div className="space-y-2 text-sm border-b border-border-light pb-4">
                  <div className="flex justify-between text-graphite-light">
                    <span>
                      Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
                    </span>
                    <span className="tabular-nums">{formatPrice(totalInCents)}</span>
                  </div>
                  <div className="flex justify-between text-graphite-muted">
                    <span>Frete</span>
                    <span>A combinar</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="font-semibold text-graphite">Total dos produtos</span>
                  <span className="text-xl font-bold text-graphite tabular-nums">
                    {formatPrice(totalInCents)}
                  </span>
                </div>

                {whatsappError && (
                  <div className="rounded-lg bg-terracotta/5 border border-terracotta/20 p-3 text-sm text-terracotta">
                    <div className="flex gap-2">
                      <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                      <p>{whatsappError}</p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleFinalize}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-forest py-3.5 text-sm font-semibold text-white hover:bg-forest-light transition-colors shadow-sm"
                >
                  Revisar pedido
                  <ArrowRight size={16} />
                </button>

                <p className="text-[11px] text-graphite-muted leading-relaxed text-center">
                  O frete e as condições de pagamento serão combinados com o vendedor pelo WhatsApp.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ── REVIEW STEP ─────────────────────────────────── */
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-graphite mb-4">
                Itens do pedido
              </h2>

              <div className="divide-y divide-border-light">
                {itemsWithProducts.map((item, index) => (
                  <div key={item.productId} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-ivory-warm">
                      <Image
                        src={item.product.images[0] || '/products/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-graphite">
                        {index + 1}. {item.product.name}
                      </p>
                      <p className="text-xs text-graphite-muted mt-0.5">
                        Qtd: {item.quantity} × {formatPrice(item.product.priceInCents)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-graphite tabular-nums">
                        {formatPrice(calculateSubtotal(item.product.priceInCents, item.quantity))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
                <span className="font-semibold text-graphite">Total dos produtos</span>
                <span className="text-xl font-bold text-graphite tabular-nums">
                  {formatPrice(totalInCents)}
                </span>
              </div>

              <p className="mt-3 text-xs text-graphite-muted">
                Frete e condições de pagamento serão combinados diretamente com o vendedor.
              </p>
            </div>

            {/* Info box */}
            <div className="rounded-xl bg-forest/5 border border-forest/10 p-5">
              <h3 className="font-semibold text-forest text-sm mb-2">
                O que acontece agora?
              </h3>
              <ul className="space-y-1.5 text-sm text-graphite-light">
                <li>• Ao clicar no botão abaixo, o WhatsApp abrirá com seu pedido.</li>
                <li>• Envie a mensagem ao vendedor para iniciar a conversa.</li>
                <li>• Combine disponibilidade, pagamento e entrega diretamente.</li>
              </ul>
            </div>

            {whatsappError && (
              <div className="rounded-lg bg-terracotta/5 border border-terracotta/20 p-4 text-sm text-terracotta">
                <div className="flex gap-2">
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  <p>{whatsappError}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="flex items-center justify-center gap-2.5 rounded-lg bg-[#25D366] py-4 px-6 text-base font-semibold text-white hover:bg-[#20BD5A] transition-colors shadow-sm sm:flex-1"
              >
                <MessageCircle size={20} />
                Finalizar pedido pelo WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="flex items-center justify-center gap-2 rounded-lg border border-border bg-white py-3.5 px-6 text-sm font-medium text-graphite hover:bg-ivory-warm transition-colors sm:flex-1"
              >
                <ArrowLeft size={16} />
                Voltar ao carrinho
              </button>
            </div>

            <p className="text-center text-xs text-graphite-muted">
              O pedido só será confirmado após você enviar a mensagem pelo WhatsApp e
              receber a resposta do vendedor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
