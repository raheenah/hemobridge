import { useState } from "react";
import { NavLink } from "react-router-dom";


function ResetPassword() {

    


  return (
    <div className=' flex items-center font-inter w-full'>
      <div className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '>
        <h1 className=' font-[700] font-space text-[32px]'>Sign In</h1>
        <div className='flex flex-col w-full gap-[25px]'>
          <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
            <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
              New Password<span className='text-red-500'>*</span>
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
          <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
            <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
             Confirm New Password<span className='text-red-500'>*</span>
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

        <button className='bg-background  w-full font-bold text-xl text-white py-3'>
          Reset{" "}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
