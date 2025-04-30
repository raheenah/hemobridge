import { useState, useEffect } from "react";
import DonationRequestList from "../../components/DonationRequests/DonationRequestList";
import { ViewRequestModal, ConfirmationModal } from "../../components/DonationRequests/RequestModals";
import { DonationApi } from "../../api/donation.api";
import FacilityRecentActivity from "../../components/FacilityRecentActivity";
import InventoryOverview from "../../components/inventoryOverview";
import { FacilityApi } from "../../api/facility.api";
import { useProfileContext } from "../../shared/context/user-profile-context";

function FacilityDashboard() {

  // Add these new states
  const [requests, setRequests] = useState({
    list: [],
    currentPage: 1,
    totalPages: 1
  });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalState, setModalState] = useState({
    view: false,
    confirm: false,
    success: false,
    message: ''
  });
  const [inventory, setInventory] = useState([]);

  const { user } = useProfileContext();

//   const [facilityData] = useState({
//     id: 1,
//     name: "Lagos General Hospital",
//     address: "12 Broad Street, Lagos",
//     bloodType: ["A+", "B-", "O+"],
//     urgency: "High",
//     stock: [
//       { type: "A+", stock: 15, expiry: "2025-12-31" },
//       { type: "A-", stock: 5, expiry: "2025-12-31" },
//       { type: "O+", stock: 9, expiry: "2025-12-31" },
//       { type: "O-", stock: 12, expiry: "2025-12-31" },
//       { type: "AB+", stock: 50, expiry: "2025-12-31" },
//       { type: "AB-", stock: 50, expiry: "2025-12-31" },
//       { type: "B+", stock: 20, expiry: "2025-12-31" },
//       { type: "B-", stock: 50, expiry: "2025-12-31" },
//     ],
//     hours: "24/7",
//   });

// console.log("Facility data:", facilityData);
  // console.log("User data:", user);
  useEffect(() => {
      //  console.log("Fetching inventory for facility:", user.facilityId);

      FacilityApi.fetchBloodInventory(user.facilityId)
        .then((data) => {
          setInventory(data);
          // console.log("Inventory data:", data);
         })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      })
      
  }, [user]);
  



  const chartColors = ["#8B0075", "#D003B0", "#FF71E9", "#FFB3F3"];

  const lowestStock = [...inventory]
    .sort((a, b) => a.unitsAvailable - b.unitsAvailable)
    .slice(0, 4);
  
  // console.log("lowest Stock", lowestStock)

  // Replace the old useEffect
  useEffect(() => {
    loadDonationRequests(requests.currentPage);
  }, [requests.currentPage]);

  const loadDonationRequests = async (page) => {
    DonationApi.fetchFacilitySchedules(page)
    .then((data)=> {
      // console.log(data)
      setRequests(data)
    })
    .catch((error)=> { 
      console.error("Error loading donation requests:", error);
    })
  };

  useEffect(() => {
    if (modalState.view || modalState.success || modalState.confirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalState]);


  return (
    <div className='flex flex-col md:grid grid-cols-2 text-xs gap-4 py-2 px-4 w-full'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col md:grid grid-cols-2 gap-4'>
          <div className='w-full flex flex-col gap-2  py-3  px-6 bg-white '>
            <h2 className='text-sm font-semibold '>
              Lowest Blood Stock Levels
            </h2>
            <div className='flex text-xs flex-col w-full gap-2'>
              {lowestStock.map((stock, index) => (
                <div
                  key={stock.bloodType}
                  className='w-full flex  items-center gap-1 '
                >
                  <p className='w-10 font-bold text-text-dark-gray'>
                    {stock.bloodType}
                  </p>
                  <div className='w-full h-3 bg-text-gray rounded-full relative'>
                    <div
                      className='h-full rounded-full transition-all duration-500'
                      style={{
                        backgroundColor:
                          chartColors[index % chartColors.length], 
                        width: `${(stock.unitsAvailable / 20) * 100}%`, 
                      }}
                    ></div>
                  </div>
                  <div className='w-6  text-right'>
                    <p className='text-text-dark-gray '> {stock.unitsAvailable}</p>
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

      <DonationRequestList
        requests={requests.list}
        currentPage={requests.currentPage}
        totalPages={requests.totalPages}
        onPageChange={page => setRequests(prev => ({ ...prev, currentPage: page }))}
        onViewRequest={request => {
          setSelectedRequest(request);
          setModalState(prev => ({ ...prev, view: true }));
        }}
      />

      <ViewRequestModal
        request={selectedRequest}
        onClose={() => setModalState(prev => ({ ...prev, view: false }))}
        isOpen={modalState.view}
      />

      <ConfirmationModal
        isOpen={modalState.confirm}
        title="Confirm Decline"
        message="Are you sure you want to decline this donation request?"
        onConfirm={() => {}}
        onCancel={() => setModalState(prev => ({ ...prev, confirm: false }))}
      />

      <ConfirmationModal
        isOpen={modalState.success} 
        title="Success"
        message={modalState.message}
        onConfirm={() => setModalState(prev => ({ ...prev, success: false }))}
        onCancel={() => setModalState(prev => ({ ...prev, success: false }))}
      />
    </div>
  );
}

export default FacilityDashboard;
