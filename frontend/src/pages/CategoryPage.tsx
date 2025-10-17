import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '@/data/categories'
import ItemCard from '@/components/ItemCard'

type Item={id:string;categoryId:string;title:string;vendorName:string;city:string;rating:number;priceFrom:number;images:string[];short:string;features:string[]}

export default function CategoryPage(){
  const { slug } = useParams<{slug:string}>()
  const category = useMemo(()=>CATEGORIES.find(c=>c.slug===slug),[slug])
  const [items,setItems]=useState<Item[]>([])
  const [loading,setLoading]=useState(true)
  const [sp,setSp]=useSearchParams()
  const [city,setCity]=useState(sp.get('city')||'')
  const [min,setMin]=useState(sp.get('min')||'')
  const [max,setMax]=useState(sp.get('max')||'')

  useEffect(()=>{
    let alive=true
    async function load(){
      setLoading(true)
      try{
        const qs=new URLSearchParams()
        if(slug) qs.set('category',slug)
        if(city) qs.set('city',city)
        if(min) qs.set('min',min)
        if(max) qs.set('max',max)
        const res=await fetch('/api/items?'+qs.toString())
        if(!res.ok) throw new Error('network '+res.status)
        const data=await res.json()
        if(alive) setItems(data)
      }catch{
        const mod=await import('@/mocks/data')
        const all=mod.items as Item[]
        const vMin=min?Number(min):0
        const vMax=max?Number(max):Number.MAX_SAFE_INTEGER
        const filtered=all.filter(it=>(slug?it.categoryId===slug:true) && (city?it.city.toLowerCase().includes(city.toLowerCase()):true) && it.priceFrom>=vMin && it.priceFrom<=vMax)
        if(alive) setItems(filtered)
      }finally{
        if(alive) setLoading(false)
      }
    }
    load()
    return()=>{ alive=false }
  },[slug,city,min,max])

  return(<main className="container mx-auto px-4 py-8">
    <h1 className="text-3xl md:text-4xl font-semibold text-white">{category?.name||'Categoría'}</h1>
    <p className="text-white/60 mt-2">Explora proveedores y servicios.</p>
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading? Array.from({length:8}).map((_,i)=>(<div key={i} className="glass rounded-2xl h-56 animate-pulse"/>))
      : items.map(it=>(<ItemCard key={it.id} id={it.id} title={it.title} priceFrom={it.priceFrom} city={it.city} image={it.images[0]}/>))}
    </div>
  </main>)
}
