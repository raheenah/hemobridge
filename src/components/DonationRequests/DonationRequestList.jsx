import React from 'react';
import Pagination from '../common/Pagination';
import RequestRow from './RequestRow';

export default function DonationRequestList({ 
  requests, 
  currentPage,
  totalPages,
  onPageChange,
  onViewRequest 
}) {
  return (
    <div className='flex flex-col overflow-hidden overflow-y-auto px-6 bg-white'>
      <div className='sticky bg-white py-3 top-0'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-lg'>Donation requests</h2>
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

     {
        requests?.length
        ?   <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        :   null
     }
    </div>
  );
}
