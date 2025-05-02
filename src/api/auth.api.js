import axios from "axios";


//     ? "http://localhost:8000"

const BASE_URL = "https://hemobridge-project.onrender.com";


     //signup or register donor
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register/donor`, userData);
    // console.log("Registration Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    // console.log("Registration Error:");
    throw (
      
      error.response?.data || { success: false, message: "An error occurred" }
    
    );
  }
};



  //signup or register facility
export const registerFacility = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/register/facility`,
      userData
    );
    // console.log("Registration Response:", response.data);
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
    const response = await axios.post(`/api/auth/login`, userData)
    .catch((error)=> { throw error })
    
    return response.data; 

  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw (
      error.response?.data || { success: false, message: "An error occurred" }
    );
  }
};





// resend verification
export const resendVerification = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/resend-verification-email`,
      userData
    );
    // console.log("Login Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw (
      error.response?.data || { success: false, message: "An error occurred" }
    );
  }
};


// verify email
export const verifyEmail = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verify-email`,
      userData
    );
    // console.log("Login Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw (
      error.response?.data || { success: false, message: "An error occurred" }
    );
  }
};