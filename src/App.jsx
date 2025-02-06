import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import ContentManagement from "./components/ContentManagement";
import ContentTable from "./components/ContentTable";
import EPISODESDATA from "./data/Episodes.json";
import { useParams } from "react-router-dom";
import EpisodesPage from "./components/EpisodesPage";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";

// ContentManagement-д зориулсан wrapper
const ContentManagementWrapper = () => {
  const { catId } = useParams();
  return <ContentManagement EPISODESDATA={EPISODESDATA} catId={catId} />;
};

function App() {
  // 🛠 useState-ийг энд зөв байршууллаа
  const [activeSubItem, setActiveSubItem] = useState("");

  const toggleSubItem = (route) => {
    setActiveSubItem(route);
  };

  // 🛠 Router-ийг функц дотор байршуулж, зөв дамжууллаа
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomeLayout
          toggleSubItem={toggleSubItem}
          setActiveSubItem={setActiveSubItem}
          activeSubItem={activeSubItem}
        />
      ),
      children: [
        {
          path: "/",
          element: <UserManagement />,
        },
        {
          path: "/category",
          element: <ContentTable />,
        },
        {
          path: "/content",
          element: (
            <ContentManagement
              toggleSubItem={toggleSubItem}
              setActiveSubItem={setActiveSubItem}
              activeSubItem={activeSubItem}
            />
          ),
        },
        {
          path: "/topic",
          element: <Dashboard data={EPISODESDATA} />,
        },
        {
          path: "/topic/:id",
          element: <EpisodesPage data={EPISODESDATA} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
