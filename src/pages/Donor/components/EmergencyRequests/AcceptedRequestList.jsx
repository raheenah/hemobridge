import { useEffect, useState } from "react";
import Pagination from "../../../../components/common/Pagination";
import EmergencyRequestRow from "../EmergencyRequestRow"
import { DonationApi } from "../../../../api/donation.api";
import { ApiDonationScheduleStatus } from "src/shared/constants/donation-schedule.constant.js"
import Loader from "../../../../components/common/Loader";

export function AcceptedRequestList() {
   
    const [acceptedRequests, setAcceptedRequests] = useState({
        state: "idle" | "loading",
        error: false,
        message: "",
        list: [],
        currentPage: 1,
        totalPages: 1    
    })

    useEffect(()=> {
        console.log("HERE")
        setAcceptedRequests(state => ({ ...state, state: "loading", error: false, message: "" }));
        DonationApi.fetchDonorSchedules(setAcceptedRequests.currentPage, ApiDonationScheduleStatus.APPROVED)
        .then((data)=> {
            console.log(data)
        })
        .catch((error)=> {
            setAcceptedRequests(state => ({ ...state, error: true, message: error.message }));
        })
        .finally(()=> {
            setAcceptedRequests(state => ({ ...state, state: "idle" }));
        })

    }, [acceptedRequests.currentPage])

    return   (
        <div>
            {
                acceptedRequests.state === "loading"
                ?   <Loader />
                :   <div className='flex flex-col gap-2'>
                        { !acceptedRequests.list.length && <div>No item</div> }
                        {
                            acceptedRequests.list.map((request, index)=> {
                                return  <EmergencyRequestRow 
                                            key={index}
                                            request={request}
                                        />
                            })
                        }
                    </div>
            }

            <Pagination 
                currentPage={acceptedRequests.currentPage}
                totalPages={acceptedRequests.totalPages}
                onPageChange={(page)=> setAcceptedRequests(state => ({ ...state, currentPage: page }))}
            />
        </div>
    );
}