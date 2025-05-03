import React from 'react';
import Pagination from '../common/Pagination';
import RequestRow from './RequestRow';

export default function DonationRequestList({ 
  requests, 
  currentPage,
  totalPages,
  onPageChange,
  onViewRequest 
})
{
  // console.log("Requests", requests);

  return (
    <div className='flex flex-col overflow-hidden py-3 overflow-y-auto px-6 bg-white'>
      <div className='sticky bg-white pb-3 top-0'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-lg'>Donation Requests</h2>
        </div>
      </div>

      <ul className='flex flex-col gap-2'>
        {requests?.map((request) => (
          <RequestRow
            key={request.id}
            request={request}
            onView={() => onViewRequest(request)}
          />
        ))}
      </ul>

      {requests?.length ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      ) : (
        <div className='flex flex-col items-center justify-center '>
          <p className=' text-center font-bold text-background text-base'>There are no Pending Donation Requests</p>
        </div>
      )}
    </div>
  );
}
