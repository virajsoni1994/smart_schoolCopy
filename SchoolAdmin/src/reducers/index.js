import { combineReducers } from "redux";
import standardMaster from "./standardMaster";
import divisionMaster from "./divisionMaster";
import update from "./update";
import auth from "./auth";

export default combineReducers({
    update,
    auth,
    standardMaster,
    divisionMaster
})