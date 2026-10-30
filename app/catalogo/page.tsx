'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown, Package } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getPublishedProducts, searchProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { CatalogFilters, SortOption, CategorySlug } from '@/types/product';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'newest', label: 'Mais recentes' },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Read filters from URL params
  const initialCategory = (searchParams.get('categoria') as CategorySlug) || 'all';
  const initialSearch = searchParams.get('busca') || '';
  const initialSort = (searchParams.get('ordem') as SortOption) || 'relevance';
  const initialAvailableOnly = searchParams.get('disponivel') === '1';

  const [filters, setFilters] = useState<CatalogFilters>({
    search: initialSearch,
    category: initialCategory,
    sort: initialSort,
    availableOnly: initialAvailableOnly,
  });

  const [searchInput, setSearchInput] = useState(initialSearch);

  // Sync URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('busca', filters.search);
    if (filters.category !== 'all') params.set('categoria', filters.category);
    if (filters.sort !== 'relevance') params.set('ordem', filters.sort);
    if (filters.availableOnly) params.set('disponivel', '1');

    const queryString = params.toString();
    const newUrl = queryString ? `/catalogo?${queryString}` : '/catalogo';
    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let results = filters.search
      ? searchProducts(filters.search)
      : getPublishedProducts();

    if (filters.category !== 'all') {
      results = results.filter((p) => p.category === filters.category);
    }

    if (filters.availableOnly) {
      results = results.filter((p) => p.available);
    }

    switch (filters.sort) {
      case 'price-asc':
        results = [...results].sort((a, b) => a.priceInCents - b.priceInCents);
        break;
      case 'price-desc':
        results = [...results].sort((a, b) => b.priceInCents - a.priceInCents);
        break;
      case 'newest':
        results = [...results].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return results;
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput.trim() }));
  };

  const clearSearch = () => {
    setSearchInput('');
    setFilters((prev) => ({ ...prev, search: '' }));
  };

  const activeCategory = filters.category !== 'all'
    ? categories.find((c) => c.slug === filters.category)
    : null;

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.availableOnly ? 1 : 0) +
    (filters.sort !== 'relevance' ? 1 : 0);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
      <div className="bg-ivory-warm border-b border-border-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <h1 className="font-display text-3xl font-bold text-graphite sm:text-4xl">
            {activeCategory ? activeCategory.name : 'Catálogo'}
          </h1>
          {activeCategory && (
            <p className="mt-2 text-graphite-light">{activeCategory.description}</p>
          )}
          {!activeCategory && (
            <p className="mt-2 text-graphite-light">
              Encontre o produto ideal para você.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and filter bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-muted" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-10 text-sm text-graphite placeholder:text-graphite-muted focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-colors"
                aria-label="Buscar produtos"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite-muted hover:text-graphite transition-colors"
                  aria-label="Limpar busca"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sort: e.target.value as SortOption }))
                }
                className="appearance-none rounded-lg border border-border bg-white py-2.5 pl-3 pr-9 text-sm text-graphite focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none cursor-pointer transition-colors"
                aria-label="Ordenar por"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite-muted pointer-events-none" />
            </div>

            {/* Filter toggle (mobile) */}
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-graphite hover:bg-ivory-warm transition-colors lg:hidden"
              aria-label="Filtros"
            >
              <SlidersHorizontal size={16} />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-forest text-white text-[10px] font-bold px-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-graphite-muted mb-3">
                  Categorias
                </h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filters.category === 'all'
                          ? 'bg-forest/5 text-forest font-medium'
                          : 'text-graphite-light hover:text-graphite hover:bg-ivory-warm'
                      }`}
                    >
                      Todas as categorias
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        type="button"
                        onClick={() => setFilters((prev) => ({ ...prev, category: cat.slug }))}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          filters.category === cat.slug
                            ? 'bg-forest/5 text-forest font-medium'
                            : 'text-graphite-light hover:text-graphite hover:bg-ivory-warm'
                        }`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-graphite-muted mb-3">
                  Disponibilidade
                </h3>
                <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm text-graphite-light hover:bg-ivory-warm transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.availableOnly}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, availableOnly: e.target.checked }))
                    }
                    className="rounded border-border text-forest focus:ring-forest/20 h-4 w-4 accent-forest"
                  />
                  Somente disponíveis
                </label>
              </div>

              {/* Clear filters */}
              {(filters.category !== 'all' || filters.availableOnly || filters.search) && (
                <button
                  type="button"
                  onClick={() => {
                    setFilters({ search: '', category: 'all', sort: 'relevance', availableOnly: false });
                    setSearchInput('');
                  }}
                  className="text-sm text-terracotta hover:text-terracotta-light transition-colors font-medium"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </aside>

          {/* Mobile filters panel */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-graphite/30 backdrop-blur-sm"
                onClick={() => setFiltersOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-ivory p-6 shadow-2xl animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg font-bold text-graphite">Filtros</h3>
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-graphite-light hover:text-graphite hover:bg-ivory-warm transition-colors"
                    aria-label="Fechar filtros"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-graphite-muted mb-3">
                    Categorias
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                      className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                        filters.category === 'all'
                          ? 'bg-forest text-white'
                          : 'bg-white text-graphite-light border border-border hover:border-forest'
                      }`}
                    >
                      Todas
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => setFilters((prev) => ({ ...prev, category: cat.slug }))}
                        className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                          filters.category === cat.slug
                            ? 'bg-forest text-white'
                            : 'bg-white text-graphite-light border border-border hover:border-forest'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <label className="flex items-center gap-2.5 text-sm text-graphite cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.availableOnly}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, availableOnly: e.target.checked }))
                      }
                      className="rounded border-border text-forest focus:ring-forest/20 h-4 w-4 accent-forest"
                    />
                    Somente disponíveis
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFilters({ search: '', category: 'all', sort: 'relevance', availableOnly: false });
                      setSearchInput('');
                      setFiltersOpen(false);
                    }}
                    className="flex-1 rounded-lg border border-border bg-white py-3 text-sm font-medium text-graphite hover:bg-ivory-warm transition-colors"
                  >
                    Limpar tudo
                  </button>
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="flex-1 rounded-lg bg-forest py-3 text-sm font-semibold text-white hover:bg-forest-light transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products grid */}
          <div className="flex-1">
            {/* Active filters */}
            {(filters.search || filters.category !== 'all') && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {filters.search && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1.5 text-sm text-graphite">
                    Busca: &ldquo;{filters.search}&rdquo;
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-graphite-muted hover:text-graphite transition-colors"
                      aria-label="Remover filtro de busca"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {activeCategory && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1.5 text-sm text-graphite">
                    {activeCategory.name}
                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                      className="text-graphite-muted hover:text-graphite transition-colors"
                      aria-label="Remover filtro de categoria"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Results count */}
            <p className="text-sm text-graphite-muted mb-6">
              {filteredProducts.length === 0
                ? 'Nenhum produto encontrado'
                : `${filteredProducts.length} produto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`}
            </p>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Package size={48} className="text-border mb-4" />
                <p className="text-graphite-light font-medium mb-1">
                  Nenhum produto encontrado
                </p>
                <p className="text-sm text-graphite-muted mb-6 max-w-sm">
                  Tente ajustar os filtros ou buscar por outro termo.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilters({ search: '', category: 'all', sort: 'relevance', availableOnly: false });
                    setSearchInput('');
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-forest px-5 py-2.5 text-sm font-medium text-white hover:bg-forest-light transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-forest border-t-transparent" />
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
