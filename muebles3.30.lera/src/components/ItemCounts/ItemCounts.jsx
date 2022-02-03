import React,{useState} from "react";


const ItemCounts=({stock,onAdd})=> {
     const initial = 1
    
     const [contador, setContador] = useState(initial);


     const sumaContador = ()=> {
         contador < stock ? setContador(prev=>prev + 1)
         :alert("stockmaximo alcanzado");

     };

     const restaContador=()=>{
         contador > initial && setContador(prev=>prev-1);

     }
 
     return (
         <div style={{textAlign: 'center',alignItems:'center',justifyConten:'center'}}>
             <h1>{contador}</h1>
             <button onClick={restaContador}>-</button>
             <button onClick={()=>onAdd(contador)} disabled={contador<1 && 'disabled'}>Agregar al carrito</button>
             <button onClick={sumaContador}>+</button>
         </div>
     )
    
     }
     export default ItemCounts;