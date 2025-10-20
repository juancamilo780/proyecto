import BackgroundShell from '@/components/BackgroundShell';
import CategoryChips from '@/sections/CategoryChips';
import HeroEvents from '@/sections/HeroEvents';
import HowItWorks from '@/sections/HowItWorks';
import InlineEstimator from '@/sections/InlineEstimator';

export default function Home() {
  return (
    <BackgroundShell mode='full'>
      <main>
        <HeroEvents />

        <section className='container mx-auto px-6 py-10'>
          <h2 className='text-white text-2xl font-semibold mb-4'>Categorías</h2>
          <CategoryChips />
        </section>

        <HowItWorks />

        <section className='container mx-auto px-6 py-16'>
          <InlineEstimator />
        </section>
      </main>
    </BackgroundShell>
  );
}
