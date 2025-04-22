import { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";


function LinkSent() {
  const navigate = useNavigate();


  return (
    <div className=' flex items-center font-inter w-full'>
      <div className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '>
        <h1 className=' font-[700] font-space text-[32px]'>Reset Link Sent</h1>

        <p className='w-[70%] mx-auto'>
          An email containing the password reset link has been sent to
          <b className='bg-blue-400'> "Supposed user"</b>.
        </p>

        <button
          onClick={() => navigate("/forgot-password")}
          className='bg-background hover:bg-pink  mx-auto w-full max-w-[80%]  font-bold text-base text-white py-2 px-4'
        >
          Reset Password{" "}
        </button>
      </div>
    </div>
  );
}

export default LinkSent;
