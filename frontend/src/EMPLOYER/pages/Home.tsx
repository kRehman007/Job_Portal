import Loader from "../../JOB_SEEKER/components/Loader";
import { useGetEmployerPostedJobsQuery } from "../../JOB_SEEKER/Redux/API/JobsAPI";
import CreateJob from "./CreateJob";
import EmployerDashboard from "./EmployerDashboard";

const Home = () => {
  const { data, isLoading } = useGetEmployerPostedJobsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return data && data.length > 0 ? <EmployerDashboard /> : <CreateJob />;
};

export default Home;
