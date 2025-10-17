import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORIES } from '@/data/categories'
import { useQuote } from '@/store/quote'
import QuoteDrawer from './QuoteDrawer'

export default function NavbarGlass(){
  const [open,setOpen]=useState(false)
  const [openDrawer,setOpenDrawer]=useState(false)
  const count=useQuote(s=>s.lines.length)
  const panelRef=useRef<HTMLDivElement|null>(null); const btnRef=useRef<HTMLButtonElement|null>(null)
  const navigate=useNavigate()
  useEffect(()=>{
    function onDoc(e:MouseEvent){
      const t=e.target as Node
      if(!panelRef.current||!btnRef.current) return
      if(panelRef.current.contains(t)||btnRef.current.contains(t)) return
      setOpen(false)
    }
    function onEsc(e:KeyboardEvent){ if(e.key==='Escape'){ setOpen(false); setOpenDrawer(false) } }
    document.addEventListener('mousedown',onDoc); document.addEventListener('keydown',onEsc)
    return()=>{ document.removeEventListener('mousedown',onDoc); document.removeEventListener('keydown',onEsc) }
  },[])
  function goTo(slug:string){ setOpen(false); navigate(`/c/${slug}`) }
  return(<header className="sticky top-4 z-40">
    <nav className="mx-auto max-w-[var(--container)] px-4">
      <div className="glass flex items-center justify-between rounded-2xl px-4 py-2">
        <Link to="/" className="font-semibold tracking-tight text-white">EventoGlass</Link>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button ref={btnRef} onClick={()=>setOpen(v=>!v)} className="glass-light hover:bg-white/10 rounded-xl px-3 py-2 text-white/90 outline-none" aria-haspopup="menu" aria-expanded={open}>Categorías</button>
            {open&&(<div ref={panelRef} role="menu" aria-label="Categorías" className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md shadow-2xl p-1">
              <div className="max-h-[60vh] overflow-auto">{CATEGORIES.map(c=>(
                <button key={c.id} onClick={()=>goTo(c.slug)} className="w-full text-left px-3 py-2 rounded-xl text-white/90 hover:bg-white/10 focus:bg-white/10 focus:outline-none" role="menuitem">{c.name}</button>
              ))}</div></div>)}
          </div>
          <button onClick={()=>setOpenDrawer(true)} className="relative glass-strong rounded-xl px-3 py-2 text-white">Cotización
            {count>0&&(<span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white text-black text-xs px-1">{count}</span>)}
          </button>
        </div>
      </div>
    </nav>
    <QuoteDrawer open={openDrawer} onClose={()=>setOpenDrawer(false)}/>
  </header>)
}
