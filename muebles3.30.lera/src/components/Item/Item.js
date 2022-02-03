import React from 'react'
import'./Item.css'
import {Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Item = ({producto}) => {
    console.log(producto);

    const {id,img,name,precio,categoria}=producto

    return (
      
       <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={img} />
  <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Text>
   categoria:{categoria}
    </Card.Text>
    <Card.Text>
        {precio}
    </Card.Text>
    <Link to={`/detalle/${id}`}><Button variant="primary">Ver Detalle</Button></Link>
  </Card.Body>
</Card>

    
    )
}

export default Item
