import Layout from "../../layout/defaultLayout/Layout";
import Register from "../authPage/register/Register";
import Login from "../authPage/login/Login";

import Home from "../home/Home";
import MovieDetails from "../movieDetail/MovieDetails";
import WatchMovie from "../watchMovie/WatchMovie";
import MovieManager from "../../admin/addMovie/MovieManager";
import AddMovie from "../../admin/addMovie/AddMovie";
import UploadChap from "../../admin/addMovie/UploadChap";

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
];
export const privateRouter = [
  {
    path: "/admin/movie_manager",
    element: MovieManager,
    layout: Layout,
  },
  {
    path: "/admin/add_movie",
    element: AddMovie,
    layout: Layout,
  },
  {
    path: "/admin/upload/:slug",
    element: UploadChap,
    layout: Layout,
  },
];
