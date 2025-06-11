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
        maxWidth: "800px",
        mx: "auto",
        p: { xs: 2, sm: 4 },
        mt: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        {/* Header with back button */}
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
            sx={{ color: "primary.main" }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
              fontSize: { xs: "25px", sm: "32px" },
            }}
          >
            Create New Job
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box
          component="form"
          onSubmit={handleSubmit(CreateJobSubmission)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Grid container spacing={3}>
            {/* Company Information */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                fontStyle={"italic"}
                color="primary"
              >
                Company Information
              </Typography>
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
                    >
                      {selectedFile ? selectedFile.name : "Upload Company Logo"}
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

            {/* Job Details */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary"
                fontStyle={"italic"}
              >
                Job Details
              </Typography>
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

            {/* Skills Section */}
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
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 1 }}
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

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={isSubmitting}
            sx={{
              mt: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "capitalize",
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
