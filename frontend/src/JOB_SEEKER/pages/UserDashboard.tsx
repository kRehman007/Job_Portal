import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoLogoAppleAr } from "react-icons/io5";
import { useAppSelector } from "../../utils/useAppandDispatch";
import {
  Button,
  Container,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IoMdArrowForward } from "react-icons/io";
import Loader from "../components/Loader";
import UserSideBar from "../components/UserSideBar";
import {
  useGetAppliedJobsQuery,
  useGetUserProfileQuery,
} from "../Redux/API/JobsAPI";
import { useFavourite } from "../zustand/useFavourite";
import { URL } from "../../utils/URL";
import { useNavigate } from "react-router-dom";
import { checkProfileCompletion } from "../../utils/profile-Completion";
const AllJobs = React.lazy(() => import("../components/AllJobs"));

export const drawerWidth = 300;
export default function UserDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: UserProfile } = useGetUserProfileQuery();
  const profileScore = checkProfileCompletion(UserProfile);
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetAppliedJobsQuery();
  const { FavouriteList } = useFavourite();

  return (
    <Box sx={{ display: "flex", pb: 2 }}>
      <UserSideBar />
      <Box
        component="main"
        sx={{
          mt: { xs: 4, sm: 0 },

          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {/* DASHBOARD.... */}
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            maxWidth: "100vw",
          }}
        >
          <Typography
            fontWeight={"bold"}
            sx={{
              fontSize: { xs: "25px", sm: "32px" },
              mt: { xs: 2, sm: 0 },
              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
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
            sx={{ my: { xs: 1, sm: 2 } }}
          >
            Welcome to our job portal! Here, you can explore a wide range of job
            opportunities from top companies across various industries. Whether
            you're looking for your first job or a career change, this platform
            provides access to listings from companies looking for talented
            individuals like you.
            <Typography sx={{ mt: 0.5 }}>
              Here is your daily activities and job alerts
            </Typography>
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(1,1fr)", sm: "repeat(2,1fr)" },
              gap: 1,
              mt: 2,
            }}
          >
            <Box
              sx={{
                p: 3,
                display: "flex",

                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "10px",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                  {data?.length || 0}
                </Typography>
                <p>Applied Jobs</p>
              </Box>
              <IoLogoAppleAr style={{ fontSize: "36px" }} />
            </Box>
            <Box
              sx={{
                p: 3,
                display: "flex",
                background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "10px",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                  {FavouriteList.length || 0}
                </Typography>
                <p>Favourite Jobs</p>
              </Box>
              <IoLogoAppleAr style={{ fontSize: "36px" }} />
            </Box>
          </Box>
          {profileScore < 100 && (
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                display: "flex",
                position: "relative",
                minHeight: "140px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "space-between",
                borderRadius: "10px",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <img
                  src={
                    UserProfile?.profile?.profilePic ||
                    `https://avatar.iran.liara.run/public/boy?username=${
                      UserProfile?.fullName || "guest"
                    }`
                  }
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                />

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    sx={{ opacity: 0.9, color: "#fff" }}
                  >
                    Update your profile to increase visibility to recruiters. (
                    {profileScore}% complete)
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={profileScore}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      mt: 1,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        backgroundColor: "#4caf50",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Button
                onClick={() => navigate(`${URL.JOB_SEEKER.PROFILE}`)}
                sx={{
                  textTransform: "capitalize",
                  position: { xs: "absolute", md: "relative" },
                  right: 9,
                  bottom: 8,
                  px: { xs: 1, md: 3 },
                  display: "flex",
                  gap: 1,
                  borderRadius: "7px",
                  backgroundColor: "#fff",
                  fontSize: "12px",
                }}
              >
                Edit Profile
                <IoMdArrowForward style={{ fontSize: "12px" }} />
              </Button>
            </Box>
          )}

          <React.Suspense fallback={<Loader />}>
            <AllJobs />
          </React.Suspense>
        </Container>
      </Box>
    </Box>
  );
}
