// src/components/AnimatedHeadline.tsx
import { useEffect, useRef } from 'react';

type Props = { title: string; subtitle?: string; className?: string };

export default function AnimatedHeadline({ title, subtitle, className }: Props) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const el = container.current;
      if (!el) return;

      // 🔑 Carga robusta: toma default si existe, si no usa el módulo
      const mod = await import('animejs');
      const anime: any = (mod as any).default ?? (mod as any);
      if (cancelled || !anime) return;

      const titleEls = el.querySelectorAll('.ah-title span');
      const sub = el.querySelector('.ah-sub');

      // Estado inicial
      anime.set(titleEls, { display: 'inline-block', translateY: '1.2em', opacity: 0 });

      // Animación per-letter + subtítulo
      anime
        .timeline({ easing: 'easeOutExpo' })
        .add({
          targets: titleEls,
          translateY: ['1.2em', 0],
          opacity: [0, 1],
          delay: anime.stagger(35),
          duration: 600,
        })
        .add({ targets: sub, opacity: [0, 1], translateY: [8, 0], duration: 500 }, '-=250');
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const letters = Array.from(title);

  return (
    <div ref={container} className={className}>
      <h1 className='ah-title text-4xl md:text-5xl font-semibold tracking-tight'>
        {letters.map((l, i) => (
          <span key={i}>{l === ' ' ? '\u00A0' : l}</span>
        ))}
      </h1>
      {subtitle && <p className='ah-sub opacity-0 mt-3 text-white/80'>{subtitle}</p>}
    </div>
  );
}
