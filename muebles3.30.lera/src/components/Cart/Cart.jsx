import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addDoc, collection, getFirestore, } from 'firebase/firestore';
import { Card } from 'react-bootstrap';



const Cart = () => {
    const { cartList,vaciarCarrito,total } = useContext(CartContext);
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

        orden.buyer={nombre: 'melina',email:'mel.lera23@gmail.com', tel: ' 1165585521'}
        orden.total = total()

        orden.Item = cartList.map (cartItem =>{
            const id = cartItem.id;
            const nombre = cartItem.name;
            const precio = cartItem.precio * cartItem.cantidad;
            const cantidad = cartItem.cantidad

            return {id, nombre,precio,cantidad}


        })
        const db = getFirestore()

        const ordersCollection = collection(db,'ordenes')
        await addDoc(ordersCollection,orden)
        .then(resp => setIdOrden(resp.id))
        .catch(err=>console.log(err))
        .finally(err=> console.log(err))
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

                    {cartList.map(product =><li key={product.id}><Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={product.img} />
  <Card.Body>
    <Card.Title>{product.name}</Card.Title>
    <Card.Text>
     {product.precio}
    </Card.Text>
  </Card.Body>
</Card></li>)}   
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