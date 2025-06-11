import { EMPLOYER_ROUTES } from "./employer-routes";
import { Role } from "./interface";
import { JOB_SEEKER_Routes } from "./job-seeker-routes";
import { publicRoutes } from "./public-routes";
import { useAppSelector } from "./useAppandDispatch";

export const useRoute = () => {
  const { user } = useAppSelector((state) => state.user);
  const isEmployer = user?.role === Role.EMPLOYER;
  if (isEmployer) {
    return [...EMPLOYER_ROUTES, ...publicRoutes];
  } else {
    return [...JOB_SEEKER_Routes, ...publicRoutes];
  }
};
