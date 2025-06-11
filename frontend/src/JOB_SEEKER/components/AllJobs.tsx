import { useGetAllJobsQuery } from "../Redux/API/JobsAPI";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { IoMdArrowForward } from "react-icons/io";
import { useFavourite } from "../zustand/useFavourite";
import toast from "react-hot-toast";
import { MdAccessTime, MdLocationOn, MdWorkOutline } from "react-icons/md";
import { Bookmark, BookmarkCheck } from "lucide-react";

export const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) return "Today";

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return formatDistanceToNow(date, { addSuffix: true });
};

export default function AllJobs() {
  const navigate = useNavigate();
  const { data } = useGetAllJobsQuery();
  const { ToggleFavourites, isFavourite } = useFavourite();

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          px: 1,
        }}
      >
        {data?.length > 0 && (
          <Typography
            sx={{
              fontSize: { xs: "25px", sm: "32px" },
              lineHeight: 1.2,
              mb: 1,
            }}
            fontWeight={700}
            color="text.primary"
          >
            Discover Your Next Opportunity
          </Typography>
        )}
        {data?.length > 5 && (
          <Button
            variant="text"
            endIcon={<IoMdArrowForward />}
            onClick={() =>
              navigate("/view-all-jobs", { state: { jobs: data } })
            }
            sx={{
              textTransform: "none",
              color: "primary.main",
              fontWeight: 500,
              "&:hover": { backgroundColor: "rgba(63, 81, 181, 0.04)" },
            }}
          >
            View All Jobs
          </Button>
        )}
      </Box>

      {/* Job Cards Grid */}
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 4,
        }}
      >
        {data &&
          [...data]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 6)
            .map((job, index) => (
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
                {/* Bookmark Button */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 1,
                  }}
                >
                  <Button
                    onClick={() => {
                      ToggleFavourites(job);
                      toast.success(
                        isFavourite(job.id)
                          ? "Added to favorites"
                          : "Removed from favorites"
                      );
                    }}
                    sx={{
                      minWidth: 0,
                      p: 1,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                  >
                    {isFavourite(job.id) ? (
                      <BookmarkCheck size={20} color="#f44336" fill="#f44336" />
                    ) : (
                      <Bookmark size={20} color="#757575" />
                    )}
                  </Button>
                </Box>

                {/* Company Info */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  {job.companyLogo && (
                    <Box
                      component="img"
                      src={job.companyLogo}
                      sx={{
                        width: "84px",
                        height: "84px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                      }}
                    />
                  )}
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {job.companyName}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <MdWorkOutline size={14} style={{ marginTop: -3 }} />
                      {job.availabe_seats} open positions
                    </Typography>
                  </Box>
                </Box>

                {/* Job Title */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ mb: 2, lineHeight: 1.3 }}
                >
                  {job.title}
                </Typography>

                {/* Job Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {job.description}
                </Typography>

                {/* Job Details */}
                <Stack spacing={1.5} sx={{ mb: 3 }}>
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

                {/* Apply Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/job-detail", { state: { job } })}
                  sx={{
                    py: 1,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    background:
                      "linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #3f51b5 0%, #1976d2 100%)",
                    },
                  }}
                  endIcon={<IoMdArrowForward />}
                >
                  View Details
                </Button>
              </Paper>
            ))}
      </Box>
    </Box>
  );
}
