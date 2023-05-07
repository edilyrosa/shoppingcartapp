export const HelpHttp = () =>{
    
    const customFerch = (endpoint, options = {}) =>{
        const defaultHeader = {
            accept:"application/json",
            "content-type":"application/json"
        }

        const controller = new AbortController()
        options.signal = controller.signal;

        options.method = options.method || "GET"
        options.headers = options.headers

        ? {...defaultHeader, ...options.headers}//Mix between options coming & the default.
        : defaultHeader

        //!the body will send in TDD Obj, so we must parsed to String, to send it how string to the server.
        //!if we said "accept:"application/json", the body must be 
        options.body = JSON.stringify(options.body) || false //!Ex: for GET we dont send body
        if(!options.body) delete options.body

        //!console.log(options);
        setTimeout(() => {
            controller.abort() //?also will work to the evente: <button to abort de request
            //it throw the catch of the fetch
        }, 3000);

        return fetch(endpoint, options)
        .then(res => res.ok 
            ? res.json() 
            : Promise.reject({
                err:true, //Bandera, if(!resJson.err) entonces todo BIEN
                status:res.status || "00",
                statusText: res.statusText || "Ocurrio un error"
            }))
        
        .catch(err => err) //when we execute it, will get a json, so will we need a then() to tour it
    }

    //verbos del protocolo HTTP, para definir los Requets de cliente.
    const get = (url, options = {}) => customFerch(url, options)
    
    const post = (url, options ={}) =>{
        options.method = "POST"
        return customFerch(url, options)
    }
    const put = (url, options = {}) =>{
        options.method = "PUT"
        return customFerch(url, options)
    }
    const del = (url, options = {}) =>{
        options.method = "DELETE"
        return customFerch(url, options)
    }

    return{ get, post, put, del}

}