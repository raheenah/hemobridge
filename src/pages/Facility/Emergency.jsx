import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/book-open-02.png";


function Emergency_Requests() {
  return (
    <div className='bg-background-grey text-text-gray flex flex-col gap-4 justify-center items-center h-[100dvh] w-full'>
      <i className='fa-solid fa-hospital text-9xl'></i>{" "}
      <p className='text-text-gray font-bold text-lg'>
        Emergency Requests Coming Soon
      </p>
    </div>
  );
}

export default Emergency_Requests;
