import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: '¿Cómo reservo un servicio?',
    a: 'Explora, agrega a cotización y te contactamos para confirmar disponibilidad y detalles.',
  },
  {
    q: '¿Tiene costo usar la plataforma?',
    a: 'No, cotizar es gratis. El pago se realiza directamente con el proveedor cuando confirmas.',
  },
  {
    q: '¿Qué pasa si un proveedor cancela?',
    a: 'Contamos con plan de respaldo: te proponemos alternativas equivalentes sin costo adicional.',
  },
];

const bands = [
  { cat: 'Espacios', slug: 'espacios', low: '$', mid: '$$', high: '$$$' },
  { cat: 'Catering', slug: 'catering', low: '$', mid: '$$', high: '$$$' },
  { cat: 'Música', slug: 'musica', low: '$', mid: '$$', high: '$$$' },
  { cat: 'Luces', slug: 'luces', low: '$', mid: '$$', high: '$$$' },
];

export default function FAQAndPriceBands() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className='container mx-auto px-6 py-10'>
      <div className='grid lg:grid-cols-2 gap-8'>
        {/* FAQ */}
        <div>
          <h2 className='text-white text-2xl font-semibold mb-4'>Preguntas frecuentes</h2>
          <div className='space-y-3'>
            {faqs.map((f, i) => (
              <div key={i} className='rounded-2xl border border-white/10 bg-white/5'>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className='w-full text-left px-4 py-3 text-white flex items-center justify-between'
                >
                  <span>{f.q}</span>
                  <span className='text-white/60'>{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <div className='px-4 pb-4 text-white/80'>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Rangos */}
        <div>
          <h2 className='text-white text-2xl font-semibold mb-4'>Rangos de precios</h2>
          <div className='grid sm:grid-cols-2 gap-3'>
            {bands.map((b) => (
              <Link
                key={b.slug}
                to={`/c/${b.slug}`}
                className='rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition'
              >
                <div className='text-white font-semibold'>{b.cat}</div>
                <div className='mt-2 flex gap-2 text-sm'>
                  <span className='rounded-lg bg-white/10 px-2 py-1 text-white/80'>{b.low} Económico</span>
                  <span className='rounded-lg bg-white/10 px-2 py-1 text-white/80'>{b.mid} Medio</span>
                  <span className='rounded-lg bg-white/10 px-2 py-1 text-white/80'>{b.high} Premium</span>
                </div>
                <div className='mt-2 text-white/60 text-xs'>Explora proveedores y filtra por presupuesto</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
