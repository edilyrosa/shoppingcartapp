import axios from 'axios';
import { TYPES } from '../actionsReducer/shoppingActions';

export const fetchData = async (url , requestType, dispatch, body = {}) => {
  try {
    let response;
    
    switch (requestType) {
      case 'GET':
        response = await axios.get(url);
        dispatch({type:TYPES.SET_DATA, payload: response.data});
        break;
      



        case 'POST':
        response = await axios.post(url, body);
        let record = JSON.parse(body);
        dispatch({type:TYPES.POST_DATA, payload:record})
        console.log('JSON', record);
        break;






      case 'PUT':
        response = await axios.put(url, body);
        //!dispatch({type:TYPES.SET_DATA, payload: response.data });
        break;
      case 'DELETE':
        response = await axios.delete(url, { data: body });
        //!dispatch({type:TYPES.SET_DATA, payload: response.data });
        break;
      default:
        console.error(`Unknown type of de request: ${requestType}`);
        return;
    }

  
  } catch (error) {
    dispatch({type:TYPES.NOT_DATA, payload:error});
  }
};
