import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaVideo,
  FaCog,
  FaChartBar,
  FaDollarSign,
  FaShieldAlt,
  FaPlug,
  FaComments,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
const menuItems = [
  {
    title: "Хэрэглэгч",
    icon: <FaUsers className="size-7" />,
    route: '/'
  },
  {
    title: "Контент менежер",
    icon: <FaVideo className="size-7" />,
    route: '/manage'
  },
  {
    title: "Streaming & Encoding Control",
    icon: <FaCog className="size-7" />,
    route: '/stream'
  },
  {
    title: "Analytics & Reporting",
    icon: <FaChartBar className="size-7" />,
    route: '/analize'
  },
  {
    title: "Monetization & Revenue",
    icon: <FaDollarSign className="size-7" />,
    route: '/money'
  },
  {
    title: "Security & Compliance",
    icon: <FaShieldAlt className="size-7" />,
    route: '/secure'
  }

];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle Sidebar (for mobile)
  // const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSidebar = () => {
    setIsOpen((prev) => {
      if (prev) {
        // Reset all openSections to false when closing the sidebar
        setOpenSections([]);
      }
      return !prev;
    });
  };
  // Toggle Dropdown Sections
  // const toggleSection = (index) => {
  //   setOpenSections((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }));
  // };
  const [openSections, setOpenSections] = useState(null);
  const toggleSection = (index) => {
    setOpenSections(openSections === index ? null : index);
  };
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!active) {
      setOpenSections(null); // Reset openSections to index 0 when active is true
    }
  }, [active]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-900 p-2 rounded-md "
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900  text-white items-center justify-center shadow-lg transition-all duration-350 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative ${active ? "w-80 " : " w-20"}`}
      >
        <div
          className={`"w-full items-center text-2xl p-5 font-bold  flex ${
            active ? " justify-end" : " justify-center"
          }`}
        >
          {active ? (
            <IoCloseSharp
              onClick={() => setActive(!active)}
              className={`size-7 transition-transform duration-300 ease-in-out ${
                active ? "rotate-180" : "rotate-0"
              }`}
            />
          ) : (
            <GiHamburgerMenu
              onClick={() => setActive(!active)}
              className="size-7"
            />
          )}
        </div>

        <div className="flex flex-col w-full ">
          {menuItems.map((menu, index) => (
            <Link to={menu.route} key={index} className=" flex flex-col w-full text-center ">
              {/* Section Header with Dropdown Toggle */}
              <div
                onClick={() => {
                  toggleSection(index);
                  setActive(true);
                }}
                className={` flex px-6 py-5 text-left gap-5 text-lg font-medium  hover:bg-gray-800 rounded-md 
                  `}
              >
                <div className="flex items-center">{menu.icon}</div>
                <p
                  className={`flex  gap-3 transition-all duration-200 ease-out overflow-hidden ${
                    active ? "flex  " : "hidden"
                  }`}
                >
                  {menu.title}
                </p>
              </div>

              {/* Dropdown Menu */}
              <ul
                className={`ml-6 text-left flex flex-col overflow-hidden transition-all duration-300 ${
                  openSections === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              ></ul>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
