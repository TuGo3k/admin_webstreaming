import React from "react";

const AdminHeader = () => {
  return (
    <header className=" bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      {/* Logo / Branding */}
      <div className="text-xl font-bold">
        🎥 WebStreaming <span className="text-blue-400">Admin</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6">
        <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
        <a href="/users" className="hover:text-blue-400">Users</a>
        <a href="/settings" className="hover:text-blue-400">Settings</a>
      </nav>

      {/* Profile & Logout */}
      <div className="flex items-center gap-4">
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
