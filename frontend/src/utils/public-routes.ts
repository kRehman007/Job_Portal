import Login from "../public_pages/Login";
import Signup from "../public_pages/Signup";
import { RouteLayout } from "./interface";
import { URL } from "./URL";

export const publicRoutes: RouteLayout[] = [
  {
    link: URL.SIGNUP,
    element: Signup,
    isProtected: false,
  },
  {
    link: URL.LOGIN,
    element: Login,
    isProtected: false,
  },
];
