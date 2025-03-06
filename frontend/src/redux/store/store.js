import { combineReducers } from "redux";
import registrationReducer from "../reducers/registrationReducer";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
