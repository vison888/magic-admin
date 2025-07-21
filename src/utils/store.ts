export const PREFIX = 'MAGIC_PLAT';
export const getLocal = (key: string) => localStorage.getItem(key);
export const setLocal = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const setLoginResult = (token: string, userId: string) => {
  localStorage.setItem(`${PREFIX}-token`, token);
  localStorage.setItem(`${PREFIX}-userId`, userId);
};

export const setToken = (token: string) => {
  localStorage.setItem(`${PREFIX}-token`, token);
};

export const getToken = () => {
  return localStorage.getItem(`${PREFIX}-token`) ?? '';
};

export const setUserId = (userID: string) => {
  return localStorage.setItem(`${PREFIX}-userId`, userID);
};

export const getUserId = () => {
  return localStorage.getItem(`${PREFIX}-userId`) ?? '';
};
