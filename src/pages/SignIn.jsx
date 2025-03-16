import { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";


function Signin() {
const navigate = useNavigate();
    


  return (    <div className=' flex items-center text-sm font-inter w-full'>
      <div className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '>
        <h1 className=' font-[700] font-space '>Sign In</h1>
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
              required
            />
          </div>
          <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
            <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
              Password<span className='text-red-500'>*</span>
            </label>
            <input
              placeholder='*******'
              type='password'
              className='placeholder-input-text w-full focus:outline-none'
              required
            />
            <button className='absolute right-0 h-full   p-2 text-text-dark-gray'>
              <i className='fa-solid fa-eye'></i>
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
          onClick={() => navigate("/user")}
          className='bg-background  w-full font-bold text-xl text-white py-3'>
          Sign In
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

export default Signin;
