import { useState , useContext } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
// import { useAuth } from "../context";

function Signin() {
  // const { login } = useContext(useAuth);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
const [message, setMessage] = useState("");
const [formData, setFormData] = useState({
  email: "",
  password: ""
 });
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("Form Data:", formData);
    try {
      const response = await loginUser( formData );
       setMessage(response.message);
      if (response.success) {
  //  login(response.user);
     navigate("/user");
 }
         } catch (error) {
 setMessage(error.message);
 console.error("Registration Error:", error);
        } 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    
 const togglePassword = (e) => {
   e.preventDefault();
   setShowPassword((prev) => !prev);
 };

  return (
    <div className=' flex flex-col gap-4 items-center text-sm font-inter w-full'>
      <form className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '>
        <h1 className=' font-[700] text-2xl font-space '>Sign In</h1>
        <div className='flex flex-col w-full gap-[25px]'>
          <div className=' p-4 relative  border-1 text-text-dark-gray'>
            <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
              Email Address
              <span className='text-red-500'>*</span>
            </label>
            <input
              placeholder='someone@example.com'
              className='placeholder-input-text w-full focus:outline-none'
              type='email'
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
            <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
              Password<span className='text-red-500'>*</span>
            </label>
            <input
              placeholder='*******'
              type={showPassword ? "text" : "password"}
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='placeholder-input-text w-full focus:outline-none'
              required
            />
            <button
              onClick={togglePassword}
              className='absolute right-0 h-full   p-2 text-text-dark-gray'
            >
              {showPassword ? (
                <i className='fa-solid fa-eye-slash'></i> // Hide icon
              ) : (
                <i className='fa-solid fa-eye'></i> // Show icon
              )}
            </button>
          </div>
        </div>
        <NavLink to={"/forgot-password"}>
          {" "}
          <p className='text-text-dark-gray hover:underline'>
            Forgot password?
          </p>
        </NavLink>
        <button
          type='submit'
          onClick={handleSubmit}
          className='bg-background  w-full font-bold text-xl text-white py-3'
        >
          Sign In
        </button>
      </form>
      {message && (
        <p
          className={
            message === "User created successfully"
              ? "text-green"
              : "text-red-500"
          }
        >
          {message}
        </p>
      )}
      <p className='text-text-dark-gray flex gap-4 flex-col items-center'>
        Don't have an account?
        <NavLink
          to={"/sign-up"}
          className={"hover:underline font-bold text-background"}
        >
          Register here
        </NavLink>
      </p>
    </div>
  );
}

export default Signin;
