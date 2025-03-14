import { loadStripe } from "@stripe/stripe-js";

export const UPDATE_PRODUCTS_PAGE = "UPDATE_PRODUCTS_PAGE";
export const PREVENTIVE_PRODUCTS_PAGE = "PREVENTIVE_PRODUCTS_PAGE";

const allProductsPage = (allProducts) => ({
  type: UPDATE_PRODUCTS_PAGE,
  payload: allProducts
});

const preventiveProductPage = (preventiveProducts) => ({
  type: PREVENTIVE_PRODUCTS_PAGE,
  payload: preventiveProducts
});

// fetch che carica una pagina con i prodotti che soddisfano i parametri inseriti in building evaluation
export const allPreventiveProducts = (power) => {
  return async (dispatch) => {
    try {
      // passo power come query string
      const response = await fetch(`http://localhost:8080/user/preventiveProducts?power=${power}`);

      if (response.ok) {
        const data = await response.json();
        dispatch(preventiveProductPage(data));
      } else {
        console.log("errore");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// fetch che carica le pagine con i prodotti
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
    // caricamento della libreria stripe utilizzando la chiave pubblicabile
    const stripe = await loadStripe("pk_test_51R2E70RvZG041WSozJBdsotDKeGkogDJotMyVao4a0JLsvp3qoEOE8uoqr8sCOuawFxniPpBbPjZ3w3bRD1p0FUQ002UIZ6DiM");

    try {
      const response = await fetch("http://localhost:8080/user/buyProduct/" + username + "/" + heaterId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const session = await response.json();

        if (session && session.id) {
          // reindirizzamento alla pagina di stripe, se la sessione contiene un ID valido
          const result = await stripe.redirectToCheckout({
            sessionId: session.id
          });

          if (result.error) {
            console.error(result.error.message);
          }
        } else {
          console.log("Session ID non disponibile");
        }
      } else {
        console.log("Errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
