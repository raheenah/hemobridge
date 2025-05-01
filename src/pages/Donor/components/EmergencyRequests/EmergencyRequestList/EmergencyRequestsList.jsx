import { useState } from "react";
import { PendingRequestList } from "./PendingRequestList";
import { AcceptedRequestList } from "./AcceptedRequestList"
import { ApiDonationScheduleStatus, UiDonationScheduleStatus } from "../../../../../shared/constants/donation-schedule.constant";

export function EmergencyRequestList() {

    const [activeStatus, setActiveStatus] = useState(ApiDonationScheduleStatus.PENDING);

    return   (
        <>
          <div className='sticky bg-white py-3 top-0'>
              <div className='flex justify-between items-center'>
                  <h2 className='font-bold text-lg'>Emergency requests</h2>
              </div>
          </div>

          <div>
              <StatusTabs 
                  value={activeStatus}
                  onChange={setActiveStatus}
              />
          </div>

          {   
              activeStatus === UiDonationScheduleStatus.PENDING &&
              <PendingRequestList />
          }

          {   
              activeStatus === UiDonationScheduleStatus.ACCEPTED &&
              <AcceptedRequestList />
          }
        </>
    );
}

function StatusTabs({ value, onChange }) {    
  const tabs = [UiDonationScheduleStatus.PENDING, UiDonationScheduleStatus.ACCEPTED];

  const isActive = (tab) =>
    tab === value
      ? 'border-b-2 border-purple-700 text-purple-700'
      : 'text-gray-500 hover:text-purple-700';

  return (
    <div className="flex border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 text-sm font-semibold focus:outline-none ${isActive(tab)}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}