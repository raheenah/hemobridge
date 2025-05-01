import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { facilitiesRecentActivity } from "../data/facility-recent-activities";

export default function FacilityRecentActivity() {
  const navigate = useNavigate();
  const recentActivities = facilitiesRecentActivity
  // const [recentActivities, setRecentActivities] = useState([]);
  const [viewList, setViewList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityDetails, setActivityDetails] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:8000/facilitiesRecentActivity")
  //     .then((res) => res.json())
  //     .then((data) => setRecentActivities(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  const rowsPerPage = 12;

  const totalPages = Math.ceil(recentActivities.length / rowsPerPage);
  const indexOfLastFacility = currentPage * rowsPerPage;
  const indexOfFirstFacility = indexOfLastFacility - rowsPerPage;
  const currentActivities = recentActivities.slice(
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
    if (viewList || activityDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewList, activityDetails]);

  return (
    <>
      <div className='flex flex-col h-full   overflow-hidden overflow-y-auto pb-3  px-6  bg-white '>
        <div className='sticky bg-white py-3 top-0'>
          <div className='flex justify-between items-center'>
            <h2 className='font-bold text-base'>Recent Activity </h2>
            <button
              onClick={() => {
                setViewList(!viewList);
              }}
            >
              <i className='fa-solid fa-arrow-up-right-from-square'></i>
            </button>
          </div>
        </div>
        <table className=' w-full h-full '>
          <thead className='bg-light-pink text-center  '>
            <tr className=''>
              <th className='py-0.5 pl-1'>Donor ID</th>
              <th className='text-center'>Blood Type</th>
              <th>Date</th>
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
                  // setViewList(false);
                }}
              >
                <td className='py-0.5 pl-1 font-bold'>{activity.donorId}</td>
                <td className='text-center'>{activity.bloodType}</td>
                <td>{activity.date}</td>
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
      </div>
      {viewList && (
        <div
          onClick={(e) => {
            setViewList(!viewList), e.stopPropagation();
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
                    setViewList(!viewList);
                  }}
                >
                  <i className='fa-regular fa-circle-xmark'></i>
                </button>
              </div>
            </div>
            <table className=' w-full h-full '>
              <thead className='bg-light-pink text-center  '>
                <tr className=''>
                  <th className='py-0.5 pl-1'>Donor ID</th>
                  <th className='text-center'>Blood Type</th>
                  <th>Date</th>
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
                      setViewList(false);
                    }}
                  >
                    <td className='py-0.5 pl-1 font-bold'>
                      {activity.donorId}
                    </td>
                    <td className='text-center'>{activity.bloodType}</td>
                    <td>{activity.date}</td>
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
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
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
                <h2 className='font-bold text-base'>
                  {selectedActivity.status} Donation
                </h2>
                <div className='w-[70%] h-0.5 top-0   bg-background-grey'></div>
              </div>
            </div>
            <p className='w-fit mx-auto'>
              Donation request from{" "}
              <span className='font-bold'>{selectedActivity.donorId}</span>{" "}
              {selectedActivity.status == "Completed"
                ? "was completed on"
                : "is scheduled for"}{" "}
              <span className='font-bold'> {selectedActivity.date}</span>
            </p>
            {(selectedActivity.status === "Completed" ||
              selectedActivity.status === "Scheduled") && (
              <div className='flex items-center w-fit mt-4 mx-auto'>
                <div className='relative  '>
                  <p className='absolute bottom-full text-background font-bold left-1/2 -translate-x-1/2 mb-1 '>
                    Scheduled
                  </p>{" "}
                  <i className='fa-solid fa-check border border-background rounded-full p-1.5 text-white bg-background '></i>
                </div>
                <div className='w-40 h-2.5 top-0   bg-background'></div>
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
            )}
            {(selectedActivity.status === "Completed" ||
              selectedActivity.status === "Failed") && (
              <button
                onClick={() => {
                  setActivityDetails(!activityDetails);
                }}
                className='bg-background hover:bg-pink  mx-auto  w-full max-w-40  font-bold  text-white py-1 px-2'
              >
                Close
              </button>
            )}
            {selectedActivity.status === "Scheduled" && (
              <div className='flex gap-2  mx-auto'>
                <button
                  onClick={() => {
                    setActivityDetails(!activityDetails);
                  }}
                  className='text-background hover:bg-pink w-40 font-bold  border border-background py-1 px-2'
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setActivityDetails(!activityDetails);
                  }}
                  className='bg-background hover:bg-pink  w-40  font-bold  text-white py-1 px-2'
                >
                  Mark as Complete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
