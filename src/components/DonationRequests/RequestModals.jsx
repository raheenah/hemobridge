import React, { useState } from 'react';
import Modal from '../common/Modal';
import RequestRow from './RequestRow';
import { DonationApi } from '../../api/donation.api';
import { ApiDonationScheduleStatus } from '../../shared/constants/donation-schedule.constant';

export function ViewRequestModal({ request, onClose, isOpen }) {
  const [approveState, setApproveState] = useState({
    error: false,
    message: ""
  });

  function handleApproveRequest() {
    setApproveState({
      error: false,
      message: ""
    })
    DonationApi.approveSchedule(request.id)
    .then((data)=> { 
      setApproveState({
        error: false,
        message: data.message
      })
    })
    .catch((error)=> {
      setApproveState({
        error: true,
        message: error.message
      })
    })
  }

  function handleDeclineRequest() {
    setApproveState({
      error: false,
      message: ""
    })

    DonationApi.declineSchedule(request.id)
    .then((data)=> { 
      setApproveState({
        error: false,
        message: data.message
      })
    })
    .catch((error)=> {
      setApproveState({
        error: true,
        message: error.message
      })
    })
  }

    function handleCompleteRequest() {
      setApproveState({
        error: false,
        message: "",
      });

      DonationApi.completeSchedule(request.id)
        .then((data) => {
          setApproveState({
            error: false,
            message: data.message,
          });
        })
        .catch((error) => {
          setApproveState({
            error: true,
            message: error.message,
          });
        });
  }
  
   
  
  if (!isOpen || !request) return null;
  return (
    <>
      <Modal onClose={onClose}>
        <div className='flex flex-col gap-4 bg-white top-0'>
          <div className='flex w-full gap-1 justify-between'>
            <div className='flex flex-col w-[40%] justify-between'>
              <h2 className='font-bold text-base'>Request Details</h2>
              <div className='w-full h-0.5 top-0 bg-background-grey'></div>
            </div>
            <button onClick={onClose}>
              <i className='fa-regular fa-circle-xmark'></i>
            </button>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-text-dark-gray font-bold text-sm'>
              Donor Information
            </h3>
            <div className='flex flex-col gap-1'>
              <RequestRow
                key={request.id}
                request={request}
                onView={() => {}}
                isExpandable={false}
              />
            </div>
          </div>

          <div className='flex gap-4 mx-auto mt-8'>
            <button
              onClick={handleDeclineRequest}
              className='text-background hover:bg-pink w-24 font-bold border border-background py-1 px-2'
            >
              {" "}
              Decline{" "}
            </button>
            {request.status === ApiDonationScheduleStatus.PENDING && (
              <button
                onClick={handleApproveRequest}
                className='bg-background hover:bg-pink w-24 font-bold text-white py-1 px-2'
              >
                {" "}
                Accept{" "}
              </button>
            )}{" "}
            {request.status === ApiDonationScheduleStatus.APPROVED && (
              <button
                onClick={handleCompleteRequest}
                className='bg-background hover:bg-pink w-24 font-bold text-white py-1 px-2'
              >
                {" "}
                Complete{" "}
              </button>
            )}
            {request.status === ApiDonationScheduleStatus.COMPLETED && (
              <button
                onClick={onClose}
                className='bg-background hover:bg-pink w-24 font-bold text-white py-1 px-2'
              >
                {" "}
                Close{" "}
              </button>
            )}
          </div>

          <div
            className={`text-center mt-4 font-medium ${
              approveState.error ? "text-red-500" : "text-green-500"
            }`}
          >
            {approveState.message}
          </div>
        </div>
      </Modal>
    </>
  );
}

export function ConfirmationModal({ 
  isOpen,
  title,
  message,
  onConfirm,
  onCancel 
}) {
  if (!isOpen) return null;

  return (
    <Modal onClose={onCancel}>
      <div className='flex flex-col gap-4 items-center bg-white top-0'>
        <div className='flex flex-col w-full gap-1 justify-between items-center'>
          <h2 className='font-bold text-base'>{title}</h2>
          <div className='w-[70%] h-0.5 top-0 bg-background-grey'></div>
        </div>
        <p className='w-fit mx-auto'>{message}</p>
        <div className='flex gap-4 mx-auto mt-8'>
          <button
            onClick={onCancel}
            className='text-background hover:bg-pink w-24 font-bold border border-background py-1 px-2'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='bg-background hover:bg-pink w-24 font-bold text-white py-1 px-2'
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
