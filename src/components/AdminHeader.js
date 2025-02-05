import React from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
const AdminHeader = ({ theme, setTheme }) => {
  const cateNames = [
    { title: "Dashboard" },
    { title: "Users" },
    { title: "Settings" },
  ];
  const [categoryIndex, setCategoryIndex] = useState('')
  return (
    <header
      className={`backdrop-blur-xl bg-blend-normal   p-4 shadow-md flex justify-between items-center ${
        theme ? "bg-slate-900 text-white" : "text-white bg-slate-700"
      }`}
    >
      {/* Logo / Branding */}
      <div className="text-xl font-bold">
        WebStreaming <span className="text-[#e4d804]">Admin</span>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex gap-6">
        {cateNames.map((el, index) => 
        <Link key={index} to="" onClick={() => setCategoryIndex(el.title)} className={`hover:text-[#e4d804] ${cateNames.title === categoryIndex && "text-[#e4d804]"}`}>
          {el.title}
        </Link>)}
        
     
      </div>

      {/* Profile & Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {theme ? (
            <MdSunny
              className="size-6 cursor-pointer text-gray-800 dark:text-white"
              onClick={() => setTheme(false)}
            />
          ) : (
            <BsMoonStarsFill
              className="size-6 cursor-pointer text-yellow-500"
              onClick={() => setTheme(true)}
            />
          )}
        </div>
        <span className="text-sm hidden md:block">Admin</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full border-2 border-blue-400"
        />
        <button className="bg-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
