import CreateJob from "../EMPLOYER/pages/CreateJob";
import Home from "../EMPLOYER/pages/Home";
import ViewAllApplicants from "../EMPLOYER/pages/ViewAllApplicants";
import { RouteLayout } from "./interface";
import { URL } from "./URL";

export const EMPLOYER_ROUTES: RouteLayout[] = [
  {
    link: URL.EMPLOYER.HOME,
    element: Home,
    isProtected: true,
  },
  {
    link: URL.EMPLOYER.VIEW_ALL_EMPLOYERS,
    element: ViewAllApplicants,
    isProtected: true,
  },
  {
    link: URL.EMPLOYER.CREATE_JOB,
    element: CreateJob,
    isProtected: true,
  },
];
