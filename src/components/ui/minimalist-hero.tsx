'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon, ShoppingBag, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
export interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
  badgeText?: string;
  readMoreText?: string;
  circleColorClass?: string;
  cartItemCount?: number;
  onOpenCart?: () => void;
  whatsappUrl?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-xs sm:text-sm font-semibold tracking-widest text-graphite/70 transition-colors hover:text-forest"
  >
    {children}
  </Link>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-graphite/60 transition-all hover:text-forest p-2 rounded-full hover:bg-forest/5"
  >
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
  badgeText,
  readMoreText = 'Explorar Catálogo',
  circleColorClass = 'bg-gradient-to-tr from-[#9E7A5A] via-[#BFA082] to-[#D8C5B2]',
  cartItemCount = 0,
  onOpenCart,
  whatsappUrl,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[92vh] w-full flex-col items-center justify-between overflow-hidden bg-[#FAF7F4] p-5 font-sans sm:p-8 md:p-12 border-b border-border/60',
        className
      )}
    >
      {/* Background ambient light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-35 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(191, 160, 130, 0.35) 0%, rgba(158, 122, 90, 0.12) 50%, transparent 80%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(235, 228, 220, 0.8) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Header Unificado no Estilo da Hero */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between gap-4 border-b border-graphite/5 pb-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-wider font-display text-forest hover:opacity-90 transition-opacity">
            {logoText}
          </Link>
        </motion.div>

        {/* Links de Navegação */}
        <div className="hidden items-center space-x-7 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Ações da Direita: Atendimento & Carrinho */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 sm:gap-3"
        >
          {badgeText && (
            <span className="hidden xl:inline-flex items-center rounded-full bg-forest/5 border border-forest/10 px-3 py-1 text-[11px] font-semibold text-forest uppercase tracking-wider">
              {badgeText}
            </span>
          )}

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-white/80 px-3 py-1.5 text-xs font-semibold text-forest hover:bg-forest hover:text-white transition-all shadow-2xs"
              title="Atendimento no WhatsApp"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>WhatsApp</span>
            </a>
          )}

          {/* Botão de Carrinho no Estilo da Hero */}
          {onOpenCart && (
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 rounded-xl bg-forest px-3.5 sm:px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-forest-light transition-all active:scale-95"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden xs:inline sm:inline">Carrinho</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#9E7A5A] px-1.5 text-[10px] font-bold text-white shadow-2xs">
                {cartItemCount}
              </span>
            </button>
          )}
        </motion.div>
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-6 py-6 md:grid-cols-3 md:gap-4 my-auto">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#9E7A5A] uppercase mb-2">
            Curadoria Exclusiva
          </span>
          <p className="mx-auto max-w-xs text-sm sm:text-base leading-relaxed text-graphite/80 md:mx-0 font-body">
            {mainText}
          </p>
          <Link
            href={readMoreLink}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest underline underline-offset-4 decoration-2 hover:text-[#9E7A5A] transition-colors"
          >
            {readMoreText}
          </Link>
        </motion.div>

        {/* Center Image with Circle (Produto Maior que o Círculo) */}
        <div className="relative order-1 flex h-full items-center justify-center md:order-2 min-h-[340px] sm:min-h-[420px] lg:min-h-[500px]">
          {/* Círculo nas Cores Oficiais da Bem Me Quero (Bronze / Ouro) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className={cn(
              'absolute z-0 rounded-full shadow-[0_25px_60px_rgba(158,122,90,0.32)] ring-8 ring-white/60',
              'h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[410px] lg:w-[410px]',
              circleColorClass
            )}
          />

          {/* Produto com Escala e Destaque Extrapolando o Círculo */}
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-[340px] sm:w-[440px] md:w-[520px] lg:w-[620px] max-w-none object-contain drop-shadow-[0_30px_50px_rgba(30,20,10,0.22)] scale-[1.25] sm:scale-[1.35] md:scale-[1.45] lg:scale-[1.55]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="z-20 order-3 flex flex-col items-center justify-center text-center md:items-start md:text-left"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-graphite leading-[0.95]">
            {overlayText.part1}
            <br />
            <span className="text-[#9E7A5A]">{overlayText.part2}</span>
          </h1>
          <span className="mt-3 text-xs uppercase tracking-[0.25em] text-graphite-light font-semibold">
            Tecnologia K-Beauty
          </span>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between border-t border-border/40 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-xs sm:text-sm font-medium text-graphite/70 text-right"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
