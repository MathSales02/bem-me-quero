'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Droplets, Palette, Flower2, Package, MessageCircle, CheckCircle, Search, Zap } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts, getNewProducts } from '@/data/products';
import { categories } from '@/data/categories';

const iconMap: Record<string, React.ElementType> = {
  Sparkles, Heart, Droplets, Palette, Flower2, Package,
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ivory-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[520px] items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
            {/* Text */}
            <div className="relative z-10 max-w-xl animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/30 px-3.5 py-1 text-xs font-semibold text-bronze mb-6 tracking-wide uppercase">
                <Sparkles size={13} className="text-gold" />
                Beleza & Autocuidado sob demanda
              </span>
              <h1 className="font-display text-4xl font-bold leading-[1.15] text-graphite sm:text-5xl lg:text-6xl tracking-tight">
                O melhor da beleza.{' '}
                <span className="text-bronze">A gente traz</span>{' '}
                <span className="text-gold">até você.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite-light max-w-md">
                Cosméticos, skincare e cuidados pessoais selecionados com carinho pela Bem Me Quero. Atendimento humanizado e pedidos direto no WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 rounded-xl bg-bronze px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-bronze-light transition-all duration-200 hover:shadow-md"
                >
                  Explorar catálogo
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-graphite hover:bg-ivory-warm transition-colors"
                >
                  Como funciona
                </Link>
              </div>
            </div>

            {/* Image composition */}
            <div className="relative hidden lg:block animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg">
                    <Image
                      src="/products/serum-facial.jpg"
                      alt="Sérum Facial Vitamina C"
                      fill
                      sizes="(max-width: 1024px) 0vw, 25vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
                    <Image
                      src="/products/oleo-capilar.jpg"
                      alt="Óleo Capilar Nutritivo"
                      fill
                      sizes="(max-width: 1024px) 0vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
                    <Image
                      src="/products/hidratante-corporal.jpg"
                      alt="Hidratante Corporal Karité"
                      fill
                      sizes="(max-width: 1024px) 0vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg">
                    <Image
                      src="/products/batom-matte.jpg"
                      alt="Batom Líquido Matte"
                      fill
                      sizes="(max-width: 1024px) 0vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile image */}
            <div className="lg:hidden relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white shadow-lg animate-fade-in">
              <Image
                src="/products/hero-beleza.jpg"
                alt="Produtos de Beleza Bem Me Quero"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

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
