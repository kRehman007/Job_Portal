import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Toolbar,
  Chip,
  Grid,
  Stack,
  Modal,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import {
  useGetAllApplicantsQuery,
  useUpdateApplicationStatusMutation,
} from "../../JOB_SEEKER/Redux/API/JobsAPI";
import { drawerWidth } from "./EmployerDashboard";
import EmployerSideBar from "../components/EmployerSideBar";
import Loader from "../../JOB_SEEKER/components/Loader";
import { useState } from "react";
import toast from "react-hot-toast";
import ProfileModal from "../../JOB_SEEKER/components/modals/ProfileModal";

const ViewAllApplicants = () => {
  const [loadingStates, setLoadingStates] = useState<Record<number, 'approving' | 'rejecting' | null>>({});
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [openModal, setOpenModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [modalContent, setModalContent] = useState("");
  const location = useLocation();
  const id = location.state.job.id;
  const { data, isLoading, error } = useGetAllApplicantsQuery({ id });
  const displayedApplicants = data?.slice(startIndex, endIndex);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Typography color="textSecondary">
        No Applicant applied for this post yet
      </Typography>
    );
  }

  async function handleApplicationStatus(id: number, status: 'approved' | 'rejected') {
    setLoadingStates(prev => ({ ...prev, [id]: status === 'approved' ? 'approving' : 'rejecting' }));
    
    try {
      await updateApplicationStatus({ id, data: status }).unwrap();
      toast.success(`Application ${status} successfully`);
    } catch (error: any) {
      console.log("error in updating status", error.message);
      toast.error("Oops..!! something went wrong");
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: null }));
    }
  }

  return (
    <Box sx={{ display: "flex", pb: 2 }}>
      <EmployerSideBar />
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          maxWidth: "100vw",
        }}
      >
        <Toolbar />
        {data?.length > 0 ? (
          <Box className="container mx-auto px-4 py-6">
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
              Job Applicants
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ my: { xs: 1, sm: 2 } }}
            >
              Here, you can view all the talented professionals who have applied
              for your job postings. Each applicant brings unique skills,
              experiences, and a passion for their field.
              <Typography sx={{ mt: 0.5 }}>
                Stay organized and make informed hiring decisions effortlessly!
              </Typography>
            </Typography>

            <Grid container spacing={3} mt={2}>
              {displayedApplicants?.map((applicant: any) => (
                <Grid item xs={12} md={6} key={applicant.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Profile Section */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        mb={2}
                      >
                        <Box
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setImageURL(
                              applicant?.user.profile?.profilePic ||
                                `https://avatar.iran.liara.run/public/boy?username=${applicant?.user.fullName}`
                            );
                            setProfileModal(true);
                          }}
                        >
                          <img
                            src={
                              applicant?.user.profile?.profilePic ||
                              `https://avatar.iran.liara.run/public/boy?username=${applicant?.user.fullName}`
                            }
                            alt={applicant.user.fullName}
                            className="w-16 h-16 object-fill rounded-full"
                          />
                        </Box>

                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {applicant.user?.fullName || ""}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {applicant.user?.email || ""}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {applicant.user?.profile?.phoneNumber || ""}
                          </Typography>
                        </Box>
                      </Stack>

                      {applicant.user?.profile === null ? (
                        <Typography>User hasn't set his profile</Typography>
                      ) : (
                        <>
                          {/* Tagline */}
                          {applicant?.user?.profile?.tagline && (
                            <Typography
                              variant="body1"
                              fontStyle="italic"
                              color="text.secondary"
                              mb={2}
                            >
                              "{applicant.user?.profile?.tagline}"
                            </Typography>
                          )}

                          {/* Skills */}
                          {applicant.user?.profile?.skills?.length > 0 && (
                            <Box mb={2}>
                              <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                mb={1}
                              >
                                SkillSet:
                              </Typography>
                              <Stack direction="row" flexWrap="wrap" gap={1}>
                                {applicant.user.profile.skills.map(
                                  (skill: string, index: number) => (
                                    <Chip
                                      key={index}
                                      label={skill}
                                      color="primary"
                                      size="small"
                                    />
                                  )
                                )}
                              </Stack>
                            </Box>
                          )}

                          {/* Bio */}
                          {applicant.user?.profile?.bio && (
                            <Box mb={2}>
                              <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                mb={1}
                              >
                                Cover Letter:
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {applicant.user?.profile?.bio.substring(0, 130)}
                                ...
                                {applicant.user?.profile?.bio.length > 130 && (
                                  <Button
                                    size="small"
                                    sx={{
                                      textTransform: "none",
                                      p: 0,
                                      ml: 0.5,
                                      minWidth: "auto",
                                      color: "primary.main",
                                    }}
                                    onClick={() => {
                                      setModalContent(
                                        applicant.user?.profile?.bio
                                      );
                                      setOpenModal(true);
                                    }}
                                  >
                                    Read More
                                  </Button>
                                )}
                              </Typography>
                            </Box>
                          )}

                          {/* Resume Button */}
                          {applicant?.user?.profile?.resume && (
                            <Button
                              variant="outlined"
                              sx={{ textTransform: "capitalize", mb: 2 }}
                              color="primary"
                              href={applicant.user.profile.resume}
                              target="_blank"
                              size="small"
                            >
                              View Resume
                            </Button>
                          )}
                        </>
                      )}
                    </CardContent>

                    {/* Action Buttons */}
                    <Box sx={{ p: 2, pt: 0 }}>
                      {applicant.status === "pending" ? (
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            sx={{ textTransform: "capitalize" }}
                            color="success"
                            disabled={loadingStates[applicant.id] === 'approving' || loadingStates[applicant.id] === 'rejecting'}
                            fullWidth
                            onClick={() =>
                              handleApplicationStatus(applicant.id, "approved")
                            }
                          >
                            {loadingStates[applicant.id] === 'approving' ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "Approve"
                            )}
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ textTransform: "capitalize" }}
                            disabled={loadingStates[applicant.id] === 'rejecting' || loadingStates[applicant.id] === 'approving'}
                            fullWidth
                            onClick={() =>
                              handleApplicationStatus(applicant.id, "rejected")
                            }
                          >
                            {loadingStates[applicant.id] === 'rejecting' ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "Reject"
                            )}
                          </Button>
                        </Stack>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{ textTransform: "capitalize" }}
                          color={
                            applicant.status === "approved"
                              ? "success"
                              : "error"
                          }
                          disabled
                          fullWidth
                        >
                          {applicant.status === "approved"
                            ? "Accepted"
                            : "Rejected"}
                        </Button>
                      )}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {data?.length > itemsPerPage && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={Math.ceil(data.length / itemsPerPage)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </Box>
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            mt={4}
          >
            No applicants have applied for this position yet.
          </Typography>
        )}

        {/* Bio Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "600px" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 0,
              borderRadius: 3,
              maxHeight: "90vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header with gradient background */}
            <Box
              sx={{
                background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                p: 3,
                color: "white",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5" fontWeight="bold">
                  Applicant's Profile
                </Typography>
                <Button
                  onClick={() => setOpenModal(false)}
                  size="small"
                  sx={{
                    color: "white",
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <AiOutlineClose size={20} />
                </Button>
              </Stack>
              {displayedApplicants?.find(
                (a: any) => a.user?.profile?.bio === modalContent
              ) && (
                <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid white",
                    }}
                  >
                    <img
                      src={
                        displayedApplicants.find(
                          (a: any) => a.user?.profile?.bio === modalContent
                        )?.user.profile?.profilePic ||
                        `https://avatar.iran.liara.run/public/boy?username=${
                          displayedApplicants.find(
                            (a: any) => a.user?.profile?.bio === modalContent
                          )?.user.fullName
                        }`
                      }
                      alt="Profile"
                      className="w-16 h-16 object-fill rounded-full"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {
                        displayedApplicants.find(
                          (a: any) => a.user?.profile?.bio === modalContent
                        )?.user.fullName
                      }
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {
                        displayedApplicants.find(
                          (a: any) => a.user?.profile?.bio === modalContent
                        )?.user.email
                      }
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Box>

            {/* Content with subtle pattern */}
            <Box
              sx={{
                p: 3,
                flex: 1,
                overflowY: "auto",
                backgroundImage:
                  "radial-gradient(#e0e0e0 1px, transparent 1px)",
                backgroundSize: "15px 15px",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "primary.main",
                    borderRadius: "50%",
                    mr: 1.5,
                  }}
                />
                Cover Letter
              </Typography>

              <Box
                sx={{
                  backgroundColor: "white",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                    "&::first-letter": {
                      initialLetter: 2,
                      fontWeight: "bold",
                      color: "primary.main",
                      mr: 0.5,
                    },
                  }}
                >
                  {modalContent}
                </Typography>
              </Box>

              {/* Skills section if available */}
              {displayedApplicants?.find(
                (a: any) => a.user?.profile?.bio === modalContent
              )?.user?.profile?.skills?.length > 0 && (
                <Box mt={3}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor: "primary.main",
                        borderRadius: "50%",
                        mr: 1.5,
                      }}
                    />
                    Key Skills
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {displayedApplicants
                      .find((a: any) => a.user?.profile?.bio === modalContent)
                      ?.user?.profile?.skills.map(
                        (skill: string, index: number) => (
                          <Chip
                            key={index}
                            label={skill}
                            color="primary"
                            variant="outlined"
                            sx={{
                              borderRadius: 1,
                              borderWidth: 2,
                              fontWeight: "medium",
                            }}
                          />
                        )
                      )}
                  </Stack>
                </Box>
              )}
            </Box>

            {/* Footer with action buttons */}
            <Box
              sx={{
                p: 2,
                borderTop: "1px solid",
                borderColor: "divider",
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setOpenModal(false)}
                sx={{ borderRadius: 2 }}
              >
                Close
              </Button>
              {displayedApplicants?.find(
                (a: any) => a.user?.profile?.bio === modalContent
              )?.user?.profile?.resume && (
                <Button
                  variant="contained"
                  href={
                    displayedApplicants.find(
                      (a: any) => a.user?.profile?.bio === modalContent
                    )?.user?.profile?.resume
                  }
                  target="_blank"
                  sx={{ borderRadius: 2 }}
                >
                  View Full Resume
                </Button>
              )}
            </Box>
          </Box>
        </Modal>

        <ProfileModal
          profileModal={profileModal}
          imageURL={imageURL}
          setImageURL={setImageURL}
          setProfileModal={setProfileModal}
        />
      </Container>
    </Box>
  );
};

export default ViewAllApplicants;