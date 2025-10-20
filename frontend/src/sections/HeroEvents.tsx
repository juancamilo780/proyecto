import { motion } from 'framer-motion';

export default function HeroEvents() {
  return (
    <section className='relative w-full min-h-[70vh] md:min-h-[90vh] flex items-center justify-center'>
      {/* Ya no montamos LiquidEther aquí; lo maneja BackgroundShell */}
      <div className='relative z-10 container px-6 text-center'>
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className='text-4xl md:text-6xl font-semibold tracking-tight text-white'
        >
          Organiza eventos épicos—sin enredos.
        </motion.h1>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.06, ease: 'easeOut' }}
          className='mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto'
        >
          Encuentra espacios, catering, música, luces y más. Todo en un solo lugar.
        </motion.p>
      </div>
    </section>
  );
}
