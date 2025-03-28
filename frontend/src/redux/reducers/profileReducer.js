import { UPDATE_PROFILE_INFO, USER_INFO } from "../actions/profileActions";

const initialStateProfile = {
  user: null,
  userUpdated: null
};

const profileReducer = (state = initialStateProfile, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        user: action.payload
      };
    case UPDATE_PROFILE_INFO:
      return {
        ...state,
        userUpdated: action.payload
      };
    default:
      return state;
  }
};

export default profileReducer;
