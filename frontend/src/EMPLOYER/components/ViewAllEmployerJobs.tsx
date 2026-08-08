import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useDeleteJobMutation,
  useGetEmployerPostedJobsQuery,
} from "../../JOB_SEEKER/Redux/API/JobsAPI";
import { getRelativeTime } from "../../JOB_SEEKER/components/AllJobs";
import { URL } from "../../utils/URL";
import toast from "react-hot-toast";
import {
  MdLocationOn,
  MdWorkOutline,
  MdAccessTime,
  MdPeople,
  MdOutlineDelete,
} from "react-icons/md";
import { useState } from "react";

const ViewAllEmployerJobs = () => {
  const navigate = useNavigate();
  const { data, refetch } = useGetEmployerPostedJobsQuery();
  const [deleteJob] = useDeleteJobMutation();

  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  async function handleDeleteJob(jobId: string | number) {
    setDeletingId(jobId);
    try {
      await deleteJob({ jobId }).unwrap();
      toast.success("Job deleted successfully");
      await refetch();
    } catch (error: any) {
      toast.error(error.data?.error || "Failed to delete job");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Box sx={{ overflow: "hidden", mt: 4, mb: 4 }}>
      {data && data.length === 0 ? (
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography variant="h6" fontWeight={700} color="text.secondary">
            You haven't posted any jobs yet
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(URL.EMPLOYER.CREATE_JOB)}
            sx={{
              mt: 2,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              "&:hover": { background: "linear-gradient(135deg, #7c3aed, #4338ca)" },
            }}
          >
            Post Your First Job
          </Button>
        </Paper>
      ) : (
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
          {data &&
            [...data]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((job: any) => (
                <Paper
                  key={job.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "18px",
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 14px 34px rgba(79, 70, 229, 0.14)",
                      borderColor: "#c7d2fe",
                    },
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background:
                        "linear-gradient(90deg, #7c3aed, #4f46e5, #0ea5e9)",
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      mb: 2.5,
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
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="#1e293b"
                      >
                        {job.companyName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mt: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        <MdWorkOutline size={14} />
                        {job.availabe_seats} Open Positions
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#1e293b"
                    sx={{ mb: 1 }}
                  >
                    {job.title}
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
                    {job.description}
                  </Typography>

                  <Stack spacing={1} sx={{ mb: 2.5 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <MdLocationOn size={17} color="#6d28d9" />
                      <Typography variant="body2" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <MdWorkOutline size={17} color="#6d28d9" />
                      <Typography variant="body2" color="text.secondary">
                        {job.jobType}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <MdAccessTime size={17} color="#6d28d9" />
                      <Typography variant="body2" color="text.secondary">
                        Posted {getRelativeTime(job.createdAt)}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box display="flex" gap={1.5} sx={{ mt: "auto" }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteJob(job.id)}
                      disabled={deletingId === job.id}
                      startIcon={<MdOutlineDelete />}
                      sx={{
                        borderRadius: "12px",
                        fontWeight: 600,
                        borderColor: "#fecaca",
                        color: "#dc2626",
                        "&:hover": {
                          borderColor: "#ef4444",
                          bgcolor: "#fef2f2",
                        },
                      }}
                    >
                      {deletingId === job.id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Delete"
                      )}
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        navigate("/view-all-applicants", { state: { job } })
                      }
                      startIcon={<MdPeople />}
                      sx={{
                        borderRadius: "12px",
                        fontWeight: 700,
                        background:
                          "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                        boxShadow: "0 6px 16px rgba(99, 102, 241, 0.3)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
                        },
                      }}
                    >
                      Applicants
                    </Button>
                  </Box>
                </Paper>
              ))}
        </Box>
      )}
    </Box>
  );
};

export default ViewAllEmployerJobs;