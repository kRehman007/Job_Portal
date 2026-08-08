import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Toolbar,
  Chip,
  Grid,
  Stack,
  Modal,
  Pagination,
  CircularProgress,
  Container,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetAllApplicantsQuery,
  useUpdateApplicationStatusMutation,
} from "../../JOB_SEEKER/Redux/API/JobsAPI";
import EmployerSideBar from "../components/EmployerSideBar";
import MainLayout from "../../components/MainLayout";
import Loader from "../../JOB_SEEKER/components/Loader";
import { useState } from "react";
import toast from "react-hot-toast";
import ProfileModal from "../../JOB_SEEKER/components/modals/ProfileModal";
import { openResume } from "../../utils/resume";

const ViewAllApplicants = () => {
  const [loadingStates, setLoadingStates] = useState<Record<number, 'approving' | 'rejecting' | 'reverting' | null>>({});
  const navigate = useNavigate();
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

  async function handleApplicationStatus(id: number, status: 'approved' | 'rejected' | 'pending') {
    const loadingKey = status === 'approved' ? 'approving' : status === 'rejected' ? 'rejecting' : 'reverting';
    setLoadingStates(prev => ({ ...prev, [id]: loadingKey }));
    
    try {
      await updateApplicationStatus({ id, data: status }).unwrap();
      toast.success(
        status === "pending"
          ? "Application reverted to pending"
          : `Application ${status} successfully`
      );
    } catch (error: any) {
      console.log("error in updating status", error.message);
      toast.error("Oops..!! something went wrong");
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: null }));
    }
  }

  return (
    <MainLayout sidebar={<EmployerSideBar />}>
      <Toolbar />
      <Container maxWidth="xl" sx={{ py: 4, pt: { md: 0 }, px: { xs: 2.5, sm: 4 } }}>
           <Button
              startIcon={<AiOutlineArrowLeft />}
              onClick={() => navigate(-1)}
              sx={{
                textTransform: "capitalize",
                color: "#4f46e5",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Back
            </Button>
        {data?.length > 0 ? (
          <Box>
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
              Job Applicants
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ my: { xs: 1, sm: 2 } }}
            >
              Review talented professionals who applied for your job posting.
              Approve or reject applications to keep candidates informed.
            </Typography>

            <Grid container spacing={3} mt={2}>
              {displayedApplicants?.map((applicant: any) => (
                <Grid item xs={12} md={6} key={applicant.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "18px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 1px 3px rgba(30,41,59,0.06)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 14px 34px rgba(79, 70, 229, 0.14)",
                        borderColor: "#c7d2fe",
                      },
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
                            className="w-16 h-16 object-cover rounded-full"
                            style={{
                              border: "3px solid #e9d5ff",
                              boxShadow: "0 6px 16px rgba(139, 92, 246, 0.25)",
                            }}
                          />
                        </Box>

                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color="#1e293b"
                          >
                            {applicant.user?.fullName || ""}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                          >
                            {applicant.user?.email || ""}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {applicant.user?.profile?.phoneNumber || ""}
                          </Typography>
                        </Box>
                      </Stack>

                      {applicant.user?.profile === null ? (
                        <Typography color="text.secondary" fontStyle="italic">
                          User hasn't set his profile
                        </Typography>
                      ) : (
                        <>
                          {applicant?.user?.profile?.tagline && (
                            <Typography
                              variant="body1"
                              fontStyle="italic"
                              sx={{
                                color: "#6d28d9",
                                bgcolor: "#f5f3ff",
                                borderRadius: "10px",
                                p: 1.5,
                                mb: 2,
                              }}
                            >
                              "{applicant.user?.profile?.tagline}"
                            </Typography>
                          )}

                          {applicant.user?.profile?.skills?.length > 0 && (
                            <Box mb={2}>
                              <Typography
                                variant="subtitle2"
                                fontWeight={700}
                                mb={1}
                                sx={{ color: "#1e293b" }}
                              >
                                SkillSet:
                              </Typography>
                              <Stack direction="row" flexWrap="wrap" gap={1}>
                                {applicant.user.profile.skills.map(
                                  (skill: string, index: number) => (
                                    <Chip
                                      key={index}
                                      label={skill}
                                      size="small"
                                      sx={{
                                        borderRadius: "8px",
                                        bgcolor: "#f5f3ff",
                                        color: "#6d28d9",
                                        border: "1px solid #ddd6fe",
                                        fontWeight: 600,
                                      }}
                                    />
                                  )
                                )}
                              </Stack>
                            </Box>
                          )}

                          {applicant.user?.profile?.bio && (
                            <Box mb={2}>
                              <Typography
                                variant="subtitle2"
                                fontWeight={700}
                                mb={1}
                                sx={{ color: "#1e293b" }}
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
                                      color: "#6d28d9",
                                      fontWeight: 700,
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

                          {applicant?.user?.profile?.resume && (
                            <Button
                              variant="outlined"
                              sx={{
                                textTransform: "capitalize",
                                mb: 2,
                                borderRadius: "10px",
                                color: "#6d28d9",
                                borderColor: "#c4b5fd",
                                fontWeight: 600,
                                "&:hover": {
                                  borderColor: "#6d28d9",
                                  bgcolor: "#f5f3ff",
                                },
                              }}
                              color="primary"
                              onClick={() =>
                                openResume(applicant.user.profile.resume)
                              }
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
                            sx={{
                              textTransform: "capitalize",
                              borderRadius: "10px",
                              fontWeight: 700,
                              background: "linear-gradient(135deg, #22c55e, #16a34a)",
                              boxShadow: "0 6px 14px rgba(34, 197, 94, 0.3)",
                              "&:hover": {
                                background: "linear-gradient(135deg, #22c55e, #15803d)",
                              },
                            }}
                            color="success"
                            disabled={loadingStates[applicant.id] === 'approving' || loadingStates[applicant.id] === 'rejecting'}
                            fullWidth
                            onClick={() =>
                              handleApplicationStatus(applicant.id, "approved")
                            }
                          >
                            {loadingStates[applicant.id] === 'approving' ? (
                              <CircularProgress size={18} color="inherit" />
                            ) : (
                              "Approve"
                            )}
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{
                              textTransform: "capitalize",
                              borderRadius: "10px",
                              fontWeight: 700,
                              background: "linear-gradient(135deg, #f87171, #ef4444)",
                              boxShadow: "0 6px 16px rgba(239, 68, 68, 0.3)",
                              "&:hover": {
                                background: "linear-gradient(135deg, #f87171, #dc2626)",
                              },
                            }}
                            disabled={loadingStates[applicant.id] === 'rejecting' || loadingStates[applicant.id] === 'approving'}
                            fullWidth
                            onClick={() =>
                              handleApplicationStatus(applicant.id, "rejected")
                            }
                          >
                            {loadingStates[applicant.id] === 'rejecting' ? (
                              <CircularProgress size={18} color="inherit" />
                            ) : (
                              "Reject"
                            )}
                          </Button>
                        </Stack>
                      ) : (
                        <Box>
                          <Box
                            sx={{
                              borderRadius: "10px",
                              py: 1,
                              textAlign: "center",
                              color: "white",
                              fontWeight: 700,
                              fontSize: "15px",
                              background:
                                applicant.status === "approved"
                                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                                  : "linear-gradient(135deg, #f87171, #ef4444)",
                            }}
                          >
                            {applicant.status === "approved"
                              ? "Accepted"
                              : "Rejected"}
                          </Box>
                          <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                            {applicant.status === "approved" ? (
                              <Button
                                variant="contained"
                                color="error"
                                sx={{
                                  textTransform: "capitalize",
                                  borderRadius: "10px",
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  background:
                                    "linear-gradient(135deg, #f87171, #ef4444)",
                                  boxShadow:
                                    "0 6px 16px rgba(239, 68, 68, 0.3)",
                                  "&:hover": {
                                    background:
                                      "linear-gradient(135deg, #f87171, #dc2626)",
                                  },
                                }}
                                disabled={loadingStates[applicant.id] === 'rejecting' || loadingStates[applicant.id] === 'reverting'}
                                fullWidth
                                onClick={() =>
                                  handleApplicationStatus(
                                    applicant.id,
                                    "rejected"
                                  )
                                }
                              >
                                {loadingStates[applicant.id] === 'rejecting' ? (
                                  <CircularProgress size={18} color="inherit" />
                                ) : (
                                  "Reject"
                                )}
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                sx={{
                                  textTransform: "capitalize",
                                  borderRadius: "10px",
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  background:
                                    "linear-gradient(135deg, #22c55e, #16a34a)",
                                  boxShadow:
                                    "0 6px 14px rgba(34, 197, 94, 0.3)",
                                  "&:hover": {
                                    background:
                                      "linear-gradient(135deg, #22c55e, #15803d)",
                                  },
                                }}
                                color="success"
                                disabled={loadingStates[applicant.id] === 'approving' || loadingStates[applicant.id] === 'reverting'}
                                fullWidth
                                onClick={() =>
                                  handleApplicationStatus(
                                    applicant.id,
                                    "approved"
                                  )
                                }
                              >
                                {loadingStates[applicant.id] === 'approving' ? (
                                  <CircularProgress size={18} color="inherit" />
                                ) : (
                                  "Approve"
                                )}
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              sx={{
                                textTransform: "capitalize",
                                borderRadius: "10px",
                                fontWeight: 700,
                                fontSize: "13px",
                                color: "#6d28d9",
                                borderColor: "#c4b5fd",
                                whiteSpace: "nowrap",
                                "&:hover": {
                                  borderColor: "#6d28d9",
                                  bgcolor: "#f5f3ff",
                                },
                              }}
                              disabled={loadingStates[applicant.id] === 'reverting'}
                              fullWidth
                              onClick={() =>
                                handleApplicationStatus(applicant.id, "pending")
                              }
                            >
                              {loadingStates[applicant.id] === 'reverting' ? (
                                <CircularProgress size={18} color="inherit" />
                              ) : (
                                "Revert"
                              )}
                            </Button>
                          </Stack>
                        </Box>
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
          <Box>
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
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                boxShadow: "0 10px 24px rgba(99, 102, 241, 0.3)",
                color: "#fff",
                fontSize: "38px",
              }}
            >
              <FaUsers />
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              fontWeight={600}
            >
              No applicants have applied for this position yet.
            </Typography>
          </Box>
        )}

       </Container>
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
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
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
                  onClick={() =>
                    openResume(
                      displayedApplicants.find(
                        (a: any) => a.user?.profile?.bio === modalContent
                      )?.user?.profile?.resume
                    )
                  }
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
    </MainLayout>
  );
};

export default ViewAllApplicants;