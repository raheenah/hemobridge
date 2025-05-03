import {useEffect,useState,useMemo} from 'react'
import { FacilityApi } from '../api/facility.api';
import { DonationApi } from '../api/donation.api';
import { useProfileContext } from '../shared/context/user-profile-context';
import { DateUtils } from '../shared/utils/date.utils';
import Pagination from './common/Pagination';
import Loader from './common/Loader';
import { StringUtils } from '../shared/utils/string.utils';

export default function Facilities() {

  const { user } = useProfileContext();

  const [facilities, setFacilities] = useState({
    list: [],
    currentPage: 1,
    totalPages: 1
  });
  const [schedule, setSchedule] = useState({})
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [scheduleError, setScheduleError] = useState('');
  const [createdSchedule, setCreatedSchedule] = useState(null);
  // const [loading, setLoading] = useState(true);

  // console.log("currentpage...", currentPage
  // );
  useEffect(() => {
    setLoading(true);
    FacilityApi.fetch(currentPage)
    .then((data)=> {
      setFacilities(data);
      setLoading(false);
    })
    .catch((error)=> {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
  }, [currentPage]);

  const filteredList = useMemo(() => {
    if (!searchQuery) {
      return facilities.list;
    }

    return facilities.list.filter((facility) =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, facilities.list]);

  function submitSchedule(newDonationSchedule) {
    // console.log("newDonationSchedule", newDonationSchedule);
    // console.log("selected time and date", selectedTime, selectedDate);
    setScheduleError(''); 
    DonationApi.createBloodDonationSchedule(newDonationSchedule)
    .then((data)=> {
      setCreatedSchedule(data);
      setSubmitted(true);
    })
    .catch((error)=> { 
      setScheduleError(error.response?.data?.message || 'Failed to schedule donation. Please try again.');
    })
  }

  // console.log("selectedFacility", selectedFacility);

  return (
    <div className='flex flex-col h-full gap-4 '>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center justify-between w-full'>
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
      <div className=' w-full p-4  overflow-hidden overflow-y-auto'>
        <table className='w-full '>
          <thead className='bg-light-pink text-left'>
            <tr className='text-xs md:text-sm'>
              <th className='py-1 pl-1 pr-2 lg:pl-0'>Facility Name</th>
              <th className=''>Address</th>
              <th className='pr-2 lg:pl-0 hidden lg:flex'> Blood Type</th>
              <th className='hidden lg:table-cell'>Urgency Level</th>
              {/* <th className=''>Operating Hours</th> */}
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={5} className='h-[200px]'>
                  <Loader />
                </td>
              </tr>
            </tbody>
          ) : facilities.list ? (
            <tbody>
              {filteredList.map((facility) => (
                <tr
                  className='text-xs md:text-sm border-b-1  border-background-grey'
                  key={facility.id}
                >
                  <td
                    onClick={() => {
                      setSelectedFacility(facility);
                    }}
                    className='py-2 text-left pl-1 pr-2 lg:pl-0 font-bold cursor-pointer'
                  >
                    {facility.name}
                  </td>
                  <td className=''>{facility.address}</td>
                  <td className='pr-2 hidden lg:table-cell md:pl-0'>
                    {facility.bloodTypes?.join(", ")}
                  </td>
                  <td className=' '>
                    <div className='lg:flex hidden items-center my-auto  gap-2'>
                      <i
                        className={` fa-solid fa-circle text-green
                      ${facility.urgency === "high" && "text-red"}
                      ${facility.urgency === "medium" && "text-yellow"}
                      ${facility.urgency === "low" && "text-green"}
                      }`}
                      ></i>

                      {StringUtils.capitalize(facility.urgency)}
                    </div>
                  </td>
                  {/* <td className='hidden md:table-cell'>{facility.operationalHours}</td> */}
                </tr>
              ))}
            </tbody>
          ) : (
            <div>No data</div>
          )}
        </table>
      </div>
      <div className='flex justify-end mt-4'>
        <Pagination
          currentPage={currentPage}
          totalPages={facilities.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {selectedFacility && (
        <div
          onClick={(e) => {
            setSelectedFacility(null);
            e.stopPropagation();
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
                  {selectedFacility.name?.charAt(0).toUpperCase() +
                    selectedFacility.name?.slice(1)}
                </h1>
                <button onClick={() => setSelectedFacility(null)}>
                  {" "}
                  <i className='fa-regular fa-circle-xmark hover:text-pink cursor-pointer'></i>
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
                {/* <p>
                  <span className='text-text-dark-gray'>Contact Number:</span>{" "}
                  {selectedFacility.phone}
                </p>
                <p>
                  <span className='text-text-dark-gray'>Email:</span>{" "}
                  {selectedFacility.email}
                </p> */}

                <p>
                  <span className='text-text-dark-gray'>Operationg Hours:</span>{" "}
                  {selectedFacility.operationalHours}
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
                    {Object.entries(selectedFacility.bloodStock).map(
                      ([type, info], index) => (
                        <tr
                          className='text-xs border-b-1 text-center border-background-grey'
                          key={index}
                        >
                          <td className='py-0.5'>{type}</td>
                          <td>{info.units}</td>
                          <td className='text-left'>
                            <i
                              className={`fa-solid fa-circle ${
                                info.status === "critical"
                                  ? "text-red"
                                  : info.status === "low"
                                  ? "text-yellow"
                                  : "text-green"
                              }`}
                            ></i>{" "}
                            <span className='capitalize'>
                              {info.status === "critical"
                                ? "High"
                                : info.status === "low"
                                ? "Low"
                                : "Medium"}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {user.facilityId ? (
              <button
                className=' bg-background hover:bg-pink !important self-end mt-4  w-fit  font-bold text-sm text-white py-3 px-6
'
                onClick={() => setSelectedFacility(null)}
              >
                Close
              </button>
            ):
             (
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
                        className='focus:outline-none py-4 w-full text-input-text'
                        value={selectedBloodType}
                        onChange={(e) => setSelectedBloodType(e.target.value)}
                        required
                      >
                        <option
                          className='text-input-text focus:outline-none'
                          value=''
                          disabled
                          selected={!selectedBloodType}
                        >
                          {" "}
                          -- Select blood type --
                        </option>
                        {/* {selectedFacility.bloodTypes.map((bloodType, index) => {
                        return (
                          <option
                            key={index}
                            className='text-input-text focus:outline-none'
                            value={bloodType}
                          >
                            {" "}
                            {bloodType}{" "}
                          </option>
                        );
                      })} */}
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
                        onChange={(e) => setSelectedDate(e.target.value)}
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
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    disabled={
                      !selectedBloodType ||
                      !user ||
                      !selectedFacility ||
                      !selectedDate ||
                      !selectedTime
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      submitSchedule({
                        donorId: user.id,
                        facilityId: selectedFacility.id,
                        bloodType:
                          selectedBloodType ??
                          setSelectedBloodType(selectedFacility?.bloodTypes[0]),
                        unitsRequested: "",
                        additionalNotes: "",
                        preferredDate: `${selectedDate} ${selectedTime}`,
                      });
                      setSchedule({
                        donorId: user.id,
                        facilityId: selectedFacility.id,
                        bloodType:
                          selectedBloodType ??
                          setSelectedBloodType(selectedFacility?.bloodTypes[0]),
                        unitsRequested: "",
                        additionalNotes: "",
                        preferredDate: `${selectedDate} ${selectedTime}`,
                      });
                    }}
                    className={`
                    bg-background hover:bg-pink !important self-end  w-fit  font-bold text-sm text-white py-3 px-6
                    ${
                      (!selectedBloodType ||
                        !user ||
                        !selectedFacility ||
                        !selectedDate ||
                        !selectedTime) &&
                      "opacity-50"
                    }
                    `}
                  >
                    Schedule
                  </button>
                  {scheduleError && (
                    <p className='text-red text-sm self-end mt-2'>
                      {scheduleError}
                    </p>
                  )}
                </form>
              </div>
            )}
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
                  Donation schedule request successfully submitted to{" "}
                  {selectedFacility.name}
                   for{" "}
                  <span className='font-bold'>
                    {DateUtils.formatDate(selectedDate)}
                  </span>{" "}
                  by{" "}
                  <span className='font-bold'>
                    {selectedTime}
                  </span>
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
                setSelectedFacility(null);
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
