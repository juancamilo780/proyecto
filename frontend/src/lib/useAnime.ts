// src/lib/useAnime.ts
import { useEffect, useRef } from 'react';

type UseAnimeOptions = {
  onMount?: (el: HTMLElement, anime: any) => void;
  onInView?: (el: HTMLElement, anime: any) => void;
  rootMargin?: string;
};

export function useAnime<T extends HTMLElement>(opts: UseAnimeOptions) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    if (!el) return;

    (async () => {
      const mod = await import('animejs');
      const anime: any = (mod as any).default ?? (mod as any);
      if (cancelled || !anime) return;

      // onMount inmediato
      if (opts.onMount) opts.onMount(el, anime);

      // onInView con IO
      if (opts.onInView) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting && !cancelled) {
                opts.onInView!(el, anime);
              }
            });
          },
          { rootMargin: opts.rootMargin ?? '0px 0px -20% 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return ref;
}
