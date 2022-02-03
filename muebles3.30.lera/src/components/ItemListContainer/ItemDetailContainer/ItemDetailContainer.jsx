import React from 'react';
import {doc,getDoc,getFirestore} from "firebase/firestore"
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ItemDetail from '../../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {
    const [product,setProduct]= useState({})
    const {id}= useParams()

    useEffect(()=>{
        const db = getFirestore()
        const queryProduct = doc(db,'Item',id)
        getDoc(queryProduct) 
        .then(resp =>setProduct({id: resp.id, ...resp.data()}))
    },[])
    console.log(product)
  return <div>

     <ItemDetail product={product}/>
  </div>;
};

export default ItemDetailContainer;
