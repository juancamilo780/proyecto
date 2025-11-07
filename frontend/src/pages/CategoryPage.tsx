
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import BackgroundShell from '@/components/BackgroundShell';
import CategoryChips from '@/sections/CategoryChips';
import ItemCard from '@/components/ItemCard';
import { CATEGORIES } from '@/data/categories';

type Item = {
  id: string;
  categoryId: string;
  title: string;
  vendorName: string;
  city: string;
  rating: number;
  priceFrom: number;
  images: string[];
  short: string;
  features: string[];
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = useMemo(() => CATEGORIES.find((c) => c.slug === slug), [slug]);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [sp, setSp] = useSearchParams();
  const [city, setCity] = useState(sp.get('city') || '');
  const [min, setMin] = useState(sp.get('min') || '');
  const [max, setMax] = useState(sp.get('max') || '');

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (slug) params.set('category', slug);
        if (city) params.set('city', city);
        if (min) params.set('min', String(min));
        if (max) params.set('max', String(max));

        const res = await fetch('/api/items?' + params.toString());
        if (!res.ok) throw new Error('fallback');
        const data: Item[] = await res.json();
        if (alive) setItems(data);
      } catch {
        // Fallback a data local mock
        const mod = await import('@/mocks/data');
        const all: Item[] = (mod as any).items ?? [];
        let data = all.filter((i) => i.categoryId === (category?.id ?? ''));
        if (city) data = data.filter((i) => i.city.toLowerCase().includes(city.toLowerCase()));
        if (min) data = data.filter((i) => i.priceFrom >= Number(min));
        if (max) data = data.filter((i) => i.priceFrom <= Number(max));
        if (alive) setItems(data);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [slug, city, min, max, category?.id]);

  // Sincroniza querystring cuando se aplican filtros
  function applyFilters() {
    const params: Record<string, string> = {};
    if (city) params.city = city;
    if (min) params.min = String(min);
    if (max) params.max = String(max);
    setSp(params, { replace: true });
  }

  return (
    <BackgroundShell mode="full">
      <main>
        {/* Encabezado tipo "hero" más similar al Home */}
        <section className="container mx-auto px-6 pt-8">
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            {category?.name ?? 'Categoría'}
          </motion.h1>
          <p className="text-white/70 mt-2">Explora proveedores y servicios.</p>

          {/* Chips de categorías (scroll horizontal) */}
          <div className="mt-4">
            <CategoryChips />
          </div>

          {/* Barra de filtros ligera (glass) */}
          <div className="mt-6 glass-light rounded-2xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ciudad (ej. Medellín)"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <input
                type="number"
                min={0}
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="Precio mínimo"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <input
                type="number"
                min={0}
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="Precio máximo"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <div className="flex gap-2">
                <button
                  onClick={applyFilters}
                  className="glass-strong rounded-xl px-4 py-2 w-full md:w-auto"
                >
                  Aplicar
                </button>
                <button
                  onClick={() => {
                    setCity('');
                    setMin('');
                    setMax('');
                    setSp({}, { replace: true });
                  }}
                  className="glass rounded-xl px-4 py-2 w-full md:w-auto"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Grilla de resultados */}
        <section className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="glass rounded-2xl h-56 animate-pulse" />
                ))
              : items.map((it) => (
                  <ItemCard
                    key={it.id}
                    id={it.id}
                    title={it.title}
                    priceFrom={it.priceFrom}
                    city={it.city}
                    image={it.images?.[0]}
                  />
                ))}
          </div>
        </section>
      </main>
    </BackgroundShell>
  );
}
