export const UPDATE_PRODUCTS_PAGE = "UPDATE_PRODUCTS_PAGE";

const ProductsPage = (Products) => ({
  type: UPDATE_PRODUCTS_PAGE,
  payload: Products
});

// fetch che carica le pagine con i prodotti
export const buildProductsPage = (product) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8080/user/" + product);
      if (response.ok) {
        const data = await response.json();
        dispatch(ProductsPage(data));
      } else {
        console.log("Errore");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
