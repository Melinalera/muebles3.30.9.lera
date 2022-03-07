import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NavBarBS from './components/Navegacion/BarraDeNavegacion';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import {CartContextProvider} from './components/Context/CartContext'
import Resumen from './components/Resumen/Resumen';







function App() {
 
  return (
    <CartContextProvider>
    <BrowserRouter>
   
    <NavBarBS/>
    <Routes>
      <Route exact path='/'element={<ItemListContainer/>}/>
      <Route exact path='/categoria/:id'element={<ItemListContainer saludo='Un beso en madrid3.30.9.lera'/>}/>
      <Route exact path='/detalle/:id'element={<ItemDetailContainer/>}/>
      <Route exact path='/cart'element={<Cart/>}/>
      <Route exact path='/resumen' element={<Resumen/>}/>
     
  
    </Routes>
   

    </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
