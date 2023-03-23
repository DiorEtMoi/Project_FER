import Layout from "../../layout/defaultLayout/Layout";
import Register from "../authPage/register/Register";
import Login from "../authPage/login/Login";

import Home from "../home/Home";
import MovieDetails from "../movieDetail/MovieDetails";
import WatchMovie from "../watchMovie/WatchMovie";
import MovieManager from "../../admin/addMovie/MovieManager";
import AddMovie from "../../admin/addMovie/AddMovie";
import UploadChap from "../../admin/addMovie/UploadChap";
import TypeList from "../typeList/TypeList";
import PrivateLayout from "../../layout/privateLayout/PrivateLayout";
import TypeMovie from "../../admin/typeMovie/TypeMovie";
import ManageUser from "../../admin/addMovie/ManageUser"
import AddNewType from "../../admin/typeMovie/AddNewType";

export const publicRoute = [
  {
    path: "/",
    element: Home,
    layout: Layout,
  },
  {
    path: "/movie/:slug",
    element: MovieDetails,
    layout: Layout,
  },
  {
    path: "/watch/:slug",
    element: WatchMovie,
    layout: Layout,
  },
  {
    path: "/auth/login",
    element: Login,
    layout: Layout,
  },
  {
    path: "/auth/register",
    element: Register,
    layout: Layout,
  },
  {
    path: "/type/:slug",
    element: TypeList,
    layout: Layout,
  },
];
export const privateRouter = [
  {
    path: "/admin/user_manager",
    element: ManageUser,
    layout: PrivateLayout,
  },
  {
    path: "/admin/movie_manager",
    element: MovieManager,
    layout: PrivateLayout,
  },
  {
    path: "/admin/add_movie",
    element: AddMovie,
    layout: PrivateLayout,
  },
  {
    path: "/admin/upload/:slug",
    element: UploadChap,
    layout: PrivateLayout,
  },
  {
    path: "/admin/type",
    element: TypeMovie,
    layout: PrivateLayout,
  },
  {
    path: "/admin/type/add",
    element: AddNewType,
    layout: PrivateLayout,
  },
];
