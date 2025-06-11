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
  height: { xs: "100%", sm: "auto" },
  overflow: { xs: "auto", sm: "none" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  m: 3,
  maxWidth: "400px",
  mx: "auto",
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
        style={{
          width: "100%",
          height: "100vh",
          overflowY: "auto",
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
