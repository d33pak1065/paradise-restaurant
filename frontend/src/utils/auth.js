export const setAuth = (token, user) => {
  localStorage.setItem('paradise_token', token);
  localStorage.setItem('paradise_user', JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem('paradise_token');
  localStorage.removeItem('paradise_user');
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('paradise_user'));
  } catch {
    return null;
  }
};
