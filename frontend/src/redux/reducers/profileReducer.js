import { USER_INFO } from "../actions/profileActions";

const initialStateProfile = {
  user: null
};

const profileReducer = (state = initialStateProfile, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default profileReducer;
