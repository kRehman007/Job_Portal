import ViewAllJobs from "../JOB_SEEKER/components/ViewAllJobs";
import Home from "../JOB_SEEKER/pages/Home";
import JobDetailPage from "../JOB_SEEKER/pages/JobDetailPage";
import UserAnalytics from "../JOB_SEEKER/pages/UserAnalytics";
import UserAppliedJobs from "../JOB_SEEKER/pages/UserAppliedJobs";
import UserFavJobs from "../JOB_SEEKER/pages/UserFavJobs";
import UserProfile from "../JOB_SEEKER/pages/UserProfile";
import { RouteLayout } from "./interface";
import { URL } from "./URL";

export const JOB_SEEKER_Routes: RouteLayout[] = [
  {
    link: URL.JOB_SEEKER.HOME,
    element: Home,
    isProtected: true,
  },
  {
    link: URL.JOB_SEEKER.ANALYTICS,
    element: UserAnalytics,
    isProtected: true,
  },
  {
    link: URL.JOB_SEEKER.APPLIED_JOS,
    element: UserAppliedJobs,
    isProtected: true,
  },
  {
    link: URL.JOB_SEEKER.FAVOURITE_JOBS,
    element: UserFavJobs,
    isProtected: true,
  },
  {
    link: URL.JOB_SEEKER.PROFILE,
    element: UserProfile,
    isProtected: true,
  },
  {
    link: URL.JOB_SEEKER.JOB_DETAIL,
    element: JobDetailPage,
    isProtected: true,
  },
  {
    link: URL.JOB_SEEKER.VIEW_ALL_JOBS,
    element: ViewAllJobs,
    isProtected: true,
  },
];
