import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Grid,
  Avatar,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { useDispatch } from "react-redux";
import { setUsers } from "../JOB_SEEKER/Redux/Slices/user-slice";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

enum Role {
  JOB_SEEKER = "JOB_SEEKER",
  EMPLOYER = "EMPLOYER",
}

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum([Role.JOB_SEEKER, Role.EMPLOYER], {
      required_error: "You must select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = React.useState(false);

  const onSubmit = async (data: SignupFormData) => {
    setFormLoading(true);
    toast.promise(AxiosInstance.post("/user/signup", data), {
      loading: "Signing up...",
      success: (response) => {
        dispatch(setUsers(response.data));
        navigate("/login");
        return "";
      },
      error: (error) => {
        setFormLoading(false);
        toast.error(error.response.data.error);
        return "";
      },
    });
  };

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        bgcolor: "#f4f5fa",
      }}
    >
      <Grid container sx={{ flexGrow: 1 }}>
        {!isSmallScreen && (
          <Grid
            item
            md={6}
            sx={{ position: "relative", height: "100%", overflow: "hidden" }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(150deg, #1e1b4b 0%, #312e81 40%, #4c1d95 75%, #6d28d9 100%)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: -90,
                right: -70,
                width: 340,
                height: 340,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(217,70,239,0.45), transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -110,
                left: -90,
                width: 380,
                height: 380,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
                filter: "blur(70px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "32%",
                left: "52%",
                width: 240,
                height: 240,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)",
                filter: "blur(55px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                opacity: 0.12,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage:
                  "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: { md: 5, lg: 7 },
                color: "#fff",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 46,
                    height: 46,
                    bgcolor: "rgba(255,255,255,0.14)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <WorkOutlineIcon />
                </Avatar>
                <Typography sx={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: 0.5 }}>
                  JobPortal
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{ lineHeight: 1.2, textShadow: "0 6px 26px rgba(0,0,0,0.35)" }}
                >
                  Create your account and start applying.
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: "17px",
                    opacity: 0.92,
                    maxWidth: 420,
                    lineHeight: 1.6,
                  }}
                >
                  Join thousands of professionals and employers building their
                  careers on Job Portal.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: { md: 4, lg: 6 } }}>
                {[
                  ["50K+", "Live Jobs"],
                  ["12K+", "Companies"],
                  ["80K+", "Hired"],
                ].map(([value, label]) => (
                  <Box key={label}>
                    <Typography sx={{ fontSize: "1.7rem", fontWeight: 800, lineHeight: 1 }}>
                      {value}
                    </Typography>
                    <Typography sx={{ opacity: 0.85, fontSize: "14px", mt: 0.5 }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={6}
          display={"flex"}
          height={"100vh"}
          flexDirection={"column"}
          alignItems={"center"}
          px={isSmallScreen ? 3 : 6}
          py={4}
          sx={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <Paper
            elevation={isSmallScreen ? 0 : 1}
            sx={{
              width: "100%",
              maxWidth: 460,
              height: "100%",
              p: { xs: 3, sm: 3 },
              borderRadius: "24px",
              border: isSmallScreen ? "none" : "1px solid #e2e8f0",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              my: "auto",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  width: 62,
                  height: 62,
                  boxShadow: "0 8px 20px rgba(124, 58, 237, 0.35)",
                }}
              >
                <PersonAddAlt1Icon fontSize="medium" />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                sx={{ mt: 1, fontWeight: 800, color: "#1e293b" }}
              >
                Create an Account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Keep your data safe
              </Typography>
            </Box>

            <Box component="form"
            onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    label="Full Name"
                    {...register("fullName")}
                    fullWidth
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    label="Email"
                    type="email"
                    {...register("email")}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    label="Password"
                    type="password"
                    {...register("password")}
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="medium"
                    label="Confirm Password"
                    type="password"
                    {...register("confirmPassword")}
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: { xs: 2, sm: 4 },
                          mt: 1,
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value === Role.JOB_SEEKER}
                              onChange={() => field.onChange(Role.JOB_SEEKER)}
                              color="primary"
                            />
                          }
                          label="Job Seeker"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value === Role.EMPLOYER}
                              onChange={() => field.onChange(Role.EMPLOYER)}
                              color="primary"
                            />
                          }
                          label="Employer"
                        />
                      </Box>
                    )}
                  />
                  {errors.role && (
                    <Typography
                      color="error"
                      variant="body2"
                      sx={{ textAlign: "center", mt: 1 }}
                    >
                      {errors.role.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow: "0 8px 20px rgba(99, 102, 241, 0.35)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
                    boxShadow: "0 10px 26px rgba(99, 102, 241, 0.45)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {formLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 2,
                color: "text.secondary",
                pb: { xs: 4, sm: 0 },
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#6d28d9",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Login
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
