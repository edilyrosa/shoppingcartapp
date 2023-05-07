import React, { useState, useEffect} from 'react';
import { HelpHttp } from '../helpers/helpHttp';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Message from './Message';


function CrudApi() {
    const [db, setDb] = useState(null);//No un [] Para evitar q cuando carge diga "tabla sin datos", solo pasara cuando realmente bd.length sea [], y <lable no se cargara hasta q db tenga algo
    const [dataToEdict, setDataToEdict] = useState(null); //FLAG: null to create and true to update
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let url = 'http://localhost:5000/products'
    let {get, post, put, del} = HelpHttp()
    
    useEffect(() => {
      setLoading(true)
      get(url)
      .then(resJson => {
        if(!resJson.err){
          setDb(resJson) //Antualizo con el TODO
        }else{
          setError(resJson)
          setDb(null)
        } 
        setLoading(false)
        //console.log(json)
        })
    }, []);

    

    const createData = (data) =>{
      let options = {
        body:data
      }
      post(url, options)//Envio el nuevo registro al servidor
      .then(resJson =>{
        if(!resJson.err) {
          console.log(resJson);
          //!Deberia actualizar la VAR DE EDO con el ID real q la BBDD me da, esperar esa respuesta del servidor.
          setDb([...db, resJson])
        }
        else error(resJson)
      })
      
    }
    
    
    const updaData = (data) =>{

      let endpoint = `${url}/${data.id}`
      let options = {
        body:data,
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
      let endpoint = `${url}/${id}`
        del(endpoint).then(resJson =>{
          if(!resJson.err){
            let newData = db.filter((e) => e.id !== id) 
            setDb(newData)
          }else setError(resJson)
        })
    }

    return ( 
     <>
        <div>
            <h2>POST, UPDATE OR DELETE THE PRODUCTS</h2>
            <article className='grid-1-2'> 
            <CrudForm 
            createData={createData}
            updaData={updaData}
            dataToEdict={dataToEdict} 
            setDataToEdict={setDataToEdict}/>
            
            {loading && <Loader/>}
            {error && <Message msj={ `Error ${error.status}: ${error.statusText}`}  bgColor="#dc3545" />}
            {db && <CrudTable data={db} setDataToEdict={setDataToEdict} deleteData={deleteData} />}
            </article>
        </div>
           
      </>
      
     );
}

export default CrudApi;