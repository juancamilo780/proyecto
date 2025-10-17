import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuote } from '@/store/quote'

type Item={id:string;categoryId:string;title:string;vendorName:string;city:string;rating:number;priceFrom:number;images:string[];short:string;features:string[]}

export default function ItemPage(){
  const { id } = useParams<{id:string}>()
  const [item,setItem]=useState<Item|null>(null)
  const add=useQuote(s=>s.add)

  useEffect(()=>{
    let alive=true
    async function load(){
      try{
        const res=await fetch('/api/items/'+id)
        if(!res.ok) throw new Error('network '+res.status)
        const data=await res.json()
        if(alive) setItem(data)
      }catch{
        const { items } = await import('@/mocks/data')
        const found = (items as Item[]).find(i=>i.id===id) || null
        if(alive) setItem(found)
      }
    }
    load(); return()=>{ alive=false }
  },[id])

  if(!item) return <main className="container mx-auto px-4 py-8 text-white/70">Cargando…</main>

  return(<main className="container mx-auto px-4 py-8 text-white">
    <div className="grid md:grid-cols-2 gap-6">
      <img className="w-full h-72 object-cover rounded-2xl glass" src={item.images[0]} alt={item.title}/>
      <div>
        <h1 className="text-3xl font-semibold">{item.title}</h1>
        <p className="text-white/70 mt-2">{item.city} • ★ {item.rating}</p>
        <p className="mt-4 text-white/80">{item.short}</p>
        <ul className="mt-4 grid grid-cols-2 gap-2">{item.features.map((f,i)=>(<li key={i} className="glass-light rounded-lg px-3 py-2">{f}</li>))}</ul>
        <div className="mt-6 flex items-center justify-between"><span className="text-xl font-semibold">${item.priceFrom.toLocaleString()}</span>
          <button className="glass-strong rounded-xl px-4 py-2" onClick={()=>add({itemId:item.id,title:item.title,priceFrom:item.priceFrom,qty:1})}>Agregar a cotización</button>
        </div>
      </div>
    </div>
  </main>)
}
