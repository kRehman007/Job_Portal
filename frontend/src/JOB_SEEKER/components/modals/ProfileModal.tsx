import { Modal, Box, IconButton } from "@mui/material";

import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ProfileProps {
  profileModal: boolean;
  imageURL: string;
  setImageURL: (val: string) => void;
  setProfileModal: (val: boolean) => void;
}
const ProfileModal: React.FC<ProfileProps> = ({
  profileModal,
  imageURL,
  setImageURL,
  setProfileModal,
}) => {
  return (
    <Modal
      open={profileModal}
      onClose={() => {
        setProfileModal(false);
        setImageURL("");
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "90vw", sm: "70vw", md: "400px" },
          maxWidth: "400px",
          height: { xs: "90vw", sm: "70vw", md: "400px" },
          maxHeight: "400px",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "16px",
          overflow: "hidden",
          outline: "none",
        }}
      >
        {/* Profile Image with Zoomable Container */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          }}
        >
          <img
            src={imageURL}
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
        </Box>

        {/* Close Button */}
        <IconButton
          onClick={() => {
            setProfileModal(false);
            setImageURL("");
          }}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <AiOutlineClose size={20} />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
