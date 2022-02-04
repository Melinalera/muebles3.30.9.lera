import {useState,useEffect}from 'react'
import ItemList from './itemList';
import { useParams } from 'react-router-dom';
import  {getFirestore,getDocs,collection,where,query} from 'firebase/firestore'







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
            <h3>Cargando...</h3>)
            :( 
               <> 
             <h2 style={{textAlign:'center'}}>{saludo}</h2>
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
