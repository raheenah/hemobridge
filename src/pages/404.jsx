import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../assets/Hemobridge Logomark.png";
import Text from "../assets/Hemobridge Logo text.png";


function NotFound() {
  return (
    <div className='bg-background-grey text-text-gray flex flex-col justify-center items-center h-[100dvh] w-full'>
      <div className="flex items-center">
        <img src={Icon} alt='logo' className=' h-40' />
        <img src={Text} alt='logo' className=' h-60' />
      </div>
      <p className='text-gray-500 font-medium text-lg'>
        We can't find the page you are looking for, {" "}
        <NavLink
          to='/'
          className='text-primary-blue text-background  font-extrabold'
        >
          Sign In
        </NavLink>?
      </p>
    </div>
  );
}

export default NotFound;
