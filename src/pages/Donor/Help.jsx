import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/book-open-02.png";

function Help() {
  return (
    <div className=' flex  h-full bg-white flex-col text-xs gap-4 py-3  px-6   w-full'>
      <div className='flex flex-col gap-4'>
        {" "}
        <h1 className='text-sm font-bold '>
          Frequently Asked Questions (FAQs)
        </h1>
        <div className='md:w-[50%] flex flex-col gap-2'>
          <details className="flex flex-col gap-2">
            <summary className='list-none font-bold flex items-center justify-between gap-2'>
              How do I donate blood through HemoBridge?
              <i className='fa-solid fa-angle-right'></i>{" "}
            </summary>
            <p>
              To donate blood, simply create an account on HemoBridge, fill out
              your profile, and indicate your availability. Hospitals will
              contact you when they need donors.
            </p>
          </details>{" "}
          <details className="flex flex-col gap-2">
            <summary className='list-none font-bold flex items-center justify-between gap-2'>
              What are the eligibility requirements for blood donation?{" "}
              <i className='fa-solid fa-angle-right'></i>{" "}
            </summary>
            <p>
              You must be at least 18 years old, in good health, and meet the
              blood donation guidelines set by health authorities.
            </p>
          </details>
          <details className="flex flex-col gap-2">
            <summary className='list-none font-bold flex items-center justify-between gap-2'>
              How often can I donate blood?{" "}
              <i className='fa-solid fa-angle-right'></i>{" "}
            </summary>
            <p>
              The frequency of blood donation varies by country and type of
              donation. Generally, whole blood can be donated every 8 weeks,
              while platelets and plasma can be donated more frequently.
            </p>
          </details>
          <details className="flex flex-col gap-2">
            <summary className='list-none font-bold flex items-center justify-between gap-2'>
              Will donating blood affect my health?{" "}
              <i className='fa-solid fa-angle-right'></i>{" "}
            </summary>
            <p>
              Donating blood is safe for most healthy individuals. You may
              experience temporary side effects like dizziness or fatigue, but
              these usually resolve quickly. It's important to follow post-
              donation care instructions.
            </p>
          </details>
          <details className="flex flex-col gap-2">
            <summary className='list-none font-bold flex items-center justify-between gap-2'>
              How do I track my past donations?{" "}
              <i className='fa-solid fa-angle-right'></i>{" "}
            </summary>
            <p>
              You can track your past donations through your HemoBridge account.
              Your donation history will be available on your dashboard.
            </p>
          </details>
          <details className="flex flex-col gap-2">
            <summary className='list-none font-bold flex items-center justify-between gap-2'>
              Can I cancel or reschedule my appointments?{" "}
              <i className='fa-solid fa-angle-right'></i>{" "}
            </summary>
            <p>
              Yes, you can cancel or reschedule your appointments through your
              HemoBridge account. Please notify the hospital as soon as possible
              if you need to make changes.
            </p>
          </details>
          <details className="flex flex-col gap-2">
            <summary className='list-none font-bold flex items-center justify-between gap-2'>
              Is my personal information safe with HemoBridge?{" "}
              <i className='fa-solid fa-angle-right'></i>{" "}
            </summary>
            <p>
              Yes, HemoBridge takes data privacy seriously. Your personal and
              medical information will be kept confidential and only shared with
              authorized personnel as required by law.
            </p>
          </details>
        </div>
      </div>
      <div className='w-full h-0.5 top-0  bg-background-grey'></div>
      <div className='flex flex-col gap-4'>
        {" "}
        <h1 className='text-sm font-bold '>Report an Issue </h1>
        <form className='flex flex-col gap-4'>
          <div className='md:w-[20%] px-4  relative border-1 text-text-dark-gray'>
            <label className='absolute   font-[700] px-1 top-[-10px] bg-white left-[10px]'>
              Issue Type<span className='text-red-500'>*</span>
            </label>{" "}
            <select className=' focus:outline-none py-4   w-full   text-input-text '>
              <option
                className='text-input-text   focus:outline-none'
                disabled
                // selected
                defaultValue
              >
                Choose...
              </option>
              <option
                className='text-input-text   focus:outline-none'
                value='A+'
              >
                Issue 1{" "}
              </option>{" "}
              <option
                className='text-input-text   focus:outline-none'
                value='A-'
              >
                Issue 2{" "}
              </option>
              <option
                className='text-input-text   focus:outline-none'
                value='B-'
              >
                Issue 3{" "}
              </option>
            </select>
          </div>
          <div className=' p-4 relative  border-1 text-text-dark-gray'>
            <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
              Describe the Issue <span className='text-red-500'>*</span>
            </label>
            <textarea
              placeholder='Type here...'
              className='placeholder-input-text w-full focus:outline-none'
              type='text area'
              rows='9'
              // name='email'
              // value={formData.email}
              // onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            onClick={() => {
              // setDonate(true);
              // setSelectedRequest(request);
            }}
            className='bg-background hover:bg-pink !important   max-w-32 font-bold  text-white py-1 px-2'
          >
Submit          </button>
        </form>
      </div>
    </div>
  );
}

export default Help;
