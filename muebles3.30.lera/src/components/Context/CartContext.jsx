import { useContext, useState } from "react";
import { createContext } from "react";


 export const CartContext =createContext([])

 export function useCartContext() {
    return useContext (CartContext)
    
}

 export const CartContextProvider = ({children}) => {

    const [cartList,setCarlist] = useState([])
    function agregarAlCarrito(items) {

        const indice=cartList.findIndex(i =>i.id === items.id)

        if (indice > -1) {
            const cantidadVieja=cartList[indice].cantidad
            
            let cantidadNueva= cantidadVieja + items.cantidad

            cartList[indice].cantidad = cantidadNueva

            let cantidadActual = [...cartList]

            setCarlist(cantidadActual)
            
        }else{
            setCarlist([...cartList,items])
        }
        
    }


  
    const total = () => {
       let count = 0;
       cartList.forEach((producto)=>{
           count+=producto.precio*producto.cantidad;
       })
       return count;
    };

   const deleteItem=(id)=>{
    setCarlist(cartList.filter(producto => producto.id !==id))
 }

   const cantidadItem=()=>{
    return cartList.reduce((acum,items)=>acum = acum + items.cantidad,0)
 }


  function vaciarCarrito(){
    setCarlist([])
 }

 

  return(
    <CartContext.Provider value = {{
        cartList,agregarAlCarrito,vaciarCarrito,cantidadItem,deleteItem,total
    }}>
        {children}
    </CartContext.Provider>
 )

}