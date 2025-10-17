import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
export default function ItemCard({id,title,priceFrom,city,image}:{id:string;title:string;priceFrom:number;city:string;image:string}){
  return(<motion.article whileHover={{y:-4}} className="glass rounded-2xl overflow-hidden">
    <img src={image} alt={title} className="h-40 w-full object-cover" loading="lazy"/>
    <div className="p-4 text-white/90"><h3 className="font-medium">{title}</h3><p className="text-sm text-white/60">{city}</p>
      <div className="mt-3 flex items-center justify-between"><span className="text-white font-semibold">${priceFrom.toLocaleString()}</span><Link to={`/i/${id}`} className="glass-light rounded-lg px-3 py-1 text-sm hover:bg-white/10">Ver</Link></div>
    </div>
  </motion.article>)
}