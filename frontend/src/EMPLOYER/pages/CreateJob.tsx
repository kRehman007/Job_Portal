import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useCreateJobMutation } from "../../JOB_SEEKER/Redux/API/JobsAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL } from "../../utils/URL";
import { ArrowBack } from "@mui/icons-material";
import { CloudUpload } from "@mui/icons-material";
import { FaBuilding, FaFileAlt } from "react-icons/fa";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const CreateJobSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyEmail: z.string().email("Invalid email address"),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().min(1, "Salary is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  experience: z.string().optional(),
  seats: z.string().optional(),
  jobType: z.enum(["Onsite", "Remote"], {
    required_error: "Please select job type",
  }),
  companyLogo: z
    .instanceof(File)
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "File must not exceed 5MB",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Please upload an image file",
    })
    .optional(),
});

type JobData = z.infer<typeof CreateJobSchema>;

const CreateJob = () => {
  const navigate = useNavigate();
  const [createJob] = useCreateJobMutation();
  const [skillInput, setSkillInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<JobData>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      title: "",
      description: "",
      location: "",
      salary: "",
      skills: [],
      experience: "",
      seats: "",
      jobType: "Onsite",
    },
  });

  const handleSkillAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && skillInput.trim() !== "") {
      event.preventDefault();
      const currentSkills = getValues("skills");
      setValue("skills", [...currentSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillDelete = (skillToDelete: string) => {
    const updatedSkills = getValues("skills").filter(
      (skill) => skill !== skillToDelete
    );
    setValue("skills", updatedSkills);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setValue("companyLogo", file || undefined);
  };

  async function CreateJobSubmission(data: JobData) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "skills" && Array.isArray(value)) {
          value.forEach((skill, i) => formData.append(`skills[${i}]`, skill));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    try {
      await createJob(formData).unwrap();
      toast.success("Job posted successfully");
      navigate(URL.EMPLOYER.HOME);
    } catch (error: any) {
      console.error("Error creating job:", error);
      toast.error(error?.data?.error || "Something went wrong");
    }
  }

  return (
    <Box
      sx={{
        maxWidth: "840px",
        mx: "auto",
        p: { xs: 2, sm: 4 },
        mt: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 4 },
          borderRadius: "20px",
          bgcolor: "#fff",
          border: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => navigate(URL.EMPLOYER.HOME)}
            sx={{
              color: "#6d28d9",
              bgcolor: "#f5f3ff",
              "&:hover": { bgcolor: "#ede9fe" },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
                fontSize: { xs: "25px", sm: "32px" },
              }}
            >
              Create New Job
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details to post a new opportunity
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box
          component="form"
          onSubmit={handleSubmit(CreateJobSubmission)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    color: "#fff",
                  }}
                >
                  <FaBuilding size={18} />
                </Box>
                <Typography variant="h6" fontWeight={700} color="#1e293b">
                  Company Information
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    fullWidth
                    size="medium"
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="companyEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Email"
                    fullWidth
                    size="medium"
                    error={!!errors.companyEmail}
                    helperText={errors.companyEmail?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="companyLogo"
                control={control}
                render={() => (
                  <Box>
                    <input
                      type="file"
                      id="company-logo-upload"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <Button
                      component="label"
                      htmlFor="company-logo-upload"
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      fullWidth
                      sx={{
                        borderRadius: "12px",
                        py: 1.5,
                        color: "#6d28d9",
                        borderColor: "#c4b5fd",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#6d28d9",
                          bgcolor: "#f5f3ff",
                        },
                      }}
                    >
                      {selectedFile
                        ? selectedFile.name
                        : "Upload Company Logo"}
                    </Button>
                    {errors.companyLogo && (
                      <Typography variant="caption" color="error" mt={1}>
                        {errors.companyLogo.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                    color: "#fff",
                  }}
                >
                  <FaFileAlt size={18} />
                </Box>
                <Typography variant="h6" fontWeight={700} color="#1e293b">
                  Job Details
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Title"
                    fullWidth
                    size="medium"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.jobType}>
                    <InputLabel>Job Type</InputLabel>
                    <Select {...field} label="Job Type">
                      <MenuItem value="Onsite">Onsite</MenuItem>
                      <MenuItem value="Remote">Remote</MenuItem>
                    </Select>
                    {errors.jobType && (
                      <Typography variant="caption" color="error">
                        {errors.jobType.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    fullWidth
                    placeholder="Lahore"
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Salary (USD) "
                    fullWidth
                    placeholder="50"
                    error={!!errors.salary}
                    helperText={errors.salary?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Experience (years)"
                    fullWidth
                    placeholder="5"
                    error={!!errors.experience}
                    helperText={errors.experience?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="seats"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Available Seats"
                    fullWidth
                    placeholder="10"
                    error={!!errors.seats}
                    helperText={errors.seats?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="skills"
                control={control}
                render={() => (
                  <Box>
                    <TextField
                      label="Required Skills"
                      fullWidth
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillAdd}
                      placeholder="Type a skill and press Enter"
                      error={!!errors.skills}
                    />
                    <Box
                      sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                    >
                      {getValues("skills")?.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          onDelete={() => handleSkillDelete(skill)}
                          sx={{
                            borderRadius: "8px",
                            bgcolor: "#f5f3ff",
                            color: "#6d28d9",
                            border: "1px solid #ddd6fe",
                            fontWeight: 600,
                            "& .MuiChip-deleteIcon": { color: "#6d28d9" },
                          }}
                        />
                      ))}
                    </Box>
                    {errors.skills && (
                      <Typography variant="caption" color="error">
                        {errors.skills.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "14px",
              fontWeight: 700,
              fontSize: "1.05rem",
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              boxShadow: "0 8px 20px rgba(99, 102, 241, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)",
                boxShadow: "0 10px 26px rgba(99, 102, 241, 0.45)",
                transform: "translateY(-1px)",
              },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Post Job"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateJob;