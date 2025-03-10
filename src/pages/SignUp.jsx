import { useState } from "react";
import { NavLink } from "react-router-dom";


function SignUp() {
  const [accountType, setAccountType] = useState("donor");

    


  return (
    <div className=' flex items-center font-inter w-full'>
      <div className='  md:w-[85%]  mx-auto flex px-16   md:px-0 flex-col text-center gap-5 items-center '>
        <h1 className=' font-[700] font-space text-2xl'>
          Create New Account{" "}
        </h1>
        <div className='flex w-[80%] mx-auto  flex-col gap-6 '>
          <div className='grid grid-cols-2 text-sm font-base w-full '>
            <button
              onClick={() => setAccountType("donor")}
              className={`${
                accountType === "donor"
                  ? " text-background border-b-background"
                  : "border-b-pink text-input-text"
              }  
              w-full    border-b-2 py-3 px-4 `}
            >
              Donor
            </button>
            <button
              onClick={() => setAccountType("facility")}
              className={`${
                accountType === "facility"
                  ? " text-background border-b-background"
                  : "border-b-pink text-input-text"
              }  
               w-full  border-b  border-b-2 py-3 px-4 `}
            >
              HealthCare
            </button>
          </div>

          {accountType === "donor" && (
            <div className='flex text-xs flex-col w-full gap-[25px]'>
              <div className=' p-4 relative border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Full Name <span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='John Doe'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='text'
                  required
                />
              </div>
              <div className=' p-4 relative border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Email Address
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='someone@example.com'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='email'
                  required
                />
              </div>
              <div className='flex items-center gap-6'>
                <div className=' p-4  w-full relative border border-1 text-text-dark-gray'>
                  <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                    Phone Number <span className='text-red-500'>*</span>
                  </label>
                  <input
                    placeholder='0811 234 5678'
                    className='placeholder-input-text w-full focus:outline-none'
                    type='number'
                    required
                  />
                </div>

                <div className='w-full px-4  relative border border-1 text-text-dark-gray'>
                  <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                    Blood Type <span className='text-red-500'>*</span>
                  </label>{" "}
                  <select className=' focus:outline-none py-4   w-full   text-input-text '>
                    <option
                      className='text-input-text   focus:outline-none'
                      disabled
                      selected
                    >
                      Choose...
                    </option>
                    <option
                      className='text-input-text   focus:outline-none'
                      value='A+'
                    >
                      A+{" "}
                    </option>{" "}
                    <option
                      className='text-input-text   focus:outline-none'
                      value='A-'
                    >
                      A-{" "}
                    </option>
                    <option
                      className='text-input-text   focus:outline-none'
                      value='B+'
                    >
                      B+{" "}
                    </option>
                    <option
                      className='text-input-text   focus:outline-none'
                      value='B-'
                    >
                      B-{" "}
                    </option>{" "}
                    <option value='B+'>O+ </option>
                    <option
                      className='text-input-text   focus:outline-none'
                      value='B-'
                    >
                      O-{" "}
                    </option>
                    <option
                      className='text-input-text   focus:outline-none'
                      value='B+'
                    >
                      AB+{" "}
                    </option>
                    <option
                      className='text-input-text   focus:outline-none'
                      value='B-'
                    >
                      AB-{" "}
                    </option>
                  </select>
                </div>
              </div>
              <div className=' p-4 relative border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Address<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='No., Street, Town, Zip Code, State.'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='text'
                  required
                />
              </div>
              <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Password<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='*******'
                  type='password'
                  className='placeholder-input-text w-full focus:outline-none'
                  required
                />
                <button className='absolute right-0 h-full   p-2 text-text-dark-gray'>
                  <i className='fa-solid fa-eye'></i>
                </button>
              </div>{" "}
              <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Confirm Password<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='*******'
                  type='password'
                  className='placeholder-input-text w-full focus:outline-none'
                  required
                />
                <button className='absolute right-0 h-full   p-2 text-text-dark-gray'>
                  <i className='fa-solid fa-eye'></i>
                </button>
              </div>
            </div>
          )}
          {accountType === "facility" && (
            <div className='flex text-xs flex-col w-full gap-[25px]'>
              <div className=' p-4 relative border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Facility Name <span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='John Doe'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='text'
                  required
                />
              </div>
              <div className=' p-4 relative border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Personnel Name <span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='John Doe'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='text'
                  required
                />
              </div>
              <div className=' p-4 relative border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Email Address
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='someone@example.com'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='email'
                  required
                />
              </div>
              <div className='flex items-center gap-6'>
                <div className=' p-4  w-full relative border border-1 text-text-dark-gray'>
                  <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                    Phone Number <span className='text-red-500'>*</span>
                  </label>
                  <input
                    placeholder='0811 234 5678'
                    className='placeholder-input-text w-full focus:outline-none'
                    type='number'
                    required
                  />
                </div>{" "}
                <div className=' p-4  w-full relative border border-1 text-text-dark-gray'>
                  <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                    Personnel Role<span className='text-red-500'>*</span>
                  </label>
                  <input
                    placeholder='0811 234 5678'
                    className='placeholder-input-text w-full focus:outline-none'
                    type='text'
                    required
                  />
                </div>
              </div>
              <div className=' p-4 relative border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Address<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='No., Street, Town, Zip Code, State.'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='text'
                  required
                />
              </div>
              <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Password<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='*******'
                  type='password'
                  className='placeholder-input-text w-full focus:outline-none'
                  required
                />
                <button className='absolute right-0 h-full   p-2 text-text-dark-gray'>
                  <i className='fa-solid fa-eye'></i>
                </button>
              </div>{" "}
              <div className=' p-4 relative flex items-center border border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Confirm Password<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='*******'
                  type='password'
                  className='placeholder-input-text w-full focus:outline-none'
                  required
                />
                <button className='absolute right-0 h-full   p-2 text-text-dark-gray'>
                  <i className='fa-solid fa-eye'></i>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className='flex gap-1 items-center'>
          <input type='checkbox'></input>
          <p className='font-bold text-sm'>
            I agree to the{" "}
            <NavLink
              to={"/terms-and-conditions"}
              className={"underline text-background hover:no-underline"}
            >
              Terms and Conditions
            </NavLink>
          </p>
        </div>
        <button className='bg-background  w-full font-bold text-xl text-white py-3'>
          Create Account{" "}
        </button>
        <p className='text-text-dark-gray flex gap-4 flex-col items-center'>
          Already have an account?
          <NavLink
            to={"/"}
            className={"hover:underline font-bold text-background"}
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
