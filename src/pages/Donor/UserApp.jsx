import { useState , useEffect } from "react";
import Logo from "../../assets/Vector.svg";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useProfileContext } from "../../shared/context/user-profile-context";


function UserApp() {

  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useProfileContext();
// console.log(user)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, user]);

  return (
    <div className='flex   min-h-screen h-screen '>
      <div className='w-full flex flex-col '>
        <section className='w-full  pr-8 my-2  flex  gap- '>
          <div className='flex   w-full  items-center justify-between  '>
            <div className='w-[25%] relative hidden md:flex flex-col justify-between'>
              <div className='flex items-center pl-2   gap-2  w-full'>
                <img src={Logo} className='h-5' />
                <h1 className=' font-bold text-xl text-background w-full '>
                  HemoBridge
                </h1>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {" "}
              <i className='fa-solid fa-bars pl-8'></i>
            </button>
            <div className='flex  md:w-full justify-between'>
              <div className='w-0.5 my-2 hidden md:inline bg-background-grey'></div>

              <div className='flex   items-center justify-self-start  gap-4 '>
                <div className='flex flex-col '>
                  <p className='text-xs text-right text-input-text'>
                    Welcome back,
                  </p>
                  <p className='font-semibold text-right text-sm'>
                    {user.user.firstName}{" "}
                  </p>
                </div>
                <img src={Logo} className='rounded-full' />{" "}
              </div>
            </div>
          </div>
        </section>

        <section className='h- w-full   flex'>
          <div className='w-[25%] hidden md:flex flex-col gap-4 pb-6 px-4 border-background-grey  '>
            <div className='w-full h-0.5 top-0 mx-auto  bg-background-grey'></div>
            <div className='flex flex-col gap-2'>
              <NavLink
                to={"/user/dashboard"}
                className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/dashboard"
                    ? "bg-background text-white"
                    : ""
                }
                `}
              >
                <i className='fa-solid fa-table-columns'></i>
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
                to={"/user/notifications"}
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
                to={"/user/help"}
                className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/help"
                    ? "bg-background text-white"
                    : ""
                }
                `}
              >
                <i className='fa-solid fa-headset'></i> <p>Help & Support</p>
              </NavLink>
            </div>

            <div className='flex flex-col gap-2 mt-auto '>
              <div className='w-full h-0.5 top-0 mx-auto  bg-background-grey'></div>

              <button
                onClick={() => {
                  navigate("/");
                  // logout();
                }}
                className='flex items-center justify-left   text-text-dark-gray gap-4 p-4'
              >
                <i className='fa-solid fa-arrow-right-from-bracket'></i>{" "}
                <p>Log out</p>
              </button>
            </div>
          </div>
          {isOpen && (
            <div
              onClick={(e) => {
                setIsOpen(!isOpen), e.stopPropagation();
              }}
              className='fixed bg-gray-400/30 z-[9999] w-full h-full '
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className='box slide-down z-500 bg-white flex flex-col gap-4 pb-6 px-4 border-background-grey  '
              >
                <div className='w-full h-0.5 top-0 mx-auto  bg-background-grey'></div>
                <div className='flex flex-col gap-2'>
                  <NavLink
                    to={"/user/dashboard"}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/dashboard"
                    ? "bg-background text-white"
                    : ""
                }
                `}
                  >
                    <i className='fa-solid fa-table-columns'></i>
                    <p>Dashboard</p>
                  </NavLink>
                  <NavLink
                    to={"/user/donate"}
                    onClick={() => {
                      setIsOpen(false);
                    }}
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
                    to={"/user/notifications"}
                    onClick={() => {
                      setIsOpen(false);
                    }}
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
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/educational-content"
                    ? "bg-background text-white"
                    : ""
                }
                `}
                  >
                    <i className='fa-solid fa-book'></i>{" "}
                    <p>Educational Content</p>
                  </NavLink>
                </div>

                <div className='w-full h-0.5 top-0 mx-auto  bg-background-grey'></div>

                <div className='flex flex-col gap-2'>
                  <NavLink
                    to={"/user/account"}
                    onClick={() => {
                      setIsOpen(false);
                    }}
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
                    to={"/user/help"}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={` 
                flex items-center justify-left   gap-4 p-4 text-text-dark-gray
                ${
                  location.pathname === "/user/help"
                    ? "bg-background text-white"
                    : ""
                }
                `}
                  >
                    <i className='fa-solid fa-headset'></i>{" "}
                    <p>Help & Support</p>
                  </NavLink>
                </div>

                <div className='flex flex-col gap-2 mt-auto '>
                  <div className='w-full h-0.5 top-0 mx-auto  bg-background-grey'></div>

                  <button
                    onClick={() => {
                      navigate("/");

                      setIsOpen(false);
                      // logout();
                    }}
                    className='flex items-center justify-left   text-text-dark-gray gap-4 p-4'
                  >
                    <i className='fa-solid fa-arrow-right-from-bracket'></i>{" "}
                    <p>Log out</p>
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className='w-full h-screen overflow-y-auto p-4 bg-background-grey'>
            <Outlet />
          </div>{" "}
        </section>
      </div>
    </div>
  );
}

export default UserApp;
