export const ADD_USER = "ADD_USER";
export const RESET_FORM = "RESET_FORM";

// metodo associato alla registrazione di un nuovo utente
const userRegistration = (newUser) => ({
  type: ADD_USER,
  payload: newUser
});

export const resetFormAction = () => ({
  type: RESET_FORM
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
      const response = await fetch("http://localhost:8080/user/new", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const newUser = await response.json();
        // aggiunta dell'utente nello store
        dispatch(userRegistration(newUser));

        // la prorietà resetForm viene aggiornata nello store per permettere di resettare il form
        dispatch(resetFormAction());
      } else {
        console.log("Errore nella registrazione dell'utente");
        return null;
      }
    } catch (error) {
      console.log("Errore durante la fetch di registrazione utente: ", error);
      return null;
    }
  };
};
