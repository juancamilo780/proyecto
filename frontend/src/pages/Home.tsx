// src/pages/Home.tsx
import AnimatedHeadline from '@/components/AnimatedHeadline';
import BackgroundShell from '@/components/BackgroundShell';
import { useAnime } from '@/lib/useAnime';

import CategoryChips from '@/sections/CategoryChips';
import HeroEvents from '@/sections/HeroEvents';
import HowItWorks from '@/sections/HowItWorks';
import InlineEstimator from '@/sections/InlineEstimator';

export default function Home() {
  // Reveal para secciones (anime.js)
  const revealCategories = useAnime<HTMLDivElement>({
    onInView: (el, anime) => {
      anime({
        targets: el.querySelectorAll('[data-reveal]'),
        translateY: [16, 0],
        opacity: [0, 1],
        delay: anime.stagger(60),
        easing: 'easeOutQuad',
        duration: 450,
      });
    },
  });

  const revealHow = useAnime<HTMLDivElement>({
    onInView: (el, anime) => {
      anime({
        targets: el.querySelectorAll('[data-reveal]'),
        translateY: [18, 0],
        opacity: [0, 1],
        delay: anime.stagger(70),
        easing: 'easeOutExpo',
        duration: 520,
      });
    },
  });

  const revealEstimator = useAnime<HTMLDivElement>({
    onInView: (el, anime) => {
      anime({
        targets: el.querySelectorAll('[data-reveal]'),
        translateY: [18, 0],
        opacity: [0, 1],
        delay: anime.stagger(70),
        easing: 'easeOutExpo',
        duration: 520,
      });
    },
  });

  return (
    <BackgroundShell mode='full'>
      <main>
        {/* Hero con anime.js (per-letter) */}
        <section className='container mx-auto px-6 pt-10'>
          <AnimatedHeadline
            title='Haz tu evento inolvidable'
            subtitle='Encuentra espacios, catering, música y más — todo en un solo lugar.'
            className='text-white text-center'
          />
        </section>
        {/* Hero visual existente (si ya lo usas, lo mantenemos) */}
        <HeroEvents />

        {/* Categorías con reveal */}
        <section ref={revealCategories} className='container mx-auto px-6 py-10'>
          <h2 className='text-white text-2xl font-semibold mb-4' data-reveal>
            Categorías
          </h2>
          <div data-reveal>
            <CategoryChips />
          </div>
        </section>

        {/* Estimador inline con reveal */}
        <section ref={revealEstimator} className='container mx-auto px-6 pb-8'>
          <h2 className='text-white text-2xl font-semibold mb-4' data-reveal>
            Calcula tu presupuesto
          </h2>
          <div className='glass rounded-2xl p-4' data-reveal>
            <InlineEstimator />
          </div>
        </section>

        {/* Cómo funciona con reveal */}
        <section ref={revealHow} className='container mx-auto px-6 pb-14'>
          <h2 className='text-white text-2xl font-semibold mb-4' data-reveal>
            ¿Cómo funciona?
          </h2>
          <div data-reveal>
            <HowItWorks />
          </div>
        </section>
      </main>
    </BackgroundShell>
  );
}
