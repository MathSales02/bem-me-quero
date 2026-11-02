'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/data/categories';
import BrandLogo from '@/components/common/BrandLogo';
import { getDirectWhatsAppUrl } from '@/lib/whatsapp';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bannerVisible, setBannerVisible] = useState(true);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, openCart } = useCart();

  // Scroll listener eficiente para animação e barra de progresso
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 20);

          // Cálculo da barra de progresso de leitura
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress(Math.min(100, Math.max(0, (currentY / totalHeight) * 100)));
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha menus ao trocar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Foco no input de busca ao abrir
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Bloqueio do scroll do body no menu mobile
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogo?busca=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Links essenciais com rótulos compactos para nunca quebrar linhas
  const navLinks = [
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/catalogo?categoria=eletronicos', label: 'Eletrônicos' },
    { href: '/catalogo?categoria=audio', label: 'Áudio' },
    { href: '/catalogo?categoria=celulares-e-acessorios', label: 'Celulares' },
    { href: '/sobre', label: 'Como Funciona' },
  ];

  return (
    <>
      {/* ── Navbar Principal Sticky ── */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border/80'
            : 'bg-ivory/95 backdrop-blur-sm border-b border-border-light'
        }`}
      >
        {/* Top Bar de Aviso que recolhe elegantemente com scroll */}
        {bannerVisible && (
          <aside
            aria-label="Aviso promocional"
            className={`bg-bronze-dark text-white text-xs font-medium tracking-wide transition-all duration-300 overflow-hidden ${
              scrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-12 opacity-100 py-1.5 px-4 border-b border-white/5'
            }`}
          >
            <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center justify-center gap-2 text-center text-white/90">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  <strong>Frete sob consulta para todo o Brasil</strong> • Atendimento humanizado no WhatsApp
                </span>
              </div>
              <button
                type="button"
                onClick={() => setBannerVisible(false)}
                className="text-white/60 hover:text-white transition-colors p-0.5 rounded"
                aria-label="Fechar aviso"
              >
                <X size={13} />
              </button>
            </div>
          </aside>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${
              scrolled ? 'h-14 sm:h-15' : 'h-16 sm:h-18'
            }`}
          >
            {/* Esquerda: Botão Mobile & Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-graphite hover:bg-black/5 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Logo oficial da marca com proporção equilibrada */}
              <BrandLogo showSlogan={!scrolled} />
            </div>

            {/* Centro: Links de Navegação (uma linha, sem quebra de texto) */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navegação principal">
              {navLinks.map((link) => {
                const isActive = pathname === link.href.split('?')[0];
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                      isActive
                        ? 'text-forest bg-forest/8 font-semibold'
                        : 'text-graphite-light hover:text-forest hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Direita: Ações (WhatsApp, Busca, Carrinho) com proporções harmônicas */}
            <div className="flex items-center gap-2">
              {/* WhatsApp Online Badge */}
              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-forest/20 bg-forest/5 text-xs font-semibold text-forest hover:bg-forest hover:text-white transition-colors"
                title="Atendimento no WhatsApp"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="whitespace-nowrap">Atendimento</span>
              </a>

              {/* Botão de Busca */}
              <button
                type="button"
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-graphite-light hover:text-graphite hover:bg-black/5 transition-colors ${
                  searchOpen ? 'bg-black/5 text-forest' : ''
                }`}
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'}
                title="Buscar produtos"
              >
                <Search size={18} />
              </button>

              {/* Botão do Carrinho */}
              <button
                type="button"
                onClick={openCart}
                className="relative flex items-center justify-center gap-2 h-9 px-3.5 rounded-lg bg-forest text-white hover:bg-forest-light transition-all active:scale-95 shadow-xs"
                aria-label={`Carrinho com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
              >
                <ShoppingBag size={17} />
                <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
                  Carrinho
                </span>
                {itemCount > 0 && (
                  <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-terracotta text-white text-[10px] font-bold px-1 animate-scale-in">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Barra de Progresso de Rolagem (discreta e perfeitamente nivelada no rodapé da navbar) */}
        <div className="w-full h-[2px] bg-transparent overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-bronze via-gold to-gold-light transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </div>

        {/* ── Painel de Busca Integrado ── */}
        {searchOpen && (
          <div className="border-t border-border-light bg-white/98 backdrop-blur-md animate-slide-up">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
              <form onSubmit={handleSearch} className="flex gap-2 max-w-3xl mx-auto">
                <div className="relative flex-1">
                  <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite-muted" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por fones, relógios, luminárias..."
                    className="w-full rounded-lg border border-border bg-ivory/50 py-2 pl-10 pr-10 text-sm text-graphite placeholder:text-graphite-muted focus:border-forest focus:bg-white focus:ring-1 focus:ring-forest/20 outline-none transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite-muted hover:text-graphite transition-colors"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white hover:bg-forest-light transition-colors shadow-xs whitespace-nowrap"
                >
                  Buscar
                </button>
              </form>

              {/* Sugestões rápidas de busca */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 text-xs text-graphite-muted">
                <span className="text-graphite-light font-medium">Populares:</span>
                {['Fone Bluetooth', 'Smartwatch', 'Ring Light', 'Carregador'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      router.push(`/catalogo?busca=${encodeURIComponent(tag)}`);
                      setSearchOpen(false);
                    }}
                    className="rounded-md bg-ivory px-2 py-0.5 text-graphite-light hover:bg-forest/10 hover:text-forest transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Drawer Menu Mobile (limpo e acessível) ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-ivory p-5 shadow-2xl flex flex-col justify-between animate-slide-in-right overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <BrandLogo variant="compact" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-graphite-light hover:bg-black/5 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links Principais */}
              <div className="mt-5 space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-graphite hover:bg-white transition-colors"
                >
                  Início
                  <ChevronRight size={15} className="text-graphite-muted" />
                </Link>

                <Link
                  href="/catalogo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-graphite hover:bg-white transition-colors"
                >
                  Catálogo
                  <ChevronRight size={15} className="text-graphite-muted" />
                </Link>

                <div className="pt-3 pb-1 px-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-graphite-muted">
                    Categorias
                  </span>
                </div>

                {categories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/catalogo?categoria=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-graphite-light hover:text-forest hover:bg-white transition-colors"
                  >
                    {cat.name}
                    <ChevronRight size={14} className="text-graphite-muted/60" />
                  </Link>
                ))}

                <Link
                  href="/sobre"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-graphite hover:bg-white transition-colors"
                >
                  Como Funciona
                  <ChevronRight size={15} className="text-graphite-muted" />
                </Link>
              </div>
            </div>

            {/* Ações inferiores no mobile */}
            <div className="pt-4 border-t border-border space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white shadow-xs"
              >
                <ShoppingBag size={17} />
                Ver Carrinho ({itemCount})
              </button>

              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-graphite hover:bg-ivory transition-colors"
              >
                <MessageCircle size={16} className="text-emerald-600" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
