'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Droplets, Palette, Flower2, Package, MessageCircle, CheckCircle, Search, Zap } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts, getNewProducts } from '@/data/products';
import { categories } from '@/data/categories';

const iconMap: Record<string, React.ElementType> = {
  Sparkles, Heart, Droplets, Palette, Flower2, Package,
};

import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { getDirectWhatsAppUrl } from '@/lib/whatsapp';

import { useCart } from '@/contexts/CartContext';

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newProducts = getNewProducts();
  const { itemCount, openCart } = useCart();

  const heroNavLinks = [
    { label: 'CATÁLOGO', href: '/catalogo' },
    { label: 'SKINCARE', href: '/catalogo?categoria=skincare' },
    { label: 'CABELOS', href: '/catalogo?categoria=cabelos' },
    { label: 'COMO FUNCIONA', href: '/sobre' },
  ];

  const heroSocialLinks = [
    { icon: MessageCircle, href: getDirectWhatsAppUrl('Olá! Vim pelo site da Bem Me Quero e quero conhecer os produtos de beleza.') },
    { icon: Heart, href: '/catalogo' },
    { icon: Sparkles, href: '/catalogo?categoria=skincare' },
  ];

  return (
    <>
      {/* ── MINIMALIST HERO COM CELIMAX RETINAL SHOT ── */}
      <MinimalistHero
        logoText="BEM ME QUERO"
        badgeText="Beleza & Autocuidado"
        navLinks={heroNavLinks}
        mainText="Curadoria exclusiva de beleza e skincare de alta performance. Fórmulas avançadas e cosméticos selecionados sob demanda direto até você."
        readMoreLink="/catalogo"
        readMoreText="Explorar Coleção"
        imageSrc="/products/celimax-retinal-shot.png"
        imageAlt="Celimax Retinal Shot Tightening Booster — Bem Me Quero"
        overlayText={{
          part1: 'pure',
          part2: 'glow.',
        }}
        circleColorClass="bg-gradient-to-tr from-[#9E7A5A] via-[#BFA082] to-[#D8C5B2]"
        socialLinks={heroSocialLinks}
        locationText="Atendimento Exclusivo no WhatsApp • Envio para Todo o Brasil"
        cartItemCount={itemCount}
        onOpenCart={openCart}
        whatsappUrl={getDirectWhatsAppUrl('Olá! Gostaria de tirar dúvidas no WhatsApp da Bem Me Quero.')}
      />

      {/* ── CATEGORIES ────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-graphite sm:text-3xl">
                Explore por categoria
              </h2>
              <p className="mt-2 text-graphite-light">
                Encontre rapidamente o que você precisa.
              </p>
            </div>
            <Link
              href="/catalogo"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-forest hover:text-forest-light transition-colors"
            >
              Ver tudo
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Package;
              return (
                <Link
                  key={cat.slug}
                  href={`/catalogo?categoria=${cat.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5 text-forest transition-colors group-hover:bg-forest group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-medium text-graphite text-center leading-tight">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED ──────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="pb-16 lg:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-graphite sm:text-3xl">
                  Destaques
                </h2>
                <p className="mt-2 text-graphite-light">
                  Produtos selecionados para você.
                </p>
              </div>
              <Link
                href="/catalogo"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-forest hover:text-forest-light transition-colors"
              >
                Ver catálogo
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEW PRODUCTS ──────────────────────────────────── */}
      {newProducts.length > 0 && (
        <section className="pb-16 lg:pb-20 bg-ivory-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta/10 px-3 py-1 text-xs font-semibold text-terracotta mb-3">
                  <Zap size={12} />
                  Recém-chegados
                </span>
                <h2 className="font-display text-2xl font-bold text-graphite sm:text-3xl">
                  Novidades
                </h2>
                <p className="mt-2 text-graphite-light">
                  Os últimos produtos adicionados ao catálogo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="como-funciona" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-2xl font-bold text-graphite sm:text-3xl lg:text-4xl">
              Como funciona a Bem Me Quero
            </h2>
            <p className="mt-3 text-graphite-light max-w-lg mx-auto">
              Comprar conosco é simples, rápido e direto. Veja como funciona:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {[
              {
                icon: Search,
                step: '01',
                title: 'Escolha seus produtos',
                desc: 'Navegue pelo catálogo, filtre por categorias e encontre o que você procura.',
              },
              {
                icon: CheckCircle,
                step: '02',
                title: 'Confira seu pedido',
                desc: 'Revise os itens, ajuste quantidades e confira os valores antes de finalizar.',
              },
              {
                icon: MessageCircle,
                step: '03',
                title: 'Converse pelo WhatsApp',
                desc: 'Seu pedido é enviado automaticamente ao vendedor para iniciar a conversa.',
              },
              {
                icon: Package,
                step: '04',
                title: 'Combine os detalhes',
                desc: 'Confirme disponibilidade, pagamento e entrega diretamente com o vendedor.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col rounded-xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
              >
                <span className="absolute -top-3 right-4 font-display text-5xl font-bold text-forest/5">
                  {item.step}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5 text-forest mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="font-semibold text-graphite mb-2">{item.title}</h3>
                <p className="text-sm text-graphite-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-forest py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Encontrou o que procura?
          </h2>
          <p className="mt-3 text-white/70 max-w-md mx-auto">
            Monte seu pedido agora e finalize pelo WhatsApp em poucos minutos.
          </p>
          <Link
            href="/catalogo"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-forest shadow-sm hover:bg-ivory transition-colors"
          >
            Explorar catálogo
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
