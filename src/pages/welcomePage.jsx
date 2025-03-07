import { useState } from "react";
import Landing from "../assets/Frame-81.png"
import { Outlet } from "react-router-dom";


function WelcomePage() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex lg:grid lg:grid-cols-2  min-h-screen lg:min-h-fit  items-center justify-center'>
      <img
        src={Landing}
        className='w-[50%] lg:w-full h-full object-cover hidden lg:flex'
      />
      <Outlet />
    </div>
  );
}

export default WelcomePage;
