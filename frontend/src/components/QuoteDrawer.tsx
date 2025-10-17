import { useQuote } from '@/store/quote'
export default function QuoteDrawer({open,onClose}:{open:boolean;onClose:()=>void}){
  const { lines, remove, setQty, total } = useQuote()
  return(<div className={`fixed inset-0 z-50 transition ${open?'pointer-events-auto':'pointer-events-none'}`} aria-hidden={!open}>
    <div className={`absolute inset-0 bg-black/50 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={onClose}/>
    <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-neutral-950 border-l border-white/15 backdrop-blur-md transform transition-transform ${open?'translate-x-0':'translate-x-full'}`} role="dialog" aria-label="Cotización">
      <div className="p-5">
        <div className="flex items-center justify-between"><h2 className="text-white text-xl font-semibold">Tu cotización</h2><button onClick={onClose} className="text-white/70 hover:text-white">Cerrar</button></div>
        {lines.length===0?(<p className="mt-8 text-white/60">Aún no has agregado servicios.</p>):(<ul className="mt-5 space-y-3">{lines.map(l=>(<li key={l.itemId} className="glass rounded-xl p-3 text-white/90"><div className="flex items-center justify-between"><div><div className="font-medium">{l.title}</div><div className="text-sm text-white/60">${l.priceFrom.toLocaleString()}</div></div><div className="flex items-center gap-2"><input type="number" min={1} value={l.qty} onChange={e=>setQty(l.itemId, Math.max(1, Number(e.target.value)))} className="w-16 glass-light rounded-lg px-2 py-1 text-right text-white/90"/><button onClick={()=>remove(l.itemId)} className="text-white/60 hover:text-white">Quitar</button></div></div></li>))}</ul>)}
        <div className="mt-6 flex items-center justify-between text-white"><span className="font-medium">Total</span><span className="text-lg font-semibold">${total().toLocaleString()}</span></div>
        <button className="mt-6 w-full glass-strong rounded-xl py-3 text-white hover:scale-[1.01] transition">Enviar solicitud</button>
      </div>
    </aside>
  </div>)
}