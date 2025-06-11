import { useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import {
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { getRelativeTime } from "../components/AllJobs";
import { drawerWidth } from "../pages/UserDashboard";
import { useFavourite } from "../zustand/useFavourite";
import toast from "react-hot-toast";
import {
  MdLocationOn,
  MdWorkOutline,
  MdAccessTime,
  MdFavorite,
} from "react-icons/md";

const UserFavJobs = () => {
  const { FavouriteList, ToggleFavourites } = useFavourite();
  const navigate = useNavigate();

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
          {FavouriteList.length === 0 ? (
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
                No favorite jobs yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Save jobs you're interested in to see them here.
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
                    fontSize: { xs: "25px", sm: "32px" },
                    mt: { xs: 2, sm: 0 },
                    background:
                      "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Your Favorite Jobs
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Finding the perfect job can be challenging, but keeping track
                  of your top choices shouldn’t be. Your favorite jobs are
                  stored here so you can easily revisit them anytime. Whether
                  you're searching for your next big career move or simply
                  exploring opportunities, having a shortlist of saved jobs can
                  help you make informed decisions.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Keep track of jobs you love and easily apply when you're
                  ready.
                </Typography>
              </Box>

              {/* Stats Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 6,
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
                      {FavouriteList.length}
                    </Typography>
                    <Typography variant="subtitle1">
                      Saved Opportunities
                    </Typography>
                  </Box>
                  <MdFavorite size={48} color="rgba(255, 255, 255, 0.8)" />
                </Stack>
              </Paper>

              {/* Jobs Grid */}
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
                {FavouriteList.map((job: any, index: number) => (
                  <Paper
                    key={index}
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
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
                        <Typography variant="subtitle1" fontWeight={600}>
                          {job.companyName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {job.availabe_seats} opon positions
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
                          {job.jobType || "Onsite or remote"}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <MdAccessTime size={18} color="#757575" />
                        <Typography variant="body2" color="text.secondary">
                          Posted {getRelativeTime(job.createdAt)}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Actions */}
                    <Box sx={{ mt: "auto", display: "flex", gap: 2 }}>
                      <IconButton
                        onClick={() => {
                          ToggleFavourites(job);
                          toast.success("Removed from favorites");
                        }}
                        sx={{
                          color: "#ff4081",
                          "&:hover": {
                            backgroundColor: "rgba(255, 64, 129, 0.08)",
                          },
                        }}
                      >
                        <MdFavorite size={24} />
                      </IconButton>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          navigate("/job-detail", { state: { job } })
                        }
                        sx={{
                          borderRadius: "8px",
                          textTransform: "none",
                          fontWeight: 500,
                          background:
                            "linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)",
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default UserFavJobs;
