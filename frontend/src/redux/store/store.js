import { combineReducers } from "redux";
import registrationReducer from "../reducers/registrationReducer";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import productsReducer from "../reducers/allProductsReducer";
import quotesReducer from "../reducers/quotesReducer";
import requestReducer from "../reducers/requestReducer";
import profileReducer from "../reducers/profileReducer";

const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  allProducts: productsReducer,
  quotes: quotesReducer,
  request: requestReducer,
  profile: profileReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
