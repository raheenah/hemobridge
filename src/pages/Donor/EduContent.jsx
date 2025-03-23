import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/book-open-02.png";


function EduContent() {
  return (
    <div className='bg-background-grey flex flex-col justify-center items-center h-[100dvh] w-full'>
      <img src={Icon} alt='Icon' className=' ' />
      <p className="text-text-gray font-bold text-lg">Educational Content Coming Soon</p>
    </div>
  );
}

export default EduContent;
