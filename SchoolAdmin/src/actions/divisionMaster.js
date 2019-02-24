import axios from "axios";
import { GET_DIVISIONDATA, UPDATE_DATA } from "./types";

export const getAllDivision = () => async dispatch => {
  await axios({
    method: "get",
    url: "http://localhost:5000/division/api/getDivision"
  })
    .then(res => {
        //console.log(res.data.error);
      if (!res.data.error) {
        console.log(res.data);
        try {
          dispatch({ type: GET_DIVISIONDATA, payload: res.data.data});
          
        } catch (exc) {
          console.log("exception", exc);
        }
      }
    })
    .catch(e => {
      console.log("catch error", JSON.stringify(e));
    });
};

export const divisionInsertUpdate = (data, nodeId) => async dispatch =>{
  await axios({
    method:"post",
    url:"http://localhost:5000/division/api/divisionInsertUpdate",
    data:data
   })
  .then(res=>{
    if(!res.data.error){
      try{
        const msg = {
          event: "success",
          action: data.Id === 0 ? "add" : "edit",
          page: "divisionMaster",
          nodeId: nodeId || 0,
          data: res.data.data
        };
        dispatch({ type: UPDATE_DATA, payload: msg });

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

export const divisionDelete = (data, nodeId) => async dispatch => {
  await axios({
    method: "post",
    url: "http://localhost:5000/division/api/divisionMasterDelete",
    data
  })
    .then(res => {
      //console.log(res);
      if (res.data.success) {
        try {
          const msg = {
            event: "success",
            action: "delete",
            page: "divisionMaster",
            nodeId: nodeId,
            data: {}
          };
          dispatch({ type: UPDATE_DATA, payload: msg });
        } catch (exc) {
          console.log("exception", exc);
        }
      }
    })
    .catch(e => {
      console.log("catch error", JSON.stringify(e));
    });
};