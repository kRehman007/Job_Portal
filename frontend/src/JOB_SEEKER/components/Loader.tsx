import { CircularProgress, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Loader;
