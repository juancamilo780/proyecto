import { Routes, Route, Outlet } from 'react-router-dom'
import NavbarGlass from './components/NavbarGlass'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ItemPage from './pages/ItemPage'
import QuotePage from './pages/QuotePage'

function RootLayout(){return(<><NavbarGlass/><Outlet/></>)}
export default function App(){
  return(<Routes>
    <Route element={<RootLayout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/c/:slug" element={<CategoryPage/>}/>
      <Route path="/i/:id" element={<ItemPage/>}/>
      <Route path="/quote" element={<QuotePage/>}/>
    </Route>
  </Routes>)
}
