export const UPDATE_PRODUCTS_PAGE = "UPDATE_PRODUCTS_PAGE";
// export const BUY_PRODUCT = "BUY_PRODUCT";

const allProductsPage = (allProducts) => ({
  type: UPDATE_PRODUCTS_PAGE,
  payload: allProducts
});

// const buyHeater = () => ({
//   type: BUY_PRODUCT
// });

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

// fetch per acquistare una macchina
export const buyProduct = (username, heaterId) => {
  return async () => {
    try {
      const response = await fetch("http://localhost:8080/user/buyProduct/" + username + "/" + heaterId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        console.log(response);
      } else {
        console.log("errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
