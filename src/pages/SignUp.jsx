import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SignUp() {
  const [accountType, setAccountType] = useState("donor");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
      donationReminders: true,
      eligibilityUpdates: true,
      emergencyAlerts: true,
      marketingCommunications: false,
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
     e.preventDefault();
     //  console.log("Form Data:", formData);
     if(formData.password !== ConfirmPassword){
       setMessage("Passwords do not match");
       return;
     }

     try {
       const response = await registerUser(formData);
       setMessage(response.message);
       console.log("Registration Response:", response);
       console.log("Registration Response message:", response.message);

        if (response.message === "User created successfully") {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
     } catch (error) {
       setMessage(error.message);
        console.error("Registration Error:", error);
     }
  };
  
    const togglePassword = (e) => {
      e.preventDefault();
      setShowPassword((prev) => !prev);
  };
  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword((prev) => !prev);
  };
  return (
    <div className=' flex items-center font-inter w-full'>
      <div className='  md:w-[85%]  mx-auto flex px-16 py-8  md:px-0 flex-col text-center gap-5 items-center '>
        <h1 className=' font-[700] font-space text-2xl'>Create New Account </h1>
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
            <form
              onSubmit={handleSubmit}
              className='flex text-xs flex-col w-full gap-[25px]'
            >
              <div className=' p-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Full Name <span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='John Doe'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=' p-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Email Address
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='someone@example.com'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex items-center gap-6'>
                <div className=' p-4  w-full relative border-1 text-text-dark-gray'>
                  <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                    Phone Number <span className='text-red-500'>*</span>
                  </label>
                  <input
                    placeholder='0811 234 5678'
                    className='placeholder-input-text w-full focus:outline-none'
                    type='number'
                    // required
                  />
                </div>

                <div className='w-full px-4  relative border-1 text-text-dark-gray'>
                  <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                    Blood Type <span className='text-red-500'>*</span>
                  </label>{" "}
                  <select className=' focus:outline-none py-4   w-full   text-input-text '>
                    <option
                      className='text-input-text   focus:outline-none'
                      disabled
                      // selected
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
              <div className=' p-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Address<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='No., Street, Town, Zip Code, State.'
                  className='placeholder-input-text w-full focus:outline-none'
                  type='text'
                  // required
                />
              </div>
              <div className=' p-4 relative flex items-center border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Password<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='*******'
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='placeholder-input-text w-full focus:outline-none'
                  required
                />
                <button
                  onClick={togglePassword}
                  className='absolute right-0 h-full   p-2 text-text-dark-gray'
                >
                  {showPassword ? (
                    <i className='fa-solid fa-eye-slash'></i> // Hide icon
                  ) : (
                    <i className='fa-solid fa-eye'></i> // Show icon
                  )}
                </button>
              </div>{" "}
              <div className=' p-4 relative flex items-center border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Confirm Password<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='*******'
                  type={showConfirmPassword ? "text" : "password"}
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='placeholder-input-text w-full focus:outline-none'
                  required
                />
                <button
                  type='button'
                  onClick={toggleConfirmPassword}
                  className='absolute right-0 h-full   p-2 text-text-dark-gray'
                >
                  {showConfirmPassword ? (
                    <i className='fa-solid fa-eye-slash'></i>
                  ) : (
                    <i className='fa-solid fa-eye'></i>
                  )}{" "}
                </button>
              </div>
              <div className='flex w-fit mx-auto gap-1 items-center'>
                <input type='checkbox' required></input>
                <p className='font-bold text-sm'>
                  I agree to the{" "}
                  <NavLink
                    to={"/terms-and-conditions"}
                    className={
                      "underline text-background hover:text-pink hover:no-underline"
                    }
                  >
                    Terms and Conditions
                  </NavLink>
                </p>
              </div>{" "}
              <button
                // onClick={() => navigate("/")}
                type='submit'
                className='bg-background hover:bg-pink !important   w-full font-bold text-xl text-white py-3'
              >
                Create Account{" "}
              </button>
            </form>
          )}
          {accountType === "facility" && (
            <form className='flex text-xs  flex-col w-full gap-[25px]'>
              <div className=' p-4 relative border-1 text-text-dark-gray'>
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
              <div className=' p-4 relative border-1 text-text-dark-gray'>
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
              <div className=' p-4 relative border-1 text-text-dark-gray'>
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
                <div className=' p-4  w-full relative border-1 text-text-dark-gray'>
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
                <div className=' p-4  w-full relative border-1 text-text-dark-gray'>
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
              <div className=' p-4 relative border-1 text-text-dark-gray'>
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
              <div className=' p-4 relative flex items-center border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Password<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='*******'
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='placeholder-input-text w-full focus:outline-none'
                  required
                />
                <button
                  onClick={togglePassword}
                  className='absolute right-0 h-full   p-2 text-text-dark-gray'
                >
                  {showPassword ? (
                    <i className='fa-solid fa-eye-slash'></i> // Hide icon
                  ) : (
                    <i className='fa-solid fa-eye'></i> // Show icon
                  )}
                </button>
              </div>{" "}
              <div className=' p-4 relative flex items-center border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Confirm Password<span className='text-red-500'>*</span>
                </label>
                <input
                  placeholder='*******'
                  type={showConfirmPassword ? "text" : "password"}
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='placeholder-input-text w-full focus:outline-none'
                  required
                />
                <button
                  type='button'
                  onClick={toggleConfirmPassword}
                  className='absolute right-0 h-full   p-2 text-text-dark-gray'
                >
                  {showConfirmPassword ? (
                    <i className='fa-solid fa-eye-slash'></i>
                  ) : (
                    <i className='fa-solid fa-eye'></i>
                  )}{" "}
                </button>
              </div>
              <div className='flex gap-1 w-fit mx-auto items-center'>
                <input type='checkbox' required></input>
                <p className='font-bold text-sm'>
                  I agree to the{" "}
                  <NavLink
                    to={"/terms-and-conditions"}
                    className={
                      "underline text-background hover:text-pink hover:no-underline"
                    }
                  >
                    Terms and Conditions
                  </NavLink>
                </p>
              </div>{" "}
              <button
                // onClick={() => navigate("/")}
                type='submit'
                className='bg-background hover:bg-pink !important   w-full font-bold text-xl text-white py-3'
              >
                Create Account{" "}
              </button>
            </form>
          )}
        </div>
        {message && (
          <p
            className={
              message === "User created successfully"
                ? "text-green"
                : "text-red-500"
            }
          >
            {message}
          </p>
        )}

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
