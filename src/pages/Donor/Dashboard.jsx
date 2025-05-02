import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import InventoryOverview from "../../components/inventoryOverview";
import { EmergencyRequestList } from "./components/EmergencyRequests/EmergencyRequestList/EmergencyRequestsList";
import { facilitiesRecentActivity } from "../../data/facility-recent-activities";
  
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
  const [currentPage, setCurrentPage] = useState(1);
  const [donate, setDonate] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [viewhistory, setViewHistory] = useState(false);
  // const [recentActivities, setRecentActivities] = useState([]);
  const recentActivities = facilitiesRecentActivity;
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
   const [selectedActivity, setSelectedActivity] = useState(null);
   const [activityDetails, setActivityDetails] = useState(false);
// console.log("recent activities", recentActivities);


  const totalPages = Math.ceil(facilities.length / rowsPerPage);
   const totalActivityPages = Math.ceil(recentActivities.length / rowsPerPage);
   const indexOfLastActivity = currentHistoryPage * rowsPerPage;
   const indexOfFirstActivity = indexOfLastActivity - rowsPerPage;
   const currentActivities = recentActivities.slice(
     indexOfFirstActivity,
     indexOfLastActivity
  );
  
  const getActivitiesPaginationNumbers = () => {
    if (totalActivityPages <= 5) {
      return [...Array(totalActivityPages)].map((_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        return [1, 2, 3, "...", totalActivityPages];
      } else if (currentPage >= totalActivityPages - 2) {
        return [1, "...", totalActivityPages - 2, totalActivityPages - 1, totalActivityPages];
      } else {
        return [1, "...", currentPage, "...", totalActivityPages];
      }
    }
  };


  
  useEffect(() => {
    if (donate || submitted || viewhistory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [donate, submitted, viewhistory]);

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
              <button
                onClick={() => {
                  setViewHistory(!viewhistory);
                }}
              >
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
                  {data.map((item, index) => (
                    <li key={index} className='flex flex-col'>
                      <div className='flex items-center gap-2'>
                        {" "}
                        <div
                          className='w-3 h-3 rounded-full'
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <p className='font-bold'>{item.value}%</p>
                      </div>
                      <div className='w-[50%] h-0.5 top-0 bg-background-grey'></div>

                      <p className='text-text-dark-gray'>{item.name}</p>
                    </li>
                  ))}
                </ul>
                <div className='flex flex-col w-[30%] gap-1  px-4'>
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
          <EmergencyRequestList />
        </div>
      </div>


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
      {viewhistory && (
        <div
          onClick={(e) => {
            setViewHistory(!viewhistory), e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-[90%] md:w-[45%] h-fit max-h-[95dvh] overflow-auto text-xs shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4'
          >
            {" "}
            <div className='sticky bg-white  top-0'>
              <div className='flex justify-between items-center'>
                <h2 className='font-bold text-base'>Recent Activity</h2>
                <button
                  onClick={() => {
                    setViewHistory(!viewhistory);
                  }}
                >
                  <i className='fa-regular fa-circle-xmark'></i>
                </button>
              </div>
            </div>
            <table className=' w-full h-full '>
              <thead className='bg-light-pink text-center  '>
                <tr className=''>
                  <th className='py-0.5 pl-1'>Date</th>
                  <th className='text-center'>Facility Name</th>
                  {/* <th>Date</th> */}
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {currentActivities.map((activity) => (
                  <tr
                    className=' border-b-1  text-center border-background-grey'
                    key={activity.donorId}
                    onClick={() => {
                      setSelectedActivity(activity);
                      setActivityDetails(!activityDetails);
                      setViewHistory(false);
                    }}
                  >
                    <td className='py-0.5 pl-1 font-bold'>{activity.date}</td>
                    <td className='text-center'>{activity.donorId}</td>
                    {/* <td>{activity.date}</td> */}
                    <td
                      className={`${
                        activity.status == "Completed"
                          ? "text-background"
                          : "text-black"
                      }`}
                    >
                      {activity.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-center  items-center gap-2 mt-auto ml-auto'>
              <button
                className='px-2 py-1   hover:bg-light-pink disabled:opacity-50'
                onClick={() =>
                  setCurrentHistoryPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentHistoryPage === 1}
              >
                <i className='fa-solid fa-angle-left'></i>
              </button>

              {getActivitiesPaginationNumbers().map((page, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 hover:bg-light-pink  ${
                    currentHistoryPage === page ? "bg-light-pink" : ""
                  }`}
                  onClick={() =>
                    typeof page === "number" && setCurrentHistoryPage(page)
                  }
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}

              <button
                className='px-2 py-1   hover:bg-light-pink disabled:opacity-50'
                onClick={() =>
                  setCurrentHistoryPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              >
                <i className='fa-solid fa-angle-right'></i>
              </button>
            </div>
          </div>
        </div>
      )}
      {activityDetails && (
        <div
          onClick={(e) => {
            // selectedActivity(null);
            setActivityDetails(false);
            e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[90%] md:w-[45%] h-fit max-h-[95dvh] overflow-auto text-xs shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4'
          >
            {" "}
            <div className='flex flex-col gap-4 items-center  bg-white  top-0'>
              <div className='flex flex-col w-full gap-1 justify-between items-center'>
                <h2 className='font-bold mr-auto text-base'>
                  Donation Request Progress
                </h2>
                <div className='w-[70%] h-0.5 top-0 mr-auto  bg-background-grey'></div>
              </div>
            </div>
            {selectedActivity.status === "Completed" ||
            selectedActivity.status === "Scheduled" ? (
              <div className="flex flex-col gap-4 mt-8">
                <div className='flex items-center w-fit  mx-auto'>
                  <div className='relative  '>
                    <p className='absolute bottom-full text-background font-bold left-1/2 -translate-x-1/2 mb-1 '>
                      Submitted
                    </p>{" "}
                    <i className='fa-solid fa-check border border-background rounded-full p-1.5 text-white bg-background '></i>
                  </div>

                  <div className='w-40 h-2.5 top-0   bg-background'></div>

                  <div className='relative  '>
                    <p className='absolute bottom-full text-background font-bold left-1/2 -translate-x-1/2 mb-1 '>
                      Approved
                    </p>
                    <i
                      className={` fa-solid fa-check border border-background rounded-full p-1.5 text-white ${
                        selectedActivity.status == "Completed"
                          ? "bg-background"
                          : "bg-white"
                      }`}
                    ></i>
                  </div>

                  <div
                    className={`w-40 h-2.5 top-0   bg-background ${
                      selectedActivity.status == "Completed"
                        ? "bg-background "
                        : "bg-white border-background border-t border-b"
                    } `}
                  ></div>
                  <div className='relative  '>
                    <p className='absolute bottom-full text-background font-bold left-1/2 -translate-x-1/2 mb-1 '>
                      Completed
                    </p>
                    <i
                      className={` fa-solid fa-check border border-background rounded-full p-1.5 text-white ${
                        selectedActivity.status == "Completed"
                          ? "bg-background"
                          : "bg-white"
                      }`}
                    ></i>
                  </div>
                </div>
                <div className='flex flex-col gap-1 mt-3'>
                  <p>
                    <span className='text-text-dark-gray'>Status:</span>{" "}
                    {selectedActivity.status}
                  </p>{" "}
                  <p>
                    <span className='text-text-dark-gray'>Date:</span>{" "}
                    {selectedActivity.date}
                  </p>{" "}
                  <p>
                    <span className='text-text-dark-gray'>Time:</span>{" "}
                    {selectedActivity.bloodType}
                  </p>
                </div>
              </div>
            ) : (
              <p className='w-fit mx-auto'>
                Donation request at
                <span className='font-bold'>
                  {" "}
                  {selectedActivity.donorId} was {selectedActivity.status}
                </span>
              </p>
            )}
            {(selectedActivity.status === "Completed" ||
              selectedActivity.status === "Failed") && (
              <button
                onClick={() => {
                  setActivityDetails(!activityDetails);
                }}
                className={`bg-background hover:bg-pink    w-full max-w-40  font-bold  text-white py-1 px-2
                  ${
                    selectedActivity.status === "Completed"
                      ? "ml-auto"
                      : "mx-auto"
                  }`}
              >
                Close
              </button>
            )}
            {selectedActivity.status === "Scheduled" && (
              <div className='flex flex-col gap-2  ml-auto'>
                <button
                  onClick={() => {
                    setActivityDetails(!activityDetails);
                  }}
                  className='bg-background hover:bg-pink  w-40  font-bold  text-white py-1 px-2'
                >
                  Cancel Request{" "}
                </button>
                <button
                  onClick={() => {
                    setActivityDetails(!activityDetails);
                  }}
                  className='text-background hover:bg-pink w-40 font-bold  border border-background py-1 px-2'
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
