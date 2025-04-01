import { useState, useCallback, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "../../assets/avatar.svg";
import { PieChart, Pie, Cell } from "recharts";
import InventoryOverview from "../../components/inventoryOverview";

function Dashboard() {
  const navigate = useNavigate();
  const rowsPerPage = 9;

  const data = [
    { name: "Hospitals", value: 40, color: "#680058" },
    { name: "Emergency Care", value: 25, color: "#8b0075" },
    { name: "Infants & Children", value: 15, color: "#d003b0" },
    { name: "Cancer", value: 10, color: "#ff71e9" },
    { name: "Surgical Procedures", value: 10, color: "#ffb3f3" },
  ];
  const [facilities, setFacilities] = useState([]);
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [donate, setDonate] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/facilities")
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/emergencyRequests")
      .then((res) => res.json())
      .then((data) => setEmergencyRequests(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const totalPages = Math.ceil(emergencyRequests.length / rowsPerPage);
  const indexOfLastFacility = currentPage * rowsPerPage;
  const indexOfFirstFacility = indexOfLastFacility - rowsPerPage;
  const currentRequests = emergencyRequests.slice(
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

  useEffect(() => {
    if (donate || submitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [donate, submitted]);

  return (
    <div className=' flex text-sm flex-col   gap-4 py-2  px-4   w-full'>
      <div className='bg-white py-3  px-6 flex flex-col gap-4 md:gap-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg md:text-base font-bold'>Overview</h2>
          <button
            onClick={() => {
              navigate("/user/donate");
            }}
            className='bg-background hover:bg-pink    w-full max-w-40  font-bold  text-white py-1 px-2'
          >
            Schedule a Donation
          </button>
        </div>{" "}
        <div className='flex flex-col md:grid grid-cols-3 gap-4 md:gap-2'>
          <div className='border-1 px-3.5 py-2.5 gap-2 flex flex-col justify-between'>
            <div className=' flex justify-between items-center'>
              <h3 className='font-bold text-base'>Recent Activity</h3>
              <button>
                <i className='fa-solid fa-arrow-up-right-from-square'></i>
              </button>
            </div>

            <div className='flex flex-col gap-1'>
              <p>
                <span className='text-text-dark-gray font-bold'>
                  Latest Donation:
                </span>{" "}
                Jan 5, 2025 - City Hospital
              </p>
              <p>
                <span className='text-text-dark-gray font-bold'>
                  Lifetime Donation:
                </span>{" "}
                Total of 16 donations
              </p>
              <p>
                <span className='text-text-dark-gray font-bold'>
                  Next Eligible on:
                </span>{" "}
                Feb 20,2025
              </p>
            </div>
          </div>

          <div className='border-1 px-3.5 py-2.5 gap-2 flex flex-col justify-between'>
            <div className=' flex justify-between items-center'>
              <h3 className='font-bold text-base'>
                Total Facilities Registered
              </h3>
              <button
                onClick={() => {
                  navigate("/user/donate");
                }}
              >
                <i className='fa-solid fa-arrow-up-right-from-square'></i>
              </button>
            </div>
            <div className='flex flex-col gap-1 '>
              <p className='text-base font-bold'>350+ Facilities </p>
              <p className='text-text-dark-gray'>
                Hospitals & Blood Banks available for donation{" "}
              </p>
            </div>
          </div>

          <div className='bg-black text-white px-3.5 py-2.5 gap-2 flex flex-col'>
            {/* <div className=' flex justify-between items-center'> */}
            <h3 className='font-bold text-base'>
              Blood Type with the Highest Demand
            </h3>

            <div>
              <p className='text-base font-bold'>O- has the highest demand! </p>
              <p>Hospitals need 25+ units in the next 24 hours!! </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col h-full gap-2  py-3  px-6  bg-white '>
            <h2 className='font-bold text-base'>Blood Donation Usage</h2>
            <div className='flex flex-col justify-center h-full'>
              {" "}
              <div className='flex items-center gap-2'>
                <PieChart width={140} height={140} className='w-full'>
                  <Pie
                    data={data}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    innerRadius={50}
                    outerRadius={65}
                    startAngle={90}
                    endAngle={450}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={"white"}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <ul className='flex flex-col gap-1 border-r-1 px-4  border-text-gray'>
                  {data.map((item) => (
                    <li className='flex flex-col'>
                      <div className='flex items-center gap-2'>
                        {" "}
                        <div
                          className='w-3 h-3 rounded-full'
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <p className='font-bold'>{item.value}%</p>
                      </div>
                      <div className='w-[50%] h-0.5 top-0   bg-background-grey'></div>

                      <p className='text-text-dark-gray'>{item.name}</p>
                    </li>
                  ))}
                </ul>
                <div className='flex flex-col w-[30%] gap-1  px-4 '>
                  <h2 className='text-background text-xl'>Did You Know??</h2>
                  <p className='text-text-dark-gray'>
                    When you donate, you help keep{" "}
                    <span className='text-background font-bold'>
                      up to 10 patients
                    </span>{" "}
                    alive each year...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <InventoryOverview />
        </div>

        <div className='flex flex-col    overflow-hidden overflow-y-auto   px-6  bg-white '>
          <div className='sticky bg-white py-3 top-0'>
            <div className='flex justify-between items-center'>
              <h2 className='font-bold text-lg'>Emergency requests </h2>
            </div>
          </div>
          <ul className='flex flex-col gap-2'>
            {currentRequests.map((request) => (
              <li
                className=' border-1 px-2 py-1 flex items-start justify-between border-text-gray'
                key={request.id}
              >
                <div className='flex flex-col'>
                  <p className='flex items-center gap-2'>
                    <span className='text-text-dark-gray font-bold'>
                      Blood Type:
                    </span>{" "}
                    {request.blood_type}
                  </p>
                  <p className='flex items-start gap-2'>
                    <span className='text-text-dark-gray font-bold'>
                      Location:
                    </span>{" "}
                    {request.facility_name}, {request.address}
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='text-text-dark-gray font-bold'>
                      Urgency:
                    </span>{" "}
                    <div className='flex items-center my-auto  gap-1'>
                      <i
                        className={` fa-solid fa-circle text-green
                    ${
                      request.urgency_level === "Critical"
                        ? "text-red"
                        : request.urgency_level === "Low"
                        ? "text-yellow"
                        : "text-green"
                    }`}
                      ></i>

                      {request.urgency_level}
                    </div>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setDonate(true);
                    setSelectedRequest(request);
                  }}
                  className='bg-background hover:bg-pink !important   w-fit  font-bold  text-white py-1 px-2'
                >
                  Donate{" "}
                </button>
              </li>
            ))}
          </ul>
          <div className='flex  justify-end  items-center gap-2 my-4 ml-auto'>
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
        </div>
      </div>

      {donate && (
        <div
          onClick={(e) => {
            setDonate(!donate), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[85%] md:w-[40%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-2'
          >
            <div className='flex justify-between items-center'>
              <h1 className='font-extrabold text-base'> Emergency Request </h1>
              <button onClick={() => setDonate(!donate)}>
                {" "}
                <i className='fa-regular fa-circle-xmark'></i>
              </button>
            </div>{" "}
            <div className='flex flex-col text-base gap-2'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-base text-text-dark-gray'>
                  Contact Information
                </h2>
                <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
              </div>
              <div>
                <p className='flex items-center gap-2'>
                  <span className='text-text-dark-gray'>Facility:</span>{" "}
                  {selectedRequest.facility_name}
                </p>
                <p className='flex items-center gap-2'>
                  <span className='text-text-dark-gray'>Address:</span>{" "}
                  {selectedRequest.address}
                </p>
                <p className='flex items-center gap-2'>
                  <span className='text-text-dark-gray'>Contact Number:</span>{" "}
                  {selectedRequest.contact_number}
                </p>

                <p className='flex items-center gap-2'>
                  <span className='text-text-dark-gray'>Urgency Level:</span>{" "}
                  <div className='flex items-center my-auto  gap-1'>
                    <i
                      className={` fa-solid fa-circle text-green
                    ${
                      selectedRequest.urgency_level === "Critical"
                        ? "text-red"
                        : selectedRequest.urgency_level === "Low"
                        ? "text-yellow"
                        : "text-green"
                    }`}
                    ></i>

                    {selectedRequest.urgency_level}
                  </div>{" "}
                </p>
                <p className='flex items-center gap-2'>
                  <span className='text-text-dark-gray'>Blood Type:</span>{" "}
                  {selectedRequest.blood_type}
                </p>
              </div>
              <div className='w-[50%] h-0.5 top-0   bg-background-grey'></div>
            </div>
            <div className='flex flex-col text-base gap-2'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-base text-text-dark-gray'>
                  Scheduling Details{" "}
                </h2>
                <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
              </div>
              <form className=' flex flex-col gap-4 md:gap-2'>
                <div className='grid  gap-2 grid-cols-2'>
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
                    setDonate(!donate), setSubmitted(!submitted);
                  }}
                  className='bg-background hover:bg-pink !important self-end  w-fit  font-bold text-base text-white py-3 px-6'
                >
                  Schedule
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {submitted && (
        <div
          onClick={(e) => {
            setSubmitted(!submitted), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0   z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-[85%] md:w-[50%] h-fit max-h-[95dvh]   shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4  md:gap-2'
          >
            <div className='flex flex-col gap-2'>
              <h1 className='font-extrabold text-sm'>
                Schedule Request Submitted
              </h1>
              <div className='w-[50%] h-0.5 top-0  bg-background-grey'></div>
            </div>
            <div className='text-xs flex flex-col gap-2'>
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
              className='bg-background hover:bg-pink !important self-end  w-fit  font-bold text-base text-white py-3 px-6'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
