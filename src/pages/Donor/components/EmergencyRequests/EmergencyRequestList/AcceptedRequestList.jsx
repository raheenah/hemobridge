import { useEffect, useState } from "react";
import Pagination from "../../../../../components/common/Pagination";
import EmergencyRequestRow from "../../EmergencyRequestRow"
import { DonationApi } from "../../../../../api/donation.api";
import { ApiDonationScheduleStatus } from "src/shared/constants/donation-schedule.constant.js"
import Loader from "../../../../../components/common/Loader";
import EmergencyRequestDetails from "src/pages/Facility/components/EmergencyRequestDetailsModal.jsx";

export function AcceptedRequestList() {
   
    const [acceptedRequests, setAcceptedRequests] = useState({
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
        setAcceptedRequests(state => ({ ...state, state: "loading", error: false, message: "" }));
        DonationApi.fetchDonorSchedules(setAcceptedRequests.currentPage, ApiDonationScheduleStatus.APPROVED, true)
            .then((data) => 
            setAcceptedRequests(state => ({
                ...state,
                ...data
            }))
        )
        .catch((error)=> {
            setAcceptedRequests(state => ({ ...state, error: true, message: error.message }));
        })
        .finally(()=> {
            setAcceptedRequests(state => ({ ...state, state: "idle" }));
        })

    }, [acceptedRequests.currentPage, refresh])

    return (
        <>
            <div>
                {
                    acceptedRequests.state === "loading"
                    ?   <Loader />
                    :   <div className='flex flex-col min-h-128  gap-2'>
                            {!acceptedRequests.list.length &&
                                <div className="flex items-center justify-center min-h-[50%] h-full  text-center"><p className="text-background font-extrabold text-lg">You do not have any scheduled donations</p></div>}
                            {
                                acceptedRequests.list.map((request, index)=> {
                                    return  <EmergencyRequestRow 
                                                key={index}
                                                request={request}
                                                onView={(selectedRequest)=> {
                                                    // console.log(selectedRequest)
                                                    setAcceptedRequests(state => ({
                                                    ...state, 
                                                    selected: selectedRequest
                                                }))}}
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

            {
                acceptedRequests.selected && 
                <EmergencyRequestDetails
                    request={acceptedRequests.selected}
                    onClose={() => 
                        setAcceptedRequests(state => ({ ...state, selected: undefined }))
                   }
                    refresh={() => setRefresh(!refresh)}
                />
            }
        </>
    );
}