import { create } from 'zustand'
export type QuoteLine = { itemId: string; title: string; priceFrom: number; qty: number; date?: string }
type QuoteState = { lines: QuoteLine[]; add:(l:QuoteLine)=>void; remove:(id:string)=>void; setQty:(id:string,qty:number)=>void; total:()=>number }
export const useQuote = create<QuoteState>((set,get)=>({
  lines:[],
  add:(l)=>set(s=>({lines:[...s.lines.filter(x=>x.itemId!==l.itemId),l]})),
  remove:(id)=>set(s=>({lines:s.lines.filter(x=>x.itemId!==id)})),
  setQty:(id,qty)=>set(s=>({lines:s.lines.map(x=>x.itemId===id?{...x,qty}:x)})),
  total:()=>get().lines.reduce((a,l)=>a+l.qty*l.priceFrom,0),
}))
