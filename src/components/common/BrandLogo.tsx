import Image from 'next/image';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'hero' | 'compact';
  className?: string;
  showSlogan?: boolean;
}

export default function BrandLogo({
  variant = 'header',
  className = '',
  showSlogan = false,
}: BrandLogoProps) {
  if (variant === 'compact') {
    return (
      <Link href="/" className={`flex items-center gap-2.5 group select-none ${className}`}>
        <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-gold/30 bg-[#F4EFEA] shadow-xs transition-transform duration-200 group-hover:scale-105 p-0.5">
          <Image
            src="/brand/logo-oficial.jpg"
            alt="Bem Me Quero"
            fill
            sizes="36px"
            className="object-contain"
            priority
          />
        </div>
        <span className="font-display font-bold tracking-tight text-bronze text-base">
          Bem Me Quero
        </span>
      </Link>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <Link href="/" className="flex items-center gap-3 group select-none">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gold/40 bg-[#F4EFEA] shadow-xs p-1">
            <Image
              src="/brand/logo-oficial.jpg"
              alt="Bem Me Quero"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-display font-bold tracking-tight text-white text-xl">
              BEM ME QUERO
            </span>
            <p className="text-[10px] uppercase tracking-widest text-gold-light font-medium">
              O que você precisa, a gente traz
            </p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <Link href="/" className={`flex items-center gap-2.5 group select-none focus:outline-none ${className}`}>
      {/* Insígnia com monograma oficial BM ✦ */}
      <div className="relative h-9 w-9 sm:h-9.5 sm:w-9.5 flex-shrink-0 overflow-hidden rounded-xl border border-gold/40 bg-[#F4EFEA] shadow-xs transition-transform duration-200 group-hover:scale-105 p-0.5">
        <Image
          src="/brand/logo-oficial.jpg"
          alt="Bem Me Quero"
          fill
          sizes="40px"
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-display text-base sm:text-lg font-bold tracking-tight text-bronze group-hover:text-gold transition-colors leading-none">
          BEM ME QUERO
        </span>
        {showSlogan ? (
          <span className="text-[9px] uppercase font-semibold tracking-wider text-gold-light group-hover:text-bronze transition-colors hidden sm:block mt-0.5">
            O que você precisa, a gente traz
          </span>
        ) : null}
      </div>
    </Link>
  );
}
