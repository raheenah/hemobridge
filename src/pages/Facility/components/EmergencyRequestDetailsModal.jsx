import { useState } from "react";
import Modal from "src/components/common/Modal.jsx";
import { StringUtils } from "src/shared/utils/string.utils.js";
import { DateUtils } from "src/shared/utils/date.utils.js";
import { DonationApi } from "../../../api/donation.api";
import { useProfileContext } from "../../../shared/context/user-profile-context";
import { ApiDonationScheduleStatus } from "../../../shared/constants/donation-schedule.constant";

export default function EmergencyRequestDetails({ onClose, request }) {
  const [cancelLoading, setCancelLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);
   const [approveState, setApproveState] = useState({
      error: false,
      message: "",
   });
  const { user } = useProfileContext();

  const cancelRequest = async () => {
    // console.log("Cancelling request cancel reactuest clicked", request.id);
    setCancelLoading(true);
    // TODO: hit your cancel API here
    setTimeout(() => {
      setCancelLoading(false);
      onClose();
    }, 800);
  };

  function handleDeclineRequest() {
      setApproveState({
        error: false,
        message: "",
      });
      setCancelLoading(true);
  // console.log("Declining request", request.id);
      DonationApi.cancelSchedule(request.id)
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
        })
        .finally(() => {
         
          // setTimeout(() => {
          //   setCancelLoading(false);
          //   onClose();
          // }, 800);

          if (
            request.status === ApiDonationScheduleStatus.PENDING ||
            request.status === ApiDonationScheduleStatus.APPROVED
          ) {
            setSuccessMessage("Request cancelled successfully");
            // setSuccess(true);
            setTimeout(() => {
              setCancelLoading(false);
              onClose();
            }, 800);
          }
        });
    
  }
  

  // console.log("request", request);
  // console.log("user", user)


  function handleCompleteRequest() {
    setApproveState({
      error: false,
      message: "",
    });
    // setCancelLoading(true);
    // console.log("completing request", request.id);
    DonationApi.completeSchedule(request.id)
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
      })
      .finally(() => {
        setTimeout(() => {
          setCancelLoading(false);
          onClose();
        }, 800);
        setSuccessMessage("Request completed successfully");
      });
  }

    // function handleDeclineRequest() {
    //   setApproveState({
    //     error: false,
    //     message: "",
    //   });
    //   // setCancelLoading(true);
    //   console.log("completing request", request.id);
    //   DonationApi.declineSchedule(request.id)
    //     .then((data) => {
    //       setApproveState({
    //         error: false,
    //         message: data.message,
    //       });
    //     })
    //     .catch((error) => {
    //       setApproveState({
    //         error: true,
    //         message: error.message,
    //       });
    //     })
    //     .finally(() => {
    //       // setTimeout(() => {
    //       //   setCancelLoading(false);
    //       //   onClose();
    //       // }, 800);
    //     });
    // }

  const apiToUiStatus = {
    PENDING: "SUBMITTED",
    APPROVED: "SCHEDULED",
    COMPLETED: "COMPLETED",
    REJECTED: "COMPLETED",
    CANCELLED: "COMPLETED",
  };

  const statusToIndex = { SUBMITTED: 0, SCHEDULED: 1, COMPLETED: 2 };

  const uiStatus = apiToUiStatus[request.status];
  const statusIndex = statusToIndex[uiStatus] ?? 0;

  const progress = (statusIndex / 2) * 100;

  const urgencyColor =
    request.urgencyLevel === "HIGH"
      ? "bg-orange-500"
      : request.urgencyLevel === "MEDIUM"
      ? "bg-yellow-400"
      : "bg-green-500";

  // console.log("user", user);

  return (
    <Modal onClose={onClose}>
      <div className='flex flex-col'>
        {" "}
        <div className='flex justify-between py-2 text-xs items-start'>
          <h2 className='font-bold text-lg '>Emergency Request</h2>
          <button
            onClick={onClose}
            className='text-gray-500 text-lg hover:text-gray-700'
          >
            <i className='fa-regular fa-circle-xmark '></i>
          </button>
        </div>
        {request.facilityId.name && (
          <section className='mb-4 flex flex-col gap-1'>
            <div className=''>
              <h3 className='font-bold text-sm text-text-dark-gray '>
                Facility Information
              </h3>
              <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
            </div>
            <p>
              <span className='font-semibold text-text-dark-gray'>Name:</span>{" "}
              {request.facilityId?.name}
            </p>
            <p>
              <span className='font-semibold text-text-dark-gray'>
                Address:
              </span>{" "}
              {request.facilityId?.address}
            </p>

            <p>
              <span className='font-semibold text-text-dark-gray'>
                Operational Hours:
              </span>{" "}
              {request.facilityId.operationalHours}
            </p>
          </section>
        )}
        <section className='flex flex-col gap-1 mb-4'>
          <div className='flex flex-col  '>
            <h3 className='font-bold text-sm text-text-dark-gray mb-'>
              Request Information
            </h3>
            <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
          </div>
          {/* <p><span className="font-semibold">Age:</span> {request.donorAge} years</p>
          <p><span className="font-semibold">Gender:</span> {request.donorGender}</p> */}
          <p>
            <span className='font-semibold text-text-dark-gray'>
              Blood Type:
            </span>{" "}
            {request.bloodType}
          </p>
          <p className='flex items-center gap-2'>
            <span className='font-semibold text-text-dark-gray'>
              Urgency Level:
            </span>
            <span
              className={`inline-block w-3 h-3 rounded-full ${urgencyColor}`}
            ></span>
            {request.urgencyLevel}
          </p>
          <p>
            <span className='font-semibold text-text-dark-gray'>
              Quantity Needed:
            </span>{" "}
            {request.unitsRequested} Units
          </p>{" "}
          {/* <p className='text-lg font-bold text-green'>{request.status}</p> */}
          {request.status === ApiDonationScheduleStatus.PENDING && (
            <>
              <p>
                <span className='font-semibold text-text-dark-gray'>
                  Scheduled Date:
                </span>{" "}
                {DateUtils.formatDate(request.preferredDate)}{" "}
                {/* {DateUtils.formatTime(request.preferredDate)} */}
              </p>
              <p>
                <span className='font-semibold text-text-dark-gray'>
                  Scheduled Time:
                </span>{" "}
                {/* {DateUtils.formatDate(request.preferredDate)}{" "} */}
                {DateUtils.formatTime(request.preferredDate)}
              </p>
            </>
          )}
          <p>
            <span className='font-semibold text-text-dark-gray'>
              Additional Notes:
            </span>{" "}
            {request.notes || "-"}
          </p>
          {/* <p className='font-extrabold text-lg'> {request.status}</p> */}
        </section>
        {request.donorId && (
          <section className='flex flex-col mb-4 gap-1'>
            <div className='flex flex-col  '>
              <h3 className='font-bold text-sm text-text-dark-gray mb-'>
                Donation Information
              </h3>
              <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
            </div>
            <p>
              <span className='font-semibold text-text-dark-gray'>
                Donor Name:
              </span>{" "}
              {StringUtils.capitalize(request.donorId.firstName)}{" "}
              {StringUtils.capitalize(request.donorId.lastName)}
            </p>
            {/* <p><span className="font-semibold">Age:</span> {request.donorAge} years</p>
          <p><span className="font-semibold">Gender:</span> {request.donorGender}</p> */}

            <p>
              <span className='font-semibold text-text-dark-gray'>
                Scheduled Date:
              </span>{" "}
              {DateUtils.formatDate(request.preferredDate)}{" "}
              {/* {DateUtils.formatTime(request.preferredDate)} */}
            </p>
            <p>
              <span className='font-semibold text-text-dark-gray'>
                Scheduled Time:
              </span>{" "}
              {/* {DateUtils.formatDate(request.preferredDate)}{" "} */}
              {DateUtils.formatTime(request.preferredDate)}
            </p>
          </section>
        )}
        <section className='mt-4'>
          <div className='flex justify-between  text-sm mb-2 text-background font-bold'>
            <span>Submitted</span>
            <span>Scheduled</span>
            <span>Completed</span>
          </div>

          <div className='relative h-2 w-[95%] m-auto mt-5'>
            <div className='absolute -top-[6px] w-full h-[15px] border-1 border-background'>
              <div
                className=' h-full bg-background transition-all'
                style={{ width: `${progress}%` }}
              />
            </div>

            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-background flex items-center justify-center ${
                  index <= statusIndex ? "bg-background text-white" : "bg-white"
                }`}
                style={{ left: `${index * 50}%` }}
              >
                {index <= statusIndex && (
                  <i className='fa fa-check text-xs'></i>
                )}
              </div>
            ))}
          </div>
        </section>
        {user.facilityId ? (
          <div className='flex items-center justify-center mt-8'>
            {(request.status === "COMPLETED" ||
              request.status === "REJECTED") && (
              <button
                onClick={onClose}
                className='bg-background hover:bg-pink  mx-auto  w-full max-w-40  font-bold  text-white py-1 px-2'
              >
                Close
              </button>
            )}
            {request.status === "PENDING" && (
              <div className='flex gap-2  mx-auto'>
                <button
                  onClick={onClose}
                  className='text-background hover:bg-pink w-40 font-bold  border border-background py-1 px-2'
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    // setConfirm(!confirm);
                    handleDeclineRequest();
                  }}
                  className='bg-background hover:bg-pink  w-40  font-bold  text-white py-1 px-2'
                >
                  Cancel Request{" "}
                </button>
              </div>
            )}
            {request.status === "APPROVED" && (
              <div className='flex gap-2  mx-auto'>
                <button
                  onClick={() => {
                    // setConfirm(!confirm);
                    handleDeclineRequest();
                  }}
                  className='text-background hover:bg-pink w-40 font-bold  border border-background py-1 px-2'
                >
                  Cancel Request
                </button>

                <button
                  onClick={() => {
                    // setConfirmComplete(!confirmComplete);
                    handleCompleteRequest();
                  }}
                  className='bg-background hover:bg-pink  w-40  font-bold  text-white py-1 px-2'
                >
                  Mark as complete{" "}
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            disabled={cancelLoading === true}
            onClick={() => {
              handleDeclineRequest();
              // cancelRequest();
            }}
            className={`  font-bold text-xs text-white py-2 px-4 mt-8 self-center w-40  mx-auto   ${
              cancelLoading
                ? "bg-pink"
                : "bg-background hover:bg-pink transition-colors"
            }`}
          >
            {cancelLoading ? "Cancelling…" : "Cancel Request"}
          </button>
        )}
        <div className={`text-center mt-4 font-medium `}>{successMessage}</div>
      </div>
    </Modal>
  );
}
