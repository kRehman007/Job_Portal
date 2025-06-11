// 👇 FIXED VERSION OF EmployerDashboard.tsx
import * as React from "react";
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "../../utils/useAppandDispatch";
import Loader from "../../JOB_SEEKER/components/Loader";
import EmployerSideBar from "../components/EmployerSideBar";
import { FaBriefcase, FaUsers } from "react-icons/fa";
import { useGetEmployerPostedJobsQuery } from "../../JOB_SEEKER/Redux/API/JobsAPI";

const ViewAllEmployerJobs = React.lazy(
  () => import("../components/ViewAllEmployerJobs")
);

export const drawerWidth = 300;

export default function EmployerDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAppSelector((state) => state.user);

  const {
    data: ActiveJobs = [],
    isLoading: jobsLoading,
    error: jobsError,
  } = useGetEmployerPostedJobsQuery();

  // TEMPORARY: totalApplicants will be shown inside ViewAllEmployerJobs
  const totalApplicants = 0;

  const dashboardStats = [
    { value: ActiveJobs.length, label: "Active Jobs", icon: <FaBriefcase /> },
    { value: totalApplicants, label: "Total Applicants", icon: <FaUsers /> },
  ];

  if (jobsLoading) return <Loader />;
  if (jobsError) return <div>Error loading jobs</div>;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <EmployerSideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Container maxWidth="xl" sx={{ py: 4, pt: { md: 0 }, px: 3 }}>
          {/* Welcome Section */}
          <Typography
            fontWeight={"bold"}
            sx={{
              fontSize: { xs: "25px", sm: "32px" },
              mt: { xs: 2, sm: 0 },
              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            Welcome back, {user?.fullName}!
          </Typography>

          <Typography
            variant={isMobile ? "body2" : "body1"}
            color="text.secondary"
            sx={{ my: { xs: 1, sm: 2 } }}
          >
            Welcome to your employer dashboard! Here, you can manage all your
            job postings, track applications, and connect with potential
            candidates. Whether you're hiring for a single role or building a
            full team, this platform provides the tools you need to find the
            right talent efficiently.
            <Typography sx={{ mt: 1 }}>
              Here is an overview of your posted jobs and recent applications.
            </Typography>
          </Typography>

          {/* Stats Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
              mb: { xs: 3, sm: 4 },
              mt: 4,
            }}
          >
            {dashboardStats.map((stat, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  minHeight: "120px",
                }}
              >
                <Box>
                  <Typography variant="h3" fontWeight={800}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1">{stat.label}</Typography>
                </Box>
                <Box sx={{ fontSize: "2rem", opacity: 0.8 }}>{stat.icon}</Box>
              </Paper>
            ))}
          </Box>

          {/* Jobs Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight={700}>
              Your Job Postings
            </Typography>

            <React.Suspense fallback={<Loader />}>
              <ViewAllEmployerJobs />
            </React.Suspense>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
