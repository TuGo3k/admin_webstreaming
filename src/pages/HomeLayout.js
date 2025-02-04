import React from "react";
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <div className="w-full h-screen flex ">
      <div className="  h-full">
        <Sidebar />
      </div>

      <div className="w-full relative">
        <AdminHeader />
        <div className=" w-auto top-16 px-[15%]">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
