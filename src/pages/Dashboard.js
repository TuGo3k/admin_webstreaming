import React from "react";
import { Card, CardContent } from '../components/ui/Card'
import { BarChart, PieChart, ScatterChart, Scatter, Bar, Pie, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import EPISODESDATA from "../data/Episodes.json";
const Dashboard = () => {
  const barData = [
    { name: "Jul 10", Contribution: 4000, Experience: 2400, Subscription: 2400 },
    { name: "Jul 15", Contribution: 3000, Experience: 1398, Subscription: 2210 },
    { name: "Jul 20", Contribution: 2000, Experience: 9800, Subscription: 2290 },
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
   console.log(typeof EPISODESDATA.length)
  return (
    <div className="">
      {/* Top Metrics */}
      <div className="Header grid grid-cols-3 gap-4 p-6">

      <Card className="col-span-3 grid grid-cols-6 gap-4">
        {[
          { label: "Нийт бичлэг", value: EPISODESDATA.length, change: "-8.7%" },
        //   { label: "Average New MRR", value: "$558.48", change: "+33%" },
        //   { label: "Months to Recover CAC", value: "0.34", change: "+94%" },
        ].map((metric, i) => (
          <CardContent key={i} className="col-span-2 p-4 text-center">
            <p className="text-sm font-semibold text-gray-500">{metric.label}</p>
            <p className="text-xl font-bold">{metric.value}</p>
            {/* <p className={`text-sm ${metric.change.includes("+") ? "text-green-500" : "text-red-500"}`}>{metric.change}</p> */}
          </CardContent>
        ))}
      </Card>

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
