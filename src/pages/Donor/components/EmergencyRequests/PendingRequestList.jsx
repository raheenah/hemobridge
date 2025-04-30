import { useEffect, useState } from "react";
import Pagination from "../../../../components/common/Pagination";
import EmergencyRequestRow from "../EmergencyRequestRow"
import { DonationApi } from "../../../../api/donation.api";
import { ApiDonationScheduleStatus } from "src/shared/constants/donation-schedule.constant.js"
import Loader from "../../../../components/common/Loader";

export function PendingRequestList() {
   
    const [pendingRequests, setPendingRequests] = useState({
        state: "idle" | "loading",
        error: false,
        message: "",
        list: [],
        currentPage: 1,
        totalPages: 1    
    })

    useEffect(()=> {
        setPendingRequests(state => ({ ...state, state: "loading", error: false, message: "" }));
        DonationApi.fetchDonorSchedules(pendingRequests.currentPage, ApiDonationScheduleStatus.PENDING)
        .then((data)=> {
            console.log(data)
            setPendingRequests(data)
        })
        .catch((error)=> {
            setPendingRequests(state => ({ ...state, error: true, message: error.message }));
        })
        .finally(()=> {
            setPendingRequests(state => ({ ...state, state: "idle" }));
        })

    }, [pendingRequests.currentPage])

    return   (
        <div>
            {
                pendingRequests.state === "loading"
                ?   <Loader />
                :   <div className='flex flex-col gap-2'>
                        { !pendingRequests.list.length && <div>No item</div> }
                        {
                            pendingRequests.list.map((request, index)=> {
                                return  <EmergencyRequestRow
                                            key={index}
                                            request={request}
                                        />
                            })
                        }
                    </div>
            }

            <Pagination 
                currentPage={pendingRequests.currentPage}
                totalPages={pendingRequests.totalPages}
                onPageChange={(page)=> setPendingRequests(state => ({ ...state, currentPage: page }))}
            />
        </div>
    );
}