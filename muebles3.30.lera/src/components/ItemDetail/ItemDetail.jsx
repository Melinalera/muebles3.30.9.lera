import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCounts from '../ItemCounts/ItemCounts'
import {CartContext, useCartContext } from '../Context/CartContext';

const ItemDetail = ({product}) => {

  const{agregarAlCarrito} = useCartContext();
  const [show,setShow]= useState(true);
 



  const onAdd=(cant)=>{

    agregarAlCarrito({...product,cantidad: cant})
   
    setShow(false)
  }
  return <div>
    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={product.img} />
  <Card.Body>
    <Card.Title>{product.name}</Card.Title>
    <Card.Text>
     {product.precio}
    </Card.Text>
    <Button onClick={()=> onAdd(0)} variant="primary">Agregar al carrito</Button>
  </Card.Body>
</Card>

{show?<ItemCounts stock={product.stock} onAdd={onAdd}/>:
  <div>
  <Link to='/'><button>Terminar la compra</button></Link>
  <Link to='/cart'><button>Comprar</button></Link>
  

  </div>}
  </div>;
};

export default ItemDetail;






