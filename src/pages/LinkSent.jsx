import { useState } from "react";
import { NavLink } from "react-router-dom";


function LinkSent() {
  return (
    <div className=' flex items-center font-inter w-full'>
      <div className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '>
        <h1 className=' font-[700] font-space text-[32px]'>Reset Link Sent</h1>

        <p>
          An email containing the password reset link has been sent to
          <b className="bg-blue-400">  "Supposed user"</b>.
        </p>

        <button className='bg-background p-4  w-full font-bold text-xl text-white py-3'>
          Send Password Reset Link{" "}
        </button>
       
      </div>
    </div>
  );
}

export default LinkSent;
