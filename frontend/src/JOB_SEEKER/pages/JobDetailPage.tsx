import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Toolbar,
  Chip,
  Paper,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";
import UserSideBar from "../components/UserSideBar";
import { drawerWidth } from "./UserDashboard";
import { getRelativeTime } from "../components/AllJobs";
import {
  useApplyForJobsMutation,
  useGetAppliedJobsQuery,
} from "../Redux/API/JobsAPI";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  MdLocationOn,
  MdWorkOutline,
  MdAccessTime,
  MdAttachMoney,
  MdPerson,
  MdEmail,
} from "react-icons/md";

const JobDetailPage = () => {
  const { data } = useGetAppliedJobsQuery();
  const [applyForJobs, { isLoading }] = useApplyForJobsMutation();
  const [applied, setApplied] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state.job;

  useEffect(() => {
    if (data) {
      const isApplied = data?.some(
        (data: any) => data.jobId === Number(job.id)
      );
      setApplied(isApplied);
    }
  }, [data, job.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  async function handleJobApply(jobId: number) {
    try {
      await applyForJobs({ jobId }).unwrap();
      toast.success("Application submitted successfully!");
      setApplied(true);
    } catch (error: any) {
      console.log("error in applying for a job", error);
      toast.error(
        error.data?.error || "Something went wrong. Please try again."
      );
    }
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <UserSideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: { xs: 4, sm: 0 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Container maxWidth="lg" sx={{ py: 4, pt: 2 }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              sx={{ mb: 3, textTransform: "none" }}
            >
              ← Back to Jobs
            </Button>
            <div className="flex  gap-2 items-center mb-1">
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  background:
                    "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {job.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" mt={1}>
                at {job.companyName}
              </Typography>
            </div>
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, sm: 4 },
            }}
          >
            {/* Left Column - Job Details */}
            <Box sx={{ flex: 2 }}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Job Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {job.description}
                </Typography>
              </Paper>

              {/* Requirements Section */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Requirements
                </Typography>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <MdWorkOutline size={20} color="#3f51b5" />
                    <Typography>
                      <strong>Experience:</strong> {job.experience} years
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    <MdAttachMoney size={20} color="#3f51b5" />
                    <Typography>
                      <strong>Salary:</strong> ${job.salary}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>

            {/* Right Column - Company Info & Apply */}
            <Box sx={{ flex: 1 }}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  Job Overview
                </Typography>
                <Stack spacing={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <MdLocationOn size={20} color="#3f51b5" />
                    <Typography>
                      <strong>Location:</strong> {job.location}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <MdAccessTime size={20} color="#3f51b5" />
                    <Typography>
                      <strong>Posted:</strong> {getRelativeTime(job.createdAt)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontWeight={600} sx={{ mb: 1 }}>
                      Skills Required
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {job?.skills.map((skill: string, index: number) => (
                        <Chip
                          key={index}
                          label={skill}
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Paper>

              {/* Company Card */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                  About the Company
                </Typography>
                <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
                  <Avatar
                    src={job.companyLogo}
                    sx={{ width: 60, height: 60 }}
                  />
                  <Typography fontWeight={600}>{job.companyName}</Typography>
                </Box>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <MdPerson size={20} color="#3f51b5" />
                    <Typography>
                      <strong>Contact:</strong> {job.employer.fullName}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <MdEmail size={20} color="#3f51b5" />
                    <Typography>
                      <strong>Email:</strong> {job.employer.email}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* Apply Button */}
              <Box sx={{ position: "sticky", top: 20 }}>
                {applied ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    disabled
                  >
                    ✓ Application Submitted
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      background:
                        "linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)",
                    }}
                    onClick={() => handleJobApply(job.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Apply Now"
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default JobDetailPage;
