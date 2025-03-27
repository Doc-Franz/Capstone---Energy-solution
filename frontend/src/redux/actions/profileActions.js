export const USER_INFO = "USER_INFO";

export const updateProfilePage = (userInfo) => ({
  type: USER_INFO,
  payload: userInfo
});

export const getUserInfo = (username) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/profile/${username}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(updateProfilePage(data));
      } else {
        console.log("Errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
