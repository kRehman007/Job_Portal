import { useLocation, useNavigate } from "react-router-dom";
import UserSideBar from "./UserSideBar";
import MainLayout from "../../components/MainLayout";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { getRelativeTime } from "./AllJobs";
import { useGetAppliedJobsQuery } from "../Redux/API/JobsAPI";
import { useFavourite } from "../zustand/useFavourite";
import toast from "react-hot-toast";
import { MdLocationOn, MdWorkOutline, MdAccessTime, MdCheckCircle } from "react-icons/md";
import { IoMdArrowForward } from "react-icons/io";

const ViewAllJobs = () => {
  const location = useLocation();
  const { ToggleFavourites } = useFavourite();
  const { data: appliedJobs } = useGetAppliedJobsQuery();
  const appliedJobIds = new Set(
    (appliedJobs || []).map((application: any) => application.jobId)
  );

  const navigate = useNavigate();
  const data = location.state.jobs;

  return (
    <MainLayout sidebar={<UserSideBar />}>
      <Toolbar />
      <Container sx={{ px: { xs: 2.5, sm: 4 }, py: { xs: 1, sm: 2 } }}>
          <Typography
            fontWeight={800}
            sx={{
              fontSize: { xs: "25px", sm: "32px" },
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Browse Job Openings
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "17px" },
              mt: 1,
              color: "#1e293b",
            }}
          >
            Explore a wide range of job opportunities from top companies across
            various industries.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "13.5px", sm: "15px" }, mt: 0.5, mb: 4 }}
            color="textSecondary"
          >
            Check out and apply for the job that best suits your skills.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {data &&
              [...data]
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                ?.map((job: any, index: number) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "18px",
                      overflow: "hidden",
                      background: "#fff",
                      position: "relative",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 14px 34px rgba(79, 70, 229, 0.14)",
                        borderColor: "#c7d2fe",
                      },
                    }}
                  >
                    {appliedJobIds.has(job.id) && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 14,
                          right: 14,
                          zIndex: 1,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          bgcolor: "#16a34a",
                          color: "#fff",
                          borderRadius: "8px",
                          px: 1.25,
                          py: 0.5,
                          fontSize: "12px",
                          fontWeight: 700,
                          boxShadow: "0 4px 10px rgba(22, 163, 74, 0.3)",
                        }}
                      >
                        <MdCheckCircle size={14} />
                        Applied
                      </Box>
                    )}
                    <Box sx={{ p: 2.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        {job.companyLogo && (
                          <Box
                            component="img"
                            src={job.companyLogo}
                            sx={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "14px",
                              objectFit: "cover",
                              border: "1px solid #e2e8f0",
                              boxShadow: "0 4px 10px rgba(30,41,59,0.06)",
                            }}
                          />
                        )}
                        <Stack direction="column" spacing={0.25}>
                          <Typography sx={{ fontWeight: 700, fontSize: "15px" }}>
                            {job.companyName}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12.5px",
                              color: "#64748b",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {job.description}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            fontSize={"12px"}
                            fontWeight={600}
                          >
                            1-{job.availabe_seats} Employees
                          </Typography>
                        </Stack>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: { xs: "16px", sm: "18px" },
                          fontWeight: 700,
                          color: "#1e293b",
                          mb: 1,
                        }}
                      >
                        {job.title}
                      </Typography>

                      <Stack spacing={1} sx={{ mb: 2 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MdLocationOn size={16} color="#6d28d9" />
                          <Typography
                            sx={{ fontSize: "13.5px", color: "#64748b" }}
                          >
                            {job.location}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MdWorkOutline size={16} color="#6d28d9" />
                          <Typography
                            sx={{ fontSize: "13.5px", color: "#64748b" }}
                          >
                            {job.jobType}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MdAccessTime size={16} color="#6d28d9" />
                          <Typography
                            sx={{ fontSize: "13.5px", color: "#64748b" }}
                          >
                            <strong>Posted:&nbsp;</strong>
                            {getRelativeTime(job.createdAt)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <Box
                      sx={{
                        px: 2.5,
                        pb: 2.5,
                        display: "flex",
                        gap: 1.5,
                      }}
                    >
                      <Button
                        onClick={() => {
                          ToggleFavourites(job);
                          toast.success("Job added to favourites");
                        }}
                        sx={{
                          px: 2,
                          py: 1,
                          border: "1px solid #cbd5e1",
                          borderRadius: "10px",
                          color: "#475569",
                          textTransform: "capitalize",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          "&:hover": { borderColor: "#6d28d9", color: "#6d28d9" },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() =>
                          navigate("/job-detail", { state: { job: job } })
                        }
                        fullWidth
                        endIcon={<IoMdArrowForward />}
                        sx={{
                          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                          textTransform: "capitalize",
                          borderRadius: "10px",
                          color: "#fff",
                          fontWeight: 600,
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #7c3aed, #4338ca)",
                          },
                        }}
                      >
                        Learn more
                      </Button>
                    </Box>
                  </Paper>
                ))}
          </Box>
      </Container>
    </MainLayout>
  );
};

export default ViewAllJobs;
