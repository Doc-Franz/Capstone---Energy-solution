export const RESET_LOGIN = "RESET_LOGIN";

export const resetLoginAction = () => ({
  type: RESET_LOGIN
});

// fetch di prova
export const prova = (tokenUser) => {
  return async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/prova", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenUser
        }
      });
      if (response.ok) {
        const stampaDiProva = await response.json();
        console.log(stampaDiProva);
      } else {
        console.log("Errore");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// fetch POST per effettuare il login di un utente
export const login = (userLogin) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(userLogin)
      });

      if (response.ok) {
        const loginResponse = await response.json();
        console.log(loginResponse.token);

        // il token viene salvato nel local storage
        localStorage.setItem("token", loginResponse.token);

        // la prorietà resetLogin viene aggiornata nello store per permettere di resettare il form
        dispatch(resetLoginAction());
      } else {
        console.log("Errore nel login dell'utente");
        return null;
      }
    } catch (error) {
      console.log("Errore nel login dell'utente ", error);
      return null;
    }
  };
};
