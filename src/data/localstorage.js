const USER_KEY = "user"; // Key for storing user data

// Save user data to local storage
export const saveUser = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

// Get user data from local storage
export const getUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

// Remove user data from local storage (logout)
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};
