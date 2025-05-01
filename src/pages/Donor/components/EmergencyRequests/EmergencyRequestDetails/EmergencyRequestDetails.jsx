import { useState } from "react";
import Modal from "src/components/common/Modal.jsx";
import { DonationApi } from "../../../../../api/donation.api";
import { DateUtils } from "../../../../../shared/utils/date.utils";
import { StringUtils } from "../../../../../shared/utils/string.utils";

export default function EmergencyRequestDetails({requestDetails, onClose}) {

    const [formData, setFormData] = useState({
        state: "idle" | "loading",
        error: false,
        message: "",
        preferredDate: "",
        preferredTime: ""
    })

    console.log("Request details", requestDetails)

    function acceptDonationScheduleRequest() {
        const payload = {
            preferredDate: DateUtils.combineDateAndTime(formData)
        }

        setFormData(state => ({ ...state, state: "loading", error: false, message: "" }))

        DonationApi.acceptSchedule(requestDetails.id, payload)
        .then((data)=> {
            setFormData(state => ({ ...state, message: data.message }))
        })
        .catch((error)=> {
            console.log(error)
            setFormData(state => ({ ...state, error: true, message: error.message }))
        })
        .finally(()=> {
            setFormData(state => ({ ...state, state: "idle" }))
            setTimeout(() => {
                onClose()
            }, 800)
        })
    }

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col gap-1">
        <div className='flex justify-between items-center'>
          <h1 className='font-extrabold text-base'> Emergency Request </h1>
          <button onClick={() => onClose()}>
            <i className='fa-regular fa-circle-xmark'></i>
          </button>
        </div>
        <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
</div>
        <div className='flex flex-col text-base gap-2'>
          {/* <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-base text-text-dark-gray'>
              Facility Information
            </h2>
            <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
          </div> */}
          <div>
            <p className='flex items-center gap-2'>
              <span className='text-text-dark-gray '>Facility:</span>{" "}
              {requestDetails.facilityId?.name}
            </p>
            <p className='flex items-center gap-2'>
              <span className='text-text-dark-gray'>Address:</span>{" "}
              {requestDetails.facilityId?.address}
            </p>
            <p className='flex items-center gap-2'>
              <span className='text-text-dark-gray'>Operational Hours:</span>{" "}
              {requestDetails.facilityId?.operationalHours}
            </p>

            {/* <p className='flex items-center gap-2 text-text-dark-gray'>
              Urgency Level:
              <span className='text-black flex items-center gap-2'>
                {/* <span className='flex items-center my-auto  gap-1'> 
                <i
                  className={` fa-solid fa-circle text-green
                    ${
                      requestDetails?.urgencyLevel === "high"
                        ? "text-red"
                        : requestDetails?.urgencyLevel === "medium"
                        ? "text-yellow"
                        : "text-green"
                    }`}
                ></i>

                {StringUtils.capitalize(requestDetails?.urgencyLevel)}
              </span>
            </p> */}
            <p className='flex items-center gap-2'>
              <span className='text-text-dark-gray '>Blood Type:</span>{" "}
              {requestDetails.bloodType}
            </p>
            <p className='flex items-center gap-2'>
              <span className='text-text-dark-gray'>Preferred Date:</span>{" "}
              {DateUtils.formatDate(requestDetails.preferredDate)}
            </p>
          </div>
          <div className='w-[50%] h-0.5 top-0   bg-background-grey'></div>
        </div>
        <div className='flex flex-col text-base gap-6'>
          <div className='flex flex-col gap-1'>
            <h2 className='font-bold text-base text-text-dark-gray'>
              Scheduling Details{" "}
            </h2>
            <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
          </div>
          <form className=' flex flex-col gap-4  md:gap-2'>
            <div className='grid  gap-2 grid-cols-2'>
              <div className=' p-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Date<span className='text-red-500'>*</span>
                </label>
                <input
                  onChange={(e) =>
                    setFormData((state) => ({
                      ...state,
                      preferredDate: e.target.value,
                    }))
                  }
                  className='placeholder-input-text w-full focus:outline-none'
                  type='date'
                  required
                />
              </div>
              <div className=' p-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                  Time<span className='text-red-500'>*</span>
                </label>
                <input
                  onChange={(e) =>
                    setFormData((state) => ({
                      ...state,
                      preferredTime: e.target.value,
                    }))
                  }
                  className='placeholder-input-text w-full focus:outline-none'
                  type='time'
                  required
                />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                acceptDonationScheduleRequest();
              }}
              className='bg-background hover:bg-pink !important self-end  w-fit mt-4  font-bold text-base text-white py-3 px-6'
            >
              {" "}
              Schedule{" "}
            </button>
          </form>

          <div
            className={`text-center mt-4 font-medium ${
              formData.error ? "text-red-500" : "text-green-500"
            }`}
          >
            {formData.message}
          </div>
        </div>
      </Modal>
    );
}