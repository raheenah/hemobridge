import { useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { resendVerification } from "../api/auth.api";

function Send_Code() {
  const navigate = useNavigate();
    
  const [message, setMessage] = useState("");
   const [formData, setFormData] = useState({
     email: "",
   });

   const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value.toLowerCase(),
     });
   };

   const handleSubmit = async () => {
      // e.preventDefault();
      // console.log("Form Data:", formData);
      try {
        const response = await resendVerification(formData);
        setMessage(response.message);
        if (response.success) {
          //  login(response.user);
          navigate("/verify-otp");
        }
      } catch (error) {
        setMessage(error.message);
        console.error("Registration Error:", error);
      }
    };

  return (
    <div className=' flex items-center font-inter w-full'>
      <div className='  md:w-[55%]  mx-auto flex px-16  md:px-4 flex-col text-center gap-[25px] items-center '>
        <h1 className=' font-[700] font-space text-xl'>
          Enter your Email Address
        </h1>
        <div className='flex flex-col w-full gap-1'>
          <div className=' p-4 relative border-1 text-text-dark-gray'>
            <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
              Email  <span className='text-red-500'>*</span>
            </label>
            <input
              placeholder='Input OTP here...'
              className='placeholder-input-text w-full focus:outline-none'
              type='email'
              name='email'
              value={formData.verificationToken}
              onChange={handleChange}
              required
            />
          </div>
        
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
        <button
          onClick={() => handleSubmit()}
          className='bg-background hover:bg-pink mx-auto w-full max-w-[80%]  font-bold text-base text-white py-2 px-4'
        >
Send        </button>
      </div>
    </div>
  );
}

export default Send_Code;
