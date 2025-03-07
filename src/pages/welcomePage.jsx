import { useState } from "react";
import Landing from "../assets/Frame-81.png"
import { Outlet } from "react-router-dom";


function WelcomePage() {
  const [count, setCount] = useState(0);

  return (
      <div className="flex  min-h-screen md:max-h-screen items-center justify-center">
          <img src={Landing} className="w-[50%] hidden md:flex" /> 
          <Outlet/>
    </div>
  );
}

export default WelcomePage;
