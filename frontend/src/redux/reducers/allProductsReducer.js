import { PREVENTIVE_PRODUCTS_PAGE, RESET_PRODUCTS_PAGE, UPDATE_ALL_PRODUCTS_PAGE, UPDATE_PRODUCTS_PAGE } from "../actions/allProductsActions";

const initialStateProducts = {
  allProductsContent: null, // oggetto che contiene tutti i prodotti divisi per paginazione
  content: [], // array che contiene i prodotti specifici
  preventiveContent: [] // array che contiene i prodotti derivati dal calcolo in building evaluation
};

const productsReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case UPDATE_ALL_PRODUCTS_PAGE:
      return {
        ...state,
        allProductsContent: action.payload
      };
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
    case RESET_PRODUCTS_PAGE:
      return initialStateProducts;
    default:
      return state;
  }
};

export default productsReducer;
