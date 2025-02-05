import { useState } from "react";

export default function ContentTable() {
  // Sample data: Categories with total video count
  const [categories, setCategories] = useState([
    { id: 1, name: "Кино шинжлэх ухаан", totalVideos: 12 },
    { id: 2, name: "Дэлхийн суутнууд", totalVideos: 8 },
    { id: 3, name: "100 секунд", totalVideos: 20 },
    { id: 4, name: "Дээлтэй аялал", totalVideos: 15 },
  ]);

  return (
    <div className="p-6  mx-auto">
      <h2 className="text-2xl font-bold mb-4">Content Categories</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Videos</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                <td className="border border-gray-300 px-4 py-2">{category.totalVideos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
