
// src/sections/RelatedItems.tsx
import { useEffect, useState } from 'react';
import ItemCard from '@/components/ItemCard';

type Item = {
  id: string;
  categoryId: string;
  title: string;
  city: string;
  rating: number;
  priceFrom: number;
  images: string[];
};

export default function RelatedItems({ categoryId, currentId }: { categoryId?: string; currentId?: string }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch('/api/items?category=' + categoryId);
        if (!res.ok) throw new Error('fallback');
        const data: Item[] = await res.json();
        if (alive) setItems(data.filter((x) => x.id !== currentId).slice(0, 4));
      } catch {
        const { items } = await import('@/mocks/data');
        const data: Item[] = (items as Item[]).filter((x) => x.categoryId === categoryId && x.id !== currentId).slice(0,4);
        if (alive) setItems(data);
      }
    }
    if (categoryId) load();
    return () => {
      alive = false;
    };
  }, [categoryId, currentId]);

  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold text-white mb-3">Servicios relacionados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          // @ts-ignore
          <ItemCard key={it.id} id={it.id} title={it.title} priceFrom={it.priceFrom} city={it.city} image={it.images?.[0]} />
        ))}
      </div>
    </section>
  );
}
