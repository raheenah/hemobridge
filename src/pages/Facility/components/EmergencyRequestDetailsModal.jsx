import { useState } from 'react';
import Modal from 'src/components/common/Modal.jsx';
import { StringUtils } from "src/shared/utils/string.utils.js"
import { DateUtils } from "src/shared/utils/date.utils.js";

export default function EmergencyRequestDetails({ onClose, request }) {

  const [cancelLoading, setCancelLoading] = useState(false);

  const cancelRequest = async () => {
    setCancelLoading(true);
    // TODO: hit your cancel API here
    setTimeout(() => {
      setCancelLoading(false);
      onClose();
    }, 800);
  };

  const apiToUiStatus = {
    PENDING:   'SUBMITTED',
    APPROVED:  'SCHEDULED',
    COMPLETED: 'COMPLETED',
    REJECTED:  'COMPLETED',
    CANCELLED: 'COMPLETED',
  };

  const statusToIndex = { SUBMITTED: 0, SCHEDULED: 1, COMPLETED: 2 };

  const uiStatus   = apiToUiStatus[request.status];
  const statusIndex = statusToIndex[uiStatus] ?? 0;

  const progress = ((statusIndex / 2) * 100);

  const urgencyColor =
    request.urgencyLevel === 'HIGH'
    ? 'bg-orange-500'
    : request.urgencyLevel === 'MEDIUM'
    ? 'bg-yellow-400'
        : 'bg-green-500';
  
  console.log("request", request);

  return (
    <Modal onClose={onClose}>
      <div>
        {" "}
        <div className='flex justify-between text-xs items-start'>
          <h2 className='font-bold text-base '>Emergency Request</h2>
          <button
            onClick={onClose}
            className='text-gray-500 text-lg hover:text-gray-700'
          >
            <i className='fa-regular fa-circle-xmark '></i>
          </button>
        </div>
        <div className='w-[70%] h-0.5 top-0   bg-background-grey'></div>
      </div>
      {/*
        <section>
          <h3 className="font-bold text-sm text-gray-700 mb-1">Contact Information</h3>
          <hr className="mb-2" />
          <p><span className="font-semibold">Name:</span> {request.facilityName}</p>
          <p><span className="font-semibold">Address:</span> {request.facilityAddress}</p>
          <p><span className="font-semibold">Contact Number:</span> {request.facilityPhone}</p>
        </section> */}

      <section>
        <h3 className='font-bold text-sm text-text-dark-gray mb-1'>
          Request Information
        </h3>
        <p>
          <span className='font-semibold'>Donor Name:</span>{" "}
          {StringUtils.capitalize(request.donorId.firstName)}{" "}
          {StringUtils.capitalize(request.donorId.lastName)}
        </p>
        {/* <p><span className="font-semibold">Age:</span> {request.donorAge} years</p>
          <p><span className="font-semibold">Gender:</span> {request.donorGender}</p> */}
        <p>
          <span className='font-semibold'>Blood Type:</span> {request.bloodType}
        </p>
        <p className='flex items-center gap-2'>
          <span className='font-semibold'>Urgency Level:</span>
          <span
            className={`inline-block w-3 h-3 rounded-full ${urgencyColor}`}
          ></span>
          {request.urgencyLevel}
        </p>
        <p>
          <span className='font-semibold'>Quantity Needed:</span>{" "}
          {request.unitsRequested} Units
        </p>{" "}
        <p>
          <span className='font-semibold'>Scheduled Date:</span>{" "}
          {DateUtils.formatDate(request.preferredDate)}{" "}
          {/* {DateUtils.formatTime(request.preferredDate)} */}
        </p>
        <p>
          <span className='font-semibold'>Scheduled Time:</span>{" "}
          {/* {DateUtils.formatDate(request.preferredDate)}{" "} */}
          {DateUtils.formatTime(request.preferredDate)}
        </p>
        <p>
          <span className='font-semibold'>Additional Notes:</span>{" "}
          {request.notes || "-"}
        </p>
        <p className='font-extrabold text-lg'> {request.status}</p>
      </section>

      <section className='mt-4'>
        <div className='flex justify-between  text-sm mb-2 text-gray-700'>
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
              {index <= statusIndex && <i className='fa fa-check text-xs'></i>}
            </div>
          ))}
        </div>
      </section>

      <button
        disabled={cancelLoading || request.status !== "SUBMITTED"}
        onClick={cancelRequest}
        className={`self-center w-40 py-2 text-xs font-bold text-white ${
          cancelLoading
            ? "bg-gray-400"
            : "bg-background hover:bg-pink transition-colors"
        }`}
      >
        {cancelLoading ? "Cancelling…" : "Cancel Request"}
      </button>
    </Modal>
  );
}