export const setDataInLocalStorage = (data) => {
  window.localStorage.setItem("userData", JSON.stringify(data));
};

export const getDataInLocalStorage = () => {
  const userData = window.localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

export const removeDataInLocalStorage = () => {
  window.localStorage.clear();
};
