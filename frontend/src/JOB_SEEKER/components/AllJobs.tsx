import { useGetAllJobsQuery, useGetAppliedJobsQuery } from "../Redux/API/JobsAPI";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { IoMdArrowForward } from "react-icons/io";
import { useFavourite } from "../zustand/useFavourite";
import toast from "react-hot-toast";
import { MdAccessTime, MdLocationOn, MdWorkOutline, MdCheckCircle } from "react-icons/md";
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
  const { data: appliedJobs } = useGetAppliedJobsQuery();
  const appliedJobIds = new Set(
    (appliedJobs || []).map((application: any) => application.jobId)
  );
  const { ToggleFavourites, isFavourite } = useFavourite();

  return (
    <Box sx={{ mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          px: 0.5,
        }}
      >
        {data?.length > 0 && (
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "24px", sm: "30px" },
                lineHeight: 1.2,
                fontWeight: 800,
                color: "#1e293b",
              }}
            >
              Discover Your Next Opportunity
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Hand-picked roles from companies hiring right now
            </Typography>
          </Box>
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
              color: "#6d28d9",
              fontWeight: 600,
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "rgba(109, 40, 217, 0.06)" },
            }}
          >
            View All Jobs
          </Button>
        )}
      </Box>

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
            .slice(0, 6)
            .map((job, index) => (
              <Paper
                key={index}
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
                  "& .top-accent": {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background:
                      "linear-gradient(90deg, #7c3aed, #4f46e5, #0ea5e9)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover .top-accent": { opacity: 1 },
                }}
              >
                <Box className="top-accent" />

                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {appliedJobIds.has(job.id) && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        bgcolor: "rgba(22, 163, 74, 0.92)",
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
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 8px rgba(30,41,59,0.08)",
                      "&:hover": { backgroundColor: "#f8fafc" },
                    }}
                  >
                    {isFavourite(job.id) ? (
                      <BookmarkCheck size={20} color="#ef4444" fill="#ef4444" />
                    ) : (
                      <Bookmark size={20} color="#94a3b8" />
                    )}
                  </Button>
                </Box>

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
                        width: "72px",
                        height: "72px",
                        borderRadius: "16px",
                        objectFit: "cover",
                        border: "1px solid #e2e8f0",
                        background: "#fff",
                        boxShadow: "0 4px 12px rgba(30,41,59,0.06)",
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
                      }}
                    >
                      <MdWorkOutline size={14} />
                      {job.availabe_seats} open positions
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#1e293b"
                  sx={{ mb: 1.5, lineHeight: 1.3 }}
                >
                  {job.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontSize: "14px",
                  }}
                >
                  {job.description}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2.5 }} flexWrap="wrap">
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      bgcolor: "#eef2ff",
                      color: "#4f46e5",
                      borderRadius: "8px",
                      px: 1.25,
                      py: 0.5,
                      fontSize: "12.5px",
                      fontWeight: 600,
                    }}
                  >
                    <MdLocationOn size={14} />
                    {job.location}
                  </Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      bgcolor: "#ecfeff",
                      color: "#0891b2",
                      borderRadius: "8px",
                      px: 1.25,
                      py: 0.5,
                      fontSize: "12.5px",
                      fontWeight: 600,
                    }}
                  >
                    <MdWorkOutline size={14} />
                    {job.jobType}
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 2.5 }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <MdAccessTime size={15} />
                    Posted {getRelativeTime(job.createdAt)}
                  </Typography>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/job-detail", { state: { job } })}
                  sx={{
                    py: 1.25,
                    borderRadius: "12px",
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                    boxShadow: "0 6px 16px rgba(99, 102, 241, 0.3)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
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
