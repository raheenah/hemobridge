import axios from "axios";

// const BASE_URL =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:8000"
//     : "https://hemobridge-project.onrender.com";

// const BASE_URL =
//   import.meta.env.MODE =
//      "https://hemobridge-project.onrender.com";
const BASE_URL = "https://hemobridge-project.onrender.com";


     //signin
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    console.log("Registration Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    // console.log("Registration Error:");
    throw (
      
      error.response?.data || { success: false, message: "An error occurred" }
    
    );
  }
};


// log in
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData);
    console.log("Login Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw (
      error.response?.data || { success: false, message: "An error occurred" }
    );
  }
};