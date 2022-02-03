import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCartContext } from '../Context/CartContext';
import { addDoc, collection, getFirestore, } from 'firebase/firestore';



const Cart = () => {
    const { cartList,vaciarCarrito } = useContext(CartContext);
    const [conditional,setCondicional] = useState (false);
    const [dataForm,setDataForm] = useState({
        email: ' ',
        name: ' ',
        phone:''
    });
    
    const [idOrden,setIdOrden] = useState('');
    const compra = async (e) => {
        e.preventDefault()

        let orden = {}

        orden.buyer=dataForm//name, email,phone
       

        orden.Item = cartList.map (cartItem =>{
            const id = cartItem.id;
            const nombre = cartItem.name;
            const precio = cartItem.precio * cartItem.cantidad;
            const cantidad = cartItem.cantidad

            return {id, nombre,precio,cantidad}


        })
        const db = getFirestore()

        const ordenCollection = collection(db,'ordenes')
        await addDoc(ordenCollection,orden)
        .then(resp => setIdOrden(resp.id))
        .catch(err=>console.log(err))
    }

    function handleChange(e) {

      setDataForm({
          ...dataForm,[e.target.name]: e.target.value
      })
        
    }
    return (
        <>
            {cartList.length === 0 ? (
                <div
                
                >
                    <h2>Aún no agregaste productos al carrito</h2>
                    <Link to="/">
                        <button className="detail">Ir al catálogo</button>
                    </Link>
                </div>
            ) : (
                <>

                    {cartList.map(producto =><li key={producto.id}>{producto.name}</li>)}   
                     <button onClick={vaciarCarrito}>Vaciar Carrito</button>
                     <form 
                            onSubmit={compra} 
                            //onChange={handleChange} 
                        >
                            <input 
                                type='text' 
                                name='name' 
                                placeholder='name' 
                                onChange={handleChange}
                                value={dataForm.name}
                            /><br />
                            <input 
                                type='text' 
                                name='phone'
                                placeholder='tel' 
                                onChange={handleChange}
                                value={dataForm.phone}
                            /><br/>
                            <input 
                                type='email' 
                                name='email'
                                placeholder='email' 
                                onChange={handleChange}
                                value={dataForm.email}
                            /><br/>
                            <button onClick={compra}>Generar Orden</button>
                        </form>

                </>
            )}
        </>
    );
};

export default Cart;