import BackgroundShell from '@/components/BackgroundShell';
import { CATEGORIES } from '@/data/categories';
import AvailabilityBox from '@/sections/AvailabilityBox';
import RelatedItems from '@/sections/RelatedItems';
import Reviews from '@/sections/Reviews';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);

  const category = useMemo(() => (item ? CATEGORIES.find((c) => c.id === item.categoryId) || null : null), [item]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch('/api/items/' + id);
        if (!r.ok) throw new Error('fallback');
        const data: Item = await r.json();
        if (alive) setItem(data);
      } catch {
        const { items } = await import('@/mocks/data');
        if (alive) setItem((items as Item[]).find((x) => x.id === id) || null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (!item) {
    return (
      <BackgroundShell>
        <main className='container mx-auto px-6 py-12 text-white/70'>Cargando…</main>
      </BackgroundShell>
    );
  }

  return (
    <BackgroundShell>
      <main className='container mx-auto px-6 py-8 text-white'>
        {/* Breadcrumb */}
        <nav className='text-sm text-white/60 mb-4'>
          <Link to='/' className='hover:text-white/90'>
            Inicio
          </Link>
          <span className='mx-2'>/</span>
          {category ? (
            <Link to={`/c/${category.slug}`} className='hover:text-white/90'>
              {category.name}
            </Link>
          ) : (
            'Categoría'
          )}
          <span className='mx-2'>/</span>
          <span className='text-white/90'>{item.title}</span>
        </nav>

        {/* Top layout */}
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Media */}
          <section className='lg:col-span-2'>
            <img
              src={item.images?.[0]}
              alt={item.title}
              className='w-full h-80 md:h-[22rem] object-cover rounded-2xl glass'
            />
          </section>

          {/* Info + CTA */}
          <aside className='lg:col-span-1'>
            <h1 className='text-3xl md:text-4xl font-semibold'>{item.title}</h1>
            <div className='mt-1 text-white/70'>
              {item.city} • ★ {item.rating}
            </div>
            <p className='mt-3 text-white/80'>{item.short}</p>

            {item.features?.length > 0 && (
              <ul className='mt-4 grid grid-cols-2 gap-2'>
                {item.features.map((f, i) => (
                  <li key={i} className='glass-light rounded-lg px-3 py-2'>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className='mt-6'>
              <AvailabilityBox
                mode='compact'
                idKey='itemId' // 👈 cámbialo a "id" si tu store espera 'id'
                itemId={item.id}
                title={item.title}
                city={item.city}
                basePrice={item.priceFrom}
              />
            </div>
          </aside>
        </div>

        {/* Reseñas y Relacionados */}
        <Reviews />
        <RelatedItems categoryId={item.categoryId} currentId={item.id} />
      </main>
    </BackgroundShell>
  );
}
