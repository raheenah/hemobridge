import { useState, useCallback, useEffect, useMemo, use } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "../../assets/avatar.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import InventoryOverview from "../../components/inventoryOverview";
import FacilityRecentActivity from "../../components/FacilityRecentActivity";

function FacilityDashboard() {
  const navigate = useNavigate();
  const rowsPerPage = 10;

  const [donationRequests, setDonationRequests] = useState([]);
  const [viewDonationRequest, setViewDonationRequest] = useState(false);
  const [selectedDonationRequest, setSelectedDonationRequest] = useState(null);
  const [donationRequestAccepted, setDonationRequestAccepted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDecline, setConfirmDecline] = useState(false);
  const [requestDeclined, setRequestDeclined] = useState(false);
  const [facilityData] = useState({
    id: 1,
    name: "Lagos General Hospital",
    address: "12 Broad Street, Lagos",
    bloodType: ["A+", "B-", "O+"],
    urgency: "High",
    stock: [
      { type: "A+", stock: 15, expiry: "2025-12-31" },
      { type: "A-", stock: 5, expiry: "2025-12-31" },
      { type: "O+", stock: 9, expiry: "2025-12-31" },
      { type: "O-", stock: 12, expiry: "2025-12-31" },
      { type: "AB+", stock: 50, expiry: "2025-12-31" },
      { type: "AB-", stock: 50, expiry: "2025-12-31" },
      { type: "B+", stock: 20, expiry: "2025-12-31" },
      { type: "B-", stock: 50, expiry: "2025-12-31" },
    ],
    hours: "24/7",
  });
  const chartColors = ["#8B0075", "#D003B0", "#FF71E9", "#FFB3F3"];

  const lowestStock = [...facilityData.stock]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 4);


  const totalPages = Math.ceil(donationRequests.length / rowsPerPage);
  const indexOfLastFacility = currentPage * rowsPerPage;
  const indexOfFirstFacility = indexOfLastFacility - rowsPerPage;
  const currentRequests = donationRequests.slice(
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
      fetch("http://localhost:8000/donationRequests")
        .then((res) => res.json())
        .then((data) => setDonationRequests(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
      if (viewDonationRequest || donationRequestAccepted || confirmDecline || requestDeclined) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [viewDonationRequest, donationRequestAccepted, confirmDecline, requestDeclined]);
  
  return (
    <div className='flex flex-col md:grid  grid-cols-2  text-xs gap-4 py-2  px-4   w-full'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col md:grid grid-cols-2 gap-4'>
          <div className='w-full flex flex-col gap-2  py-3  px-6 bg-white '>
            <h2 className='text-sm font-semibold '>
              Lowest Blood Stock Levels
            </h2>
            <div className='flex flex-col w-full gap-2'>
              {lowestStock.map((bloodType, index) => (
                <div
                  key={bloodType.type}
                  className='w-full flex items-center gap-1 '
                >
                  <p className='w-6 font-bold text-text-dark-gray'>
                    {bloodType.type}
                  </p>
                  <div className='w-full h-3 bg-text-gray rounded-full relative'>
                    <div
                      className='h-full rounded-full transition-all duration-500'
                      style={{
                        backgroundColor:
                          chartColors[index % chartColors.length], // Rotates colors
                        width: `${(bloodType.stock / 20) * 100}%`, // Adjusting dynamically
                      }}
                    ></div>
                  </div>
                  <div className='w-6  text-right'>
                    <p className='text-text-dark-gray '> {bloodType.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full flex flex-col gap-2 justify-between py-3  px-6 bg-white '>
            <h2 className='text-sm font-semibold '>Total Donors Registered </h2>
            <div className='flex flex-col mb-2  w-full gap-2'>
              <h3 className='text-lg font-extrabold'>1,542 Active Donors</h3>
              <p className='text-text-dark-gray'>+12% increase this month</p>
            </div>
          </div>
        </div>
        <FacilityRecentActivity />
        <InventoryOverview />
      </div>

      <div className='flex flex-col    overflow-hidden overflow-y-auto   px-6  bg-white '>
        <div className='sticky bg-white py-3 top-0'>
          <div className='flex justify-between items-center'>
            <h2 className='font-bold text-lg'>Donation requests </h2>
          </div>
        </div>
        <ul className='flex flex-col gap-2'>
          {currentRequests.map((request) => (
            <li
              className=' border-1 px-2 py-1 flex items-start justify-between border-text-gray'
              key={request.id}
            >
              <div className='flex flex-col gap-1'>
                <p className='flex items-center gap-2'>
                  <span className='text-text-dark-gray font-bold'>Name: </span>{" "}
                  {request.name}
                </p>
                <p className='flex items-start gap-2'>
                  <span className='text-text-dark-gray font-bold'>
                    Blood Type:
                  </span>{" "}
                  {request.bloodType}
                </p>
                <p className='flex items-start gap-2'>
                  <span className='text-text-dark-gray font-bold'>Date:</span>{" "}
                  {request.donationDate}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedDonationRequest(request);
                  setViewDonationRequest(!viewDonationRequest);
                }}
                className='bg-background hover:bg-pink !important   w-fit  font-bold  text-white py-1 px-2'
              >
                View Details{" "}
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
      {viewDonationRequest && (
        <div
          onClick={(e) => {
            // selectedActivity(null);
            setViewDonationRequest(!selectedDonationRequest);
            e.stopPropagation();
          }}
          className=' fixed bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-[90%] md:w-[45%] h-fit max-h-[95dvh] overflow-auto text-xs shadow-pink-glow mx-auto bg-white p-8 flex flex-col gap-4'
          >
            {" "}
            <div className='flex flex-col gap-4   bg-white  top-0'>
              <div className='flex  w-full gap-1  justify-between '>
                <div className='flex flex-col w-[40%] justify-between '>
                  <h2 className='font-bold text-base'>Recent Activity</h2>
                  <div className='w-full h-0.5 top-0   bg-background-grey'></div>
                </div>
                <button
                  onClick={() => {
                    setViewDonationRequest(!viewDonationRequest);
                  }}
                >
                  <i className='fa-regular fa-circle-xmark'></i>
                </button>
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-text-dark-gray font-bold text-sm'>
                  Donor Information
                </h3>
                <div className='flex flex-col gap-1'>
                  <p className='flex gap-2'>
                    <span className='text-text-dark-gray'>Name:</span>
                    {selectedDonationRequest.name}
                  </p>
                  <p className='flex gap-2'>
                    <span className='text-text-dark-gray'>Age:</span>
                    {selectedDonationRequest.age} years
                  </p>
                  <p className='flex gap-2'>
                    <span className='text-text-dark-gray'>Gender:</span>
                    {selectedDonationRequest.gender}
                  </p>
                  <p className='flex gap-2'>
                    <span className='text-text-dark-gray'>Blood Type:</span>
                    {selectedDonationRequest.bloodType}
                  </p>
                  <p className='flex gap-2'>
                    <span className='text-text-dark-gray'>Contact Number:</span>
                    {selectedDonationRequest.contactNumber}
                  </p>
                  <p className='flex gap-2'>
                    <span className='text-text-dark-gray'>Date:</span>
                    {selectedDonationRequest.donationDate}
                  </p>
                  <p className='flex gap-2'>
                    <span className='text-text-dark-gray'>Time:</span>
                    {selectedDonationRequest.time}
                  </p>
                </div>
              </div>
              <div className='flex gap-4  mx-auto mt-8'>
                <button
                  onClick={() => {
                    setConfirmDecline(!confirmDecline);
                  }}
                  className='text-background hover:bg-pink w-24 font-bold  border border-background py-1 px-2'
                >
                  Decline
                </button>

                <button
                  onClick={() => {
                    setDonationRequestAccepted(!donationRequestAccepted);
                    setViewDonationRequest(!selectedDonationRequest);
                  }}
                  className='bg-background hover:bg-pink  w-24   font-bold  text-white py-1 px-2'
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {donationRequestAccepted && (
        <div
          onClick={(e) => {
            // selectedActivity(null);
            setDonationRequestAccepted(!donationRequestAccepted);
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
                <h2 className='font-bold text-base'>Request Accepted </h2>
                <div className='w-[70%] h-0.5 top-0   bg-background-grey'></div>
              </div>
            </div>
            <p className='w-fit mx-auto'>
              Donation request from{" "}
              <span className='font-bold'>{selectedDonationRequest.name}</span>{" "}
              has been accepted and scheduled for
              <span className='font-bold'>
                {" "}
                {selectedDonationRequest.donationDate}
              </span>{" "}
              by
              <span className='font-bold'>
                {" "}
                {selectedDonationRequest.time}.
              </span>{" "}
            </p>
            <button
              onClick={() => {
                setDonationRequestAccepted(!donationRequestAccepted);
              }}
              className='bg-background hover:bg-pink  mx-auto  w-full max-w-40  font-bold  text-white py-1 px-2'
            >
              Close
            </button>
          </div>
        </div>
      )}

      {confirmDecline && (
        <div
          onClick={(e) => {
            // selectedActivity(null);
            setConfirmDecline(!confirmDecline);
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
                <h2 className='font-bold text-base'>Confirm</h2>
                <div className='w-[70%] h-0.5 top-0   bg-background-grey'></div>
              </div>
            </div>
            <p className='w-fit mx-auto'>
              Are you sure you want to{" "}
              <span className='font-bold'>decline</span> this donation request?
            </p>
            <div className='flex gap-4  mx-auto mt-8'>
              <button
                onClick={() => {
                  setConfirmDecline(!confirmDecline);
                  // setViewDonationRequest(!selectedDonationRequest);
                }}
                className='text-background hover:bg-pink w-24 font-bold  border border-background py-1 px-2'
              >
                Go Back
              </button>

              <button
                onClick={() => {
                  setConfirmDecline(!confirmDecline);
                  setRequestDeclined(!requestDeclined);
                  setViewDonationRequest(!selectedDonationRequest);
                }}
                className='bg-background hover:bg-pink  w-24   font-bold  text-white py-1 px-2'
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {requestDeclined && (
        <div
          onClick={(e) => {
            // selectedActivity(null);
            setRequestDeclined(!requestDeclined);
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
                <h2 className='font-bold text-base'>Request Declined </h2>
                <div className='w-[70%] h-0.5 top-0   bg-background-grey'></div>
              </div>
            </div>
            <p className='w-fit mx-auto'>
              The donation request has been declined{" "}
            </p>
            <button
              onClick={() => {
                setRequestDeclined(!requestDeclined);
              }}
              className='bg-background hover:bg-pink  mx-auto  w-full max-w-40  font-bold  text-white py-1 px-2'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacilityDashboard;
