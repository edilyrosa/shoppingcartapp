import { createContext, useState, useEffect } from "react";
import { HelpHttp } from "../helpers/HelpHttp";

const CrudContext = createContext() //Argument of useContext() for all consumers children. 

const CrudProvider = ({children}) =>{ //Logic to get the DATA and return the wrapper.
    const [db, setDb] = useState(null);//Not [] to avoit when upload says "table without data". Happend when really bd.length be [] <table won't upload until has register.
    const [dataToEdict, setDataToEdict] = useState(null); //FLAG: (null) to create, (register) to update
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const URL = "http://localhost:5000/products";
    let options = {}
    let {get, post, put, del} = HelpHttp()
    
    useEffect(() => {
      setLoading(true)
      get(URL, options)
      .then(resJson => {
        if(!resJson.err){
          setDb(resJson) //Update all.
        }else{
          setError(resJson)
          setDb(null)
        } 
        setLoading(false)
        })
    }, [URL]);

    

    const createData = (data) =>{
      let options = {
        body:data, 
        headers:{
          "content-type":"application/json"
        }
      }
      post(URL, options)//Sending the new record to server
      .then(resJson =>{
        if(!resJson.err) {
          //!Should update with the real ID real that BBDD gives. I should wait and get that response from the server.
          setDb([...db, resJson])
        }
        else error(resJson)
      })
    }
    
    const updaData = (data) =>{
      let endpoint = `${URL}/${data.id}`
      let options = {
        body:data,
        headers:{
          "content-type":"application/json"
        }
      }
      
      put(endpoint, options)
      .then(resJson =>{
        if(!resJson.err){

          //!Es con lo qe viene del <Form que debo actualizar no con la respuesta exitosa del servidor. Ya tengo el ID
          let newData = db.map(e => e.id === data.id ? data : e) 
          setDb(newData)
        }else setError(resJson)
      })
    }


    const deleteData = (id) =>{
      let endpoint = `${URL}/${id}`
      let options = {
        headers:{
          "content-type":"application/json"
        }
      }
      let isConfirm = window.confirm(`Are you sure of detele the register id = ${id}`)
      if(isConfirm){
        del(endpoint, options).then(resJson =>{
          if(!resJson.err){
            let newData = db.filter((e) => e.id !== id) 
            setDb(newData)
          }else setError(resJson)
        }) 

      }
    }
    
    const data = { //Sending data, Stats' Vars, also its Setters and handles functions.
        db, setDb, dataToEdict, setDataToEdict, loading, setLoading, error,
        setError, createData, updaData, deleteData
    }
    return <CrudContext.Provider value={data}> {children} </CrudContext.Provider>
}

export {CrudContext, CrudProvider}