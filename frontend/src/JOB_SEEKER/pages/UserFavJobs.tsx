import { useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import MainLayout from "../../components/MainLayout";
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
import { useFavourite } from "../zustand/useFavourite";
import toast from "react-hot-toast";
import {
  MdLocationOn,
  MdWorkOutline,
  MdAccessTime,
  MdFavorite,
} from "react-icons/md";
import { IoMdArrowForward } from "react-icons/io";

const UserFavJobs = () => {
  const { FavouriteList, ToggleFavourites } = useFavourite();
  const navigate = useNavigate();

  return (
    <MainLayout sidebar={<UserSideBar />}>
      <Toolbar />
      <Container
        maxWidth="lg"
        sx={{ py: 4, pt: 0, px: { xs: 2.5, sm: 4 } }}
      >
          {FavouriteList.length === 0 ? (
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
                  background: "linear-gradient(135deg, #f472b6, #8b5cf6)",
                  boxShadow: "0 10px 24px rgba(244, 114, 182, 0.3)",
                  color: "#fff",
                }}
              >
                <MdFavorite size={40} />
              </Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                No favorite jobs yet
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 420, mx: "auto" }}
              >
                Save jobs you're interested in to see them here.
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
                    fontSize: { xs: "25px", sm: "32px" },
                    mt: { xs: 2, sm: 0 },
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Your Favorite Jobs
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1, maxWidth: 720 }}
                >
                  Keep track of jobs you love and easily apply when you're ready.
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 5,
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)",
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
                    background: "rgba(255,255,255,0.12)",
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
                      {FavouriteList.length}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                      Saved Opportunities
                    </Typography>
                  </Box>
                  <MdFavorite size={48} color="rgba(255, 255, 255, 0.85)" />
                </Stack>
              </Paper>

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
                      {job.companyLogo && (
                        <Box
                          component="img"
                          src={job.companyLogo}
                          sx={{
                            width: "60px",
                            height: "60px",
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
                        <Typography variant="caption" color="text.secondary">
                          {job.availabe_seats} open positions
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

                    <Stack spacing={1} sx={{ mb: 3, mt: "auto" }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <MdLocationOn size={17} color="#6d28d9" />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <MdWorkOutline size={17} color="#6d28d9" />
                        <Typography variant="body2" color="text.secondary">
                          {job.jobType || "Onsite or remote"}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <MdAccessTime size={17} color="#6d28d9" />
                        <Typography variant="body2" color="text.secondary">
                          Posted {getRelativeTime(job.createdAt)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box sx={{ mt: "auto", display: "flex", gap: 1.5 }}>
                      <IconButton
                        onClick={() => {
                          ToggleFavourites(job);
                          toast.success("Removed from favorites");
                        }}
                        sx={{
                          color: "#ef4444",
                          bgcolor: "#fef2f2",
                          border: "1px solid #fecaca",
                          "&:hover": {
                            backgroundColor: "#fde8e8",
                          },
                        }}
                      >
                        <MdFavorite size={22} />
                      </IconButton>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          navigate("/job-detail", { state: { job } })
                        }
                        endIcon={<IoMdArrowForward />}
                        sx={{
                          borderRadius: "12px",
                          fontWeight: 700,
                          background:
                            "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #7c3aed, #4338ca)",
                          },
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
    </MainLayout>
  );
};

export default UserFavJobs;
