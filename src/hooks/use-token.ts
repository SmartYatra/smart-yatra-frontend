export const useToken = () => {
  const addTokenToLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
  };

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
  };

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
  };

  return {
    addTokenToLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage,
  };
};
