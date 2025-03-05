import { combineReducers } from "redux";
import registrationReducer from "../reducers/registrationReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  registration: registrationReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
