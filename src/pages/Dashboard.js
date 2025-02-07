import { Card, CardContent } from "../components/ui/Card";
import CONTENTSDATA from "../data/Content.json";
import React from "react";
import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import {
  BarChart,
  PieChart,
  ScatterChart,
  Scatter,
  Bar,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const barData = [
    {
      name: "Jul 10",
      Contribution: 4000,
      Experience: 2400,
      Subscription: 2400,
    },
    {
      name: "Jul 15",
      Contribution: 3000,
      Experience: 1398,
      Subscription: 2210,
    },
    {
      name: "Jul 20",
      Contribution: 2000,
      Experience: 9800,
      Subscription: 2290,
    },
  ];

  const pieData = [
    { name: "Organic Search", value: 60 },
    { name: "Referral", value: 30 },
    { name: "Direct", value: 10 },
  ];

  const scatterData = [
    { x: 100, y: 200, country: "Australia" },
    { x: 120, y: 100, country: "Canada" },
    { x: 170, y: 300, country: "Netherlands" },
  ];
  //   const data = EPISODESDATA.json()
  // console.log(typeof EPISODESDATA.length);
  const [filteredContent, setFilteredContent] = useState([]);
  const [search, setSearch] = useState("");
  const [showNavbar, setShowNavbar] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
      // setIsMobileMenuOpen(false);
      setSearch(""); // Clear search when entering search key
      console.log("mobile search clicked");
    }
  };

  const searchIcon = (e) => {
    handleSearch(e);
    // setIsMobileMenuOpen(false);
    setSearch(""); // Clear search when entering search key
    console.log("mobile search clicked");
  };

  const handleSearch = (e) => {
    const { value } = e.target; // Extract the search input value
    setSearch(value); // Update the search state

    // Filter the contents based on the search input
    const filtered = CONTENTSDATA.filter((content) =>
      content.title.toString().toLowerCase().includes(value.toLowerCase())
    );

    // Update the filtered content state
    setFilteredContent(filtered);
  };

  return (
    <div className="">
      {/* Top Metrics */}
      <div className="Header flex items-center  justify-between px-[10%]">
        <Card className="">
          {[
            {
              label: "Нийт бичлэг",
              value: CONTENTSDATA.length,
              change: "-8.7%",
            },
            //   { label: "Average New MRR", value: "$558.48", change: "+33%" },
            //   { label: "Months to Recover CAC", value: "0.34", change: "+94%" },
          ].map((metric, i) => (
            <CardContent key={i} className=" text-center">
              <p className="text-sm font-semibold text-gray-500">
                {metric.label}
              </p>
              <p className="text-xl font-bold">{metric.value}</p>
              {/* <p className={`text-sm ${metric.change.includes("+") ? "text-green-500" : "text-red-500"}`}>{metric.change}</p> */}
            </CardContent>
          ))}
        </Card>
        <div className="flex gap-10">
          <div className="flex flex-row justify-center items-center  py-2">
            <div className="flex items-center rounded-full px-2 border-orange-400 border-2">
              <input
                type="text"
                placeholder="Find Favorite Movie"
                value={search}
                onKeyPress={handleKeyPress}
                onChange={handleSearch}
                className=" text-black outline-none p-2 rounded-full  placeholder-gray-400"
              />
              <span className="text-[#78a3af]">|</span>
              <FiSearch
                onClick={handleSearch}
                className="text-yellow-300 text-lg ml-3 hover:cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center">
            <button className="px-4 py-2 flex items-center bg-[#e4d804] rounded-full text-white text-xl ">
              Нэмэх
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full px-[2%]">
        <table className="w-full ">
          <thead className="sticky top-0 z-10 overflow-hidden">
            <tr className="bg-gray-200">
              <th className="border border-gray-300 w-5 px-4 py-2 text-left">
                №
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Нэр
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Тайлбар
              </th>
              <th className="border border-gray-300 flex justify-center px-4 py-2 text-left">
                Зураг
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Огноо
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.length > 0 ? (
              filteredContent
                .sort(
                  (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
                )
                .map((content, index) => (
                  <tr key={content.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {content.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {content.description}
                    </td>
                    <td className="border border-gray-300 flex justify-center px-4 py-2">
                      <img
                        src={content.image}
                        alt={content.title}
                        width="100"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {content.releaseDate}
                    </td>
                  </tr>
                ))
            ) : search.length > 0 ? (
              // Show "No movies found" only when user has typed a search
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-black text-2xl py-4"
                >
                  No movies found for "{search}"
                </td>
              </tr>
            ) : (
              // Show all movies if no search is active
              CONTENTSDATA.sort(
                (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
              ).map((content, index) => (
                <tr key={content.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {content.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {content.description}
                  </td>
                  <td className="border border-gray-300 flex justify-center px-4 py-2">
                    <img src={content.image} alt={content.title} width="100" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {content.releaseDate}
                  </td>
                </tr>
              ))
            )}

          </tbody>
        </table>
      
      </div>
      {/* Charts */}
      {/* <Card className="col-span-1">
        <CardContent>
          <PieChart width={200} height={200}>
            <Pie dataKey="value" data={pieData} fill="#8884d8" label />
          </PieChart>
        </CardContent>
      </Card> */}

      {/* <Card className="col-span-1">
        <CardContent>
          <ScatterChart width={250} height={200}>
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Tooltip />
            <Scatter data={scatterData} fill="#82ca9d" />
          </ScatterChart>
        </CardContent>
      </Card> */}

      {/* <Card className="col-span-1">
        <CardContent>
          <BarChart width={300} height={200} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="Contribution" fill="#8884d8" />
            <Bar dataKey="Experience" fill="#82ca9d" />
            <Bar dataKey="Subscription" fill="#ffc658" />
          </BarChart>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default Dashboard;
