import { ApiDonationScheduleStatus } from '../../shared/constants/donation-schedule.constant';
import { DateUtils } from '../../shared/utils/date.utils';
import { StringUtils } from '../../shared/utils/string.utils';

export default function EmergencyRequestRow({ request, onView, isExpandable = true }) {
 
// console.log("requests", request)

  return (
    <li
      className={`px-2 py-1 flex items-start justify-between ${
        isExpandable ? "border-1 border-text-gray" : ""
      }`}
    >
      <div className='flex flex-col gap-1'>
        {request.donorId?.firstName && request.donorId?.lastName ? (
          <p className='flex items-center gap-2'>
            <span className='text-text-dark-gray font-bold'>Donor ID: </span>
            {`${StringUtils.capitalize(
              request.donorId.firstName
            )} ${StringUtils.capitalize(request.donorId.lastName)}`}
          </p>
        ) : null}

        <p className='flex items-start gap-2'>
          <span className='text-text-dark-gray font-bold'>Blood Type:</span>
          {request.bloodType}
        </p>
        {/* <p className='flex items-start gap-2'>
          <span className='text-text-dark-gray font-bold'>Units Requested:</span>
          {request.unitsRequested}
        </p> */}
        <p className='flex items-start gap-2'>
          <span className='text-text-dark-gray font-bold'>Date:</span>
          {DateUtils.formatDate(request.preferredDate)}
        </p>
        <p className='flex items-start gap-2'>
          <span className='text-text-dark-gray font-bold'>Time:</span>
          {DateUtils.formatTime(request.preferredDate)}
        </p>
        <p
          className={`  text-base font-extrabold  ${
            request.status === ApiDonationScheduleStatus.PENDING ||
            request.status === ApiDonationScheduleStatus.APPROVED
              ? "text-yellow"
              : request.status === ApiDonationScheduleStatus.COMPLETED
              ? "text-green"
              : "text-red"
          }`}
        >
          {request.status}
        </p>
      </div>
      {isExpandable && (
        <button
          onClick={onView}
          className='bg-background hover:bg-pink w-fit font-bold text-white py-1 px-2'
        >
          Actions{" "}
        </button>
      )}
    </li>
  );
}
