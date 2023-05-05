import { TYPES } from "../actionsReducer/crudActions";

export const crudInicialSate = {
    db:null
}
export function crudReducer(state, {type, payload}){ //son funciones reductoras, aca no podemos hacer programacion async ni llamar useEffect()
    
    switch (type) {
        case TYPES.READ_ALL_DATA:{
            console.log(payload);
            return { ...state, db:payload.map(e => e) };
        }
        case TYPES.CREATE_DATA:{}
    
        case TYPES.READ_ONE_DATA:{}

        case TYPES.UPDATE_DATA:{}

        case TYPES.DELETE_DATA:{}
        
        case TYPES.NO_DATA:{
            return crudInicialSate;
        }
        
        default:
           return state;
    }

}