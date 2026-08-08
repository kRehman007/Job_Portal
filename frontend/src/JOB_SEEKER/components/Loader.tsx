import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        gap: 2,
        bgcolor: "#f4f5fa",
      }}
    >
      <Box sx={{ position: "relative", width: 64, height: 64 }}>
        <CircularProgress
          size={64}
          thickness={4}
          sx={{
            color: "transparent",
            "& .MuiCircularProgress-circle": {
              stroke: "url(#loader-gradient)",
            },
          }}
        />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
        </svg>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: 800,
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          J
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
