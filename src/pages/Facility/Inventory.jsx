import { useState, useEffect } from "react";
import { FacilityApi } from "../../api/facility.api";
import { useProfileContext  } from "src/shared/context/user-profile-context";
import Loader from "../../components/common/Loader";

function Inventory() {

  const { user } = useProfileContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingBloodType, setEditingBloodType] = useState(null);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    FacilityApi.fetchBloodInventory(user.facilityId)
    .then((data) => setInventory(data))
    .catch((error) => {
      console.error("Error fetching inventory:", error);
      setError(error.response?.data?.message || "Failed to fetch inventory data");
    })
    .finally(()=> setLoading(false))
    
  }, [user.facilityId]);

  useEffect(() => {
    if (editing || success) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editing, success]);
  
  if (loading) {
    return (
     <div className="flex flex-col gap-4 min-h-screen animate-bounce items-center justify-center">
          <Loader />
          <p className="font-bold text-background  ">Fetching inventory...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-background hover:bg-pink font-bold text-xs text-white py-2 px-4"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='flex h-full bg-white flex-col text-xs gap-4 py-3 px-6 w-full'>
      <h1 className='text-lg md:text-xs font-bold'>Blood Stock Levels</h1>
      <div className='flex flex-col md:grid grid-cols-3 gap-4'>
        {inventory.map((bloodType, index) => (
          <div
            key={index}
            className='border flex flex-col gap-12 border-text-dark-gray p-2'
          >
            <div className='flex justify-between items-start'>
              <h2 className='text-3xl font-extrabold'>{bloodType.bloodType}</h2>
              <button
                onClick={() => {
                  setEditing(true);
                  setEditingBloodType(bloodType);
                }}
                className='bg-background hover:bg-pink self-start w-full max-w-32 font-bold text-xs text-white py-2 px-4'
              >
                Edit
              </button>
            </div>
            <p className='text-xl font-bold'>
              <span
                className={`${
                  bloodType.unitsAvailable < 3
                    ? "text-red-600"
                    : bloodType.unitsAvailable < 7
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {bloodType.unitsAvailable}
              </span>{" "}
              units available
            </p>
          </div>
        ))}
      </div>
      
      {editing && (
        <div
          onClick={(e) => {
            setEditing(!editing), e.stopPropagation();
          }}
          className=' fixed overflow-hidden bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[85%] md:w-[50%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white p-8 flex items-center flex-col gap-4'
          >
            <div className='flex flex-col gap-2'>
              {" "}
              <h2 className='text-xl font-bold text-center'>
                Update Stock Level for Type {editingBloodType.type}
              </h2>
              <div className='w-[85%] h-0.5 top-0 mx-auto  bg-background-grey'></div>
            </div>
            <div className='flex gap-2'>
              <button className='bg-background hover:bg-pink       font-bold text-xs text-white py-1 px-2'>
                -
              </button>
              <input
                type='number'
                value={editingBloodType.stock}
                onInput={() => {
                  // e.target.style.width = `${e.target.value.length * 10 + 20}px`;
                }}
                className='number-input w-8 text-center appearance-none focus:outline-none border border-background'
              />
              <button className='bg-background hover:bg-pink      font-bold text-xs text-white py-1 px-2'>
                +
              </button>
            </div>
            <button
              onClick={() => {
                setEditing(!editing);
                setSuccess(!success);
              }}
              className='bg-background hover:bg-pink      font-bold text-xs text-white py-1 px-2'
            >
              Update
            </button>
          </div>
        </div>
      )}

      {success && (
        <div
          onClick={(e) => {
            setSuccess(!success), e.stopPropagation();
          }}
          className=' fixed overflow-hidden bg-gray-100/50  inset-0  z-50 flex items-center justify-center'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=' w-[50%] max-h-[80dvh]  shadow-pink-glow mx-auto bg-white p-8 flex items-center flex-col gap-4'
          >
            <div className='flex flex-col gap-2'>
              {" "}
              <h2 className='text-xl font-bold text-center'>
Inventory Updated              </h2>
              <div className='w-[85%] h-0.5 top-0 mx-auto  bg-background-grey'></div>
            </div>
            <p className='flex gap-2'>
             Your inventory has been updated successfully
            </p>
            <button
              onClick={() => {
                setSuccess(!success);
              }}
              className='bg-background hover:bg-pink      font-bold text-xs text-white py-1 px-2'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
