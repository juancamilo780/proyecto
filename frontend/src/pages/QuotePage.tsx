import { useQuote } from '@/store/quote'
export default function QuotePage(){
  const { lines, total } = useQuote()
  return(<main className="container mx-auto px-4 py-8 text-white">
    <h1 className="text-3xl font-semibold">Cotización</h1>
    {lines.length===0? <p className="mt-6 text-white/70">No has agregado servicios.</p> :
    <div className="mt-6 space-y-3">{lines.map(l=>(<div key={l.itemId} className="glass rounded-xl p-4 flex items-center justify-between">
      <div><div className="font-medium">{l.title}</div><div className="text-white/60 text-sm">${l.priceFrom.toLocaleString()} × {l.qty}</div></div>
      <div className="text-white font-semibold">${(l.priceFrom*l.qty).toLocaleString()}</div>
    </div>))}
      <div className="mt-6 text-right"><span className="text-lg font-semibold">Total: ${total().toLocaleString()}</span></div>
    </div>}
  </main>)
}
