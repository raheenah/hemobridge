import { useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";


function ForgotPassword() {
  const navigate = useNavigate();
    


  return (
    <div className=' flex items-center font-inter w-full'>
      <div className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '>
        <h1 className=' font-[700] font-space text-2xl'>Forgot Password</h1>
        <div className='flex flex-col w-full gap-[25px]'>
          <div className=' p-4 relative border border-1 text-text-dark-gray'>
            <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
              Email Address
              <span className='text-red-500'>*</span>
            </label>
            <input
              placeholder='someone@example.com'
              className='placeholder-input-text w-full focus:outline-none'
              type='email'
              required
            />
          </div>
        </div>

        <button
          onClick={() => navigate("/reset-link-sent")}
          className='bg-background px-4  w-full font-bold text-lg text-white py-3'
        >
          Send Password Reset Link{" "}
        </button>
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
    </div>
  );
}

export default ForgotPassword;
