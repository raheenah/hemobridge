import { useState, useCallback, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../../assets/avatar.svg";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../../context";

function Account() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [editNotifications, setEditNotifications] = useState(false);

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

 

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

   useEffect(() => {
     if (editNotifications || editProfile || editProfilePic || success) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "auto";
     }

     return () => {
       document.body.style.overflow = "auto";
     };
   }, [editNotifications, editProfile, editProfilePic, success]);


  return (
    <div className=' flex h-   md:bg-white flex-col text-xs md:gap-4 md:py-3  md:px-6   w-full'>
      <h1 className='text-xs font-bold hidden md:block '>
        Profile Information
      </h1>

      <div className='flex flex-col md:flex-row justify-between gap-4'>
        <div className='flex flex-col bg-white py-3  px-6 md:py-0  md:px-0 gap-4 md:gap-2'>
          <h1 className='text-xs font-bold md:hidden '>Profile Information</h1>
          {user?.role === "donor" ? (
            <div className='grid grid-cols-[auto_auto] gap-8'>
              <div className='flex flex-col gap-3 md:gap-1'>
                <p>Full Name</p>
                <p>User ID</p>
                <p>Email Address</p>
                <p>Phone Number</p>
                <p>Date of Birth</p>
                <p>Blood Type</p>
                <p>Gender</p>
                <p>Contact Address</p>
              </div>
              <div className='flex flex-col gap-3 md:gap-1'>
                <p>Juwon Ajiboye</p>
                <p>B1042761</p>
                <p>B1042761@gmail.com</p>
                <p>08123456789</p>
                <p>27-01-1999</p>
                <p>O+</p>
                <p>Male</p>
                <p>221B, Baker Street, Off Asake Road, Lekki Phase 1, Lagos</p>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-[auto_auto] gap-8'>
              <div className='flex flex-col gap-1'>
                <p>Full Name</p>
                <p>User ID</p>
                <p>Email Address</p>
                <p>Phone Number</p>
                <p>Contact Address</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p>{user?.name}</p>
                <p>{user?._id}</p>
                <p>{user?.email}</p>
                <p>08123456789</p>
                <p>221B, Baker Street, Off Asake Road, Lekki Phase 1, Lagos</p>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setEditProfile(!editProfile);
            }}
            className='bg-background hover:bg-pink   self-start  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
          >
            Edit Profile
          </button>
        </div>

        <div className='md:flex flex-col gap-4 hidden'>
          <img
            src={Avatar}
            alt='avatar'
            className='w-52 h-52 p-2 border border-text-dark-gray'
          />
          <button
            onClick={() => {
              setEditProfilePic(!editProfilePic);
            }}
            className='bg-background hover:bg-pink   self-start  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
          >
            Upload
          </button>
          <button
            // onClick={() => {
            //   setDetails(!details), setSubmitted(!submitted);
            // }}
            className='border-background border hover:text-pink hover:border-pink   self-start  w-full max-w-32 box-border font-bold text-xs text-background py-2 px-4'
          >
            Delete
          </button>
        </div>
        <div className='flex md:hidden justify-between text-xs font-bold items-center bg-white py-3  px-6 md:py-0  md:px-0 gap-4 md:gap-2'>
          <h1 className=''>Change Profile Picture</h1>
          <button
            onClick={() => {
              setEditProfilePic(!editProfilePic);
            }}
          >
            <i className='fa-solid fa-arrow-right'></i>{" "}
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-4 md:gap-0 md:grid grid-cols-2 py-4 md:border-t border-text-gray'>
        <div className='  flex flex-col gap-6 md:gap-4 md:bg-transparent bg-white py-3  px-6 md:py-0  md:px-0  md:border-r border-text-gray'>
          <h1 className='text-xs font-bold '>Change Password </h1>
          <div className='md:max-w-[70%] flex flex-col gap-4'>
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
            className='bg-background hover:bg-pink   self-start  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
          >
            Update
          </button>
        </div>

        <div className='pl-6 flex flex-col md:bg-transparent bg-white py-3  px-6 md:py-0  md:px-3 gap-4'>
          <h1 className='text-xs font-bold '>Notification Preferences </h1>
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
            onClick={() => {
              setEditNotifications(!editNotifications);
            }}
            className='bg-background hover:bg-pink   self-start   w-full max-w-32   font-bold text-xs text-white py-2'
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
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[85%] md:w-[30%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
          >
            <div className='flex flex-col text-xs gap-4'>
              <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                  {" "}
                  <h2 className='font-bold text-base text-text-dark-gray'>
                    Edit Profile Information{" "}
                  </h2>
                  <button onClick={() => setEditProfile(!editProfile)}>
                    {" "}
                    <i className='fa-regular fa-circle-xmark'></i>
                  </button>
                </div>
                <div className='w-[70%] h-0.5   bg-background-grey'></div>
              </div>
              {user?.role === "donor" ? (
                <form className=' flex flex-col gap-4'>
                  <div className='flex flex-col w-full  gap-3'>
                    <div className=' p-4 relative  border-1 text-text-dark-gray'>
                      <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                        Full Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        placeholder='Jane Doe'
                        className='placeholder-input-text w-full focus:outline-none'
                        type='text'
                        name='name'
                        //   value={formData.email}
                        //   onChange={handleChange}
                        required
                      />
                    </div>{" "}
                    <div className=' p-4 relative  border-1 text-text-dark-gray'>
                      <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                        Email Address
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        placeholder='someone@example.com'
                        className='placeholder-input-text w-full focus:outline-none'
                        type='email'
                        name='email'
                        //   value={formData.email}
                        //   onChange={handleChange}
                        required
                      />
                    </div>
                    <div className=' p-4 relative  border-1 text-text-dark-gray'>
                      <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                        Phone Number <span className='text-red-500'>*</span>
                      </label>
                      <input
                        placeholder='08123456789'
                        className='placeholder-input-text w-full focus:outline-none'
                        type='number'
                        name='number'
                        //   value={formData.email}
                        //   onChange={handleChange}
                        required
                      />
                    </div>
                    <div className=' p-4 relative  border-1 text-text-dark-gray'>
                      <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                        Address <span className='text-red-500'>*</span>
                      </label>
                      <input
                        placeholder='221B, Baker Street, Off Asake Road, Lekki Phase 1, Lagos'
                        className='placeholder-input-text w-full focus:outline-none'
                        type='text'
                        name='text'
                        //   value={formData.email}
                        //   onChange={handleChange}
                        required
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
                  <button
                    onClick={() => {
                      setEditProfile(!editProfile),
                        setSuccess(!success),
                        setMessage("profile information");
                    }}
                    className='bg-background hover:bg-pink !important self-end  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
                  >
                    Update
                  </button>
                </form>
              ) : (
                <form className=' flex flex-col gap-4'>
                  <div className='flex flex-col w-full  gap-3'>
                    <div className=' p-4 relative  border-1 text-text-dark-gray'>
                      <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                        Full Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        placeholder='Jane Doe'
                        className='placeholder-input-text w-full focus:outline-none'
                        type='text'
                        name='name'
                        //   value={formData.email}
                        //   onChange={handleChange}
                        required
                      />
                    </div>{" "}
                    <div className=' p-4 relative  border-1 text-text-dark-gray'>
                      <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                        Email Address
                        <span className='text-red-500'>*</span>
                      </label>
                      <input
                        placeholder='someone@example.com'
                        className='placeholder-input-text w-full focus:outline-none'
                        type='email'
                        name='email'
                        //   value={formData.email}
                        //   onChange={handleChange}
                        required
                      />
                    </div>
                    <div className=' p-4 relative  border-1 text-text-dark-gray'>
                      <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                        Phone Number <span className='text-red-500'>*</span>
                      </label>
                      <input
                        placeholder='08123456789'
                        className='placeholder-input-text w-full focus:outline-none'
                        type='number'
                        name='number'
                        //   value={formData.email}
                        //   onChange={handleChange}
                        required
                      />
                    </div>
                    <div className=' p-4 relative  border-1 text-text-dark-gray'>
                      <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                        Address <span className='text-red-500'>*</span>
                      </label>
                      <input
                        placeholder='221B, Baker Street, Off Asake Road, Lekki Phase 1, Lagos'
                        className='placeholder-input-text w-full focus:outline-none'
                        type='text'
                        name='text'
                        //   value={formData.email}
                        //   onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditProfile(!editProfile),
                        setSuccess(!success),
                        setMessage("profile information");
                    }}
                    className='bg-background hover:bg-pink !important self-end  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
                  >
                    Update
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {editProfilePic && (
        <div
          onClick={(e) => {
            setEditProfilePic(!editProfilePic), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[85%] md:w-[30%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
          >
            <div className='flex flex-col gap-1'>
              <div className='flex justify-between'>
                {" "}
                <h2 className='font-bold text-base text-text-dark-gray'>
                  Change Profile Picture{" "}
                </h2>
                <button onClick={() => setEditProfilePic(!editProfilePic)}>
                  {" "}
                  <i className='fa-regular fa-circle-xmark'></i>
                </button>
              </div>
              <div className='w-[70%] h-0.5 top-0  bg-background-grey'></div>
            </div>
            <div
              className='border-2 border-dashed text-text-dark-gray flex flex-col gap-4 p-6 rounded-lg text-center cursor-pointer'
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type='file'
                id='fileInput'
                onChange={handleFileSelect}
                className='hidden'
              />
              <i className='fa-solid fa-file text-7xl'></i>
              <div className='flex flex-col gap-2'>
                {" "}
                <p>Drag file here</p>
                <p>or</p>
              </div>
              {selectedFile ? (
                <div className='flex justify-between items-center w-fit mx-auto gap-2'>
                  <p className=''>{selectedFile.name}</p>
                  <button
                    onClick={(e) => {
                      setSelectedFile(null), e.stopPropagation();
                    }}
                    className='text-red'
                  >
                    <i className='fa-solid fa-trash'></i>{" "}
                  </button>
                </div>
              ) : (
                "Drag & drop a file or click to browse"
              )}
              <button
                className=' text-background '
                onClick={() => document.getElementById("fileInput").click()}
              >
                Browse
              </button>
            </div>
            <button
              onClick={() => {
                setEditProfilePic(!editProfilePic),
                  setSuccess(!success),
                  setMessage("profile picture");
              }}
              className='bg-background hover:bg-pink !important mx-auto w-full max-w-32  font-bold text-xs text-white py-2 px-4'
            >
              Upload
            </button>
          </div>
        </div>
      )}

      {editNotifications && (
        <div
          onClick={(e) => {
            setEditNotifications(!editNotifications), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-[85%] md:w-[30%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
          >
            <div className='flex flex-col text-xs gap-4'>
              <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                  {" "}
                  <h2 className='font-bold text-base text-text-dark-gray'>
                    Edit Notofication Preferences
                  </h2>
                  <button
                    onClick={() => setEditNotifications(!editNotifications)}
                  >
                    {" "}
                    <i className='fa-regular fa-circle-xmark'></i>
                  </button>
                </div>
                <div className='w-[70%] h-0.5 top-0  bg-background-grey'></div>
              </div>
              <form className=' flex flex-col gap-4'>
                <div className='flex flex-col w-full  gap-3'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      {" "}
                      <h3 className='font-bold'>Notification Channels</h3>
                      <p>(Choose how you receive notifications)</p>
                    </div>
                    <ul className='flex flex-col gap-2'>
                      <li className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          id='email-channel'
                          name='email-channel'
                          value='email-channel'
                        />
                        <p>Email</p>
                      </li>
                      <li className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          id='push-channel'
                          name='push-channel'
                          value='push-channel'
                        />
                        <p>Push</p>
                      </li>
                    </ul>
                  </div>{" "}
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      {" "}
                      <h3 className='font-bold'>Notification Types</h3>
                      <p>
                        (Choose what type of notifications you want to receive)
                      </p>
                    </div>
                    <ul className='flex flex-col gap-2'>
                      <li className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          id='urgent-request'
                          name='urgent-request'
                          value='urgent-request'
                        />
                        <p>Urgent Request Requests</p>
                      </li>
                      <li className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          id='donation-reminders'
                          name='donation-reminders'
                          value='donation-reminders'
                        />
                        <p>Donation Reminders</p>
                      </li>{" "}
                      <li className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          id='appointment-confirmations'
                          name='appointment-confirmations'
                          value='appointment-confirmations'
                        />
                        <p>Appointment Confirmations</p>
                      </li>{" "}
                      <li className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          id='inventory-updates'
                          name='inventory-updates'
                          value='inventory-updates'
                        />
                        <p>Inventory Updates</p>
                      </li>{" "}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditNotifications(!editNotifications),
                      setSuccess(!success),
                      setMessage("notification preferences");
                  }}
                  className='bg-background hover:bg-pink !important self-end  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div
          onClick={(e) => {
            setSuccess(!success), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[85%] md:w-[30%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
          >
            <div className='flex flex-col text-center text-xs gap-4'>
              <div className='flex flex-col gap-2 '>
                {" "}
                <h2 className='font-bold text-base text-center text-text-dark-gray'>
                  Success{" "}
                </h2>
                <div className='w-[70%] h-0.5 top-0 mx-auto bg-background-grey'></div>
              </div>

              <p>Your {message} has been updated successfully</p>
              <button
                onClick={() => {
                  setSuccess(!success), setMessage(null);
                }}
                className='bg-background hover:bg-pink !important mx-auto  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
