import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../utils/useAppandDispatch";
import {
  Button,
  Container,
  LinearProgress,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { IoMdArrowForward } from "react-icons/io";
import Loader from "../components/Loader";
import UserSideBar from "../components/UserSideBar";
import MainLayout from "../../components/MainLayout";
import {
  useGetAppliedJobsQuery,
  useGetUserProfileQuery,
} from "../Redux/API/JobsAPI";
import { useFavourite } from "../zustand/useFavourite";
import { URL } from "../../utils/URL";
import { useNavigate } from "react-router-dom";
import { checkProfileCompletion } from "../../utils/profile-Completion";
import { MdWorkOutline, MdFavoriteBorder } from "react-icons/md";
const AllJobs = React.lazy(() => import("../components/AllJobs"));

export default function UserDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: UserProfile } = useGetUserProfileQuery();
  const profileScore = checkProfileCompletion(UserProfile);
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetAppliedJobsQuery();
  const { FavouriteList } = useFavourite();

  const stats = [
    {
      value: data?.length || 0,
      label: "Applied Jobs",
      icon: <MdWorkOutline style={{ fontSize: "30px" }} />,
      gradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
      glow: "rgba(124, 58, 237, 0.35)",
    },
    {
      value: FavouriteList.length || 0,
      label: "Favourite Jobs",
      icon: <MdFavoriteBorder style={{ fontSize: "30px" }} />,
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
      glow: "rgba(14, 165, 233, 0.35)",
    },
  ];

  return (
    <MainLayout sidebar={<UserSideBar />}>
      <Toolbar />

      <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            maxWidth: "100vw",
            px: { xs: 2.5, sm: 4 },
          }}
        >
          <Typography
            fontWeight={800}
            sx={{
              fontSize: { xs: "25px", sm: "32px" },
              mt: { xs: 2, sm: 0 },
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            Welcome back, {user?.fullName}!
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ my: { xs: 1.5, sm: 2 }, maxWidth: 760 }}
          >
            Here is an overview of your job search activity. Explore new
            opportunities, track your applications, and stay one step closer to
            your dream role.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1,1fr)",
                sm: "repeat(2,1fr)",
              },
              gap: 2.5,
              mt: 2,
            }}
          >
            {stats.map((stat, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: "18px",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: `0 12px 28px ${stat.glow}`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    background: stat.gradient,
                    boxShadow: `0 8px 18px ${stat.glow}`,
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "30px",
                      fontWeight: 800,
                      color: "#1e293b",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: "15px" }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {profileScore < 100 && (
            <Box
              sx={{
                p: { xs: 2.5, sm: 3 },
                display: "flex",
                position: "relative",
                minHeight: "140px",
                background:
                  "linear-gradient(135deg, #7c3aed 0%, #4f46e5 60%, #0ea5e9 120%)",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "space-between",
                borderRadius: "18px",
                mt: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: -40,
                  top: -40,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 40,
                  bottom: -60,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", zIndex: 1 }}>
                <img
                  src={
                    UserProfile?.profile?.profilePic ||
                    `https://avatar.iran.liara.run/public/boy?username=${
                      UserProfile?.fullName || "guest"
                    }`
                  }
                  alt="profile"
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                  style={{
                    border: "3px solid rgba(255,255,255,0.4)",
                    objectFit: "cover",
                  }}
                />

                <Box>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    sx={{ color: "#fff", fontWeight: 500 }}
                  >
                    Update your profile to increase visibility to recruiters.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1.5,
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={profileScore}
                      sx={{
                        width: { xs: 140, sm: 220 },
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          backgroundColor: "#4ade80",
                        },
                      }}
                    />
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}
                    >
                      {profileScore}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Button
                onClick={() => navigate(`${URL.JOB_SEEKER.PROFILE}`)}
                sx={{
                  textTransform: "capitalize",
                  position: { xs: "absolute", md: "relative" },
                  right: 14,
                  bottom: 12,
                  px: { xs: 1.5, md: 3 },
                  display: "flex",
                  gap: 1,
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  color: "#6d28d9",
                  fontWeight: 700,
                  fontSize: "13px",
                  zIndex: 1,
                  "&:hover": { backgroundColor: "#f5f3ff" },
                }}
              >
                Edit Profile
                <IoMdArrowForward style={{ fontSize: "14px" }} />
              </Button>
            </Box>
          )}

          <React.Suspense fallback={<Loader />}>
            <AllJobs />
          </React.Suspense>
      </Container>
    </MainLayout>
  );
}
