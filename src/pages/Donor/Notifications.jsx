import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/book-open-02.png";


function Notifications() {
  return (
    <div className='bg-background-grey text-text-gray flex flex-col gap-4 justify-center items-center h-[100dvh] w-full'>
      <i className='fa-solid fa-bell text-9xl'></i>{" "}
      <p className='text-text-gray font-bold text-lg'>
        Notifications Coming Soon
      </p>
    </div>
  );
}

export default Notifications;
