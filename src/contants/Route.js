import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SearchPage from "../pages/SearchPage";
import Upload from "../pages/Upload";
export const AllRoute = [
  {
    title: "Trang chủ",
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
  {
    title: "Đăng nhập",
    path: "login",
    element: <Login />,
  },
  {
    title: "Upload files",
    path: "upload",
    element: <Upload />,
  },
];
