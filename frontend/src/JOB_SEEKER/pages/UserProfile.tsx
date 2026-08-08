// import {
//   Avatar,
//   Box,
//   Button,
//   Chip,
//   Container,
//   Stack,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import UserSideBar from "../components/UserSideBar";
// import { drawerWidth } from "./UserDashboard";
// import { CiEdit } from "react-icons/ci";
// import React from "react";
// import EditModalopen from "../components/modals/EditEmail";
// import { useGetUserProfileQuery } from "../Redux/API/JobsAPI";
// import Loader from "../components/Loader";
// import { FaUserTie } from "react-icons/fa";
// import { FaFileSignature } from "react-icons/fa";
// import { GrUserExpert } from "react-icons/gr";
// import { CiTextAlignJustify } from "react-icons/ci";
// import { MdDownload } from "react-icons/md";

// const UserProfile = () => {
//   const { data, isLoading } = useGetUserProfileQuery();
//   console.log("data", data);
//   const [Editopen, setEditOpen] = React.useState(false);
//   const handleEditModalOpen = () => setEditOpen(true);
//   const handleEditModalClose = () => setEditOpen(false);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         pb: 2,
//       }}
//     >
//       <UserSideBar />
//       <Stack direction={"column"}>
//         <Box
//           component="main"
//           sx={{
//             mt: { xs: 4, sm: 0 },
//             flexGrow: 1,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             maxWidth: "800px",
//             justifyContent: "center",
//           }}
//         >
//           <Container>
//             <Toolbar />
//             <Typography
//               variant="h5"
//               color="secondary"
//               sx={{ pl: 1 }}
//               fontWeight={"bold"}
//             >
//               Your Profile
//             </Typography>
//             <Typography color="textSecondary" sx={{ pl: 1 }}>
//               Complete your profile because it will be shared to hiring person
//               whenever you'll apply for a job
//             </Typography>

//             {/* Profile Pic and Email... */}
//             <Stack direction={"column"} my={"35px"}>
//               <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
//                 <Avatar
//                   src={data?.profile?.profilePic || "/default-avatar.jpg"}
//                   sx={{ width: 70, height: 70 }}
//                 />

//                 <Stack direction={"column"}>
//                   <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
//                     {data?.fullName}
//                   </Typography>
//                   <Typography sx={{ fontSize: "14px", mt: -0.5 }} color="gray">
//                     {data?.email}
//                   </Typography>
//                   <Typography
//                     sx={{ fontSize: "14px", fontWeight: "bold" }}
//                     color="textSecondary"
//                   >
//                     {data?.profile?.phoneNumber || ""}
//                   </Typography>
//                 </Stack>
//               </Box>
//               <Box
//                 display={"flex"}
//                 alignItems={"center"}
//                 gap={"7px"}
//                 sx={{ mt: 1, mb: -2 }}
//                 width={"100%"}
//                 paddingRight={"4px"}
//                 justifyContent={"flex-end"}
//                 onClick={handleEditModalOpen}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     textTransform: "capitalize",
//                     fontSize: { xs: "12px", sm: "14px" },
//                   }}
//                 >
//                   Edit Profile
//                 </Button>
//                 <CiEdit style={{ fontSize: "22px" }} />
//               </Box>
//             </Stack>

//             {/* Tagline... */}
//             <Typography sx={{ fontSize: "20px" }} color="textSecondary">
//               {data?.profile?.tagline}
//             </Typography>
//             {data?.profile?.experience > 0 && (
//               <Typography component="h1" fontWeight={"bold"}>
//                 {data?.profile?.experience} years of Experience
//               </Typography>
//             )}

//             {/* Resume Section... */}
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 0.5,
//                 alignItems: "center",
//                 mb: 1,
//                 mt: "35px",
//               }}
//             >
//               <Typography
//                 sx={{ fontSize: "22px", fontWeight: "bold" }}
//                 color="secondary"
//               >
//                 Resume
//               </Typography>
//               <FaFileSignature
//                 style={{
//                   fontSize: "20px",
//                   paddingRight: 5,
//                 }}
//               />
//             </Box>
//             {data?.profile?.resume ? (
//               <Stack direction={"column"} gap={"5px"} mt={-1}>
//                 <Typography color="textSecondary">
//                   Below is my resume, which highlights my skills, experience,
//                   and achievements. Feel free to review it to learn more about
//                   my professional background.
//                 </Typography>
//                 <Box
//                   display={"flex"}
//                   alignItems={"center"}
//                   gap={1}
//                   bgcolor={"green"}
//                   width={"max-content"}
//                   px={1}
//                   py={0.5}
//                   color={"#fff"}
//                   borderRadius={"4px"}
//                   component="a"
//                   href={data.profile.resume}
//                   download
//                   style={{ cursor: "pointer" }}
//                 >
//                   <Typography>Download</Typography>
//                   <Typography>
//                     <MdDownload style={{ fontSize: "20px" }} />
//                   </Typography>
//                 </Box>
//               </Stack>
//             ) : (
//               <Typography color="textSecondary">
//                 Upload your resume to showcase your skills and experience,
//                 making it easier for employers to discover you. A
//                 well-structured profile increases your chances of landing your
//                 desired job!
//               </Typography>
//             )}

//             {/* SKILLS... */}
//             {data?.profile?.skills?.length > 0 && (
//               <Stack direction={"column"} my={"35px"}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     gap: 1,
//                     alignItems: "center",
//                     mt: 1,
//                   }}
//                 >
//                   <Typography
//                     sx={{ fontSize: "22px", fontWeight: "bold" }}
//                     color="secondary"
//                   >
//                     Expertise
//                   </Typography>
//                   <GrUserExpert
//                     style={{
//                       fontSize: "20px",
//                       paddingRight: 5,
//                     }}
//                   />
//                 </Box>
//                 {data?.profile?.skills.length > 6 ? (
//                   <Box
//                     sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}
//                   >
//                     {data?.profile?.skills.map(
//                       (skill: string, index: number) => (
//                         <Chip
//                           key={index}
//                           label={skill}
//                           color="primary"
//                           variant="outlined"
//                         />
//                       )
//                     )}
//                   </Box>
//                 ) : (
//                   data?.profile?.skills.map((skill: string, index: number) => (
//                     <Box
//                       key={index}
//                       display="flex"
//                       gap="7px"
//                       alignItems="center"
//                     >
//                       <CiTextAlignJustify style={{ fontSize: "11px" }} />
//                       <Typography color="textSecondary">{skill}</Typography>
//                     </Box>
//                   ))
//                 )}
//               </Stack>
//             )}
//           </Container>
//         </Box>
//         <Container sx={{ width: "100%" }}>
//           {/* COVER LETTER... */}

//           <Box
//             sx={{
//               display: "flex",
//               gap: 1,
//               alignItems: "center",
//               mt: 4,
//             }}
//           >
//             <Typography
//               sx={{ fontSize: "22px", fontWeight: "bold" }}
//               color="secondary"
//             >
//               Who I am
//             </Typography>
//             <FaUserTie
//               style={{
//                 fontSize: "20px",
//                 paddingRight: 5,
//               }}
//             />
//           </Box>
//           {data?.profile?.bio ? (
//             <Typography color="textSecondary">{data?.profile?.bio}</Typography>
//           ) : (
//             <Typography color="textSecondary">
//               Share your story, skills, and experience to make a lasting
//               impression. A well-crafted bio helps employers and recruiters
//               understand your strengths and career goals.
//             </Typography>
//           )}
//         </Container>
//       </Stack>

//       <EditModalopen
//         handleEditModalClose={handleEditModalClose}
//         Editopen={Editopen}
//       />
//     </Box>
//   );
// };

// export default UserProfile;

import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UserSideBar from "../components/UserSideBar";
import { drawerWidth } from "./UserDashboard";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import EditModalopen from "../components/modals/EditEmail";
import { useGetUserProfileQuery } from "../Redux/API/JobsAPI";
import Loader from "../components/Loader";
import { FaUserTie, FaFileSignature, FaDownload } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { MdWork, MdEmail, MdPhone } from "react-icons/md";
import ProfileModal from "../components/modals/ProfileModal";

const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading } = useGetUserProfileQuery();
  const [Editopen, setEditOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const handleEditModalOpen = () => setEditOpen(true);
  const handleEditModalClose = () => setEditOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) {
    return <Loader />;
  }

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
        <Container
          maxWidth="md"
          sx={{
            py: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* Header Section */}

          <Typography
            fontWeight={"bold"}
            sx={{
              mb: 0,
              fontSize: { xs: "25px", sm: "32px" },
              mt: { xs: 2, sm: 0 },
              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Professional Profile
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 3 } }}
          >
            Complete your profile to increase visibility to recruiters
          </Typography>

          {/* Profile Card */}

          <Paper
            elevation={isMobile ? 1 : 3}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              mb: 3,
              background: "white",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                boxShadow: isMobile ? 1 : 6,
                transition: "box-shadow 0.3s ease",
              },
            }}
          >
            {/* Profile Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                alignItems: { xs: "center", md: "flex-start" },
                position: "relative",
                pb: { xs: 4, md: 0 },
              }}
            >
              {/* Profile Image */}
              <Box
                sx={{
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setImageURL(
                    data?.profile?.profilePic ||
                      `https://avatar.iran.liara.run/public/boy?username=${data?.fullName}`
                  );
                  setProfileModal(true);
                }}
              >
                <img
                  src={
                    data?.profile?.profilePic ||
                    `https://avatar.iran.liara.run/public/boy?username=${data?.fullName}`
                  }
                  alt="Profile"
                  className="w-20 h-20 object-fill rounded-full border-1 border-blue-500"
                />
              </Box>

              {/* Profile Details */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* Name and Tagline */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      lineHeight: 1.2,
                      mb: 0.5,
                    }}
                  >
                    {data?.fullName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      fontStyle: data?.profile?.tagline ? "inherit" : "italic",
                    }}
                  >
                    {data?.profile?.tagline ||
                      "Professional seeking opportunities"}
                  </Typography>
                </Box>

                {/* Contact Info */}
                <Stack
                  direction="column"
                  spacing={1.5}
                  sx={{
                    "& > div": {
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    },
                  }}
                >
                  <Box>
                    <MdEmail
                      size={20}
                      color="#3f51b5"
                      style={{ flexShrink: 0 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        wordBreak: "break-word",
                      }}
                    >
                      {data?.email}
                    </Typography>
                  </Box>

                  {data?.profile?.phoneNumber && (
                    <Box>
                      <MdPhone
                        size={20}
                        color="#3f51b5"
                        style={{ flexShrink: 0 }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                        }}
                      >
                        {data?.profile?.phoneNumber}
                      </Typography>
                    </Box>
                  )}

                  {data?.profile?.experience > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        icon={<MdWork color="#1976d2" />}
                        label={`${data.profile.experience} ${
                          data.profile.experience === 1 ? "year" : "years"
                        } of experience`}
                        sx={{
                          bgcolor: "rgba(25, 118, 210, 0.08)",
                          color: "primary.main",
                          fontWeight: 600,
                          height: "auto",
                          py: 1,
                          "& .MuiChip-icon": {
                            ml: 0.5,
                            mr: -0.5,
                          },
                        }}
                        size={isMobile ? "small" : "medium"}
                      />
                    </Box>
                  )}
                </Stack>
              </Box>

              {/* Edit Button - Positioned differently based on screen size */}
              <Button
                variant="contained"
                color="primary"
                startIcon={<CiEdit size={20} />}
                onClick={handleEditModalOpen}
                sx={{
                  position: { xs: "absolute", md: "relative" },

                  bottom: 0,
                  right: 0,

                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>

          {/* Resume Section */}

          <Paper
            elevation={isMobile ? 1 : 3}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              mb: { xs: 3, sm: 4 },
              background: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: { xs: 1, sm: 2 },
              }}
            >
              <FaFileSignature color="#4caf50" size={isMobile ? 20 : 24} />
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
                Resume
              </Typography>
            </Box>

            {data?.profile?.resume ? (
              <>
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  color="text.secondary"
                  sx={{ mb: { xs: 1, sm: 2 } }}
                >
                  Below is my professional resume
                </Typography>

                <Button
                  variant="contained"
                  color="success"
                  startIcon={<FaDownload size={isMobile ? 16 : 20} />}
                  href={data.profile.resume}
                  download
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  Download Resume
                </Button>
              </>
            ) : (
              <Typography
                variant={isMobile ? "body2" : "body1"}
                color="text.secondary"
              >
                Upload your resume to showcase your skills
              </Typography>
            )}
          </Paper>

          {/* Skills Section */}
          {data?.profile?.skills?.length > 0 && (
            <Paper
              elevation={isMobile ? 1 : 3}
              sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 3,
                mb: { xs: 3, sm: 4 },
                background: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: { xs: 1, sm: 2 },
                }}
              >
                <GrUserExpert color="#ff9800" size={isMobile ? 20 : 24} />
                <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
                  Skills & Expertise
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {data?.profile?.skills.map((skill: string, index: number) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="primary"
                    variant="filled"
                    sx={{
                      borderRadius: 1,
                      fontWeight: 500,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          )}

          {/* Bio Section */}

          <Paper
            elevation={isMobile ? 1 : 3}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              background: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: { xs: 1, sm: 2 },
              }}
            >
              <FaUserTie color="#9c27b0" size={isMobile ? 20 : 24} />
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
                About Me
              </Typography>
            </Box>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              color="text.secondary"
              sx={{ whiteSpace: "pre-line" }}
            >
              {data?.profile?.bio ||
                "Share your professional story and career aspirations"}
            </Typography>
          </Paper>
        </Container>
      </Box>

      <EditModalopen
        handleEditModalClose={handleEditModalClose}
        Editopen={Editopen}
      />

      <ProfileModal
        profileModal={profileModal}
        imageURL={imageURL}
        setImageURL={setImageURL}
        setProfileModal={setProfileModal}
      />
    </Box>
  );
};

export default UserProfile;
