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
import MainLayout from "../../components/MainLayout";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import EditModalopen from "../components/modals/EditEmail";
import { useGetUserProfileQuery } from "../Redux/API/JobsAPI";
import Loader from "../components/Loader";
import { FaUserTie, FaFileSignature, FaDownload } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { MdWork, MdEmail, MdPhone, MdVisibility } from "react-icons/md";
import { openResume, getResumeDownloadUrl } from "../../utils/resume";
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
    <MainLayout sidebar={<UserSideBar />}>
      <Toolbar />
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3 },
        }}
      >
          <Typography
            fontWeight={800}
            sx={{
              mb: 0.5,
              fontSize: { xs: "25px", sm: "32px" },
              mt: { xs: 2, sm: 0 },
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
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

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: "18px",
              mb: 3,
              background: "white",
              border: "1px solid #e2e8f0",
              position: "relative",
              overflow: "hidden",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 12px 32px rgba(30,41,59,0.08)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background:
                  "linear-gradient(90deg, #7c3aed, #4f46e5, #0ea5e9)",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                alignItems: { xs: "center", md: "flex-start" },
                position: "relative",
                pb: { xs: 4, md: 0 },
                mt: { xs: 1, md: 0 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  flexShrink: 0,
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
                  className="w-24 h-24 object-cover rounded-full"
                  style={{
                    border: "3px solid #e9d5ff",
                    boxShadow: "0 8px 20px rgba(139, 92, 246, 0.25)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "13px",
                    border: "2px solid #fff",
                  }}
                >
                  <CiEdit size={15} />
                </Box>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{
                      fontSize: { xs: "1.3rem", sm: "1.55rem" },
                      lineHeight: 1.2,
                      mb: 0.5,
                      color: "#1e293b",
                    }}
                  >
                    {data?.fullName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      fontStyle: data?.profile?.tagline ? "inherit" : "italic",
                    }}
                  >
                    {data?.profile?.tagline ||
                      "Professional seeking opportunities"}
                  </Typography>
                </Box>

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
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        bgcolor: "#eef2ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4f46e5",
                        flexShrink: 0,
                      }}
                    >
                      <MdEmail size={18} />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        wordBreak: "break-word",
                        color: "#475569",
                      }}
                    >
                      {data?.email}
                    </Typography>
                  </Box>

                  {data?.profile?.phoneNumber && (
                    <Box>
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: "10px",
                          bgcolor: "#eef2ff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#4f46e5",
                          flexShrink: 0,
                        }}
                      >
                        <MdPhone size={18} />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          color: "#475569",
                        }}
                      >
                        {data?.profile?.phoneNumber}
                      </Typography>
                    </Box>
                  )}

                  {data?.profile?.experience > 0 && (
                    <Box sx={{ mt: 0.5 }}>
                      <Chip
                        icon={<MdWork color="#6d28d9" />}
                        label={`${data.profile.experience} ${
                          data.profile.experience === 1 ? "year" : "years"
                        } of experience`}
                        sx={{
                          bgcolor: "#f5f3ff",
                          color: "#6d28d9",
                          fontWeight: 700,
                          height: "auto",
                          py: 1,
                          borderRadius: "10px",
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

              <Button
                variant="contained"
                color="primary"
                startIcon={<CiEdit size={20} />}
                onClick={handleEditModalOpen}
                sx={{
                  position: { xs: "absolute", md: "relative" },
                  bottom: 0,
                  right: 0,
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  px: { xs: 2, sm: 3 },
                  py: 1.1,
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 6px 16px rgba(99, 102, 241, 0.35)",
                  "&:hover": {
                    boxShadow: "0 8px 20px rgba(99, 102, 241, 0.45)",
                    transform: "translateY(-2px)",
                    background: "linear-gradient(135deg, #7c3aed, #4338ca)",
                  },
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: "18px",
              mb: { xs: 3, sm: 4 },
              background: "white",
              border: "1px solid #e2e8f0",
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
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#fff",
                }}
              >
                <FaFileSignature size={isMobile ? 18 : 20} />
              </Box>
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700} color="#1e293b">
                Resume
              </Typography>
            </Box>

            {data?.profile?.resume ? (
              <>
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  color="text.secondary"
                  sx={{ mb: { xs: 1.5, sm: 2 } }}
                >
                  Below is my professional resume
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <Button
                    variant="outlined"
                    startIcon={<MdVisibility size={isMobile ? 16 : 20} />}
                    onClick={() => openResume(data.profile.resume)}
                    sx={{
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      color: "#6d28d9",
                      borderColor: "#c4b5fd",
                      "&:hover": {
                        borderColor: "#6d28d9",
                        bgcolor: "#f5f3ff",
                      },
                    }}
                  >
                    View Resume
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<FaDownload size={isMobile ? 16 : 20} />}
                    href={getResumeDownloadUrl(data.profile.resume)}
                    download
                    sx={{
                      borderRadius: "12px",
                      fontWeight: 700,
                      fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      boxShadow: "0 6px 16px rgba(34, 197, 94, 0.3)",
                      "&:hover": { background: "linear-gradient(135deg, #22c55e, #15803d)" },
                    }}
                  >
                    Download Resume
                  </Button>
                </Stack>
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

          {data?.profile?.skills?.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: "18px",
                mb: { xs: 3, sm: 4 },
                background: "white",
                border: "1px solid #e2e8f0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: { xs: 1.5, sm: 2 },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "#fff",
                  }}
                >
                  <GrUserExpert size={isMobile ? 18 : 20} />
                </Box>
                <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700} color="#1e293b">
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
                    sx={{
                      borderRadius: "10px",
                      bgcolor: "#f5f3ff",
                      color: "#6d28d9",
                      border: "1px solid #ddd6fe",
                      fontWeight: 600,
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      "&:hover": { bgcolor: "#ede9fe" },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          )}

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: "18px",
              background: "white",
              border: "1px solid #e2e8f0",
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
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #a855f7, #8b5cf6)",
                  color: "#fff",
                }}
              >
                <FaUserTie size={isMobile ? 18 : 20} />
              </Box>
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700} color="#1e293b">
                About Me
              </Typography>
            </Box>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              color="text.secondary"
              sx={{ whiteSpace: "pre-line", color: "#475569" }}
            >
              {data?.profile?.bio ||
                "Share your professional story and career aspirations"}
            </Typography>
          </Paper>
      </Container>

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
    </MainLayout>
  );
};

export default UserProfile;
