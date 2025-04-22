import { useState } from "react";
import { NavLink } from "react-router-dom";


function PasswordResetSuccess() {
  return (
    <div className=' flex items-center font-inter w-full'>
      <div className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '>
        <h1 className=' font-[700] font-space text-[32px]'>
          Password Reset Successful
        </h1>

        <p className='w-[70%] mx-auto'>
          You have successfully reset your account password. Return to the Sign
          In page and log in with your new password.
        </p>

        <button className='bg-background hover:bg-pink  mx-auto w-full max-w-[80%]  font-bold text-base text-white py-2 px-4'>
          Sign In{" "}
        </button>
      </div>
    </div>
  );
}

export default PasswordResetSuccess;
