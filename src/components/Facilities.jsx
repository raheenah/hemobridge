import {useEffect,useState,useMemo} from 'react'

export default function Facilities() {
 const rowsPerPage = 14;
  const [facilities, setFacilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [details, setDetails] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/facilities")
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredList = useMemo(() => {
    if (!searchQuery) {
      return facilities;
    }

    return facilities.filter((facility) =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, facilities]);

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const indexOfLastFacility = currentPage * rowsPerPage;
  const indexOfFirstFacility = indexOfLastFacility - rowsPerPage;
  const currentFacilities = filteredList.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );

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
    <div className='flex flex-col h-full   gap-4 '>
      <div className='flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between w-full'>
        <div className='flex flex-col gap-2 w-full md:w-[50%]'>
          <h2 className='font-bold text-lg'>Search</h2>
          <div className='flex gap-2  w-full'>
            <div className='flex  items-center gap-2 w-full md:w-[80%]  bg-background-grey text-input-text px-1 py-1'>
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
      <div className='max-h-[60dvh] w-full overflow-hidden overflow-y-auto '>
        <table className=' w-full  '>
          <thead className='bg-light-pink text-left  '>
            <tr className='text-xs md:text-sm'>
              <th className='py-1 pl-1 pr-2 md:pl-0'>Facility Name</th>
              <th className='hidden md:table-cell'>Address</th>
              <th className='pr-2 md:pl-0'> Blood Type</th>
              <th>Urgency Level</th>
              <th className='hidden md:table-cell'>Operating Hours</th>
            </tr>
          </thead>

          <tbody>
            {currentFacilities.map((facility) => (
              <tr
                className='text-xs md:text-sm border-b-1  border-background-grey'
                key={facility.id}
              >
                <button
                  onClick={() => {
                    setDetails(true);
                    setSelectedFacility(facility);
                  }}
                  className='py-2 text-left pl-1 pr-2 md:pl-0 font-bold'
                >
                  {facility.name}
                </button>
                <td className='hidden md:table-cell'>{facility.address}</td>
                <td className='pr-2 md:pl-0'>
                  {facility.bloodType.join(", ")}
                </td>
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
                <td className='hidden md:table-cell'>{facility.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-center  items-center gap-2 mt-auto ml-auto'>
        <button
          className='px-2 py-1   hover:bg-light-pink disabled:opacity-50'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <i className='fa-solid fa-angle-left'></i>
        </button>

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
      {details && (
        <div
          onClick={(e) => {
            setDetails(!details), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-[95%] md:w-[50%] h-fit max-h-[95dvh] overflow-auto text-xs shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4'
          >
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <h1 className='font-extrabold text-sm'>
                  {" "}
                  {selectedFacility.name}
                </h1>
                <button onClick={() => setDetails(!details)}>
                  {" "}
                  <i className='fa-regular fa-circle-xmark'></i>
                </button>
              </div>{" "}
              <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
            </div>

            <div className='flex flex-col text-sm gap-2'>
              <h2 className='font-bold text-sm text-text-dark-gray'>
                Contact Information
              </h2>
              <div className='text-xs'>
                <p>
                  <span className='text-text-dark-gray'>Address:</span>{" "}
                  {selectedFacility.address}
                </p>
                <p>
                  <span className='text-text-dark-gray'>Contact Number:</span>{" "}
                  {selectedFacility.phone}
                </p>
                <p>
                  <span className='text-text-dark-gray'>Email:</span>{" "}
                  {selectedFacility.email}
                </p>

                <p>
                  <span className='text-text-dark-gray'>Operationg Hours:</span>{" "}
                  {selectedFacility.hours}
                </p>
              </div>
              <div className='w-[50%] h-0.5 top-0   bg-background-grey'></div>
            </div>

            <div className='flex flex-col text-sm gap-2'>
              <h2 className='font-bold text-sm text-text-dark-gray'>
                Blood Stock Availability
              </h2>
              <div className=' max-h-[10dvh] text-xs overflow-hidden overflow-y-scroll'>
                <table className=' w-full  '>
                  <thead className='bg-light-pink text-left  '>
                    <tr className='text-center'>
                      <th className='py-0.5'>Blood Type</th>
                      <th>Stock Level</th>
                      <th className='text-left'>Urgency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFacility.stock.map((blood, index) => (
                      <tr
                        className='text-xs border-b-1 text-center border-background-grey'
                        key={index}
                      >
                        <td className='py-0.5'>{blood.type}</td>
                        <td>{blood.stock}</td>
                        <td className='text-left'>
                          <i
                            className={`fa-solid fa-circle ${
                              blood.stock < 3
                                ? "text-red"
                                : blood.stock < 7
                                ? "text-yellow"
                                : "text-green"
                            }`}
                          ></i>{" "}
                          <span>
                            {blood.stock < 3
                              ? "Critical"
                              : blood.stock < 7
                              ? "Low"
                              : "Normal"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <h2 className='font-bold text-sm text-text-dark-gray'>
                Donation Booking Details
              </h2>
              <form className=' flex flex-col gap-4'>
                <div className='grid max-w-[70%] grid-rows-2 gap-4 grid-cols-2'>
                  <div className='w-full px-4  relative border-1 text-text-dark-gray'>
                    <label className='absolute font-[700] px-1 top-[-10px] bg-white left-[10px]'>
                      Blood Type <span className='text-red-500'>*</span>
                    </label>{" "}
                    <select
                      className=' focus:outline-none py-4   w-full   text-input-text '
                      required
                    >
                      <option
                        className='text-input-text   focus:outline-none'
                        disabled
                        selected
                      >
                        Choose...
                      </option>
                      <option
                        className='text-input-text   focus:outline-none'
                        value='A+'
                      >
                        A+{" "}
                      </option>{" "}
                      <option
                        className='text-input-text   focus:outline-none'
                        value='A-'
                      >
                        A-{" "}
                      </option>
                      <option
                        className='text-input-text   focus:outline-none'
                        value='B+'
                      >
                        B+{" "}
                      </option>
                      <option
                        className='text-input-text   focus:outline-none'
                        value='B-'
                      >
                        B-{" "}
                      </option>{" "}
                      <option value='B+'>O+ </option>
                      <option
                        className='text-input-text   focus:outline-none'
                        value='B-'
                      >
                        O-{" "}
                      </option>
                      <option
                        className='text-input-text   focus:outline-none'
                        value='B+'
                      >
                        AB+{" "}
                      </option>
                      <option
                        className='text-input-text   focus:outline-none'
                        value='B-'
                      >
                        AB-{" "}
                      </option>
                    </select>
                  </div>
                  <div className='col-span-1 row-span-1'></div>
                  <div className=' p-4 relative border-1 text-text-dark-gray'>
                    <label className='absolute font-[700]  px-1 top-[-10px] bg-white left-[10px]'>
                      Date<span className='text-red-500'>*</span>
                    </label>
                    <input
                      placeholder='No., Street, Town, Zip Code, State.'
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
                      placeholder='No., Street, Town, Zip Code, State.'
                      className='placeholder-input-text w-full focus:outline-none'
                      type='time'
                      required
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDetails(!details), setSubmitted(!submitted);
                  }}
                  className='bg-background hover:bg-pink !important self-end  w-fit  font-bold text-sm text-white py-3 px-6'
                >
                  Schedule
                </button>
              </form>
            </div>
          </div>
        </div>
      )}{" "}
      {submitted && (
        <div
          onClick={(e) => {
            setSubmitted(!submitted), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-[85%] md:w-[50%] max-h-[90dvh]  shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-2'
          >
            <div className='flex flex-col gap-2'>
              <h1 className='font-extrabold text-lg'>
                Schedule Request Submitted
              </h1>
              <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
            </div>
            <div className='text-sm flex flex-col gap-2'>
              <div>
                <p>
                  Donation schedule request successfully submitted to LifeBank
                  Hospital for{" "}
                  <span className='font-bold'>14th February, 2025</span> by{" "}
                  <span className='font-bold'>10:00AM.</span>
                </p>
                <p>
                  You can monitor your Request Progress on the Notifications
                  page.
                </p>
                <p>
                  You will get a notification when your request is approved.
                </p>
              </div>
              <p>Please note the following information:</p>
              <div className='flex flex-col'>
                <p>Who can donate?</p>
                <ul className='list-disc pl-6'>
                  <li>Must be 18 - 65 years old.</li>
                  <li>
                    No history of infectious diseases (e.g., HIV, Hepatitis).
                  </li>
                  <li>
                    Donors must not have donated blood in the last 8 weeks
                  </li>
                </ul>
              </div>{" "}
              <div className='flex flex-col'>
                <p>How to Prepare</p>
                <ul className='list-disc pl-6'>
                  <li>Eat a healthy meal before donating.</li>
                  <li>Drink plenty of water (500ml - 1L). </li>
                  <li>Avoid alcohol & caffeine 24 hours before donation. </li>
                  <li>Get a good night’s sleep before your appointment.</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => {
                setSubmitted(!submitted);
              }}
              className='bg-background hover:bg-pink !important self-end  w-fit  font-bold text-sm text-white py-3 px-6'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
