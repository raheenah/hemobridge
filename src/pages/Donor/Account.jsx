import { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../../assets/avatar.svg";

function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const toggleNewPassword = (e) => {
    e.preventDefault();
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmNewPassword = (e) => {
    e.preventDefault();
    setShowConfirmNewPassword((prev) => !prev);
  };

  return (
    <div className=' flex   bg-white flex-col text-sm gap-4 py-3  px-6  h-full w-full'>
      <h1 className='text-lg font-bold '>Profile Information</h1>

      <div className='flex justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='grid grid-cols-[auto_auto] gap-8'>
            <div className='flex flex-col gap-1'>
              <p>Full Name</p>
              <p>User ID</p>
              <p>Email Address</p>
              <p>Phone Number</p>
              <p>Date of Birth</p>
              <p>Blood Type</p>
              <p>Gender</p>
              <p>Contact Address</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p>Juwon Ajiboye</p>
              <p>B1042761</p>
              <p>B1042761@gmail.com</p>
              <p>08123456789</p>
              <p>27-01-1999</p>
              <p>O+</p>
              <p>Male</p>{" "}
              <p>221B, Baker Street, Off Asake Road, Lekki Phase 1, Lagos</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditProfile(!editProfile);
            }}
            className='bg-background hover:bg-pink   self-start  w-full max-w-32  font-bold text-sm text-white py-2 px-4'
          >
            Edit Profile
          </button>
        </div>

        <div className='flex flex-col gap-4'>
          <img
            src={Avatar}
            alt='avatar'
            className='w-52 h-52 p-2 border border-text-dark-gray'
          />
          <button
            // onClick={() => {
            //   setDetails(!details), setSubmitted(!submitted);
            // }}
            className='bg-background hover:bg-pink   self-start  w-full max-w-32  font-bold text-sm text-white py-2 px-4'
          >
            Upload
          </button>
          <button
            // onClick={() => {
            //   setDetails(!details), setSubmitted(!submitted);
            // }}
            className='border-background border hover:text-pink hover:border-pink   self-start  w-full max-w-32 box-border font-bold text-sm text-background py-2 px-4'
          >
            Delete
          </button>
        </div>
      </div>

      <div className='grid grid-cols-2 py-4 border-t border-text-gray'>
        <div className='  flex flex-col gap-4  border-r border-text-gray'>
          <h1 className='text-lg font-bold '>Change Password </h1>
          <div className='max-w-[70%] flex flex-col gap-2'>
            <div className=' p-4 relative flex items-center  border-1 text-text-dark-gray'>
              <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                Old Password<span className='text-red-500'>*</span>
              </label>
              <input
                placeholder='*******'
                type={showPassword ? "text" : "password"}
                name='password'
                // value={formData.password}
                // onChange={handleChange}
                className='placeholder-input-text w-full focus:outline-none'
                required
              />
              <button
                onClick={togglePassword}
                className='absolute right-0 h-full   p-2 text-text-dark-gray'
              >
                {showPassword ? (
                  <i className='fa-solid fa-eye-slash'></i>
                ) : (
                  <i className='fa-solid fa-eye'></i>
                )}
              </button>
            </div>

            <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
              <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                New Password<span className='text-red-500'>*</span>
              </label>
              <input
                placeholder='*******'
                type={showNewPassword ? "text" : "password"}
                name='new-password'
                // value={formData.password}
                // onChange={handleChange}
                className='placeholder-input-text w-full focus:outline-none'
                required
              />
              <button
                onClick={toggleNewPassword}
                className='absolute right-0 h-full   p-2 text-text-dark-gray'
              >
                {showNewPassword ? (
                  <i className='fa-solid fa-eye-slash'></i> // Hide icon
                ) : (
                  <i className='fa-solid fa-eye'></i> // Show icon
                )}
              </button>
            </div>

            <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
              <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                Confirm New Password<span className='text-red-500'>*</span>
              </label>
              <input
                placeholder='*******'
                type={showConfirmNewPassword ? "text" : "password"}
                name='confirm-new-password'
                // value={formData.password}
                // onChange={handleChange}
                className='placeholder-input-text w-full focus:outline-none'
                required
              />
              <button
                onClick={toggleConfirmNewPassword}
                className='absolute right-0 h-full   p-2 text-text-dark-gray'
              >
                {showConfirmNewPassword ? (
                  <i className='fa-solid fa-eye-slash'></i>
                ) : (
                  <i className='fa-solid fa-eye'></i>
                )}
              </button>
            </div>
          </div>
          <button
            // onClick={() => {
            //   setDetails(!details), setSubmitted(!submitted);
            // }}
            className='bg-background hover:bg-pink   self-start  w-full max-w-32  font-bold text-sm text-white py-2 px-4'
          >
            Update
          </button>
        </div>

        <div className='pl-6 flex flex-col gap-4'>
          <h1 className='text-lg font-bold '>Notification Preferences </h1>
          <div className='grid grid-cols-[auto_auto] gap-8'>
            <div className='flex flex-col gap-1'>
              <p>Notification Channels</p>
              <p>Notification Types</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p>Email</p>

              <p>Urgent Blood Requests, Appointment Confirmations</p>
            </div>
          </div>
          <button
            // onClick={() => {
            //   setDetails(!details), setSubmitted(!submitted);
            // }}
            className='bg-background hover:bg-pink   self-start   w-full max-w-32   font-bold text-sm text-white py-2'
          >
            Edit Preferences
          </button>
        </div>
      </div>

      {editProfile && (
        <div
          onClick={(e) => {
            setEditProfile(!editProfile), e.stopPropagation();
          }}
          className=' absolute bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[50%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4'
          >
            <div className='flex flex-col text-sm gap-2'>
              <h2 className='font-bold text-base text-text-dark-gray'>
                Donation Booking Details
              </h2>
              <form className=' flex flex-col gap-4'>
                <div className='flex flex-col max-w-[70%]  gap-4'>
                  

                  

                  <div className='w-full px-4  py-0 relative border-1 text-text-dark-gray'>
                    <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                      Blood Type <span className='text-red-500'>*</span>
                    </label>{" "}
                    <select
                      className=' focus:outline-none py-4   w-full   text-input-text '
                      required
                    >
                      <option
                        className='text-input-text   focus:outline-none'
                        disabled
                        selected
                      >
                        Choose...
                      </option>
                      <option
                        className='text-input-text   focus:outline-none'
                        value='Male'
                      >
Male                      </option>{" "}
                      <option
                        className='text-input-text   focus:outline-none'
                        value='Female'
                      >
Female                      </option>
                    
                     
                    </select>
                  </div>
                </div>
                <button
                  //   onClick={() => {
                  //     setDetails(!details), setSubmitted(!submitted);
                  //   }}
                  className='bg-background hover:bg-pink !important self-end  w-fit  font-bold text-sm text-white py-3 px-6'
                >
                  Schedule
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
