export const UPDATE_PRODUCTS_PAGE = "UPDATE_PRODUCTS_PAGE";

const allProductsPage = (allProducts) => ({
  type: UPDATE_PRODUCTS_PAGE,
  payload: allProducts
});

// fetch che carica le pagine con i proditti
export const buildProductsPage = (product) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8080/user/" + product);
      if (response.ok) {
        const data = await response.json();
        dispatch(allProductsPage(data));
      } else {
        console.log("Errore");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
