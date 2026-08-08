import UserSideBar from "../components/UserSideBar";
import MainLayout from "../../components/MainLayout";
import { Box, Container, Stack, Paper, Avatar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useGetAppliedJobsQuery } from "../Redux/API/JobsAPI";
import { getRelativeTime } from "../components/AllJobs";
import Loader from "../components/Loader";
import {
  MdLocationOn,
  MdWorkOutline,
  MdCheckCircle,
  MdOutlineHourglassEmpty,
  MdOutlineCancel,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";

const UserAppliedJobs = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAppliedJobsQuery();

  if (isLoading) {
    return <Loader />;
  }

  const applicationCount = data?.length || 0;

  const statusMeta: Record<string, { label: string; bg: string; color: string }> =
    {
      pending: { label: "Pending", bg: "#fffbeb", color: "#b45309" },
      approved: { label: "Accepted", bg: "#f0fdf4", color: "#15803d" },
      rejected: { label: "Rejected", bg: "#fef2f2", color: "#b91c1c" },
    };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "approved") return <MdCheckCircle size={18} />;
    if (status === "rejected") return <MdOutlineCancel size={18} />;
    return <MdOutlineHourglassEmpty size={18} />;
  };

  return (
    <MainLayout sidebar={<UserSideBar />}>
      <Toolbar />
      <Container
        maxWidth="lg"
        sx={{ py: 4, pt: 0, px: { xs: 2.5, sm: 4 } }}
      >
          {applicationCount === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 6 },
                textAlign: "center",
                borderRadius: "18px",
                bgcolor: "#fff",
                border: "1px solid #e2e8f0",
                mt: 2,
              }}
            >
              <Box
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  mx: "auto",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 10px 24px rgba(99, 102, 241, 0.3)",
                  color: "#fff",
                }}
              >
                <MdOutlineHourglassEmpty size={40} />
              </Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                No applications yet
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 420, mx: "auto" }}
              >
                You haven't applied to any jobs yet. Start exploring
                opportunities today!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                endIcon={<IoMdArrowForward />}
                sx={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  borderRadius: "12px",
                  px: 4,
                  py: 1.25,
                  fontWeight: 700,
                  "&:hover": { background: "linear-gradient(135deg, #7c3aed, #4338ca)" },
                }}
              >
                Browse Jobs
              </Button>
            </Paper>
          ) : (
            <>
              <Box sx={{ mb: 4 }}>
                <Typography
                  fontWeight={800}
                  sx={{
                    mb: 1,
                    fontSize: { xs: "25px", sm: "32px" },
                    mt: { xs: 2, sm: 0 },
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Your Job Applications
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, maxWidth: 720 }}
                >
                  Track the progress of every role you've applied for. Follow up
                  when necessary and stay proactive to increase your chances of
                  success.
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0ea5e9 120%)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    right: -30,
                    top: -30,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <Box>
                    <Typography variant="h3" fontWeight={800}>
                      {applicationCount}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                      Total Applications
                    </Typography>
                  </Box>
                  <MdCheckCircle size={48} color="rgba(255, 255, 255, 0.85)" />
                </Stack>
              </Paper>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  Your Applications
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
                  }}
                >
                  {data?.map((job: any, index: number) => {
                    const meta = statusMeta[job?.status] || statusMeta.pending;
                    return (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: "18px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          border: "1px solid #e2e8f0",
                          background: "#fff",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 14px 34px rgba(79, 70, 229, 0.14)",
                            borderColor: "#c7d2fe",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Avatar
                            src={job.job.companyLogo}
                            variant="rounded"
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: "14px",
                              border: "1px solid #e2e8f0",
                            }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle1"
                              fontWeight={700}
                              color="#1e293b"
                            >
                              {job.job.companyName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Applied {getRelativeTime(job.createdAt)}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color="#1e293b"
                          sx={{ mb: 1 }}
                        >
                          {job.job.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {job.job.description}
                        </Typography>

                        <Stack spacing={1} sx={{ mb: 2.5, mt: "auto" }}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <MdLocationOn size={17} color="#6d28d9" />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {job.job.location}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <MdWorkOutline size={17} color="#6d28d9" />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {job.job.jobType}
                            </Typography>
                          </Box>
                        </Stack>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                              bgcolor: meta.bg,
                              color: meta.color,
                              borderRadius: "10px",
                              py: 1,
                              px: 2,
                              fontSize: "14px",
                              fontWeight: 700,
                            }}
                          >
                            <StatusIcon status={job?.status} />
                            {meta.label}
                          </Box>
                          <Button
                            size="small"
                            onClick={() =>
                              navigate("/job-detail", {
                                state: { job: job.job },
                              })
                            }
                            endIcon={<IoMdArrowForward />}
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: 600,
                              color: "#4f46e5",
                              borderRadius: "10px",
                              border: "1px solid #c7d2fe",
                              "&:hover": {
                                background: "#eef2ff",
                                borderColor: "#818cf8",
                              },
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Paper>
                    );
                  })}
                </Box>
              </Box>
            </>
          )}
        </Container>
    </MainLayout>
  );
};

export default UserAppliedJobs;
