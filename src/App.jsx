import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from "./components/sidebar/Sidebar";
import Tester from "./components/Lesson/Testerr"
import CategoryPage from "./pages/Category/CategoryPage"
import CoursePage from "./pages/Course/CoursePage"
import LessonPage from './pages/Lesson/LessonPage';
import UserManagement from './pages/UserManagement';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from './pages/HomeLayout';
import ContentManagement from './components/ContentManagement';
import ContentTable from './components/ContentTable';
const router = createBrowserRouter([
    { path: "/",
      element: <HomeLayout />,
      children:[
        {
          path: "/",
          element: <UserManagement />,
        },
        {
          path: "/category",
          element: <ContentTable/>,
        },
        {
          path: "/content-management",
          element: <ContentManagement />,
        },
        
      ]
    },
    // {
    //   path: "/profile",
    //   element: <MyProfileLayout />,
    //   children: [
    //     {
    //       path: "/profile",
    //       element: <Content />,
    //     },
    //     {
    //       path: "/profile/add",
    //       element: <AddPost />,
    //     },
    //     {
    //       path: "/profile/edit",
    //       element: <EditProfile />,
    //     },
    //   ],
    // },

  ]);
  function App() {
    return(
        <>
     <RouterProvider router={router} />
        </>
    )
}

export default App;