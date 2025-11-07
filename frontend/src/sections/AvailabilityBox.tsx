import { useQuote } from '@/store/quote';
import { useMemo, useState } from 'react';

type Extra = { id: string; label: string; price: number };

type Props = {
  itemId: string;
  title: string;
  city: string;
  basePrice: number;
  /** Lista opcional de extras (solo usada en modo "full") */
  extras?: Extra[];
  /** "full" con fecha/horas/extras, "compact" solo precio + CTA */
  mode?: 'full' | 'compact';
  /** Clave que espera tu store para el identificador (p. ej. "itemId", "id", "productId") */
  idKey?: string;
};

export default function AvailabilityBox({
  itemId,
  title,
  city,
  basePrice,
  extras = [] as Extra[],
  mode = 'full',
  idKey = 'itemId', // 👈 por defecto "itemId" (cámbialo si tu store usa "id" o "productId")
}: Props) {
  const add = useQuote((s) => s.add);

  // Estados solo para "full"
  const [date, setDate] = useState<string>('');
  const [hours, setHours] = useState<number>(4);
  const [sel, setSel] = useState<Record<string, boolean>>({});

  const extrasCost = useMemo(() => extras.filter((e) => sel[e.id]).reduce((acc, e) => acc + e.price, 0), [sel, extras]);

  const total = useMemo(
    () => (mode === 'full' ? Math.max(basePrice, basePrice * (hours / 4)) + extrasCost : basePrice),
    [mode, basePrice, hours, extrasCost]
  );

  // Helper para construir el payload sin errores de TS
  const buildPayload = (withMeta = false) => {
    const payload: any = { title, city, priceFrom: total, qty: 1 };
    payload[idKey] = itemId; // 👈 aquí seteo dinámicamente la clave correcta
    if (withMeta) {
      payload.meta = {
        date,
        hours,
        extras: extras.filter((e) => sel[e.id]).map((e) => e.id),
      };
    }
    return payload;
  };

  /* ─────────────────────────────────────────────────────────────
     MODO COMPACT: solo "Desde" + botón
  ───────────────────────────────────────────────────────────── */
  if (mode === 'compact') {
    return (
      <div className='glass rounded-2xl p-5 border border-white/10'>
        <div className='flex items-baseline justify-between'>
          <span className='text-white/70 text-sm'>Desde</span>
          <span className='text-2xl font-semibold'>${Math.round(total).toLocaleString()}</span>
        </div>

        <button onClick={() => add(buildPayload(false))} className='mt-4 w-full glass-strong rounded-xl px-4 py-3'>
          Agregar a cotización
        </button>

        <div className='mt-2 text-xs text-white/50'>Precio referencial. Ajusta según fecha/detalles al cotizar.</div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     MODO FULL: fecha, horas y extras
  ───────────────────────────────────────────────────────────── */
  return (
    <div className='glass rounded-2xl p-4'>
      <div className='flex items-baseline justify-between'>
        <span className='text-white/70 text-sm'>Desde</span>
        <span className='text-2xl font-semibold'>${Math.round(total).toLocaleString()}</span>
      </div>

      <div className='mt-3 grid grid-cols-2 gap-2'>
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='col-span-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20'
        />

        <label className='col-span-2 text-sm text-white/70 mt-1'>Horas</label>
        <input
          type='range'
          min={2}
          max={10}
          step={1}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className='col-span-2 w-full'
        />
        <div className='col-span-2 text-sm text-white/70'>{hours} horas</div>
      </div>

      {extras.length > 0 && (
        <div className='mt-3'>
          <div className='text-sm text-white/70 mb-2'>Extras</div>
          <div className='grid grid-cols-1 gap-2'>
            {extras.map((x) => (
              <label key={x.id} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={!!sel[x.id]}
                  onChange={(e) => setSel((s) => ({ ...s, [x.id]: e.target.checked }))}
                />
                <span className='text-white/90'>{x.label}</span>
                <span className='ml-auto text-white/60 text-sm'>+${x.price.toLocaleString()}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => add(buildPayload(true))} className='mt-4 w-full glass-strong rounded-xl px-4 py-3'>
        Agregar a cotización
      </button>

      <div className='mt-2 text-xs text-white/50'>Precio aproximado según horas y extras seleccionados.</div>
    </div>
  );
}
