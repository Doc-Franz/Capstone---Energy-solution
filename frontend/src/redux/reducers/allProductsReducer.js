import { UPDATE_PRODUCTS_PAGE } from "../actions/allProductsActions";

const initialStateProducts = {
  content: []
};

const productsReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS_PAGE:
      return {
        ...state,
        content: action.payload
      };
    default:
      return state;
  }
};

export default productsReducer;
