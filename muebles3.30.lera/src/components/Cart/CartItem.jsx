import React from 'react';
import { Card } from 'react-bootstrap';

const CartItem = (product) => {
    const{name,img,cantidad,categoria,stock,precio}=product
  return <div>
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
          <Card.Text>
              {cantidad}
          </Card.Text>
          <Card.Text>
              stock:{stock}
          </Card.Text>
          
        </Card.Body>
      </Card>
   
   
  </div>;
};

export default CartItem;
