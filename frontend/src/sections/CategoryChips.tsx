import { CATEGORIES } from '@/data/categories';
import { useNavigate } from 'react-router-dom';

export default function CategoryChips() {
  const nav = useNavigate();
  return (
    <div className='-mx-6 px-6'>
      <div
        className='flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        role='listbox'
        aria-label='Categorías'
      >
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            role='option'
            onClick={() => nav(`/c/${c.slug}`)}
            className='snap-start shrink-0 glass-light rounded-full px-5 py-2.5 text-white hover:bg-white/10 transition'
            title={c.name}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
