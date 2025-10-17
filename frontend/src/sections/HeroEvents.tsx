import { motion } from 'framer-motion'
import LiquidEther from '@/components/LiquidEther'
export default function HeroEvents(){
  return(<section className="relative w-full min-h-[70vh] md:min-h-[90vh] flex items-center justify-center">
    <div className="absolute inset-0 -z-10"><LiquidEther style={{width:'100%',height:'100%'}}/><div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.35),transparent_60%)]"/></div>
    <div className="relative z-10 container px-6 text-center">
      <motion.h1 initial={{y:16,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.45,ease:'easeOut'}} className="text-4xl md:text-6xl font-semibold tracking-tight text-white">Organiza eventos épicos—sin enredos.</motion.h1>
      <motion.p initial={{y:16,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.45,delay:0.06,ease:'easeOut'}} className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto">Encuentra espacios, catering, música, luces y más. Todo en un solo lugar.</motion.p>
    </div>
  </section>) }