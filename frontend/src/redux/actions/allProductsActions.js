import { loadStripe } from "@stripe/stripe-js";

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
    const stripe = await loadStripe("pk_test_51R2E70RvZG041WSozJBdsotDKeGkogDJotMyVao4a0JLsvp3qoEOE8uoqr8sCOuawFxniPpBbPjZ3w3bRD1p0FUQ002UIZ6DiM");

    try {
      const response = await fetch("http://localhost:8080/user/buyProduct/" + username + "/" + heaterId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const session = await response.json(); // Aggiungi await per ottenere i dati

        if (session && session.id) {
          console.log(session.id);
          const result = await stripe.redirectToCheckout({
            sessionId: session.id
          });

          if (result.error) {
            console.error(result.error.message);
          }
        } else {
          console.log("Session ID non disponibile nella risposta");
        }
      } else {
        console.log("Errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
