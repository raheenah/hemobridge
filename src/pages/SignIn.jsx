import { useState } from "react";
import { NavLink } from "react-router-dom";
import { loginUser } from "../api/auth.api";
// import { useAuth } from "../context";
import { useRoleNavigation } from "src/shared/hooks/use-role-navigation";

function Signin() {

  const { navigateByRole } = useRoleNavigation()
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(formData)
    .then((res)=> {
      console.log(res.user.role)
      setMessage(res.message);
      navigateByRole(res.user.role)
    })
    .catch((error)=> {
      setMessage(error.message)
    })
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className=' flex flex-col gap-4 items-center text-sm font-inter w-full'>
      <form
        onSubmit={handleSubmit}
        className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '
      >
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
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className=' p-4 relative flex items-center  border-1 text-text-dark-gray'>
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
            <span
              onClick={togglePassword}
              className='absolute right-0 h-full inline-block top-[50%] translate-y-[-15%] px-2   text-text-dark-gray'
            >
              {showPassword ? (
                <i className='fa-solid fa-eye-slash'></i> // Hide icon
              ) : (
                <i className='fa-solid fa-eye'></i> // Show icon
              )}
            </span>
          </div>
        </div>
        <NavLink to={"/forgot-password"}>
          {" "}
          <p className='text-red  hover:underline'>Forgot password?</p>
        </NavLink>
        <button
          type='submit'
          onClick={handleSubmit}
          // className='bg-background  w-full font-bold text-xl text-white py-3'
          className='bg-background hover:bg-pink  mx-auto w-full max-w-[80%] font-bold text-base text-white py-2 px-4'
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
