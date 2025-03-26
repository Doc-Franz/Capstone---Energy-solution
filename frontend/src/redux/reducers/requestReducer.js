import { ADD_REQUEST, REQUEST_SUBMITTED, RESET_REQUEST_STATE } from "../actions/RequestActions";

const initialStateRequest = {
  request: [],
  hasSubmitted: false
};

const requestReducer = (state = initialStateRequest, action) => {
  switch (action.type) {
    case ADD_REQUEST:
      return {
        ...state,
        request: [...state.request, action.payload]
      };
    case REQUEST_SUBMITTED:
      return {
        ...state,
        hasSubmitted: action.payload
      };
    case RESET_REQUEST_STATE:
      return initialStateRequest;
    default:
      return state;
  }
};

export default requestReducer;
