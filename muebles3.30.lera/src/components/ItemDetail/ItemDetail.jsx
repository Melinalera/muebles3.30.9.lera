import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCounts from '../ItemCounts/ItemCounts'
import {useCartContext } from '../Context/CartContext';
import './ItemDetail.css'
import { css } from "@emotion/react";
const ItemDetail = ({product}) => {

  const{agregarAlCarrito} = useCartContext();
  const [show,setShow]= useState(true);
    

  const onAdd=(cant)=>{

    agregarAlCarrito({...product,cantidad: cant})
   
    setShow(false)
  }

  return <div>
   <Card className="itemDetail">
   <Card.Img className="itemDetail img" src={product.img} />
   <Card.Body className="text">
   <Card.Title>{product.name}</Card.Title>
   <Card.Text>
     Precio:
     {product.precio}
   </Card.Text>
   
   </Card.Body>
   </Card>

   {show?<ItemCounts stock={product.stock} onAdd={onAdd}/>:
   <div className="text">
   <Link to='/'><Button>Terminar la compra</Button></Link>
   <Link to='/cart'><Button>Comprar</Button></Link>
  

  </div>}
 </div>;
};

export default ItemDetail;






