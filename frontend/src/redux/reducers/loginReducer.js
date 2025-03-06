import { RESET_LOGIN } from "../actions/loginAction";

const initialState = {
  resetLogin: false // variabile di controllo per il reset del form
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LOGIN:
      return {
        ...state,
        resetLogin: !state.resetLogin
      };
    default:
      return state;
  }
};

export default loginReducer;
