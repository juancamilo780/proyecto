import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  { t: 'Explora', d: 'Encuentra servicios verificados.', img: '/img/step1.jpg' },
  { t: 'Elige', d: 'Compara precios y calificaciones.', img: '/img/step2.jpg' },
  { t: 'Cotiza', d: 'Arma tu cotización en minutos.', img: '/img/step3.jpg' },
];

export default function HowItWorks() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 24]); // 👈 parallax más corto

  return (
    <section className='container mx-auto px-6 py-24 grid md:grid-cols-[0.9fr,1.1fr] gap-10'>
      <div className='sticky top-24 self-start'>
        <h2 className='text-white text-3xl md:text-4xl font-semibold'>Cómo funciona</h2>
        <p className='text-white/70 mt-2'>Simple, rápido y bonito.</p>
      </div>

      <div className='space-y-8'>
        {STEPS.map((s, i) => (
          <motion.article
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className='glass rounded-2xl p-6 overflow-hidden'
          >
            <div className='grid grid-cols-[1fr,auto] items-center gap-6'>
              <div className='min-w-0'>
                <h3 className='text-white text-xl font-medium'>{s.t}</h3>
                <p className='text-white/70'>{s.d}</p>
              </div>

              {/* SIEMPRE contenido dentro del card */}
              <motion.div
                style={{ y }}
                className='relative w-44 h-28 md:w-60 md:h-40 rounded-xl overflow-hidden shrink-0'
                aria-hidden
              >
                <img src={s.img} alt='' className='absolute inset-0 h-full w-full object-cover' loading='lazy' />
                <div className='absolute inset-0 bg-gradient-to-l from-black/20 to-transparent' />
              </motion.div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
