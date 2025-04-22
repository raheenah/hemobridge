import { createContext, useContext, useState , useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null; 
  });
  
  useEffect(() => {
    // if (user) {
    //   localStorage.setItem("user", JSON.stringify(user));
    //   console.log("User data saved to localStorage:", user);
    // } else {
    //   localStorage.removeItem("user");
    // }
  }, [user]);
  

   const login = (userData) => {
     setUser(userData);
   };

   const logout = () => {
     setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
