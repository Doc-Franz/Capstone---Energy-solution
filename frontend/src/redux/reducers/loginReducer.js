import { HAS_SUBMITTED, IS_REGISTERED, RESET_LOGIN, RESET_LOGIN_STATE } from "../actions/loginAction";

export const initialStateLogin = {
  resetLogin: false, // variabile di controllo per il reset del form
  isRegistered: false, // variabile che controlla se lo user è registrato
  hasSubmitted: false // variabile che controlla se l'utente ha già effettuato il submit per il login
};

const loginReducer = (state = initialStateLogin, action) => {
  switch (action.type) {
    case RESET_LOGIN:
      return {
        ...state,
        resetLogin: !state.resetLogin
      };
    case IS_REGISTERED:
      return {
        ...state,
        isRegistered: action.payload
      };
    case HAS_SUBMITTED:
      return {
        ...state,
        hasSubmitted: action.payload
      };
    case RESET_LOGIN_STATE:
      return initialStateLogin;

    default:
      return state;
  }
};

export default loginReducer;
