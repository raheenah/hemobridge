import { useState, useEffect } from "react";
import { NewEmergencyRequestModal } from "./components/NewEmergencyRequestModal";
import { DonationApi } from "../../api/donation.api";
import Loader from "../../components/common/Loader";
import { DateUtils } from "src/shared/utils/date.utils";
import Pagination from "src/components/common/Pagination";
import EmergencyRequestDetails from "./components/EmergencyRequestDetailsModal";
import { ApiDonationScheduleStatus } from "../../shared/constants/donation-schedule.constant";

function Emergency_Requests({ currentPage, totalPages, onPageChange }) {
  const [modalsVisibility, setModalsVisibility] = useState({
    isNewRequestModalVisible: false,
    isRequestDetailsModalVisible: false,
  });

  const [emergencyRequests, setEmergencyRequests] = useState({
    list: [],
    currentPage: 1,
    totalPages: 1,
  });
  const [selectedDonationRequest, setSelectedDonationRequest] = useState(null);
  const [viewDonationRequest, setViewDonationRequest] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmComplete, setConfirmComplete] = useState(false);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approveState, setApproveState] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    // console.log("Fetching donation requests for page:", emergencyRequests.currentPage);
    loadDonationRequests(emergencyRequests.currentPage);
  }, [emergencyRequests.currentPage, refresh]);

  const loadDonationRequests = async (page) => {
    setLoading(true);
    DonationApi.fetchFacilitySchedules(page)
      .then((data) => {
        // console.log(data);
        setEmergencyRequests(data);
      })
      .catch((error) => {
        console.error("Error loading donation requests:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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

  // useEffect(() => {
  //   if (
  //     viewDonationRequest ||
  //     confirm ||
  //     confirmComplete ||
  //     success
  //   ) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [viewDonationRequest, confirm, confirmComplete, success]);

   if (loading) {
      return (
       <div className="flex flex-col gap-4 min-h-screen animate-bounce items-center justify-center">
            <Loader />
            <p className="font-bold text-background  ">Fetching requests...</p>
        </div>
      )
    }

  return (
    <div className=' flex  h-full bg-white flex-col text-xs gap-4 py-3  px-6   w-full'>
      <button
        onClick={() => {
          setModalsVisibility((state) => ({
            ...state,
            isNewRequestModalVisible: true,
          }));

          // setRefresh(!refresh);
        }}
        className='bg-background hover:bg-pink  w-fit  font-bold  text-white py-1 px-2'
      >
        {" "}
        New Request{" "}
      </button>

      {emergencyRequests.list?.length ? (
        <div className=" h-full flex flex-col justify-between gap-2">
          <ul className='flex flex-col gap-2 w-full overflow-auto'>
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
                  <p
                    className={` flex items-start gap-2 font-bold
                  ${
                    request.status === ApiDonationScheduleStatus.COMPLETED
                      ? "text-green "
                      : request.status === ApiDonationScheduleStatus.PENDING ||
                        request.status === ApiDonationScheduleStatus.APPROVED
                      ? "text-yellow"
                      : "text-red"
                  } `}
                  >
                    <span className=' text-text-dark-gray font-bold flex items-start gap-2'>
                      Status:
                    </span>{" "}
                    {request.status === ApiDonationScheduleStatus.COMPLETED
                      ? " Completed"
                      : request.status === ApiDonationScheduleStatus.APPROVED
                      ? " Scheduled"
                      : request.status === ApiDonationScheduleStatus.PENDING
                      ? " Submitted"
                      : "Cancelled"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedDonationRequest(request);
                    setModalsVisibility((state) => ({
                      ...state,
                      isRequestDetailsModalVisible: true,
                    }));
                    setViewDonationRequest(true);
                    // console.log("selected request", request);
                  }}
                  className='bg-background hover:bg-pink !important   w-fit  font-bold  text-white py-1 px-2'
                >
                  View{" "}
                </button>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={emergencyRequests.currentPage}
            totalPages={emergencyRequests.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <div className=' h-full flex flex-col items-center justify-center'>
          <p className='font-extrabold text-lg text-background h-fit'>
            {" "}
            Create your first emergency request
          </p>
        </div>
      )}

      {modalsVisibility.isRequestDetailsModalVisible ? (
        <EmergencyRequestDetails
          onClose={() => {
            setModalsVisibility((state) => ({
              ...state,
              isRequestDetailsModalVisible: false,
            }));
            setRefresh(!refresh);
          }}
          request={selectedDonationRequest}
        />
      ) : null}

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
                  // console.log("approved state", approveState);
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
          close={() => {
            setModalsVisibility((state) => ({
              ...state,
              isNewRequestModalVisible: false,
            }));
            setRefresh(!refresh);
          }}
        />
      ) : null}
    </div>
  );
}

export default Emergency_Requests;
