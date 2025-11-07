
// src/sections/Reviews.tsx
type Review = { id: string; author: string; rating: number; text: string };

const mock: Review[] = [
  { id: 'r1', author: 'Camila', rating: 5, text: 'Excelente atención, llegaron puntuales y animaron todo.' },
  { id: 'r2', author: 'Andrés', rating: 4, text: 'Buen sonido y repertorio, repetiría.' },
  { id: 'r3', author: 'Laura', rating: 5, text: 'Muy profesionales, se adaptaron a lo que queríamos.' }
];

export default function Reviews({ items = mock }: { items?: Review[] }) {
  const avg = items.length ? (items.reduce((a, b) => a + b.rating, 0) / items.length).toFixed(1) : '—';
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-white">Reseñas</h3>
        <div className="text-white/70 text-sm">★ {avg} / 5</div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {items.map((r) => (
          <article key={r.id} className="glass-light rounded-2xl p-4">
            <div className="font-medium text-white">{r.author}</div>
            <div className="text-sm text-white/70">★ {r.rating}</div>
            <p className="mt-2 text-white/80">{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
