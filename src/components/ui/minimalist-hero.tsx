'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
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
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/70 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/60 transition-colors hover:text-foreground p-2 rounded-full hover:bg-forest/5"
  >
    <Icon className="h-5 w-5" />
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
  circleColorClass = 'bg-[#E5F363]/85',
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[90vh] lg:h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#FAF9F5] p-6 font-sans sm:p-8 md:p-12 border-b border-border/60',
        className
      )}
    >
      {/* Background ambient light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(230, 245, 100, 0.4) 0%, rgba(215, 235, 80, 0.1) 50%, transparent 80%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl font-bold tracking-wider font-display text-forest"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          {badgeText && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-forest/10 px-3.5 py-1 text-xs font-semibold text-forest uppercase tracking-wider">
              {badgeText}
            </span>
          )}
        </motion.div>
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-8 py-8 md:grid-cols-3 md:gap-4">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#869E10] uppercase mb-2">
            Curadoria Exclusiva
          </span>
          <p className="mx-auto max-w-xs text-sm sm:text-base leading-relaxed text-graphite/80 md:mx-0 font-body">
            {mainText}
          </p>
          <a
            href={readMoreLink}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest underline underline-offset-4 decoration-2 hover:text-forest-light transition-colors"
          >
            {readMoreText}
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 flex h-full items-center justify-center md:order-2 min-h-[300px] sm:min-h-[420px]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className={cn(
              'absolute z-0 h-[260px] w-[260px] rounded-full md:h-[380px] md:w-[380px] lg:h-[480px] lg:w-[480px] shadow-[0_20px_50px_rgba(215,235,70,0.3)]',
              circleColorClass
            )}
          />
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-64 max-w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)] md:w-80 lg:w-[360px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 flex flex-col items-center justify-center text-center md:items-start md:text-left"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-graphite leading-[0.95]">
            {overlayText.part1}
            <br />
            <span className="text-forest">{overlayText.part2}</span>
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
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex items-center space-x-3"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-xs sm:text-sm font-medium text-graphite/70"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
