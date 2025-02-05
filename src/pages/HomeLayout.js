import React from "react";
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import bg from "../assets/images/chillbg.jpg"
import bg2 from "../assets/images/chillbg2.jpg"
import bg3 from "../assets/images/chillbg3.jpg"
import bg4 from "../assets/images/chillbg4.jpg"
import bg5 from "../assets/images/chillbg5.jpg"
import bg6 from "../assets/images/chillbg6.jpg"
import bg7 from "../assets/images/chillbg7.jpg"
import {useState, useEffect} from "react"

const HomeLayout = () => {
  const [theme, setTheme] = useState(false)
  const backgroundImages = [bg, bg2, bg3, bg4, bg5, bg6, bg7]
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 30000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

 

  return (
    <div
      className={`w-full h-screen flex relative overflow-hidden ${theme ? "bg-slate-800 text-white" : ""}`}
    >
      {/* <img className={`"h-screen w-full bg-cover bg-center transition-all duration-1000 absolute top-0 left-0"`} src={backgroundImages[currentIndex]}/> */}
      <div className="  h-full">
        <Sidebar theme={theme}/>
      </div>

      <div className="w-full relative">
        <AdminHeader theme={theme} setTheme={setTheme}/>
        <div className=" w-auto  h-full overflow-auto relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
