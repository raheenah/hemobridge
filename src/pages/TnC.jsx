import { useState } from "react";
import { NavLink } from "react-router-dom";


function TermsAndConditions() {
  return (
    <div className=' flex items-center text-text-dark-gray text-sm font-inter py-10 w-full'>
      <div className='  md:w-[80%]   mx-auto flex px-16  md:px-4 flex-col  gap-6 items-center '>
        <div className='flex w-full justify-between text-2xl '>
          <h1 className=' font-[700] flex-grow  font-space w-full text-center'>
            Terms & Conditions{" "}
          </h1>
          <button className='w-fit hover:text-background'>
            <i className='fa-regular fa-circle-xmark'></i>
          </button>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <h1 className=' font-[700] font-space text-lg'>Introduction </h1>

            <p className='  '>
              Welcome to <b className='text-background'>HemoBridge</b>, a
              platform dedicated to connecting blood donors with patients in
              need. By creating an account and using our services, you agree to
              comply with these Terms & Conditions. Please read them carefully.
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className=' font-[700] font-space text-lg'>Eligibility</h1>

            <ul>
              <li>
                You must be <b>at least 18 years old</b> (or meet the legal age
                requirement in your country).
              </li>
              <li>
                You must be in <b>good health</b> and meet blood donation
                guidelines set by health authorities.
              </li>
              <li>
                You agree to provide <b>accurate</b> medical history and
                disclose any health conditions that may affect your eligibility
                to donate
              </li>
            </ul>
          </div>{" "}
          <div className='flex flex-col gap-2'>
            <h1 className=' font-[700] font-space  text-lg'>Obligations</h1>

            <ul>
              <li>
                You acknowledge that blood donation is both  <b>voluntary</b>{" "}
                and incentivised based on Facility Preference.
              </li>
              <li>
                You will follow <b>hospital guidelines</b> for safe donation.
              </li>
              <li>
                You are responsible for updating your <b>availability status</b>{" "}
                on the platform.
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className=' font-[700] text-lg font-space '>
              Data Privacy & Security
            </h1>

            <ul>
              <li>
                Your personal and medical information will only be shared with
                authorized healthcare facilities upon request
              </li>
              <li>
                We use <b> secure encryption</b> to protect your data, but you
                are responsible for safeguarding your login credentials.
              </li>
            </ul>
          </div>{" "}
          <div className='flex flex-col gap-2'>
            <h1 className=' font-[700] font-space  text-lg'>Disclaimer </h1>

            <p>
              HemoBridge is a connector platform; we do not conduct medical
              screenings or provide health guarantees.
              <p>
                We are not responsible for any medical complications arising
                from donation. Please consult a healthcare provider and provide
                accurate health information  before donating.
              </p>
            </p>
          </div>
        </div>

        <button className='bg-background p-4  w-[40%] mx-auto  font-bold text-base text-white py-3'>
          I Understand{" "}
        </button>
      </div>
    </div>
  );
}

export default TermsAndConditions;
