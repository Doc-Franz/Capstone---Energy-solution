export const ADD_USER = "ADD_USER";
export const RESET_FORM = "RESET_FORM";
export const SPINNER_LOADING = "SPINNER_LOADING";
export const HAS_SUBMITTED = "HAS_SUBMITTED";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const RESET_REGISTRATION_STATE = "RESET_REGISTRATION_STATE";

// metodo associato alla registrazione di un nuovo utente
const userRegistration = (newUser) => ({
  type: ADD_USER,
  payload: newUser
});

export const resetFormAction = () => ({
  type: RESET_FORM
});

export const spinnerLoading = (isLoading) => ({
  type: SPINNER_LOADING,
  payload: isLoading
});

export const checkHasSubmitted = (hasSubmitted) => ({
  type: HAS_SUBMITTED,
  payload: hasSubmitted
});

export const checkRegistration = (failed) => ({
  type: REGISTRATION_FAILED,
  payload: failed
});

export const resetRegistrationState = () => ({
  type: RESET_REGISTRATION_STATE
});

// fetch POST per registrare un nuovo user
export const addUser = (user, avatar) => {
  const formData = new FormData();

  // BLOB -> Binary Large Object è un oggetto che converte file in un formato facilmente inviata in una richiesta HTTP
  // convertiamo l'oggetto in un formato leggibile dal backend
  // BLLOB vuole un array, che conterrà la stringa dell'oggetto in formatoJSON -> [JSON.stringify(user)]
  formData.append("user", new Blob([JSON.stringify(user)], { type: "application/json" }));
  formData.append("avatar", avatar);

  return async (dispatch) => {
    try {
      dispatch(spinnerLoading(true)); // il loading viene mostrato
      dispatch(checkHasSubmitted(false)); // il form viene resettato
      dispatch(checkRegistration(false)); // l'errore di registrazione viene resettato

      const response = await fetch(`${import.meta.env.VITE_URL}/user/new`, {
        method: "POST",
        body: formData
      });

      setTimeout(() => {
        dispatch(spinnerLoading(false)); // dopo la risposta della fetch il loading viene nascosto dopo 3 sec
      }, 1500);

      dispatch(checkHasSubmitted(true)); // il form è stato inviato

      if (response.ok) {
        const newUser = await response.json();
        // aggiunta dell'utente nello store
        dispatch(userRegistration(newUser));

        // la prorietà resetForm viene aggiornata nello store per permettere di resettare il form
        dispatch(resetFormAction()); // reset del form
      } else {
        console.log("Errore nella registrazione dell'utente");
        dispatch(checkRegistration(true));
      }
    } catch (error) {
      console.log("Errore durante la fetch di registrazione utente: ", error);
      dispatch(spinnerLoading(false));
      dispatch(checkRegistration(true));
    }
  };
};
