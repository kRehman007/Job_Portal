import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Paper,
  Chip,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  tagline: string;
  gender: "MALE" | "FEMALE";
  experience: string;
  profilePic?: File;
  resume?: File;
  skills: string[];
}

const CreateProfilePage: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const { register, handleSubmit, watch, setValue } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      tagline: "",
      gender: "MALE",
      experience: "",
      skills: [],
    },
  });

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      setValue("skills", [...watch("skills"), skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillDelete = (skillToDelete: string) => {
    setValue(
      "skills",
      watch("skills").filter((skill) => skill !== skillToDelete)
    );
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, mt: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create Your Profile
          </Typography>
          <Typography color="text.secondary">
            Fill in your details to complete your profile
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Profile Picture */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ position: "relative", cursor: "pointer" }}>
                <Avatar
                  src={preview || "/default-avatar.jpg"}
                  sx={{ width: 90, height: 90 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ display: "none" }}
                  id="profile-pic"
                />
                <label htmlFor="profile-pic">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{ position: "absolute", bottom: 0, right: 0 }}
                  >
                    <Upload size={10} color="white" />
                  </Button>
                </label>
              </Box>
            </Box>

            {/* Basic Info */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                size="small"
                {...register("firstName")}
                label="First Name"
                fullWidth
                required
              />
              <TextField
                size="small"
                {...register("lastName")}
                label="Last Name"
                fullWidth
                required
              />
            </Box>

            <TextField
              size="small"
              {...register("email")}
              label="Email"
              fullWidth
              type="email"
              required
            />

            <TextField
              size="small"
              {...register("phone")}
              label="Phone Number"
              fullWidth
              type="tel"
            />

            <TextField
              size="small"
              {...register("tagline")}
              label="Tagline"
              fullWidth
            />

            <FormControl fullWidth>
              <Select
                {...register("gender")}
                defaultValue="MALE"
                sx={{ mt: 2 }}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              {...register("experience")}
              label="Experience (years)"
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
            />

            {/* Resume Upload */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                style={{ display: "none" }}
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  <Upload size={16} color="white" />
                  Upload Resume
                </Button>
              </label>
              {selectedFile && (
                <Typography variant="body2" color="text.secondary">
                  {selectedFile.name}
                </Typography>
              )}
            </Box>

            {/* Skills */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                size="small"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillAdd}
                label="Add Skills (Press Enter)"
                fullWidth
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {watch("skills").map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleSkillDelete(skill)}
                    color="primary"
                  />
                ))}
              </Box>
            </Box>

            <TextField
              {...register("bio")}
              label="About Me"
              fullWidth
              multiline
              rows={4}
              placeholder="Tell us about yourself..."
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button color="secondary">Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Create Profile
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateProfilePage;
