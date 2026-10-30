import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="font-display text-8xl font-bold text-forest/10 mb-4">404</span>
      <h1 className="font-display text-2xl font-bold text-graphite sm:text-3xl mb-3">
        Página não encontrada
      </h1>
      <p className="text-graphite-light mb-8 max-w-md">
        A página que você procura não existe ou foi movida. Explore nosso catálogo
        para encontrar o que precisa.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-forest px-6 py-3 text-sm font-semibold text-white hover:bg-forest-light transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar ao início
        </Link>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 text-sm font-semibold text-graphite hover:bg-ivory-warm transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    </div>
  );
}
