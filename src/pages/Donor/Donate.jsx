import { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";

function Donate() {
  const rowsPerPage = 10;
  const [facilities, setFacilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    fetch("http://localhost:5000/facilities")
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const totalPages = Math.ceil(facilities.length / rowsPerPage);
  const indexOfLastFacility = currentPage * rowsPerPage;
  const indexOfFirstFacility = indexOfLastFacility - rowsPerPage;
  const currentFacilities = facilities.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );


const filteredList = useMemo(() => {
  if (!searchQuery) {
    return facilities;
  }

  return facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [searchQuery, facilities]);


  
   const getPaginationNumbers = () => {
     if (totalPages <= 5) {
       return [...Array(totalPages)].map((_, index) => index + 1);
     } else {
       if (currentPage <= 3) {
         return [1, 2, 3, "...", totalPages];
       } else if (currentPage >= totalPages - 2) {
         return [1, "...", totalPages - 2, totalPages - 1, totalPages];
       } else {
         return [1, "...", currentPage, "...", totalPages];
       }
     }
   };

  return (
    <div className=' flex bg-white flex-col gap-4 py-3  px-6  h-full w-full'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col gap-2  w-[50%]'>
          <h2 className='font-bold text-lg'>Search</h2>
          <div className='flex gap-4  w-full'>
            <div className='flex  items-center gap-2 w-[80%]  bg-background-grey text-input-text px-1 py-1'>
              <i className='fa-solid fa-magnifying-glass '></i>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search by Blood Type, Facility Name or Location'
                className='placeholder:text-input-text w-full focus:outline-none'
              />
            </div>
            {/* <button
              className='py-1 bg-background hover:bg-pink px-6 text-white'
            >
              Search
            </button> */}
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <div className='flex items-center text-sm gap-2'>
            <i className='fa-solid fa-circle text-green'></i>
            <p> → Stock is sufficient (7+ units per type)</p>
          </div>{" "}
          <div className='flex items-center text-sm gap-2'>
            <i className='fa-solid fa-circle text-yellow'></i>
            <p> → Stock is running low (3-6 units per type)</p>
          </div>{" "}
          <div className='flex items-center text-sm gap-2'>
            <i className='fa-solid fa-circle text-red'></i>
            <p> → Urgent need (less than 3 units)</p>
          </div>
        </div>
      </div>

      <h2 className='font-bold text-xl'>All Facilities</h2>

      <table className=' w-full'>
        <thead className='bg-light-pink text-left  '>
          <tr className=''>
            <th className='py-1 pl-1'>Facility Name</th>
            <th>Address</th>
            <th> Blood Type</th>
            <th>Urgency Level</th>
            <th>Operating Hours</th>
          </tr>
        </thead>

        <tbody>
          {filteredList.map((facility) => (
            <tr
              className='text-sm border-b-1  border-background-grey'
              key={facility.id}
            >
              <td className='py-2 pl-1 font-bold'>{facility.name}</td>
              <td>{facility.address}</td>
              <td>{facility.bloodType.join(", ")}</td>
              <td className=' '>
                <div className='flex items-center my-auto  gap-2'>
                  <i
                    className={` fa-solid fa-circle text-green
                    ${
                      facility.urgency === "High"
                        ? "text-red"
                        : facility.urgency === "Medium"
                        ? "text-yellow"
                        : "text-green"
                    }`}
                  ></i>

                  {facility.urgency}
                </div>
              </td>
              <td>{facility.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-center items-center gap-2 mt-auto ml-auto'>
        <button
          className='px-2 py-1   hover:bg-light-pink disabled:opacity-50'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <i className='fa-solid fa-angle-left'></i>
        </button>

        {/* Dynamic Pagination Numbers */}
        {getPaginationNumbers().map((page, index) => (
          <button
            key={index}
            className={`px-2 py-1 hover:bg-light-pink  ${
              currentPage === page ? "bg-light-pink" : ""
            }`}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className='px-2 py-1   hover:bg-light-pink disabled:opacity-50'
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <i className='fa-solid fa-angle-right'></i>
        </button>
      </div>
    </div>
  );
    }
    

export default Donate;
