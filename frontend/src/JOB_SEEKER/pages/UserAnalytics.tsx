import { Box, Container, Paper, Toolbar, Typography } from "@mui/material";
import UserSideBar from "../components/UserSideBar";
import MainLayout from "../../components/MainLayout";
import CustomBarChart from "../../charts/BarChart";
import CustomRadialBarChart from "../../charts/RadialBarChart";
import { FiBarChart2, FiPieChart } from "react-icons/fi";

const UserAnalytics = () => {
  return (
    <MainLayout sidebar={<UserSideBar />}>
      <Toolbar />

      <Container
        sx={{
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
            }}
          >
            Job Analytics Dashboard
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, mt: 1, maxWidth: 760 }}
          >
            Gain insights into your job search — monthly posting trends and a
            live overview of your application outcomes.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 4,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: "18px",
                border: "1px solid #e2e8f0",
                background: "#fff",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  <FiBarChart2 size={20} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="#1e293b">
                    Monthly Job Posting Trends
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Number of jobs posted each month
                  </Typography>
                </Box>
              </Box>

              <CustomBarChart />
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: "18px",
                border: "1px solid #e2e8f0",
                background: "#fff",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f472b6, #8b5cf6)",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  <FiPieChart size={20} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="#1e293b">
                    Job Application Status
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Applied, favourite, pending, accepted & rejected
                  </Typography>
                </Box>
              </Box>

              <CustomRadialBarChart />
            </Paper>
          </Box>
      </Container>
    </MainLayout>
  );
};

export default UserAnalytics;
