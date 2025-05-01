import {useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Facilities from './Facilities';
import { FacilityListApi } from "../api/facilityList";

import { useProfileContext } from '../shared/context/user-profile-context';



export default function InventoryOverview() {
  const navigate = useNavigate()
  const user = useProfileContext();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewList, setViewList] = useState(false);


   useEffect(() => {
     setLoading(true);
    //  console.log("Fetching facilities list... current page:", 1);
     FacilityListApi.fetchFacilitiesList(1)
       .then((res) => {
         // res.json()
        //  console.log("res", res);
         setFacilities(res.list);
        //  setTotalPages(res.totalPages);
       })

       .catch((error) => console.error("Error fetching data:", error))
       .finally(() => {
         setLoading(false);
       });
   }, []);

   useEffect(() => {
     if (viewList) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "auto";
     }

     return () => {
       document.body.style.overflow = "auto";
     };
   }, [viewList]);



  return (
    <div className='flex flex-col h-full   overflow-hidden overflow-y-auto pb-3  px-6  bg-white '>
      <div className='sticky bg-white py-3 top-0'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-base'>Live Blood Inventory Overview</h2>
          <button
            onClick={() => {
 if (user.role === "donate") {
   navigate("/user/donate");
 } else {
   setViewList(!viewList);
  //  console.log("clicked");
  //  console.log(user.role);
 }            }}
          >
            <i className='fa-solid fa-arrow-up-right-from-square'></i>
          </button>
        </div>
      </div>
      <table className=' w-full h-full '>
        <thead className='bg-light-pink text-left  '>
          <tr className=''>
            <th className='py-0.5 pl-1'>Facility Name</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {facilities.slice(0, 12).map((facility) => (
            <tr
              className=' border-b-1  border-background-grey'
              key={facility.id}
            >
              <td className='py-0.5 pl-1 font-bold'>{facility.name}</td>
              <td>{facility.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewList && (
        <div
          onClick={(e) => {
            setViewList(!viewList), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-[95%] md:w-[50%] h-fit max-h-[95dvh] overflow-auto text-xs shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4'
          >
           
           <Facilities/>
          </div>
        </div>
      )}
    </div>
  );
}
