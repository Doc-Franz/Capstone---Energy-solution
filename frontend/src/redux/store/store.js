import { combineReducers } from "redux";
import registrationReducer from "../reducers/registrationReducer";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import productsReducer from "../reducers/allProductsReducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  allProducts: productsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
