import { useState } from "react";
import { Button } from "../components/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/Tabs";
import { Card, CardContent } from "../components/Card";
import { Link } from "react-router-dom";
import ContentTable from "./ContentTable";
import contentCategories from "../data/Content.json";
export default function ContentManagement() {
  const [category, setCategory] = useState('')

  return (
    <div className="px-6 pt-6 pb-20 h-full mx-auto flex flex-wrap gap-2 bg-scroll overflow-scroll ">
      {/* {contentCategories.map((el, index) => (
        <Link key={index} onClick={() => setCategory(el.title)} className={`border-2 rounded-full p-2 border-slate-200 hover:bg-slate-400  hover:text-white ${category === el.title ? "bg-slate-700 text-white" : "bg-white text-black"} `}>{el.title}</Link>
      ))} */}
      <div className="w-full  ">
        <table className="w-full ">
        <thead className="sticky top-0 z-10 overflow-hidden"> 
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">id</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">thumbnail</th>
              <th className="border border-gray-300 px-4 py-2 text-left">description</th>
            </tr>
          </thead>
          <tbody className="">
            {contentCategories.map((el, index) => (
              <tr key={el.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{el.title}</td>
                <td className="border border-gray-300 px-4 py-2"><div className="size-4"><img className="w-full h-full object-cover" src={el.image}/></div></td>
                <td className="border border-gray-300 px-4 py-2">{el.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
