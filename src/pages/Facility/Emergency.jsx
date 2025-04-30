import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/book-open-02.png";

function Emergency_Requests() {
  const rowsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);

  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [selectedDonationRequest, setSelectedDonationRequest] = useState(null);
  const [viewDonationRequest, setViewDonationRequest] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmComplete, setConfirmComplete] = useState(false);
  const [message, setMessage] = useState("");
  const [newRequest, setNewRequest] = useState(false);

  const totalPages = Math.ceil(emergencyRequests.length / rowsPerPage);
  const indexOfLastFacility = currentPage * rowsPerPage;
  const indexOfFirstFacility = indexOfLastFacility - rowsPerPage;
  const currentRequests = emergencyRequests.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );

  const getPaginationNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        return [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        return [1, "...", currentPage, "...", totalPages];
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/emergencyRequests")
      .then((res) => res.json())
      .then((data) => setEmergencyRequests(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (
      viewDonationRequest ||
      confirm ||
      confirmComplete ||
      success ||
      newRequest
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewDonationRequest, confirm, confirmComplete, success, newRequest]);

  return (
    <div className=' flex  h-full bg-white flex-col text-xs gap-4 py-3  px-6   w-full'>
      <button
        onClick={() => {
          setNewRequest(!newRequest);
        }}
        className='bg-background hover:bg-pink  w-fit  font-bold  text-white py-1 px-2'
      >
        New Request{" "}
      </button>
      <ul className='flex flex-col gap-2 w-full'>
        {currentRequests.map((request) => (
          <li
            className=' border-1 px-2 py-1 flex items-start justify-between border-text-gray'
            key={request.id}
          >
            <div className='flex flex-col gap-1'>
              <p className='flex items-center gap-2'>
                <span className='text-text-dark-gray font-bold'>
                  Facility Name:{" "}
                </span>{" "}
                {request.facility_name}
              </p>
              <p className='flex items-start gap-2'>
                <span className='text-text-dark-gray font-bold'>
                  Blood Type:
                </span>{" "}
                {request.blood_type}
              </p>
              <p className='flex items-start gap-2'>
                <span className='text-text-dark-gray font-bold'>Date:</span>{" "}
                {request.date}
              </p>
              <p className='flex items-start gap-2'>
                <span className='text-text-dark-gray font-bold'>Status:</span>{" "}
                {request.status}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedDonationRequest(request);
                setViewDonationRequest(!viewDonationRequest);
              }}
              className='bg-background hover:bg-pink !important   w-fit  font-bold  text-white py-1 px-2'
            >
              View{" "}
            </button>
          </li>
        ))}
      </ul>
      <div className='flex  justify-end  items-center gap-2 my-4 ml-auto'>
        <button
          className='px-2 py-1   hover:bg-light-pink disabled:opacity-50'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <i className='fa-solid fa-angle-left'></i>
        </button>

        {getPaginationNumbers().map((page, index) => (
          <button
            key={index}
            className={`px-2 py-1 hover:bg-light-pink  ${
              currentPage === page ? "bg-light-pink" : ""
            }`}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className='px-2 py-1   hover:bg-light-pink disabled:opacity-50'
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <i className='fa-solid fa-angle-right'></i>
        </button>
      </div>
      {viewDonationRequest && (
        <div
          onClick={(e) => {
            // selectedDonationRequest(null);
            setViewDonationRequest(!selectedDonationRequest);
            e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-[90%] md:w-[45%] h-fit max-h-[95dvh] overflow-auto text-xs shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4'
          >
            {" "}
            <div className='flex flex-col gap-4   bg-white  top-0'>
              <div className='flex  w-full gap-1  justify-between '>
                <h2 className='font-bold text-base'>Emergency Request</h2>

                <button
                  onClick={() => {
                    setViewDonationRequest(!viewDonationRequest);
                  }}
                >
                  <i className='fa-regular fa-circle-xmark'></i>
                </button>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2 '>
                  <div className='flex flex-col w-[60%] justify-between '>
                    <h3 className='text-text-dark-gray font-bold text-sm'>
                      Request Information
                    </h3>{" "}
                    <div className='w-full h-0.5 top-0   bg-background-grey'></div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='flex gap-2'>
                      <span className='text-text-dark-gray'>Facility:</span>
                      {selectedDonationRequest.facility_name}
                    </p>
                    <p className='flex gap-2'>
                      <span className='text-text-dark-gray'>Address:</span>
                      {selectedDonationRequest.address} years
                    </p>
                    <p className='flex gap-2'>
                      <span className='text-text-dark-gray'>
                        Contact Number:
                      </span>
                      {selectedDonationRequest.number}
                    </p>
                    <p className='flex gap-2'>
                      <span className='text-text-dark-gray'>Blood Type:</span>
                      {selectedDonationRequest.blood_type}
                    </p>
                    <p className='flex gap-2'>
                      <span className='text-text-dark-gray'>
                        Urgency Level:
                      </span>
                      <div className='flex items-center my-auto  gap-1'>
                        <i
                          className={` fa-solid fa-circle text-green
                    ${
                      selectedDonationRequest.urgency_level === "High"
                        ? "text-red"
                        : selectedDonationRequest.urgency_level === "Low"
                        ? "text-yellow"
                        : "text-green"
                    }`}
                        ></i>

                        {selectedDonationRequest.urgency_level}
                      </div>
                    </p>
                    <p className='flex gap-2'>
                      <span className='text-text-dark-gray'>Date:</span>
                      {selectedDonationRequest.date}
                    </p>
                  </div>
                </div>

                {selectedDonationRequest.donor ? (
                  <div className='flex flex-col gap-4 '>
                    <div className='flex flex-col gap-2 '>
                      <div className='flex flex-col w-[60%] justify-between '>
                        <h3 className='text-text-dark-gray font-bold text-sm'>
                          Donor Information
                        </h3>{" "}
                        <div className='w-full h-0.5 top-0   bg-background-grey'></div>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <p className='flex gap-2'>
                          <span className='text-text-dark-gray'>Donor:</span>
                          {selectedDonationRequest.donor.donor_id}
                        </p>

                        <p className='flex gap-2'>
                          <span className='text-text-dark-gray'>
                            Blood Type:
                          </span>
                          {selectedDonationRequest.donor.blood_type}
                        </p>
                        <p className='flex gap-2'>
                          <span className='text-text-dark-gray'>
                            Donation Date:
                          </span>
                          {selectedDonationRequest.donor.date}
                        </p>
                        <p className='flex gap-2'>
                          <span className='text-text-dark-gray'>
                            Donation Time:
                          </span>

                          {selectedDonationRequest.donor.time}
                        </p>
                      </div>
                    </div>
              </div>

                   
                ) : (
                  <div>text</div>
                )}

              {(selectedDonationRequest.status === "completed" ||
                selectedDonationRequest.status == "pending" ||
                selectedDonationRequest.status == "approved") && (
                <div className='flex items-center w-fit my-16 mx-auto'>
                  <div className='relative  '>
                    <p className='absolute bottom-full text-background font-bold left-1/2 -translate-x-1/2 mb-1 '>
                      Submitted
                    </p>{" "}
                    <i className='fa-solid fa-check border border-background rounded-full p-1.5 text-white bg-background '></i>
                  </div>

                  {/* <div className='w-40 h-2.5 top-0   bg-background'></div> */}

                  <div
                    className={`w-40 h-2.5 top-0   
                    ${
                      selectedDonationRequest.status == "pending" 
                        ? "bg-white border-background border-t border-b"
                        : "bg-background"
                    }`}
                  ></div>

                  <div className='relative  '>
                    <p className='absolute bottom-full text-background font-bold left-1/2 -translate-x-1/2 mb-1 '>
                      Scheduled
                    </p>
                    <i
                      className={` fa-solid fa-check border border-background rounded-full p-1.5 text-white ${
                        selectedDonationRequest.status == "approved" ||
                        selectedDonationRequest.status == "completed"
                          ? "bg-background"
                          : "bg-white"
                      }`}
                    ></i>
                  </div>

                  <div
                    className={`w-40 h-2.5 top-0   
                    ${
                      selectedDonationRequest.status == "pending" ||
                      selectedDonationRequest.status == "approved"
                        ? "bg-white border-background border-t border-b"
                        : "bg-background"
                    }`}
                  ></div>

                  <div className='relative  '>
                    <p className='absolute bottom-full text-background font-bold left-1/2 -translate-x-1/2 mb-1 '>
                      Completed
                    </p>
                    <i
                      className={` fa-solid fa-check border border-background rounded-full p-1.5 text-white ${
                        selectedDonationRequest.status == "completed"
                          ? "bg-background"
                          : "bg-white"
                      }`}
                    ></i>
                  </div>
                </div>
              )}

              {selectedDonationRequest.status === "completed" && (
                <button
                  onClick={() => {
                    setViewDonationRequest(!viewDonationRequest);
                  }}
                  className='bg-background hover:bg-pink  mx-auto  w-full max-w-40  font-bold  text-white py-1 px-2'
                >
                  Close
                </button>
              )}
              {selectedDonationRequest.status === "pending" && (
                <div className='flex gap-2  mx-auto'>
                  <button
                    onClick={() => {
                      setViewDonationRequest(!viewDonationRequest);
                    }}
                    className='text-background hover:bg-pink w-40 font-bold  border border-background py-1 px-2'
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      setConfirm(!confirm);
                    }}
                    className='bg-background hover:bg-pink  w-40  font-bold  text-white py-1 px-2'
                  >
                    Cancel Request{" "}
                  </button>
                </div>
              )}
              {selectedDonationRequest.status === "approved" && (
                <div className='flex gap-2  mx-auto'>
                  <button
                    onClick={() => {
                      setConfirm(!confirm);
                    }}
                    className='text-background hover:bg-pink w-40 font-bold  border border-background py-1 px-2'
                  >
                    Cancel Request
                  </button>

                  <button
                    onClick={() => {
                      setConfirmComplete(!confirmComplete);
                    }}
                    className='bg-background hover:bg-pink  w-40  font-bold  text-white py-1 px-2'
                  >
                    Mark as complete{" "}
                  </button>
                </div>
              )}
            </div>
          </div>
          </div>
          </div>
      )}
        
      {confirm && (
        <div
          onClick={(e) => {
            setConfirm(false), e.stopPropagation();
          }}
          className=' absolute bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[70%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
          >
            <div className='flex flex-col text-center text-xs gap-4'>
              <div className='flex flex-col gap-2 '>
                {" "}
                <h2 className='font-bold text-base text-center text-text-dark-gray'>
                  Confirm{" "}
                </h2>
                <div className='w-[70%] h-0.5 top-0 mx-auto bg-background-grey'></div>
              </div>

              <p>
                Are you sure you want to <b>cancel</b> this request?{" "}
              </p>
              <div className='flex gap-2  mx-auto'>
                <button
                  onClick={() => {
                    setConfirm(false);
                  }}
                  className='text-background hover:bg-pink w-40 font-bold  border border-background py-1 px-2'
                >
                  Go Back
                </button>

                <button
                  onClick={() => {
                    setConfirm(true);
                    // setViewDonationRequest(!viewDonationRequest);
                    setSuccess(true);
                    setMessage("cancelled");
                  }}
                  className='bg-background hover:bg-pink  w-40  font-bold  text-white py-1 px-2'
                >
                  Cancel Request{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {confirmComplete && (
        <div
          onClick={(e) => {
            setConfirmComplete(false), e.stopPropagation();
          }}
          className=' absolute bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[70%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
          >
            <div className='flex flex-col text-center text-xs gap-4'>
              <div className='flex flex-col gap-2 '>
                {" "}
                <h2 className='font-bold text-base text-center text-text-dark-gray'>
                  Confirm{" "}
                </h2>
                <div className='w-[70%] h-0.5 top-0 mx-auto bg-background-grey'></div>
              </div>

              <p>
                Are you sure you want to <b>mark as complete</b>?{" "}
              </p>
              <div className='flex gap-2  mx-auto'>
                <button
                  onClick={() => {
                    setConfirmComplete(false);
                  }}
                  className='text-background hover:bg-pink w-40 font-bold  border border-background py-1 px-2'
                >
                  Go Back
                </button>

                <button
                  onClick={() => {
                    setConfirm(!confirm);
                    setViewDonationRequest(!viewDonationRequest);
                    setSuccess(!success);
                    setMessage("completed");
                  }}
                  className='bg-background hover:bg-pink  w-40  font-bold  text-white py-1 px-2'
                >
                  Mark as Complete{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {success && (
        <div
          onClick={(e) => {
            setSuccess(!success), e.stopPropagation();
          }}
          className=' absolute bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[70%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
          >
            <div className='flex flex-col text-center text-xs gap-4'>
              <div className='flex flex-col gap-2 '>
                {" "}
                <h2 className='font-bold text-base text-center text-text-dark-gray'>
                  Success{" "}
                </h2>
                <div className='w-[70%] h-0.5 top-0 mx-auto bg-background-grey'></div>
              </div>

              <p>This request has been {message} successfully </p>
              <button
                onClick={() => {
                  setSuccess(!success);
                  setMessage(null);
                  setViewDonationRequest(false);
                  setConfirmComplete(false);
                  setConfirm(false);
                }}
                className='bg-background hover:bg-pink !important mx-auto  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {newRequest && (
        <div
          onClick={(e) => {
            setNewRequest(!newRequest), e.stopPropagation();
          }}
          className=' absolute bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[80%] max-h-[80dvh]  overflow-auto shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
          >
            <div className='flex flex-col text-xs gap-4'>
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
              <div className='w-[70%] h-0.5 top-0  bg-background-grey'></div>

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
                      Date of Birth <span className='text-red-500'>*</span>
                    </label>
                    <input
                      //   placeholder='someone@example.com'
                      className='placeholder-input-text w-full focus:outline-none'
                      type='date'
                      name='dob'
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
                  <div className='w-full px-4  py-0 relative border-1 text-text-dark-gray'>
                    <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                      Gender <span className='text-red-500'>*</span>
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
                        Male{" "}
                      </option>{" "}
                      <option
                        className='text-input-text   focus:outline-none'
                        value='Female'
                      >
                        Female{" "}
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

export default Emergency_Requests;
