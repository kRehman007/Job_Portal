import { Box, Container, Toolbar, Typography } from "@mui/material";
import UserSideBar from "../components/UserSideBar";
import { drawerWidth } from "./UserDashboard";
import CustomBarChart from "../../charts/BarChart";
import CustomRadialBarChart from "../../charts/RadialBarChart";

const UserAnalytics = () => {
  return (
    <Box sx={{ display: "flex", pb: 2, width: "100%", overflow: "hidden" }}>
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

        {/* Container... */}
        <Container
          sx={{
            maxWidth: "100vw",
          }}
        >
          {/* Page Introduction */}
          <Typography
            color="secondary"
            fontWeight={"bold"}
            sx={{
              fontSize: { xs: "25px", sm: "32px" },
              mt: { xs: 2, sm: 0 },
              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Job Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Tracking job applications is crucial for understanding job trends
            and user engagement. This dashboard provides insights into job
            postings, user applications, and preferences. The visual charts
            below illustrate the number of jobs posted each month, the status of
            job applications, and users' favorite job listings. By analyzing
            these metrics, users can track their job search progress, identify
            trends, and make informed career decisions.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: { xs: "center", lg: "space-between" },
              alignItems: "center",
              gap: 5,
              mt: 4,
            }}
          >
            {/* BARCHART... */}
            <Box sx={{ textAlign: "center", mt: { xs: 3, lg: 0.5 }, p: 2 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  background:
                    "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Monthly Job Posting Trends
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                This bar chart represents the number of jobs posted each month,
                giving a clear overview of job availability trends throughout
                the year.
              </Typography>

              <CustomBarChart />
            </Box>

            {/* RADIAL BARCHART... */}
            <Box sx={{ p: 2, textAlign: "center", mt: -3 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  background:
                    "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Job Application Status Overview
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ px: 2 }}>
                This radial bar chart provides an overview of job applications,
                displaying the number of applied and favourites jobs and
                pending, accepted, and rejected applications.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomRadialBarChart />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UserAnalytics;
