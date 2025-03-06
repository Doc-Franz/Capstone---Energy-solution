export const RESET_LOGIN = "RESET_LOGIN";
export const IS_REGISTERED = "IS_REGISTERED";
export const HAS_SUBMITTED = "HAS_SUBMITTED";
export const RESET_LOGIN_STATE = "RESET_LOGIN_STATE";

export const resetLoginAction = () => ({
  type: RESET_LOGIN
});

// metodo che controlla se l'utente che effettua il login è registrato
export const checkUserLogin = (isRegistered) => ({
  type: IS_REGISTERED,
  payload: isRegistered
});

// metodo che controlla se l'utente ha già effettuato il submit del login
export const checkLoginSubmit = (hasSubmitted) => ({
  type: HAS_SUBMITTED,
  payload: hasSubmitted
});

// azione che resetta lo stato del login al caricamento della pagina
export const resetLoginState = () => ({
  type: RESET_LOGIN_STATE
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
      dispatch(checkUserLogin(false)); // reset della variabile di controllo sul login
      dispatch(checkLoginSubmit(false)); // reset della variabile di controllo sul submit login

      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(userLogin)
      });

      dispatch(checkLoginSubmit(true));

      if (response.ok) {
        const loginResponse = await response.json();
        console.log(loginResponse.token);

        // il token viene salvato nel local storage
        localStorage.setItem("token", loginResponse.token);

        // la prorietà resetLogin viene aggiornata nello store per permettere di resettare il form
        dispatch(resetLoginAction());

        dispatch(checkUserLogin(true)); // se l'utente è validato viene garantito l'accesso
      } else {
        console.log("Errore nel login dell'utente");
      }
    } catch (error) {
      console.log("Errore nel login dell'utente ", error);
    }
  };
};
