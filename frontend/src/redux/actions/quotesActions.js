export const USER_QUOTES = "USER_QUOTES";

const updateUserQuotes = (userQuotes) => ({
  type: USER_QUOTES,
  payload: userQuotes
});

// fetch che richiama tutti gli acquisti effettuati dall'utente
export const getUserQuotes = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8080/user/quotes/` + userId);

      if (response.ok) {
        const data = await response.json();
        dispatch(updateUserQuotes(data));
      } else {
        console.log("Nessun prodotto acquistato");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
