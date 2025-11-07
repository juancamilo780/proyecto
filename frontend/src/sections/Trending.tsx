import { Link } from 'react-router-dom';

type TrendingItem = {
  id: string;
  title: string;
  city: string;
  priceFrom: number;
  image: string;
  href: string; // ruta al item
};

const mock: TrendingItem[] = [
  {
    id: 't1',
    title: 'DJ Premium',
    city: 'Medellín',
    priceFrom: 520,
    image: 'https://images.unsplash.com/photo-1563841930606-67e2a439b0bc?q=80&w=1200&auto=format&fit=crop',
    href: '/i/musica-01',
  },
  {
    id: 't2',
    title: 'Salón Vista',
    city: 'Bogotá',
    priceFrom: 890,
    image: 'https://images.unsplash.com/photo-1531884070720-875c7622d4c4?q=80&w=1200&auto=format&fit=crop',
    href: '/i/espacios-03',
  },
  {
    id: 't3',
    title: 'Catering Fusión',
    city: 'Cali',
    priceFrom: 19,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
    href: '/i/catering-04',
  },
  {
    id: 't4',
    title: 'Iluminación LED',
    city: 'Barranquilla',
    priceFrom: 140,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    href: '/i/luces-02',
  },
  {
    id: 't5',
    title: 'Saxofonista live',
    city: 'Cartagena',
    priceFrom: 360,
    image: 'https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?q=80&w=1200&auto=format&fit=crop',
    href: '/i/musica-03',
  },
];

export default function Trending() {
  return (
    <section className='container mx-auto px-6 py-10'>
      <div className='mb-4 flex items-end justify-between'>
        <h2 className='text-white text-2xl font-semibold'>Tendencias esta semana</h2>
        <Link to='/c/todos' className='text-white/70 hover:text-white'>
          Ver todo →
        </Link>
      </div>

      <div className='relative'>
        <div className='flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {mock.map((it) => (
            <Link
              key={it.id}
              to={it.href}
              className='min-w-[280px] snap-start rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition'
            >
              <div className='h-40 w-full overflow-hidden'>
                <img src={it.image} alt={it.title} className='h-full w-full object-cover' />
              </div>
              <div className='p-3'>
                <div className='text-white font-medium'>{it.title}</div>
                <div className='text-white/60 text-sm'>{it.city}</div>
                <div className='mt-1 text-white/90 text-sm'>Desde ${it.priceFrom.toLocaleString()}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
