export const USER_INFO = "USER_INFO";
export const UPDATE_PROFILE_INFO = "UPDATE_PROFILE_INFO";

export const updateProfilePage = (userInfo) => ({
  type: USER_INFO,
  payload: userInfo
});

export const updateProfileInfo = (updatedInfo) => ({
  type: UPDATE_PROFILE_INFO,
  payload: updatedInfo
});

export const getUserInfo = (username) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/profile/${username}`);
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("avatar", data.avatar);
        dispatch(updateProfilePage(data));
      } else {
        console.log("Errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProfileInfo = (userInfoModified, avatar, username) => {
  const formData = new FormData();

  formData.append("user", new Blob([JSON.stringify(userInfoModified)], { type: "application/json" }));
  if (avatar) {
    formData.append("avatar", avatar);
  }

  return async (dispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/profile/editProfile/${username}`, {
        method: "PATCH",
        body: formData
      });

      if (response.ok) {
        const updatedInfo = await response.json();
        dispatch(updateProfileInfo(updatedInfo));

        // aggiornamento dello storage
        const username = sessionStorage.setItem("username", userInfoModified.username);
        dispatch(getUserInfo(username));
      }
    } catch (error) {
      console.log("Errore nella fetch ", error);
    }
  };
};
