import React from "react";

function Form() {
    <div>
        <form 
                                onSubmit={compra} 
                                //onChange={handleChange} 
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
                                <Link to="/resumen">
                                <button onClick={compra}>Generar Orden</button>
                                </Link>
                            </form> 
    </div>
    
}
export default Form;