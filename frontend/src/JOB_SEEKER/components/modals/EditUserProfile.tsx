import {
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BiArrowBack } from "react-icons/bi";
import React, { useState } from "react";
import { IoCameraReverse } from "react-icons/io5";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../Redux/API/JobsAPI";
import Loader from "../Loader";
import { Upload } from "lucide-react";

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const EditSchema = z.object({
  phoneNumber: z.string().optional(),
  tagline: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"], { required_error: "Gender is required" }),
  resume: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Resume file must not exceed 5MB",
    })
    .refine((file) => (file ? file.type === "application/pdf" : true), {
      message: "Please upload a PDF file",
    }),

  profilePic: z
    .instanceof(File)
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Profile pic must not exceed 200KB",
    })
    .refine((file) => file?.type.startsWith("image/"), {
      message: "Please upload an image file",
    })
    .optional(),
  skills: z.array(z.string()).optional(),
  experience: z
    .string()
    .regex(/^\d+$/, "Enter a valid positive number")
    .optional(),

  bio: z.string().optional(),
});

type EditProfileData = z.infer<typeof EditSchema>;

interface Props {
  handleEditModalClose: () => void;
}

const EditUserProfile: React.FC<Props> = ({ handleEditModalClose }) => {
  const { data, isLoading } = useGetUserProfileQuery();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<EditProfileData>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      tagline: data?.profile?.tagline,
      experience: String(data?.profile?.experience || 0),
      phoneNumber: data?.profile?.phoneNumber,
      bio: data?.profile?.bio,
      gender: "MALE", // Default gender selection
      skills: data?.profile?.skills,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const existingResume = data?.profile?.resume;
  const existingResumeName = existingResume
    ? decodeURIComponent(existingResume.split("/").pop() || "")
    : null;
  const [skillInput, setSkillInput] = useState("");
  const [pic, setPic] = useState<string | null>(null);
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleSkillAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && skillInput.trim() !== "") {
      event.preventDefault();
      const currentSkills = getValues("skills");
      setValue("skills", [skillInput.trim(), ...(currentSkills || [])]); // Add skill at the top
      setSkillInput("");
    }
  };

  const handleSkillDelete = (skillToDelete: string) => {
    const updatedSkills = (getValues("skills") || []).filter(
      (skill) => skill !== skillToDelete
    );
    setValue("skills", updatedSkills);
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPic(URL.createObjectURL(file));
      setValue("profilePic", file);
    }
  };

  async function EditProfileSubmission(data: EditProfileData) {
    const formData = new FormData();
    formData.append("phoneNumber", data.phoneNumber || "");
    formData.append("tagline", data.tagline || "");
    formData.append("gender", data.gender);
    formData.append("experience", data.experience || "");
    formData.append("bio", data.bio || "");
    if (data.resume) formData.append("resume", data.resume);
    if (data.profilePic) formData.append("profilePic", data.profilePic);
    data.skills?.forEach((skill, index) => {
      formData.append(`skills[${index}]`, skill);
    });

    try {
      await updateUserProfile(formData).unwrap();
      if (selectedFile) {
        localStorage.setItem("resume", selectedFile?.name);
      }
      reset();
      handleEditModalClose();
    } catch (error) {
      console.log("error in updating profile", error);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: { xs: "flex-start" },
        gap: 3,
        alignItems: "center",

        mt: { md: 12 },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
        width={"100%"}
        sx={{ mt: 1, mb: 1 }}
      >
        <BiArrowBack
          onClick={handleEditModalClose}
          style={{
            position: "absolute",
            left: "0px",
            fontSize: "22px",
            cursor: "pointer",
            color: "#64748b",
          }}
        />
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 800,
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Edit Profile
        </Typography>
      </Box>

      <Box
        sx={{ position: "relative", cursor: "pointer" }}
        onClick={() => document.getElementById("picId")?.click()}
      >
        <img
          src={
            pic ||
            data?.profile?.profilePic ||
            `https://avatar.iran.liara.run/public/boy?username=${data?.fullName}`
          }
          className="w-24 h-24 rounded-full object-cover"
          style={{
            border: "3px solid #e9d5ff",
            boxShadow: "0 8px 20px rgba(139, 92, 246, 0.25)",
          }}
        />
        {errors.profilePic && (
          <Typography variant="body2" color="error">
            {errors.profilePic.message as string}
          </Typography>
        )}

        <IoCameraReverse
          style={{
            position: "absolute",
            right: "-2px",
            bottom: "4px",
            fontSize: "26px",
            color: "#6d28d9",
            background: "#fff",
            borderRadius: "50%",
            padding: "2px",
            boxShadow: "0 2px 8px rgba(30,41,59,0.2)",
          }}
        />

        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          style={{ display: "none" }}
          id="picId"
          onChange={handleProfileChange}
        />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(EditProfileSubmission)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <TextField
          size="small"
          label="Phone Number"
          fullWidth
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <FormControl fullWidth error={!!errors.gender}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select {...field} size="small">
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            )}
          />
          {errors.gender && (
            <Typography variant="caption" color="error">
              {errors.gender.message}
            </Typography>
          )}
        </FormControl>

        <TextField
          label="Add a tagline"
          size="small"
          fullWidth
          {...register("tagline")}
          error={!!errors.tagline}
          helperText={errors?.tagline?.message?.toString()}
        />

        {/* ✅ Fixed File Upload Handling */}
        <Controller
          name="resume"
          control={control}
          render={({ field: { onChange } }) => (
            <Box>
              {/* Hidden file input */}
              <input
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                id="resume-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setSelectedFile(file);
                  onChange(file);
                }}
              />

              {/* Custom TextField as File Upload */}
              <label htmlFor="resume-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{
                    mb: 1,
                    borderRadius: "10px",
                    py: 1.25,
                    color: "#6d28d9",
                    borderColor: "#c4b5fd",
                    fontWeight: 600,
                    "&:hover": { borderColor: "#6d28d9", bgcolor: "#f5f3ff" },
                  }}
                >
                  <Upload size={16} style={{ marginRight: 6 }} />
                  {selectedFile ? "Change Resume" : "Upload Resume"}
                </Button>
              </label>
              {!selectedFile && existingResume && (
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    bgcolor: "#f5f3ff",
                    borderRadius: "10px",
                    px: 1.5,
                    py: 1,
                    border: "1px dashed #c4b5fd",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Current: {existingResumeName}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="a"
                    href={existingResume}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#6d28d9", fontWeight: 700, flexShrink: 0 }}
                  >
                    View
                  </Typography>
                </Box>
              )}
              {selectedFile && (
                <Typography variant="body2" color="text.secondary">
                  {selectedFile.name}
                </Typography>
              )}
              {errors.resume && (
                <Typography variant="body2" color="error">
                  {errors.resume.message as string}
                </Typography>
              )}
            </Box>
          )}
        />

        <Box>
          <Box>
            <Controller
              name="skills"
              control={control}
              render={() => (
                <>
                  <TextField
                    size="small"
                    label="Add your skills"
                    fullWidth
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillAdd}
                    placeholder="Type a skill and press Enter"
                  />

                  <Box
                    sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}
                  >
                    {getValues("skills")?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        onDelete={() => handleSkillDelete(skill)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </>
              )}
            />

            {errors.skills && (
              <Typography variant="caption" color="error">
                {errors.skills.message}
              </Typography>
            )}
          </Box>
        </Box>

        <TextField
          label="Experience (years)"
          size="small"
          fullWidth
          {...register("experience")}
          error={!!errors.experience}
          helperText={errors.experience?.message}
        />

        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Enter your Bio"
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "transparent",
                  color: "#000",
                  "&::placeholder": { color: "gray" }, // Correct MUI way for placeholder styling
                },
              }}
              error={!!errors.bio}
              helperText={errors.bio?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          sx={{
            py: 1.4,
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "15px",
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 6px 16px rgba(99, 102, 241, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #7c3aed, #4338ca)",
              boxShadow: "0 8px 20px rgba(99, 102, 241, 0.45)",
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default EditUserProfile;
