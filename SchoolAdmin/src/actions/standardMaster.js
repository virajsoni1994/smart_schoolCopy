import axios from "axios";
import { GET_STANDARDDATA, UPDATE_DATA } from "./types";

export const getAllStandard = () => async dispatch => {
  await axios({
    method: "get",
    url: "http://localhost:5000/standard/api/getStandard"
  })
    .then(res => {
      //console.log(res.data.error);
      if (!res.data.error) {
        console.log(res.data);
        try {
          dispatch({ type: GET_STANDARDDATA, payload: res.data.data });
        } catch (exc) {
          console.log("exception", exc);
        }
      }
    })
    .catch(e => {
      console.log("catch error", JSON.stringify(e));
    });
};

export const standardInsertUpdate = (data, nodeId) => async dispatch => {
  await axios({
    method: "post",
    url: "http://localhost:5000/standard/api/standardInsertUpdate",
    data: data
  })
    .then(res => {
      if (!res.data.error) {
        try {
          const msg = {
            event: "success",
            action: data.Id === 0 ? "add" : "edit",
            page: "standardMaster",
            nodeId: nodeId || 0,
            data: res.data.data
          };
          dispatch({ type: UPDATE_DATA, payload: msg });
        } catch (exc) {
          console.log("Exception", exc);
        }
      }
    })
    .catch(e => {
      console.log("error", JSON.stringify(e));
    });
};

export const standardDelete = (data, nodeId) => async dispatch => {
  await axios({
    method: "post",
    url: "http://localhost:5000/standard/api/StandardMasterDelete",
    data
  })
    .then(res => {
      //console.log(res);
      if (res.data.success) {
        try {
          const msg = {
            event: "success",
            action: "delete",
            page: "standardMaster",
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
