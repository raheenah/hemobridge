import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/book-open-02.png";


function Help() {
  return (
    <div className='bg-background-grey text-text-gray flex flex-col gap-4 justify-center items-center h-full w-full'>
      <i className='fa-solid fa-headset text-9xl'></i>{" "}
      <p className='text-text-gray font-bold text-lg'>
        Help and Support Coming Soon
      </p>
    </div>
  );
}

export default Help;
