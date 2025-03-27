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
        dispatch(updateProfilePage(data));
      } else {
        console.log("Errore nella fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProfileInfo = (userInfoModified, username) => {
  const formData = new FormData();

  formData.append("user", new Blob([JSON.stringify(userInfoModified)], { type: "application/json" }));
  formData.append("avatar", userInfoModified.avatar);

  return async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/user/profile/editProfile/${username}`, {
        method: "PATCH",
        body: formData
      });

      if (response.ok) {
        sessionStorage.setItem("username", userInfoModified.username);
      }
    } catch (error) {
      console.log("Errore nella fetch ", error);
    }
  };
};
