export const setDataInLocalStorage = () => {
  window.localStorage.setItem("isLoggedIn", true);
};

export const getDataInLocalStorage = () => {
  return window.localStorage.getItem("isLoggedIn");
};

export const removeDataInLocalStorage = () => {
  window.localStorage.clear();
};
