export type Item = {
  id: string; categoryId: string; title: string; vendorName: string;
  city: string; rating: number; priceFrom: number; images: string[];
  short: string; features: string[];
}
const CITIES = ['Bogotá','Medellín','Cali','Barranquilla','Bucaramanga','Cartagena']
const rand=(min:number,max:number)=>Math.round(min+Math.random()*(max-min))
const pick=<T,>(arr:T[])=>arr[rand(0,arr.length-1)]
const rating=()=>+(4.1+Math.random()*0.8).toFixed(1)
function priceRangeFor(cat:string):[number,number]{
  switch(cat){
    case 'espacios': return [800,5000]
    case 'aseo': return [80,400]
    case 'meseros': return [15,40]
    case 'animadores': return [150,600]
    case 'musica': return [300,1800]
    case 'luces': return [200,900]
    case 'equipos': return [120,1200]
    case 'decoracion': return [150,1500]
    case 'comida': return [300,2500]
    case 'bebidas': return [150,1200]
    case 'mesas-sillas': return [100,800]
    case 'especiales': return [300,2500]
    default: return [100,1000]
  }
}
function titleFor(cat:string,i:number){
  const n=i+1
  const map:Record<string,string[]>={
    espacios:['Salón','Terraza','Hacienda','Auditorio'],
    aseo:['Equipo de aseo','Aseo post-evento','Limpieza profunda'],
    meseros:['Meseros','Staff de servicio','Capitán de meseros'],
    animadores:['Animador','Maestro de ceremonias','Show infantil'],
    musica:['DJ','Banda','Saxofonista','Dúo acústico'],
    luces:['Paquete luces','Wash RGB','Cabezas móviles'],
    equipos:['Sonido','Micros inalámbricos','Pantalla LED'],
    decoracion:['Decoración temática','Arco de globos','Flores'],
    comida:['Catering','Bocados gourmet','Buffet'],
    bebidas:['Bar móvil','Barman','Estación de café'],
    'mesas-sillas':['Mesas y sillas','Mobiliario lounge','Mantelería'],
    especiales:['Show temático','Personajes caracterizados','Actores caracterizados'],
  }
  const base=pick(map[cat]||['Servicio'])
  return `${base} ${n}`
}
function shortFor(cat:string){
  const map:Record<string,string>={ especiales:'Show temático con actores caracterizados. Presentación profesional y segura.' }
  return map[cat]||'Servicio para eventos, configurable según tu necesidad.'
}
function featuresFor(cat:string):string[]{
  switch(cat){
    case 'espacios': return ['Climatizado','Parqueadero','Cocina']
    case 'meseros': return ['Uniformados','Turnos por hora','Capitán opcional']
    case 'musica': return ['Sonido pro','Playlist a medida','MC opcional']
    case 'luces': return ['RGB','Control DMX','Montaje incluido']
    case 'equipos': return ['Backline','Entrega y recogida','Soporte técnico']
    case 'decoracion': return ['Tematización','Montaje y desmontaje','Floral']
    case 'comida': return ['Menú personalizado','Vegetariano','Postres']
    case 'bebidas': return ['Coctelería','Bartender','Hielo y cristalería']
    case 'animadores': return ['Dinámicas','Juegos','Micrófono']
    case 'especiales': return ['Caracterización','Show temático','Sesión fotográfica']
    default: return ['Servicio profesional','Garantía','Soporte']
  }
}
export function buildItems(){
  const categories=['espacios','aseo','meseros','animadores','musica','luces','equipos','decoracion','comida','bebidas','mesas-sillas','especiales']
  const out:Item[]=[]
  for(const cat of categories){
    const [minP,maxP]=priceRangeFor(cat)
    for(let i=0;i<10;i++){
      const city=pick(CITIES); const id=`${cat}-${String(i+1).padStart(2,'0')}`
      out.push({ id, categoryId:cat, title:titleFor(cat,i), vendorName:`${cat}-vendor-${i+1}`, city,
        rating:rating(), priceFrom:rand(minP,maxP), images:[`https://picsum.photos/seed/${cat}${i+1}/800/500`],
        short:shortFor(cat), features:featuresFor(cat) })
    }
  }
  return out
}
