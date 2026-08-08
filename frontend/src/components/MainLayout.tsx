import * as React from "react";
import Box from "@mui/material/Box";

interface MainLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

const outerBg = "#e8ecf5";

const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: outerBg }}>
      {sidebar}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f4f5fa",
          mt: { xs: 4, sm: 1.5 },
          mb: { sm: 1.5 },
          ml: { sm: 1.5 },
          mr: { sm: 1.5 },
          borderRadius: { sm: "18px" },
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
