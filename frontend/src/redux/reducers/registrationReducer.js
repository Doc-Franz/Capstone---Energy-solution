import { ADD_USER, RESET_FORM } from "../actions/registrationActions";

const initialState = {
  users: [],
  resetForm: false // variabile di controllo per il reset del form
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    case RESET_FORM: {
      return {
        ...state,
        resetForm: !state.resetForm
      };
    }
    default:
      return state;
  }
};

export default registrationReducer;
