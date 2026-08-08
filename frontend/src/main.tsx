import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./JOB_SEEKER/Redux/store.ts";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6d28d9", light: "#8b5cf6", dark: "#5b21b6" },
    secondary: { main: "#0ea5e9", light: "#38bdf8", dark: "#0284c7" },
    success: { main: "#16a34a" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    background: { default: "#f4f5fa", paper: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#64748b" },
    divider: "#e2e8f0",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      '"Roboto", "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.55 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.25s ease",
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#c4b5fd",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6d28d9",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(30,41,59,0.06), 0 8px 24px rgba(30,41,59,0.06)",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
