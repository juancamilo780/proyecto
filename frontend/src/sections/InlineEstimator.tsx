import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Datos base (puedes conectarlo a tu data real cuando quieras).
 */
const CATEGORIES = [
  { id: 'espacios', name: 'Espacios', slug: 'espacios', base: 1800 },
  { id: 'catering', name: 'Catering', slug: 'catering', base: 14 }, // por invitado
  { id: 'musica', name: 'Música', slug: 'musica', base: 320 }, // por hora
  { id: 'luces', name: 'Luces', slug: 'luces', base: 120 }, // por hora
];

const CITIES = [
  { id: 'bogota', name: 'Bogotá', factor: 1.1 },
  { id: 'medellin', name: 'Medellín', factor: 1.0 },
  { id: 'cali', name: 'Cali', factor: 0.95 },
  { id: 'barranquilla', name: 'Barranquilla', factor: 1.05 },
];

/**
 * Estimador rápido
 * Nota: es aproximado; el precio real depende del proveedor, fecha y extras.
 */
export default function InlineEstimator() {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [cityId, setCityId] = useState(CITIES[0].id);
  const [guests, setGuests] = useState<number>(80);
  const [hours, setHours] = useState<number>(4);

  const category = useMemo(() => CATEGORIES.find((c) => c.id === categoryId)!, [categoryId]);
  const city = useMemo(() => CITIES.find((c) => c.id === cityId)!, [cityId]);

  // Fórmula simple y clara:
  // - Espacios: base * factor ciudad
  // - Catering: base (por invitado) * invitados * factor
  // - Música/Luces: base (por hora) * horas * factor
  const estimate = useMemo(() => {
    const f = city.factor;
    switch (category.id) {
      case 'espacios':
        return Math.round(category.base * f);
      case 'catering':
        return Math.round(category.base * guests * f);
      case 'musica':
      case 'luces':
        return Math.round(category.base * hours * f);
      default:
        return 0;
    }
  }, [category, city, guests, hours]);

  const goToProviders = () => {
    // Te lleva a la categoría elegida. Ajusta si tu ruta es distinta.
    navigate(`/c/${category.slug}?city=${city.id}&guests=${guests}&hours=${hours}`);
  };

  return (
    <div className='rounded-2xl bg-white/5 border border-white/10 p-4 md:p-6'>
      <div className='mb-3'>
        <div className='text-white font-semibold'>Estimador rápido</div>
        <div className='text-white/70 text-sm'>Un aproximado para que te hagas una idea (no es el precio final).</div>
      </div>

      <div className='grid md:grid-cols-4 gap-3 items-end'>
        {/* Categoría */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='ie-category' className='text-white/70 text-sm'>
            Categoría
          </label>
          <select
            id='ie-category'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className='rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20'
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ciudad */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='ie-city' className='text-white/70 text-sm'>
            Ciudad
          </label>
          <select
            id='ie-city'
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className='rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20'
          >
            {CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Invitados */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='ie-guests' className='text-white/70 text-sm'>
            Invitados
          </label>
          <div className='relative'>
            <input
              id='ie-guests'
              type='number'
              min={1}
              value={guests}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value || 0)))}
              placeholder='Invitados'
              className='w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 pr-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20'
              title='Cantidad de asistentes'
            />
            <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs'>
              pers.
            </span>
          </div>
        </div>

        {/* Horas */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='ie-hours' className='text-white/70 text-sm'>
            Horas
          </label>
          <div className='relative'>
            <input
              id='ie-hours'
              type='number'
              min={1}
              max={12}
              value={hours}
              onChange={(e) => setHours(Math.min(12, Math.max(1, Number(e.target.value || 0))))}
              placeholder='Horas'
              className='w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 pr-7 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20'
              title='Duración estimada del servicio'
            />
            <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs'>
              h
            </span>
          </div>
        </div>
      </div>

      {/* Pie: estimado + CTA */}
      <div className='mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3'>
        <div className='rounded-xl bg-white/8 px-3 py-2 text-white/90'>
          <span className='text-white/70 mr-2'>Estimado:</span>
          <span className='font-semibold'>${estimate.toLocaleString()}</span>
        </div>
        <button onClick={goToProviders} className='glass-strong rounded-xl px-4 py-3 w-full md:w-auto'>
          Ver proveedores
        </button>
      </div>

      <p className='mt-2 text-xs text-white/60'>
        Estimado basado en <span className='font-medium'>{guests}</span> invitados y{' '}
        <span className='font-medium'>{hours}</span> horas. El precio final puede variar según disponibilidad, fecha y
        extras seleccionados.
      </p>
    </div>
  );
}
