import { GET_AVATAR, GET_USERNAME, GO_TO_HOMEPAGE, HAS_SUBMITTED, IS_REGISTERED, RESET_LOGIN, RESET_LOGIN_STATE } from "../actions/loginAction";

export const initialStateLogin = {
  avatar: null,
  username: null,
  resetLogin: false, // variabile di controllo per il reset del form
  isRegistered: false, // variabile che controlla se lo user è registrato
  hasSubmitted: false, // variabile che controlla se l'utente ha già effettuato il submit per il login
  goToHomepage: false // variabile che controlla lo spinner per il reindirizzamento all'homepage dopo il login
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
    case GO_TO_HOMEPAGE:
      return {
        ...state,
        goToHomepage: action.payload
      };
    case GET_AVATAR:
      return {
        ...state,
        avatar: action.payload
      };
    case GET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case RESET_LOGIN_STATE:
      return { ...initialStateLogin, avatar: state.avatar, username: state.username };

    default:
      return state;
  }
};

export default loginReducer;
