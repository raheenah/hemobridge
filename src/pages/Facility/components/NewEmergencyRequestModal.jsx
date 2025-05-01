import { useState } from 'react';
import Modal from "src/components/common/Modal.jsx";
import { DonationApi } from '../../../api/donation.api';

export function NewEmergencyRequestModal({close}) {
  const [formData, setFormData] = useState({
    bloodType: '',
    unitsNeeded: '',
    urgency: '',
    notes: '',
    preferredDate: ''
  });

  const [message, setMessage] = useState('')
  const [formResult, setFormResult] = useState({
    error: false,
    message: ""
  })

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormResult({ error: false, message: "" });

    DonationApi.createBloodDonationSchedule(formData)
    .then((data)=> {
      setFormResult(state => ({ ...state, message: data.message  }))
    })
    .catch((error)=> {
      console.error(error)
      setFormResult({ error: true, message: error.message });
    })
    .finally(()=> {
      setFormData({
        bloodType: '',
        unitsNeeded: '',
        urgency: '',
        notes: '',
        preferredDate: ''
      })
      setMessage("Emergency request has been submitted successfully")
      setTimeout(() => {
        close()
      }, 800)
    })
  };

  return (
    <Modal onClose={close}>
      <div
        onClick={() => close()}
        className='absolute bg-gray-100/50 inset-0 z-50 flex items-center justify-center'
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className='w-[40%] max-h-[80dvh] overflow-auto shadow-pink-glow mx-auto bg-white px-8 py-4 flex flex-col gap-4'
        >
          <div className='flex justify-between'>
            <h2 className='font-bold text-base text-text-dark-gray'>
              New Emergency Request
            </h2>
            <button onClick={() => close()}>
              <i className='fa-regular fa-circle-xmark'></i>
            </button>
          </div>

          <div className='w-full h-0.5 top-0 bg-background-grey'></div>

          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-row w-full items-center justify-between gap-3'>
              <div className='w-full px-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                  Blood Type <span className='text-red-500'>*</span>
                </label>
                <select
                  className='focus:outline-none py-4 w-full text-input-text'
                  required
                  value={formData.bloodType}
                  onChange={handleChange("bloodType")}
                >
                  <option value='' disabled>
                    Choose...
                  </option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className='w-full p-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                  Units Needed <span className='text-red-500'>*</span>
                </label>
                <input
                  className='placeholder-input-text w-full focus:outline-none'
                  type='number'
                  name='units-needed'
                  value={formData.unitsNeeded}
                  onChange={handleChange("unitsNeeded")}
                  required
                />
              </div>
            </div>

            <div className='flex flex-row w-full items-center justify-between gap-3'>
              <div className='w-full px-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                  Urgency Level <span className='text-red-500'>*</span>
                </label>
                <select
                  className='focus:outline-none py-4 w-full text-input-text'
                  required
                  value={formData.urgency}
                  onChange={handleChange("urgency")}
                >
                  <option value='' disabled>
                    Choose...
                  </option>
                  <option value='HIGH'>High</option>
                  <option value='MEDIUM'>Medium</option>
                  <option value='LOW'>Low</option>
                </select>
              </div>

              <div className='w-full px-4 relative border-1 text-text-dark-gray'>
                <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                  Preferred Date <span className='text-red-500'>*</span>
                </label>
                <input
                  className='focus:outline-none py-4 w-full text-input-text'
                  type='date'
                  value={formData.preferredDate}
                  onChange={handleChange("preferredDate")}
                  required
                />
              </div>
            </div>


            <div className='w-full px-4 relative border-1 text-text-dark-gray'>
              <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                Additional Notes
              </label>
              <textarea
                className='focus:outline-none py-4 w-full text-input-text'
                rows={4}
                placeholder='Write any special notes or context here...'
                value={formData.notes}
                onChange={handleChange("notes")}
              />
            </div>


            <button
              type='submit'
              className='bg-background hover:bg-pink !important self-end w-full max-w-32 font-bold text-xs text-white py-2 px-4'
            >
              Schedule
            </button>
          </form>

          <div
            className={`text-center mt-4 font-medium ${
              formResult.error ? "text-red-500" : "text-green-500"
            }`}
          >
            {formResult.message}
          </div>
        </div>
      </div>
    </Modal>
  );
}
