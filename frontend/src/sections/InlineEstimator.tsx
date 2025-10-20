// src/sections/InlineEstimator.tsx
import { CATEGORIES } from '@/data/categories';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE: Record<string, [number, number]> = {
  espacios: [800, 5000],
  aseo: [80, 400],
  meseros: [15, 40],
  animadores: [150, 600],
  musica: [300, 1800],
  luces: [200, 900],
  equipos: [120, 1200],
  decoracion: [150, 1500],
  comida: [300, 2500],
  bebidas: [150, 1200],
  'mesas-sillas': [100, 800],
  especiales: [300, 2500],
};

export default function InlineEstimator() {
  const nav = useNavigate();
  const [cat, setCat] = useState('espacios');
  const [city, setCity] = useState('Bogotá');
  const [people, setPeople] = useState(80);
  const [hours, setHours] = useState(4);

  const estimate = useMemo(() => {
    const [min, max] = BASE[cat] || [100, 1000];
    // fórmula simple: base + por invitado + por hora (se percibe realista sin ser exacto)
    const base = (min + max) / 2;
    const perPerson = 8; // $ por invitado (mock)
    const perHour = base * 0.05;
    return Math.round(base + people * perPerson + hours * perHour);
  }, [cat, people, hours]);

  return (
    <div className='glass rounded-2xl p-5 text-white'>
      <h3 className='font-semibold mb-3'>Estimador rápido</h3>
      <p className='text-white/70 mb-4 text-sm'>Un aproximado para que te hagas una idea (no es el precio final).</p>

      <div className='grid sm:grid-cols-4 gap-3'>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className='glass-light rounded-xl px-3 py-2'>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)} className='glass-light rounded-xl px-3 py-2'>
          {['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Cartagena'].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          className='glass-light rounded-xl px-3 py-2'
          type='number'
          min={10}
          value={people}
          onChange={(e) => setPeople(Math.max(10, +e.target.value))}
          placeholder='Invitados'
        />
        <input
          className='glass-light rounded-xl px-3 py-2'
          type='number'
          min={1}
          value={hours}
          onChange={(e) => setHours(Math.max(1, +e.target.value))}
          placeholder='Horas'
        />
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div className='rounded-xl bg-white/10 px-3 py-2'>
          Estimado: <strong>${estimate.toLocaleString()}</strong>
        </div>
        <button
          onClick={() => nav(`/c/${cat}?city=${encodeURIComponent(city)}`)}
          className='glass-strong rounded-xl px-4 py-2 hover:scale-[1.01] transition'
        >
          Ver proveedores
        </button>
      </div>
    </div>
  );
}
