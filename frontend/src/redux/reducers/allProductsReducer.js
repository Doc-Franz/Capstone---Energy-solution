import { PREVENTIVE_PRODUCTS_PAGE, UPDATE_PRODUCTS_PAGE } from "../actions/allProductsActions";

const initialStateProducts = {
  content: [], // array che contiene tutti i prodotti
  preventiveContent: [] // array che contiene i prodotti derivati dal calcolo in building evaluation
};

const productsReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS_PAGE:
      return {
        ...state,
        content: action.payload
      };
    case PREVENTIVE_PRODUCTS_PAGE:
      return {
        ...state,
        preventiveContent: action.payload
      };
    default:
      return state;
  }
};

export default productsReducer;
