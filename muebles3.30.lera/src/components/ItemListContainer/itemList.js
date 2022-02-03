import React from 'react'
import Item from '../Item/Item'



function ItemList({products }) {

  return (
    <div style={{ display: 'flex' }}>
      {products?.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>

  );
}



export default ItemList 

