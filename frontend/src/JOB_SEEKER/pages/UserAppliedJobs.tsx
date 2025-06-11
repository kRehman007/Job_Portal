import UserSideBar from "../components/UserSideBar";
import { Box, Container, Stack, Paper, Avatar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "./UserDashboard";
import { useGetAppliedJobsQuery } from "../Redux/API/JobsAPI";
import { getRelativeTime } from "../components/AllJobs";
import Loader from "../components/Loader";
import {
  MdLocationOn,
  MdWorkOutline,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UserAppliedJobs = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAppliedJobsQuery();

  if (isLoading) {
    return <Loader />;
  }

  const applicationCount = data?.length || 0;

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
        <Container maxWidth="lg" sx={{ py: 4, pt: 0 }}>
          {applicationCount === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No applications yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                You haven't applied to any jobs yet. Start exploring
                opportunities today!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{
                  background:
                    "linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)",
                  textTransform: "capitalize",
                }}
              >
                Browse Jobs
              </Button>
            </Paper>
          ) : (
            <>
              {/* Header Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  fontWeight={"bold"}
                  sx={{
                    mb: 1,
                    fontSize: { xs: "25px", sm: "32px" },
                    mt: { xs: 2, sm: 0 },
                    background:
                      "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Your Job Applications
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Welcome to your applied jobs page! Here, you can view a list
                  of all the jobs you've applied for. This is a great way to
                  track your job applications and keep a record of the roles
                  you've shown interest in.
                  <Typography sx={{ mt: 1 }}>
                    You have applied to
                    {applicationCount} job(s) so far. Keep an eye on your
                    application status and make sure to follow up when
                    necessary. Each job application is a step closer to finding
                    your perfect career fit. Stay proactive and explore new
                    opportunities to increase your chances of success.
                  </Typography>
                </Typography>
              </Box>

              {/* Stats Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h3" fontWeight={800}>
                      {applicationCount}
                    </Typography>
                    <Typography variant="subtitle1">
                      Total Applications
                    </Typography>
                  </Box>
                  <MdCheckCircle size={48} color="rgba(255, 255, 255, 0.8)" />
                </Stack>
              </Paper>

              {/* Applications List */}
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
                  {data?.map((job: any) => (
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      {/* Company Info */}
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
                          sx={{ width: 60, height: 60 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {job.job.companyName}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Job Title */}
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                        {job.job.title}
                      </Typography>

                      {/* Job Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {job.job.description}
                      </Typography>

                      {/* Job Details */}
                      <Stack spacing={1} sx={{ mb: 3 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MdLocationOn size={18} color="#757575" />
                          <Typography variant="body2" color="text.secondary">
                            {job.job.location}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <MdWorkOutline size={18} color="#757575" />
                          <Typography variant="body2" color="text.secondary">
                            {job.job.jobType}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <MdAccessTime size={18} color="#757575" />
                          <Typography variant="body2" color="text.secondary">
                            Applied {getRelativeTime(job.createdAt)}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Status & Actions */}
                      <Button
                        variant="contained"
                        sx={{ textTransform: "capitalize" }}
                        disabled
                        fullWidth
                      >
                        {job?.status}
                      </Button>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default UserAppliedJobs;
