import {useState,useEffect}from 'react'
import ItemList from './itemList';
import { useParams } from 'react-router-dom';
import  {getFirestore,getDocs,collection,where,query} from 'firebase/firestore'
import  CircleLoader from 'react-spinners/CircleLoader'
import { css } from "@emotion/react";




const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ItemListContainer = ({saludo}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading]=useState(true)
    
   
    const{id} =useParams();
   
    
useEffect (()=>{
    setLoading(true);
    if (id) {
        const db = getFirestore();
        const queryCollection = query(
            collection (db,"Item"),
            where("categoria", "==", id)
        );
        getDocs(queryCollection)
        .then((res)=>{
            setData(
                res.docs.map((prod)=>({
                    id: prod.id,...prod.data(),
                }))
            );
        })
        .catch((error)=>{
            console.log("Error en el useEffect",error);
        })
        .finally(()=>{
            setLoading(false);
        });

    } else{
        const db = getFirestore();
        const queryCollection = collection(db,"Item");
        getDocs (queryCollection)
        .then ((res)=>{
            setData(
                res.docs.map((prod)=>({
                    id: prod.id,
                    ...prod.data(),
                }))
            )
        })
        .catch((error)=>{
            console.log("Error en el useEffect",error);
        })
        .finally(()=>{setLoading(false);
        })
    }

},[id])
   

    
    
    return (
      
        <div>
            {loading ?(
            <CircleLoader loading={loading} css={override} size={150}/>)
            :( 
               <> 
             <h2 style={{textAlign:'center'}}>Bienvenidos a Muebles3.30.9.lera</h2>
            <ItemList products={data}/>
             </>
             ) }
          
        </div>


    )

}

export default ItemListContainer
/* const {categoriaId}=useParams()*/
/*
/* useEffect(()=>{
        if (categoriaId){
        getMock
        .then(answer=>setProducts(answer.filter(producto=>producto.categoria===categoriaId)))
        .finally(()=>setLoading(false))
        }else{
            getMock
            .then(res=>setProducts(res))
            .finally(()=>setLoading(false))
        }
    },[categoriaId])
    console.log('products',products)
*/ 
