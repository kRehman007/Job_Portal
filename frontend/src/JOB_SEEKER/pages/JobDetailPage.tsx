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
import MainLayout from "../../components/MainLayout";
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
  MdDescription,
  MdOutlineBusinessCenter,
} from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";

const JobDetailPage = () => {
  const { data } = useGetAppliedJobsQuery();
  const [applyForJobs, { isLoading }] = useApplyForJobsMutation();
  const [applied, setApplied] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  console.log("Job details:", job);
  
  if (!job) {
  return (
    <MainLayout sidebar={<UserSideBar />}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">
          Job details are not available.
        </Typography>
        <Button
                     startIcon={<AiOutlineArrowLeft />}
                     onClick={() => navigate(-1)}
                     sx={{
                       textTransform: "capitalize",
                       color: "#4f46e5",
                       fontWeight: 600,
                       mb: 1,
                     }}
                   >
                     Go Back
                   </Button>
      </Container>
    </MainLayout>
  );
}


  useEffect(() => {
    if (data) {
      const isApplied = data?.some(
        (data: any) => data.jobId === Number(job.id)
      );
      setApplied(isApplied);
    }
  }, [data, job?.id]);

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
    <MainLayout sidebar={<UserSideBar />}>
      <Toolbar />

      <Container maxWidth="lg" sx={{ py: 4, pt: 2 }}>
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<AiOutlineArrowLeft />}
              onClick={() => navigate(-1)}
              sx={{
                textTransform: "capitalize",
                color: "#4f46e5",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Back
            </Button>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
              {job?.companyLogo && (
                <Avatar
                  src={job?.companyLogo}
                  variant="rounded"
                  sx={{
                    width: { xs: 56, sm: 72 },
                    height: { xs: 56, sm: 72 },
                    borderRadius: "18px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 20px rgba(30,41,59,0.08)",
                  }}
                />
              )}
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: "24px", sm: "32px" },
                    color: "#1e293b",
                    lineHeight: 1.2,
                  }}
                >
                  {job?.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" mt={0.5}>
                  at {job?.companyName}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#eef2ff",
                  color: "#4f46e5",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.75,
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <MdLocationOn size={15} />
                {job?.location}
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#ecfeff",
                  color: "#0891b2",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.75,
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <MdWorkOutline size={15} />
                {job?.jobType}
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#f0fdf4",
                  color: "#16a34a",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.75,
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <MdAccessTime size={15} />
                Posted {getRelativeTime(job.createdAt)}
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Paper
                elevation={0}
                sx={{ p: 4, borderRadius: "18px", mb: 4, border: "1px solid #e2e8f0" }}
              >
                <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      color: "#fff",
                    }}
                  >
                    <MdDescription size={20} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    Job Description
                  </Typography>
                </Stack>
                <Typography variant="body1" paragraph sx={{ color: "#475569" }}>
                  {job?.description}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 4, borderRadius: "18px", mb: 4, border: "1px solid #e2e8f0" }}
              >
                <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                      color: "#fff",
                    }}
                  >
                    <MdOutlineBusinessCenter size={20} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    Requirements
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{
                      bgcolor: "#f8fafc",
                      p: 2,
                      borderRadius: "12px",
                      border: "1px solid #eef2f7",
                    }}
                  >
                    <MdWorkOutline size={20} color="#6d28d9" />
                    <Typography>
                      <strong>Experience:</strong> {job.experience} years
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{
                      bgcolor: "#f8fafc",
                      p: 2,
                      borderRadius: "12px",
                      border: "1px solid #eef2f7",
                    }}
                  >
                    <MdAttachMoney size={20} color="#6d28d9" />
                    <Typography>
                      <strong>Salary:</strong> ${job.salary}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Paper
                elevation={0}
                sx={{ p: 4, borderRadius: "18px", mb: 4, border: "1px solid #e2e8f0" }}
              >
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                  Job Overview
                </Typography>
                <Stack spacing={2.5}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        bgcolor: "#eef2ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4f46e5",
                      }}
                    >
                      <MdLocationOn size={19} />
                    </Box>
                    <Typography sx={{ color: "#475569" }}>
                      <strong>Location:</strong> {job.location}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        bgcolor: "#eef2ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4f46e5",
                      }}
                    >
                      <MdAccessTime size={19} />
                    </Box>
                    <Typography sx={{ color: "#475569" }}>
                      <strong>Posted:</strong> {getRelativeTime(job.createdAt)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontWeight={600} sx={{ mb: 1.5 }}>
                      Skills Required
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {job?.skills?.map((skill: string, index: number) => (
                        <Chip
                          key={index}
                          label={skill}
                          sx={{
                            borderRadius: "8px",
                            bgcolor: "#f5f3ff",
                            color: "#6d28d9",
                            border: "1px solid #ddd6fe",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#ede9fe" },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 4, borderRadius: "18px", mb: 4, border: "1px solid #e2e8f0" }}
              >
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                  About the Company
                </Typography>
                <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
                  <Avatar
                    src={job?.companyLogo}
                    variant="rounded"
                    sx={{ width: 60, height: 60, borderRadius: "14px" }}
                  />
                  <Typography fontWeight={700}>{job?.companyName}</Typography>
                </Box>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <MdPerson size={20} color="#6d28d9" />
                    <Typography sx={{ color: "#475569" }}>
                      <strong>Contact:</strong> {job?.employer?.fullName}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <MdEmail size={20} color="#6d28d9" />
                    <Typography sx={{ color: "#475569", wordBreak: "break-all" }}>
                      <strong>Email:</strong> {job?.employer?.email}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Box sx={{ position: "sticky", top: 20 }}>
                {applied ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: "12px",
                      fontWeight: 700,
                      boxShadow: "0 8px 18px rgba(22, 163, 74, 0.3)",
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
                      py: 1.5,
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontSize: "1rem",
                      background:
                        "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                      boxShadow: "0 8px 20px rgba(99, 102, 241, 0.35)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
                        boxShadow: "0 10px 26px rgba(99, 102, 241, 0.45)",
                      },
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
    </MainLayout>
  );
};

export default JobDetailPage;
