'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';
import { getDirectWhatsAppUrl } from '@/lib/whatsapp';

export default function HeroBeauty() {
  const whatsappUrl = getDirectWhatsAppUrl('Olá! Gostaria de conhecer os produtos de beleza e autocuidado da Bem Me Quero.');

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-border/60">
      {/* ── Iluminação difusa e reflexos estéticos de fundo ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Glow suave e quente no centro */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(246, 244, 237, 0.7) 45%, rgba(240, 237, 226, 0.25) 70%, transparent 100%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Reflexo luminoso suave inspirado na textura da fórmula */}
        <div
          className="absolute -right-20 top-1/4 w-[450px] sm:w-[650px] h-[350px] sm:h-[500px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(230, 245, 100, 0.28) 0%, rgba(215, 235, 80, 0.1) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Linha divisória de luz quase imperceptível */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ── Conteúdo do Hero ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Lado Esquerdo: Mensagem Institucional da Loja */}
          <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-6 text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/5 border border-forest/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest">
                <Sparkles size={13} className="text-[#A2BA16]" />
                Beleza & Autocuidado sob demanda
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-graphite leading-[1.12]">
              O que você precisa?!{' '}
              <span className="text-forest">A gente traz.</span>
            </h1>

            {/* Parágrafo de Apresentação */}
            <p className="mt-6 text-base sm:text-lg text-graphite-light leading-relaxed max-w-xl">
              Produtos da melhor qualidade e com preço justo. Curadoria exclusiva com atendimento direto pelo WhatsApp e envio para todo o Brasil.
            </p>

            {/* Botões de Ação */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-7 py-4 text-sm font-semibold text-white shadow-sm hover:bg-forest-light transition-all duration-200 hover:shadow-md active:scale-95"
              >
                Explorar catálogo
                <ArrowRight size={17} />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-4 text-sm font-semibold text-graphite hover:bg-ivory hover:border-graphite/20 transition-all duration-200 shadow-2xs"
              >
                <MessageCircle size={18} className="text-emerald-600" />
                Falar no WhatsApp
              </a>
            </div>

            {/* Selos de Benefício */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/60">
              <div className="flex items-center gap-2 text-xs text-graphite-light">
                <ShieldCheck size={16} className="text-forest shrink-0" />
                <span>Produtos 100% autênticos</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-graphite-light">
                <HeartHandshake size={16} className="text-forest shrink-0" />
                <span>Atendimento atencioso</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-graphite-light">
                <Truck size={16} className="text-forest shrink-0" />
                <span>Envio para todo o Brasil</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Imagem Hero Estética do Produto com a Textura Fluida */}
          <div className="relative flex items-center justify-center lg:col-span-6 xl:col-span-6">
            <div className="relative w-full max-w-[580px] aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] flex items-center justify-center">
              
              {/* Brilho halo suave atrás da imagem */}
              <div
                className="absolute w-3/4 h-3/4 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(230, 245, 95, 0.35) 0%, rgba(215, 235, 75, 0.12) 50%, transparent 75%)',
                  filter: 'blur(45px)',
                }}
              />

              {/* Sombra de apoio no piso */}
              <div
                className="absolute bottom-2 sm:bottom-4 w-2/3 h-6 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(40, 35, 25, 0.18) 0%, rgba(50, 45, 35, 0.05) 55%, transparent 75%)',
                  filter: 'blur(8px)',
                }}
              />

              {/* Imagem do Produto de Alta Resolução com Textura Fluida */}
              <div className="relative z-10 w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)] transition-transform duration-700 hover:scale-[1.02]">
                <Image
                  src="/products/celimax-retinal-shot.png"
                  alt="Beleza & Autocuidado — Bem Me Quero"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
