const USER_KEY = "user"; 

export const saveUser = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const getUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};
