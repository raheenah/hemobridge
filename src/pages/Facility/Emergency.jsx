import { useState, useEffect } from "react";
import { NewEmergencyRequestModal } from "./components/NewEmergencyRequestModal";
import { DonationApi } from "../../api/donation.api";
import { DateUtils } from "src/shared/utils/date.utils"
import EmergencyRequestDetails from "./components/EmergencyRequestDetailsModal";

function Emergency_Requests() {

  const [modalsVisibility, setModalsVisibility] = useState({
    isNewRequestModalVisible: false,
    isRequestDetailsModalVisible: false,
  })
  
  const [emergencyRequests, setEmergencyRequests] = useState({
    list: [],
    currentPage: 1,
    totalPages: 1
  });
  const [selectedDonationRequest, setSelectedDonationRequest] = useState(null);
  const [viewDonationRequest, setViewDonationRequest] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmComplete, setConfirmComplete] = useState(false);
  const [message, setMessage] = useState("");
const [approveState, setApproveState] = useState({
    error: false,
    message: ""
});
  
  
  useEffect(() => {
    loadDonationRequests(emergencyRequests.currentPage);
  }, [emergencyRequests.currentPage]);

  const loadDonationRequests = async (page) => {
    DonationApi.fetchFacilitySchedules(page)
    .then((data)=> {
      console.log(data)
      setEmergencyRequests(data)
    })
    .catch((error)=> { 
      console.error("Error loading donation requests:", error);
    })
  };

      function handleCompleteRequest() {
        setApproveState({
          error: false,
          message: "",
        });
  
        DonationApi.completeSchedule(selectedDonationRequest.id)
          .then((data) => {
            setApproveState({
              error: false,
              message: data.message,
            });
          })
          .catch((error) => {
            setApproveState({
              error: true,
              message: error.message,
            });
          });
    }

  useEffect(() => {
    if (
      viewDonationRequest ||
      confirm ||
      confirmComplete ||
      success
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewDonationRequest, confirm, confirmComplete, success]);

  return (
    <div className=' flex  h-full bg-white flex-col text-xs gap-4 py-3  px-6   w-full'>
      <button
        onClick={() =>
          setModalsVisibility((state) => ({
            ...state,
            isNewRequestModalVisible: true,
          }))
        }
        className='bg-background hover:bg-pink  w-fit  font-bold  text-white py-1 px-2'
      >
        {" "}
        New Request{" "}
      </button>

      <ul className='flex flex-col gap-2 w-full'>
        {emergencyRequests.list.map((request) => (
          <li
            className=' border-1 px-2 py-1 flex items-start justify-between border-text-gray'
            key={request.id}
          >
            <div className='flex flex-col gap-1'>
              <p className='flex items-start gap-2'>
                <span className='text-text-dark-gray  font-bold'>
                  Blood Type:
                </span>{" "}
                {request.bloodType}
              </p>
              <p className='flex items-start gap-2'>
                <span className='text-text-dark-gray font-bold'>Date:</span>{" "}
                {DateUtils.formatDate(request.preferredDate)}
              </p>
              <p className='flex items-start gap-2'>
                <span className='text-text-dark-gray font-bold'>Date:</span>{" "}
                {DateUtils.formatTime(request.preferredDate)}
              </p>
              <p className='flex items-start gap-2'>
                <span className='text-text-dark-gray font-bold'>Status:</span>{" "}
                {request.status}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedDonationRequest(request);
                // setModalsVisibility((state) => ({
                //   ...state,
                //   isRequestDetailsModalVisible: true,
                // }));
                setViewDonationRequest(true);
                console.log("selected request", request);
              }}
              className='bg-background hover:bg-pink !important   w-fit  font-bold  text-white py-1 px-2'
            >
              View{" "}
            </button>
          </li>
        ))}
      </ul>

      {/* {
        modalsVisibility.isRequestDetailsModalVisible
        ? <EmergencyRequestDetails
            onClose={()=> setModalsVisibility(state => ({ ...state, isRequestDetailsModalVisible: false  }))}
            request={selectedDonationRequest}
          />
        : null
    } */}

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
                    {selectedDonationRequest.status !== "PENDING" && (
                      <p className='flex gap-2'>
                        <span className='text-text-dark-gray'>Donor:</span>
                        {selectedDonationRequest.donorId.firstName}{" "}
                        {selectedDonationRequest.donorId.lastName}
                      </p>
                    )}
                    <p className='flex gap-2'>
                      <span className='text-text-dark-gray'>Blood Type:</span>
                      {selectedDonationRequest.bloodType}
                    </p>
                    <p className='flex gap-2'>
                      <span className='text-text-dark-gray'>
                        Units Requested:
                      </span>
                      {selectedDonationRequest.unitsRequested}
                    </p>
                    {selectedDonationRequest.status !== "PENDING" && (
                      <p className='flex gap-2'>
                        <span className='text-text-dark-gray'>
                          Scheduled Date:
                        </span>
                        {DateUtils.formatDate(
                          selectedDonationRequest.preferredDate
                        )}
                      </p>
                    )}
                    {selectedDonationRequest.status !== "PENDING" && (
                      <p className='flex gap-2'>
                        <span className='text-text-dark-gray'>
                          Scheduled Time:
                        </span>
                        {DateUtils.formatTime(
                          selectedDonationRequest.preferredDate
                        )}
                      </p>
                    )}

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
                    <p className='text-lg font-extrabold'>
                      {selectedDonationRequest.status}
                    </p>
                  </div>
                </div>

                {/* {selectedDonationRequest.donor ? (
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
                )} */}

                {(selectedDonationRequest.status === "COMPLETED" ||
                  selectedDonationRequest.status === "PENDING" ||
                  selectedDonationRequest.status === "APPROVED") && (
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
                       selectedDonationRequest.status === "PENDING"
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
                          selectedDonationRequest.status === "APPROVED" ||
                          selectedDonationRequest.status === "COMPLETED"
                            ? "bg-background"
                            : "bg-white"
                        }`}
                      ></i>
                    </div>

                    <div
                      className={`w-40 h-2.5 top-0   
                     ${
                       selectedDonationRequest.status === "PENDING" ||
                       selectedDonationRequest.status === "APPROVED"
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
                          selectedDonationRequest.status === "COMPLETED"
                            ? "bg-background"
                            : "bg-white"
                        }`}
                      ></i>
                    </div>
                  </div>
                )}

                {selectedDonationRequest.status === "COMPLETED" ||
                  (selectedDonationRequest.status === "REJECTED" && (
                    <button
                      onClick={() => {
                        setViewDonationRequest(!viewDonationRequest);
                      }}
                      className='bg-background hover:bg-pink  mx-auto  w-full max-w-40  font-bold  text-white py-1 px-2'
                    >
                      Close
                    </button>
                  ))}
                {selectedDonationRequest.status === "PENDING" && (
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
                {selectedDonationRequest.status === "APPROVED" && (
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
              <div
                className={`text-center mt-4 font-medium ${
                  approveState.error ? "text-red-500" : "text-green-500"
                }`}
              >
                {approveState.message}
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
                    handleCompleteRequest();
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
                              console.log("approved state", approveState);

                }}
                className='bg-background hover:bg-pink !important mx-auto  w-full max-w-32  font-bold text-xs text-white py-2 px-4'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {modalsVisibility.isNewRequestModalVisible ? (
        <NewEmergencyRequestModal
          close={() =>
            setModalsVisibility((state) => ({
              ...state,
              isNewRequestModalVisible: false,
            }))
          }
        />
      ) : null}
    </div>
  );
}

export default Emergency_Requests;
