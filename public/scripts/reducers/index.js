import { combineReducers } from "redux";
import ui from "./ui";
import { routerReducer } from 'react-router-redux';


export default combineReducers({
    ui,
    routing: routerReducer
});
