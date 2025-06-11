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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { useDispatch } from "react-redux";
import { setUsers } from "../JOB_SEEKER/Redux/Slices/user-slice";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

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
        MaxWidth: "100vw",
      }}
    >
      <Grid container>
        {!isSmallScreen && (
          <Grid item md={6}>
            <Box
              component="img"
              src="/JobLogo.webp"
              alt="Career illustration"
              sx={{
                width: "100%",
                minHeight: "100vh",
                objectFit: "cover",
              }}
            />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={6}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
          px={isSmallScreen ? 3 : 12}
        >
          <Box
            sx={{
              mt: { xs: 2, sm: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,

                bgcolor: "primary.main",
                width: 60,
                height: 60,
              }}
            >
              <PersonAddAlt1Icon fontSize="medium" />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                mt: 1,
                fontWeight: "bold",
                background:
                  "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Create an Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Keep your data safe
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="medium"
                  label="Full Name"
                  {...register("fullName")}
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
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
                        gap: 4,
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
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "medium",
                background:
                  "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #6a11cb 0%, #2575fc 70%)",
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
              mt: 1,
              color: "text.secondary",
              pb: { xs: 4, sm: 0 },
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#2575fc",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Login
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
