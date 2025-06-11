import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useDeleteJobMutation,
  useGetEmployerPostedJobsQuery,
} from "../../JOB_SEEKER/Redux/API/JobsAPI";
import { getRelativeTime } from "../../JOB_SEEKER/components/AllJobs";
import toast from "react-hot-toast";
import {
  MdLocationOn,
  MdWorkOutline,
  MdAccessTime,
  MdPeople,
} from "react-icons/md";

const ViewAllEmployerJobs = () => {
  const navigate = useNavigate();
  const { data } = useGetEmployerPostedJobsQuery();
  const [deleteJob, { isLoading }] = useDeleteJobMutation();

  async function handleDeleteJob(jobId: string | number) {
    try {
      await deleteJob({ jobId }).unwrap();
      toast.success("Job deleted successfully");
    } catch (error: any) {
      toast.error(error.data?.error || "Failed to delete job");
    }
  }

  return (
    <Box sx={{ overflow: "hidden", mt: 4 }}>
      {data && data.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary">
            You haven't posted any jobs yet
          </Typography>
          <Button variant="contained" onClick={() => navigate("/post-job")}>
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
              .map((job: any, index: number) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                    },
                    position: "relative",
                    overflow: "hidden",
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
                    <img
                      src={job.companyLogo}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {job.companyName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {job.availabe_seats} Open Positions
                      </Typography>
                    </Box>
                  </Box>

                  {/* Job Title */}
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {job.title}
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
                    {job.description}
                  </Typography>

                  {/* Job Details */}
                  <Stack spacing={1} sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <MdLocationOn size={18} color="#757575" />
                      <Typography variant="body2" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <MdWorkOutline size={18} color="#757575" />
                      <Typography variant="body2" color="text.secondary">
                        {job.jobType}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <MdAccessTime size={18} color="#757575" />
                      <Typography variant="body2" color="text.secondary">
                        Posted {getRelativeTime(job.createdAt)}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Action Buttons */}
                  <Box display="flex" gap={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteJob(job.id)}
                      disabled={isLoading}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      {isLoading ? "Deleting..." : "Delete"}
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
                        textTransform: "none",
                        fontWeight: 500,
                        background:
                          "linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)",
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
