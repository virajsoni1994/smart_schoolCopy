import axios from "axios";
import { FETCH_USERS } from "./types";

export const loginInsertUpdate = (data, nodeId) => async dispatch =>{
  await axios({
    method:"post",
    url:"http://localhost:5000/login/api/usersLogin",
    data:data
   })
  .then(res=>{
    //console.log(res.data);
    if(!res.data.error){
      try{
        dispatch({ type: FETCH_USERS, payload: res.data.data[0]});
      }
      catch(exc){
        console.log("Exception", exc);
      }
    }
  })
  .catch(e=>{
    console.log("error", JSON.stringify(e));
  })
}

