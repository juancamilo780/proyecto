const logos = [
  'https://dummyimage.com/120x40/ffffff/aaaaaa&text=Acme',
  'https://dummyimage.com/120x40/ffffff/aaaaaa&text=Nova',
  'https://dummyimage.com/120x40/ffffff/aaaaaa&text=Super',
  'https://dummyimage.com/120x40/ffffff/aaaaaa&text=Orion',
  'https://dummyimage.com/120x40/ffffff/aaaaaa&text=Kroma',
];

const reviews = [
  { id: 'r1', text: '“Excelente experiencia, en 10 minutos elegimos todo.”', author: 'Camila G.' },
  { id: 'r2', text: '“Los proveedores muy cumplidos y atentos.”', author: 'Juan P.' },
  { id: 'r3', text: '“Cotización rápida y soporte increíble.”', author: 'Laura R.' },
];

export default function TrustStrip() {
  return (
    <section className='container mx-auto px-6 py-10'>
      <div className='rounded-2xl border border-white/10 bg-white/5 p-5'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <div className='text-white text-xl font-semibold'>+4.8 ★ Promedio de satisfacción</div>
            <div className='text-white/70 text-sm'>Basado en cientos de reseñas verificadas</div>
          </div>
          <div className='flex flex-wrap items-center gap-6 opacity-90'>
            {logos.map((src, i) => (
              <img key={i} src={src} alt='logo cliente' className='h-6 object-contain' />
            ))}
          </div>
        </div>

        <div className='mt-5 grid md:grid-cols-3 gap-3'>
          {reviews.map((r) => (
            <div key={r.id} className='rounded-xl bg-white/5 border border-white/10 p-4'>
              <div className='text-white/90'>{r.text}</div>
              <div className='mt-2 text-white/60 text-sm'>— {r.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
