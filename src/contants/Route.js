import { BiHomeAlt, BiUser, BiExport } from "react-icons/bi";
import Card from "../component/Card";
import PlayTrackMain from "../component/PlayTrackMain";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SearchPage from "../pages/SearchPage";
import Upload from "../pages/Upload";
export const AllRoute = [
  {
    title: "Trang chủ",
    path: "/",
    icon: <BiHomeAlt />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "play",
        element: <PlayTrackMain />,
      },
    ],
  },
  {
    title: "Đăng nhập",
    path: "login",
    element: <Login />,
    icon: <BiUser />,
  },
  {
    title: "Upload files",
    path: "upload",
    element: <Upload />,
    icon: <BiExport />,
  },
];
