import React, { useState, useEffect } from 'react';

//Give a defined obj how parameter of useState(), when will make references like form.hobbies
const initialFrom = {
    id:null,
    name:"", 
    category:"",
    description:"",
    price:0,
    img:{
        src:"https://placekitten.com/80/60", 
        alt:"cat" 
    }
}

function CrudForm({createData, updaData, dataToEdict, setDataToEdict}) {
const [form, setForm] = useState(initialFrom);

//This Form component will do re-render when user hit on update <button
    useEffect(() => {
        if(dataToEdict){
            setForm(dataToEdict)
        }else setForm(initialFrom)
    }, [dataToEdict]);

    //!Handle the Var of State.
    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //If id = null, is a create.
        if(!form.id) createData(form); //Doesnt work form.id === null
        else updaData(form);
        handleReset();
    }

  
    const handleReset = (e) => {
        //In addition to the default behavior of <input type='reset'
        //?Must clean the App State.
        setForm(initialFrom)
        setDataToEdict(null)
    }

    return ( 
        <div>
        <form onSubmit={handleSubmit} >
             <input 
                type="text" 
                placeholder="Name of the product to add" 
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                />
                <br/>
                <input 
                type="text" 
                placeholder="Category of the product" 
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                />
                <br/>
                <input 
                type="textarea" 
                placeholder="Description of the product" 
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                />
                <br/>
                <label>Admit two decimals e.g. 23.01
                    <input 
                    type="number" 
                    step="0.01"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    />
                </label>
                {/* <br/>
                <input type="file" name="img" value={form.img.src} onChange={handleImg}/> 
                <br/><br/>   */}

                <input type='submit' value='Send' />
                <input type='reset' value='Reset' onClick={handleReset}/>
        </form>
        </div>
        )
}

export default CrudForm;