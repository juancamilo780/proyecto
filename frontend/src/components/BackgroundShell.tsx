// src/components/BackgroundShell.tsx
import LiquidEther from '@/components/LiquidEther';

type Props = { children: React.ReactNode; mode?: 'hero' | 'full' };

export default function BackgroundShell({ children, mode = 'full' }: Props) {
  return (
    <div className='relative'>
      {/* Capa base */}
      <div className='fixed inset-0 -z-30 bg-neutral-950' />

      {/* Halo sutil global */}
      <div
        className='fixed inset-0 -z-20 pointer-events-none
                      bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]'
      />

      {/* Ether */}
      {mode === 'hero' ? (
        <div className='fixed top-0 left-0 right-0 h-[70vh] -z-10 pointer-events-none'>
          <LiquidEther style={{ width: '100%', height: '100%' }} />
        </div>
      ) : (
        <div className='fixed inset-0 -z-10 pointer-events-none'>
          <LiquidEther style={{ width: '100%', height: '100%' }} />
          {/* Filtro para que no “queme” el contenido en scroll */}
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/35' />
        </div>
      )}

      {children}
    </div>
  );
}
