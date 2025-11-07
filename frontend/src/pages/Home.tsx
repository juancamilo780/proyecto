// src/pages/Home.tsx
import AnimatedHeadline from '@/components/AnimatedHeadline';
import BackgroundShell from '@/components/BackgroundShell';
import { useAnime } from '@/lib/useAnime';
import { Link } from 'react-router-dom';

// Secciones “de antes”
import CategoryChips from '@/sections/CategoryChips';
import HeroEvents from '@/sections/HeroEvents';
import HowItWorks from '@/sections/HowItWorks';
import InlineEstimator from '@/sections/InlineEstimator';

// Secciones nuevas
import Combos from '@/sections/Combos';
import FAQAndPriceBands from '@/sections/FAQAndPriceBands';
import Trending from '@/sections/Trending';
import TrustStrip from '@/sections/TrustStrip';

export default function Home() {
  // Reveals (anime.js) para cada bloque
  const revealHero = useAnime<HTMLDivElement>({
    onInView: (el, anime) => {
      anime({
        targets: el.querySelectorAll('[data-reveal]'),
        translateY: [18, 0],
        opacity: [0, 1],
        delay: anime.stagger(55),
        easing: 'easeOutExpo',
        duration: 520,
      });
    },
  });

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

  const revealTrending = useAnime<HTMLDivElement>({
    onInView: (el, anime) => {
      anime({
        targets: el.querySelectorAll('[data-reveal]'),
        translateY: [14, 0],
        opacity: [0, 1],
        delay: anime.stagger(50),
        easing: 'easeOutQuad',
        duration: 420,
      });
    },
  });

  const revealCombos = useAnime<HTMLDivElement>({
    onInView: (el, anime) => {
      anime({
        targets: el.querySelectorAll('[data-reveal]'),
        translateY: [14, 0],
        opacity: [0, 1],
        delay: anime.stagger(50),
        easing: 'easeOutQuad',
        duration: 420,
      });
    },
  });

  const revealTrust = useAnime<HTMLDivElement>({
    onInView: (el, anime) => {
      anime({
        targets: el.querySelectorAll('[data-reveal]'),
        translateY: [16, 0],
        opacity: [0, 1],
        delay: anime.stagger(55),
        easing: 'easeOutExpo',
        duration: 480,
      });
    },
  });

  const revealFAQ = useAnime<HTMLDivElement>({
    onInView: (el, anime) => {
      anime({
        targets: el.querySelectorAll('[data-reveal]'),
        translateY: [16, 0],
        opacity: [0, 1],
        delay: anime.stagger(55),
        easing: 'easeOutExpo',
        duration: 480,
      });
    },
  });

  return (
    <BackgroundShell mode='full'>
      <main>
        {/* Hero con headline animado */}
        <section ref={revealHero} className='container mx-auto px-6 pt-10'>
          <div data-reveal>
            <AnimatedHeadline
              title='Organiza eventos épicos—sin enredos.'
              subtitle='Encuentra espacios, catering, música, luces y más. Todo en un solo lugar.'
              className='text-white text-center'
            />
          </div>
        </section>

        {/* Hero visual que ya tenías */}
        <HeroEvents />

        {/* Categorías (con chips) */}
        <section ref={revealCategories} className='container mx-auto px-6 py-10'>
          <h2 className='text-white text-2xl font-semibold mb-4' data-reveal>
            Categorías
          </h2>
          <div data-reveal>
            <CategoryChips />
          </div>
          {/* CTA opcional alineado a la derecha */}
          <div className='mt-3 flex justify-end' data-reveal>
            <Link to='/c/espacios' className='text-white/80 hover:text-white'>
              Ver todas las categorías →
            </Link>
          </div>
        </section>

        {/* Estimador inline */}
        <section ref={revealEstimator} className='container mx-auto px-6 pb-8'>
          <h2 className='text-white text-2xl font-semibold mb-4' data-reveal>
            Calcula tu presupuesto
          </h2>
          <div className='glass rounded-2xl p-4' data-reveal>
            <InlineEstimator />
          </div>
        </section>

        {/* ¿Cómo funciona? */}
        <section ref={revealHow} className='container mx-auto px-6 pb-14'>
          <h2 className='text-white text-2xl font-semibold mb-4' data-reveal>
            ¿Cómo funciona?
          </h2>
          <div data-reveal>
            <HowItWorks />
          </div>
        </section>

        {/* NUEVOS BLOQUES */}
        <div ref={revealTrending} data-reveal>
          <Trending />
        </div>

        <div ref={revealCombos} data-reveal>
          <Combos />
        </div>

        <div ref={revealTrust} data-reveal>
          <TrustStrip />
        </div>

        <div ref={revealFAQ} data-reveal>
          <FAQAndPriceBands />
        </div>
      </main>
    </BackgroundShell>
  );
}
