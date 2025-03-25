export const RESET_LOGIN = "RESET_LOGIN";
export const IS_REGISTERED = "IS_REGISTERED";
export const HAS_SUBMITTED = "HAS_SUBMITTED";
export const RESET_LOGIN_STATE = "RESET_LOGIN_STATE";
export const GO_TO_HOMEPAGE = "GO_TO_HOMEPAGE";
export const GET_AVATAR = "GET_AVATAR";
export const GET_USERNAME = "GET_USERNAME";

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

export const spinnerLoading = (pageLoading) => ({
  type: GO_TO_HOMEPAGE,
  payload: pageLoading
});

// azione che salva l'indirizzo dell'avatar
export const getAvatar = (avatar) => ({
  type: GET_AVATAR,
  payload: avatar
});

// azione che salva l'username dell'utente
export const getUsername = (username) => ({
  type: GET_USERNAME,
  payload: username
});

// fetch di prova
export const prova = (tokenUser) => {
  return async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/admin/prova`, {
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

      const response = await fetch(`${import.meta.env.VITE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(userLogin)
      });

      dispatch(checkLoginSubmit(true));

      if (response.ok) {
        const loginResponse = await response.json();

        // il token viene salvato nel session storage -> al refresh della pagina rimane salvato, si cancella solamente alla chiusura della scheda
        sessionStorage.setItem("token", loginResponse.token);
        sessionStorage.setItem("avatar", loginResponse.avatar);
        sessionStorage.setItem("username", loginResponse.username);
        sessionStorage.setItem("userId", loginResponse.id);

        // l'avatar viene salvato nello store
        dispatch(getAvatar(loginResponse.avatar));

        // username viene salvato nello store
        dispatch(getUsername(loginResponse.username));

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
