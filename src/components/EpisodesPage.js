import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const EpisodesPage = ({ data }) => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (Array.isArray(data)) {
      const foundCat = data.find((m) => m.id === parseInt(id));
      setCategory(foundCat);
      setEpisodes(foundCat.episodes);
      
    }
  }, [id, data]);

  if (!category) {
    return <div className="text-white p-6">Та бүлгээ сонгоно уу</div>;
  }
//   console.log(!category)
  return (
    <div className="px-6 pt-6 pb-20 h-full mx-auto flex flex-wrap gap-2 bg-scroll overflow-scroll ">
      {/* {contentCategories.map((el, index) => (
        <Link key={index} onClick={() => setCategory(el.title)} className={`border-2 rounded-full p-2 border-slate-200 hover:bg-slate-400  hover:text-white ${category === el.title ? "bg-slate-700 text-white" : "bg-white text-black"} `}>{el.title}</Link>
      ))} */}
      <div className="w-full  ">
        <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
        <table className="w-full ">
          <thead className="sticky top-0 z-10 overflow-hidden">
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Анги
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Нэр
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Тайлбар
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Зураг
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Үргэлжлэх хугацаа
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Огноо
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {episodes.map((el, index) => (
              <tr className="hover:bg-gray-100 w-full" key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {el.episodeNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">{el.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {el.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {el.image}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {el.duration}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {el.releaseDate}
                </td>
              </tr>
            ))}

            {/* {category.map((el, index) => (
              <tr key={el.episodes} className="hover:bg-gray-100 w-full">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`/content/${el.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {el.title}
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="w-16 h-16">
                    <img
                      className="w-full h-full object-cover"
                      src={el.image}
                      alt="Content"
                    />
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {el.description}
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EpisodesPage;
