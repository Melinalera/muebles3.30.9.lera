import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addDoc, collection, getFirestore,} from 'firebase/firestore';
import { Button, Card } from 'react-bootstrap';
import { useCartContext } from '../Context/CartContext';
import Resumen from '../Resumen/Resumen';
import './Cart.css';



const Cart = () => {
     const { cartList,vaciarCarrito,total,deleteItem,cantidadItem } = useCartContext ()
     const [conditional,setConditional] = useState (false);
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
        .finally(()=>setConditional(true))
     }

     function handleChange(e) {
      
        setDataForm({
          ...dataForm,[e.target.name]: e.target.value
       })
        console.log(dataForm)
       
     
     }
   
     return (
        <>
                {cartList.length === 0 ? (
                  <div>
                     <h2 className="lenght">Aún no agregaste productos al carrito</h2>
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

                {cartList.map(product =><div key={product.id}>
                 <Card className="cart">
                 <Card.Img className="img" variant="top" src={product.img} />
                 <Card.Body>
                 <Card.Title className="text" >{product.name}</Card.Title>
                 <Card.Text className="text">
                 Precio:{product.precio}
                 </Card.Text>
                 <Card.Text>
                 Cantidad:{product.cantidad}
                 </Card.Text>
                          
                 <Button onClick={()=> deleteItem(product.id)}>x</Button>
                 </Card.Body>
                 </Card></div>)} 
                 <Card.Text>
                 Total de la compra:{total()}
                 </Card.Text>
                 <button onClick={vaciarCarrito}>Vaciar Carrito</button>
                    <form 
                        className="forms"   
                           onSubmit={compra}     
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
                                
                            <button>orden</button>
                                
                               
                    </form>
                        
                 </>
                  
                }     
                    
            </div>)}
        
            </>
        
        );

    };

export default Cart;