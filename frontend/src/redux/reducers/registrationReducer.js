import { ADD_USER, HAS_SUBMITTED, REGISTRATION_FAILED, RESET_FORM, RESET_REGISTRATION_STATE, SPINNER_LOADING } from "../actions/registrationActions";

const initialStateRegistration = {
  users: [],
  resetForm: false, // variabile di controllo per il reset del form
  isLoading: false, // variabile di controllo per il loading con spinner
  hasSubmitted: false, // variabile che controlla quando il form è stato inviato
  registrationFailed: false // variabile che controlla se la registrazione è andata a buon fine
};

const registrationReducer = (state = initialStateRegistration, action) => {
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

    case SPINNER_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }

    case HAS_SUBMITTED: {
      return {
        ...state,
        hasSubmitted: action.payload
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationFailed: action.payload
      };
    }
    case RESET_REGISTRATION_STATE:
      return initialStateRegistration;

    default:
      return state;
  }
};

export default registrationReducer;
