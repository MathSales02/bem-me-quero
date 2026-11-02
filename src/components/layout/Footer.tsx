'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { categories } from '@/data/categories';
import BrandLogo from '@/components/common/BrandLogo';
import { getDirectWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-bronze-dark text-white/80 mt-auto border-t border-gold/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo variant="footer" />
            <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-sm">
              Sua curadoria exclusiva de beleza, skincare e autocuidado sob demanda. Os melhores produtos trazidos direto até você.
            </p>
            <a
              href={getDirectWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gold/20 border border-gold/30 px-4 py-2.5 text-sm font-medium text-gold-light hover:bg-gold hover:text-white transition-all shadow-xs"
            >
              <MessageCircle size={18} />
              Fale com nosso vendedor
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-sm text-white/60 hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/carrinho" className="text-sm text-white/60 hover:text-white transition-colors">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-white/60 hover:text-white transition-colors">
                  Como funciona
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Categorias
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/catalogo?categoria=${cat.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Informações
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacidade" className="text-sm text-white/60 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-white/60 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <p className="text-center text-xs text-white/40">
            © {currentYear} Bem Me Quero. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
