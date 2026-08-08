import Loader from "../../JOB_SEEKER/components/Loader";
import { useGetEmployerPostedJobsQuery } from "../../JOB_SEEKER/Redux/API/JobsAPI";
import EmployerDashboard from "./EmployerDashboard";

const Home = () => {
  const { isLoading } = useGetEmployerPostedJobsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return <EmployerDashboard />;
};

export default Home;
