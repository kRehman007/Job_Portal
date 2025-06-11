import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import { useDispatch } from "react-redux";
import { setUsers } from "../JOB_SEEKER/Redux/Slices/user-slice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Zod Schema Validation
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Enter your password"),
});

// Define Form Data Type
type SignupFormData = z.infer<typeof signupSchema>;

const Login: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = React.useState(false);

  const onSubmit = async (data: SignupFormData) => {
    setFormLoading(true);
    toast.promise(AxiosInstance.post("/user/login", data), {
      loading: "Logging in...",
      success: (response) => {
        localStorage.setItem("token", response?.data?.token);
        dispatch(setUsers(response?.data));
        navigate("/");
        return "";
      },
      error: (error) => {
        toast.error(error?.response?.data?.error);
        setFormLoading(false);
        return "";
      },
    });
  };

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        Width: "100vw",
        overflow: "hidden",
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
          height={"100vh"}
          flexDirection={"column"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
          px={isSmallScreen ? 3 : 0}
        >
          <Box
            sx={{
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
              <LockOutlinedIcon fontSize="medium" />
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
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sign in to access your account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  variant="outlined"
                  size="medium"
                  {...register("email")}
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
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  size="medium"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                mb: 2,
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
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", mt: 1, color: "text.secondary" }}
                >
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    style={{
                      color: "#2575fc",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
