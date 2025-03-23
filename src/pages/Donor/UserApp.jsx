import { useState } from "react";
import Logo from "../../assets/Vector.svg";
import { NavLink, Outlet , useLocation } from "react-router-dom";

function UserApp() {
  const location = useLocation();
  

  return (
    <div className='flex  min-h-screen h-screen '>
      <div className='w-full flex flex-col '>
        <section className='w-full  pr-8 my-2  flex  gap- '>
          <div className='flex  w-full  items-center justify-between  '>
            <div className='w-[25%] relative  flex flex-col justify-between'>
              <div className='flex items-center pl-8   gap-2  w-full'>
                <img src={Logo} className='h-5' />
                <h1 className=' font-bold text-2xl text-background w-full '>
                  HemoBridge
                </h1>
              </div>
            </div>
            <div className='flex  w-full justify-between'>
              <div className='w-0.5 my-2  bg-background-grey'></div>

              <div className='flex   items-center justify-self-start  gap-4 '>
                <div classsName='flex flex-col '>
                  <p className='text-base text-right text-input-text'>
                    Welcome back,
                  </p>
                  <p className='font-semibold text-right text-xl'>
                    Juwon Ajiboye
                  </p>
                </div>
                <img src={Logo} className='rounded-full' />{" "}
              </div>
            </div>
          </div>
        </section>

        <section className='h-full w-full   flex'>
          <div className='w-[25%] flex flex-col gap-6 pb-6 px-4 border-background-grey  '>
            <div className='w-full h-0.5 top-0 mx-auto  bg-background-grey'></div>
            <div className='flex flex-col gap-2'>
              <NavLink
                className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/dashboard"
                    ? "bg-background text-white"
                    : ""
                }
                `}
              >
                <i className='fa-solid fa-boxes-stacked'></i>
                <p>Dashboard</p>
              </NavLink>
              <NavLink
                to={"/user/donate"}
                className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/donate"
                    ? "bg-background text-white"
                    : ""
                }
                `}
              >
                <i className='fa-solid fa-droplet'></i> <p>Donate</p>
              </NavLink>
              <NavLink
                className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/notifications"
                    ? "bg-background text-white"
                    : ""
                }
                `}
              >
                <i className='fa-regular fa-bell'></i>
                <p>Notifications</p>
              </NavLink>
              <NavLink
                to={"/user/educational-content"}
                className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/educational-content"
                    ? "bg-background text-white"
                    : ""
                }
                `}
              >
                <i className='fa-solid fa-book'></i> <p>Educational Content</p>
              </NavLink>
            </div>

            <div className='w-full h-0.5 top-0 mx-auto  bg-background-grey'></div>

            <div className='flex flex-col gap-2'>
              <NavLink
                to={"/user/account"}
                className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/account"
                    ? "bg-background text-white"
                    : ""
                }
                `}
              >
                <i className='fa-regular fa-circle-user'></i>
                <p>My Account</p>
              </NavLink>
              <NavLink
                className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/help"
                    ? "bg-background text-white"
                    : ""
                }
                `}
              >
                <i className='fa-regular fa-circle-question'></i>{" "}
                <p>Help & Support</p>
              </NavLink>
            </div>

            <div className='flex flex-col gap-2 mt-auto '>
              <div className='w-full h-0.5 top-0 mx-auto  bg-background-grey'></div>

              <button className='flex items-center justify-left   text-text-dark-gray gap-4 p-4'>
                <i className='fa-solid fa-arrow-right-from-bracket'></i>{" "}
                <p>Log out</p>
              </button>
            </div>
          </div>
          <div className='w-full h-full p-4 bg-background-grey'>
            <Outlet />
          </div>{" "}
        </section>
      </div>
    </div>
  );
}

export default UserApp;
