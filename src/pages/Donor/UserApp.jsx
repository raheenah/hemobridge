import { useState } from "react";
import Logo from "../../assets/Vector.svg";
import { Outlet } from "react-router-dom";

function UserApp() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex  min-h-screen '>
      <div className='w-full flex '>
        <section className='w-[25%] pl-4   flex flex-col gap- '>
          <div className='flex flex-col text-3xl  justify-between my-5 gap-2  '>
            <div className='flex items-center gap-2  w-full'>
              <img src={Logo} className='h-' />
              <h1 className=' font-bold text-background w-full '>HemoBridge</h1>
            </div>
            <div className='w-full  mx-auto h-1 bg-background-grey '></div>
          </div>
          <div className='flex flex-col mt-5 gap-4'>
            <div className='flex items-center justify-left   text-white gap-4 p-4 bg-background'>
              <i class='fa-solid fa-boxes-stacked'></i>
              <p>Dashboard</p>
            </div>
            <div className='flex items-center justify-left   text-white gap-4 p-4 bg-background'>
              <i class='fa-solid fa-boxes-stacked'></i>
              <p>Donate</p>
            </div>
            <div className='flex items-center justify-left  text-white gap-4 p-4 bg-background'>
              <i class='fa-solid fa-boxes-stacked'></i>
              <p>Educational Content</p>
            </div>
            <div className='flex items-center justify-left  text-white gap-4 p-4 bg-background'>
              <i class='fa-solid fa-boxes-stacked'></i>
              <p>My Account</p>
            </div>
            <div className='flex items-center justify-left   text-white gap-4 p-4 bg-background'>
              <i class='fa-solid fa-boxes-stacked'></i>
              <p>Help & Support</p>
            </div>
          </div>
        </section>
        <section className='h-full w-full'>
          <div className='w-full bg-blue-300 flex  justify-between '>
            <div className='w-1   bg-yellow-400 '></div>

            <div className='flex text-3xl  items-center justify-self-start my-5 gap-2 bg-red-300 '>
              <img src={Logo} className='h-' />
              <h1 className=' font-bold text-background'>HemoBridge</h1>
            </div>
          </div>
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default UserApp;
