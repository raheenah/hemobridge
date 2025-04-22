import { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import Facilities from "../../components/Facilities";

function Donate() {
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

  useEffect(() => {
    if (details || submitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [details, submitted]);

  return (
    <div className=' flex bg-white flex-col gap-2 py-3  px-6  h-full w-full'>
     
    <Facilities/>
    </div>
  );
}

export default Donate;
