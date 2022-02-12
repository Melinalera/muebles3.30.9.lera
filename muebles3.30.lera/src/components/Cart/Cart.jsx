import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addDoc, collection, getFirestore,writeBatch } from 'firebase/firestore';
import { Button, Card } from 'react-bootstrap';
import { useCartContext } from '../Context/CartContext';
import Resumen from '../Resumen/Resumen';



const Cart = () => {
    const { cartList,vaciarCarrito,total,deleteItem,cantidadItem } = useCartContext ()
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

        orden.buyer= dataForm
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
      const db = getFirestore()  
     const batch =writeBatch(db)
      setDataForm({
          ...dataForm,[e.target.name]: e.target.value
      })
        console.log(dataForm)
        batch.commit()
        setCondicional(true)
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
            <div>
                {
                  conditional ?
                  <Resumen idOrden={idOrden}/>
                :
             <>

                        {cartList.map(product =><li key={product.id}>
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={product.img} />
                        <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                            {product.precio}
                            </Card.Text>
                            <Card.Text>
                            {product.cantidad}
                            </Card.Text>
                            <Button onClick={()=> deleteItem(product.id)}>x</Button>
                            <Card.Text>
                            {cantidadItem()}
                            </Card.Text>
                            <Card.Text>
                            Total de la compra:{total()}
                            </Card.Text>
                        </Card.Body>
                        </Card></li>)} 
                        
                        <button onClick={vaciarCarrito}>Vaciar Carrito</button>
                        <form 
                               
                                
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
                                <Link to="/resumen">
                                <button onClick={compra}>Generar Orden</button>
                                </Link>
                               
                            </form>
                        
                    </>
                  
                }     
                    
                </div>)}
        
            </>
        
        );

    };

export default Cart;