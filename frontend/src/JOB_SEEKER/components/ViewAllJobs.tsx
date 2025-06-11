import { useLocation, useNavigate } from "react-router-dom";
import UserSideBar from "./UserSideBar";

import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { getRelativeTime } from "./AllJobs";
import { drawerWidth } from "../pages/UserDashboard";
import { useFavourite } from "../zustand/useFavourite";
import toast from "react-hot-toast";

const ViewAllJobs = () => {
  const location = useLocation();
  const { ToggleFavourites } = useFavourite();

  const navigate = useNavigate();
  const data = location.state.jobs;

  return (
    <Box sx={{ display: "flex", pb: 2 }}>
      <UserSideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: { xs: 4, sm: 0 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          maxWidth: "100vw",
        }}
      >
        <Toolbar />
        <Container>
          <Typography
            variant="h5"
            color="secondary"
            fontWeight={"bold"}
            sx={{ pl: 1 }}
          >
            Browse Job Openings
          </Typography>

          <Typography
            sx={{ fontSize: { xs: "16px", sm: "20px" }, pl: 1, mt: 1 }}
            color="textPrimary"
          >
            Welcome to our job portal! Here, you can explore a wide range of job
            opportunities from top companies across various industries. Whether
            you're looking for your first job or a career change, this platform
            provides access to listings from companies looking for talented
            individuals like you.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "14px", sm: "16px" }, pl: 1, mt: 1, mb: 3 }}
            color="textSecondary"
          >
            Checkout and apply for the job that best suits your skills.
          </Typography>

          {/* FOR SMALL SCREENS... */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(1,fr)", sm: "repeat(3,1fr)" },

              gap: 3,
            }}
          >
            {data &&
              [...data]
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 4)
                ?.map((job: any, index: number) => (
                  <Box
                    key={index}
                    border={"1px solid #3333"}
                    p={2}
                    borderRadius={"7px"}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          p: 1,
                        }}
                      >
                        {job.companyLogo && (
                          <img
                            src={job.companyLogo}
                            style={{
                              width: "65px",
                              height: "65px",

                              borderRadius: "9px",
                            }}
                          />
                        )}
                        <Stack direction={"column"} gap={0.5}>
                          <Typography
                            sx={{ fontWeight: "bold", fontSize: "14px" }}
                          >
                            {job.companyName}
                          </Typography>
                          <Typography sx={{ fontSize: "14px" }}>
                            {job.description.length > 40
                              ? `${job.description.slice(0, 40)}...`
                              : job.description}
                          </Typography>
                          <Typography color="textSecondary" fontSize={"12px"}>
                            1-{job.availabe_seats} Employees
                          </Typography>
                        </Stack>
                      </Box>
                      <Stack
                        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
                        direction={"column"}
                        gap={1}
                        sx={{
                          p: 3,
                          pt: 1,
                          mt: 2,
                          borderRadius: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "16px", sm: "18px" },
                            alignItems: "center",
                          }}
                        >
                          <strong>Job Title: </strong>
                          {job.title}
                        </Typography>
                        <Box>
                          <Typography
                            sx={{ fontSize: { xs: "14px", sm: "18px" } }}
                            color="textSecondary"
                          >
                            {job.location}
                          </Typography>
                          <Typography
                            sx={{ fontSize: { xs: "14px", sm: "18px" } }}
                            color="textSecondary"
                          >
                            Onsite or remote .
                          </Typography>
                          <Typography
                            sx={{ fontSize: { xs: "12px", sm: "16px" } }}
                            color="textSecondary"
                          >
                            <strong>Posted:&nbsp;</strong>
                            {getRelativeTime(job.createdAt)}
                          </Typography>
                        </Box>
                        <Box display={"flex"} gap={1}>
                          <Button
                            onClick={() => {
                              ToggleFavourites(job);
                              toast.success("job is added to favourites");
                            }}
                            sx={{
                              maxWidth: "content",
                              p: 0,
                              border: "1px solid black",
                              color: "#000",
                              textTransform: "capitalize",
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() =>
                              navigate("/job-detail", { state: { job: job } })
                            }
                            sx={{
                              backgroundColor: "royalblue",
                              textTransform: "capitalize",
                              borderRadius: "5px",
                              color: "#fff",
                              flexGrow: 1,
                              width: "max-content",
                              fontSize: { xs: "14px", sm: "14px" },
                            }}
                          >
                            Learn more
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                    <Divider sx={{ border: "2px solid gray", my: 2 }} />
                  </Box>
                ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ViewAllJobs;
