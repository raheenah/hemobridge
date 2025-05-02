import { useEffect, useState } from "react";
import Pagination from "../../../../../components/common/Pagination";
import EmergencyRequestRow from "../../EmergencyRequestRow"
import { DonationApi } from "../../../../../api/donation.api";
import { ApiDonationScheduleStatus } from "src/shared/constants/donation-schedule.constant.js"
import Loader from "../../../../../components/common/Loader";
import EmergencyRequestDetails from "../EmergencyRequestDetails/EmergencyRequestDetails";

export function PendingRequestList() {
   
    const [pendingRequests, setPendingRequests] = useState({
        state: "idle" | "loading",
        error: false,
        message: "",
        list: [],
        currentPage: 1,
        totalPages: 1,
        selected: undefined
    })
    const [refresh, setRefresh] = useState(false);

    useEffect(()=> {
        setPendingRequests(state => ({ ...state, state: "loading", error: false, message: "" }));
        DonationApi.fetchDonorSchedules(pendingRequests.currentPage, ApiDonationScheduleStatus.PENDING, true)
        .then((data)=> setPendingRequests(data))
        .catch((error)=> {
            setPendingRequests(state => ({ ...state, error: true, message: error.message }));
        })
        .finally(()=> {
            setPendingRequests(state => ({ ...state, state: "idle" }));
        })

    }, [pendingRequests.currentPage, refresh])

    return (
      <>
        <div>
          {pendingRequests.state === "loading" ? (
            <Loader />
          ) : (
            <div className='flex flex-col min-h-128 h-full gap-2'>
              {!pendingRequests.list.length && (
                <div className='flex items-center justify-center min-h-[50%] h-full  text-center'>
                  <p className='text-background font-extrabold text-lg'>
There are no pending emergency requests                  </p>
                </div>
              )}
              
              {pendingRequests.list.map((request, index) => {
                return (
                  <EmergencyRequestRow
                    key={index}
                    request={request}
                    onView={(selectedRequest) =>
                      setPendingRequests((state) => ({
                        ...state,
                        selected: selectedRequest,
                      }))
                    }
                  />
                );
              })}
            </div>
          )}

          <Pagination
            currentPage={pendingRequests.currentPage}
            totalPages={pendingRequests.totalPages}
            onPageChange={(page) =>
              setPendingRequests((state) => ({ ...state, currentPage: page }))
            }
          />
        </div>

            {pendingRequests.selected && (
                <EmergencyRequestDetails
                    requestDetails={pendingRequests.selected}
                    onClose={() => { 
              setPendingRequests((state) => ({ ...state, selected: undefined }))
            setRefresh(!refresh)
            }}
          />
        )}
      </>
    );
}