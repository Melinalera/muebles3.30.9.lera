import { useContext, useState } from "react";
import { createContext } from "react";


export const CartContext =createContext([])

export function useCartContext() {
    return useContext (CartContext)
    
}

export const CartContextProvider = ({children}) => {

    const [cartList,setCarlist] = useState([])

    function agregarAlCarrito(items) {

        setCarlist( [...cartList,items] )


        
    }

const total =()=> {
    return cartList.reduce ((acum,producto) => acum + (producto.cantidad * producto.precio,0))
}



return(
    <CartContext.Provider value = {{
        cartList,agregarAlCarrito,total
    }}>
        {children}
    </CartContext.Provider>
)

}