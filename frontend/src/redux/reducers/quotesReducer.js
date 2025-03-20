import { USER_QUOTES } from "../actions/quotesActions";

const initialStateQuotes = {
  content: []
};

const quotesReducer = (state = initialStateQuotes, action) => {
  switch (action.type) {
    case USER_QUOTES:
      return {
        ...state,
        content: action.payload
      };
    default:
      return state;
  }
};

export default quotesReducer;
