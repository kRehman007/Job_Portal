import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import EditUserProfile from "./EditUserProfile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "440px",
  maxHeight: { xs: "94vh", sm: "90vh" },
  overflowY: "auto",
  bgcolor: "#ffffff",
  borderRadius: "22px",
  boxShadow: "0 24px 60px rgba(30, 27, 75, 0.3)",
  border: "1px solid #e2e8f0",
  p: 3,
  m: 0,
  outline: "none",
};

interface EditProps {
  handleEditModalClose: () => void;
  Editopen: boolean;
}

const EditModalopen: React.FC<EditProps> = ({
  handleEditModalClose,

  Editopen,
}) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Editopen}
        onClose={handleEditModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          backdropFilter: "blur(4px)",
        }}
      >
        <Fade in={Editopen}>
          <Box sx={style}>
            <EditUserProfile handleEditModalClose={handleEditModalClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditModalopen;
