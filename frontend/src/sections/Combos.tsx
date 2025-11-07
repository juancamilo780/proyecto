type Combo = {
  id: string;
  title: string;
  includes: string[];
  priceFrom: number;
  image: string;
  href: string;
};

const combos: Combo[] = [
  {
    id: 'c1',
    title: 'Boda íntima (50 pax)',
    includes: ['Salón pequeño', 'DJ 4h', 'Catering básico', 'Iluminación ambiente'],
    priceFrom: 3500,
    image: 'https://images.unsplash.com/photo-1527416876370-fca783c0e721?q=80&w=1200&auto=format&fit=crop',
    href: '/combo/boda-intima',
  },
  {
    id: 'c2',
    title: 'Cumple infantil',
    includes: ['Espacio al aire libre', 'Animación', 'Refrigerio', 'Decor globos'],
    priceFrom: 980,
    image: 'https://images.unsplash.com/photo-1519150268069-c094cfc0b3c8?q=80&w=1200&auto=format&fit=crop',
    href: '/combo/cumple',
  },
  {
    id: 'c3',
    title: 'Evento corporativo',
    includes: ['Salón conferencias', 'Sonido pro', 'Coffee break', 'Pantalla + proyector'],
    priceFrom: 5200,
    image: 'https://images.unsplash.com/photo-1462556791646-c201b8241a94?q=80&w=1200&auto=format&fit=crop',
    href: '/combo/corporativo',
  },
];

export default function Combos() {
  return (
    <section className='container mx-auto px-6 py-10'>
      <h2 className='text-white text-2xl font-semibold mb-4'>Combos listos</h2>
      <div className='grid md:grid-cols-3 gap-4'>
        {combos.map((c) => (
          <a
            key={c.id}
            href={c.href}
            className='rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition'
          >
            <div className='h-40 w-full overflow-hidden'>
              <img src={c.image} alt={c.title} className='h-full w-full object-cover' />
            </div>
            <div className='p-4'>
              <div className='text-white font-semibold'>{c.title}</div>
              <ul className='mt-2 text-white/70 text-sm space-y-1'>
                {c.includes.map((i, idx) => (
                  <li key={idx}>• {i}</li>
                ))}
              </ul>
              <div className='mt-3 text-white/90'>Desde ${c.priceFrom.toLocaleString()}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
