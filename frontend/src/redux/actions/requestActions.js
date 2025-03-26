export const ADD_REQUEST = "ADD_REQUEST";
export const REQUEST_SUBMITTED = "REQUEST_SUBMITTED";
export const RESET_REQUEST_STATE = "RESET_REQUEST_STATE";

// metodo associato alla registrazione di una nuova richiesta
export const userRequest = (newRequest) => ({
  type: ADD_REQUEST,
  payload: newRequest
});

export const checkRequestSubmitted = (hasSubmitted) => ({
  type: REQUEST_SUBMITTED,
  payload: hasSubmitted
});

export const resetRequestState = () => ({
  type: RESET_REQUEST_STATE
});

export const addNewRequest = (request) => {
  console.log(request);
  return async (dispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });

      if (response.ok) {
        const newUserRequest = await response.json();

        // riferisco che il form è stato submittato correttamente
        dispatch(userRequest(newUserRequest));
        dispatch(checkRequestSubmitted(true));
      } else {
        console.log("Errore nell'invio del form");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
