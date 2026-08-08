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
import MainLayout from "../../components/MainLayout";
import { FaBriefcase, FaUsers } from "react-icons/fa";
import { useGetEmployerPostedJobsQuery } from "../../JOB_SEEKER/Redux/API/JobsAPI";

const ViewAllEmployerJobs = React.lazy(
  () => import("../components/ViewAllEmployerJobs")
);

export default function EmployerDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAppSelector((state) => state.user);

  const {
    data: ActiveJobs = [],
    isLoading: jobsLoading,
    error: jobsError,
  } = useGetEmployerPostedJobsQuery();

  const totalApplicants = ActiveJobs.reduce(
    (sum: number, job: any) => sum + (job?.applicants?.length || 0),
    0
  );

  const dashboardStats = [
    {
      value: ActiveJobs.length,
      label: "Active Jobs",
      icon: <FaBriefcase style={{ fontSize: "30px" }} />,
      gradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
      glow: "rgba(124, 58, 237, 0.35)",
    },
    {
      value: totalApplicants,
      label: "Total Applicants",
      icon: <FaUsers style={{ fontSize: "30px" }} />,
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
      glow: "rgba(14, 165, 233, 0.35)",
    },
  ];

  if (jobsLoading) return <Loader />;
  if (jobsError) return <div>Error loading jobs</div>;

  return (
    <MainLayout sidebar={<EmployerSideBar />}>
      <Toolbar />

      <Container maxWidth="xl" sx={{ py: 4, pt: { md: 0 }, px: { xs: 2.5, sm: 4 } }}>
          <Typography
            fontWeight={800}
            sx={{
              fontSize: { xs: "25px", sm: "32px" },
              mt: { xs: 2, sm: 0 },
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
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
            sx={{ my: { xs: 1, sm: 2 }, maxWidth: 760 }}
          >
            Manage your job postings, track applications, and connect with
            potential candidates all in one place.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
              mb: { xs: 3, sm: 5 },
              mt: 3,
            }}
          >
            {dashboardStats.map((stat, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  minHeight: "110px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: `0 12px 28px ${stat.glow}`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 62,
                    height: 62,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    background: stat.gradient,
                    boxShadow: `0 8px 18px ${stat.glow}`,
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{ color: "#1e293b", lineHeight: 1.1 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: "15px" }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight={800} color="#1e293b">
              Your Job Postings
            </Typography>

            <React.Suspense fallback={<Loader />}>
              <ViewAllEmployerJobs />
            </React.Suspense>
          </Box>
      </Container>
    </MainLayout>
  );
}
