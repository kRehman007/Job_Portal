import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { SlLogout } from "react-icons/sl";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, CssBaseline, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "../../utils/AxiosInstance";
import { MdDashboard } from "react-icons/md";
import MenuIcon from "@mui/icons-material/Menu";
import { clearUser } from "../../JOB_SEEKER/Redux/Slices/user-slice";
import { URL } from "../../utils/URL";
import { MdOutlineCreate } from "react-icons/md";

const sidebar = [
  {
    text: "Dashboard",
    icon: <MdDashboard />,
    link: `${URL.EMPLOYER.HOME}`,
  },

  {
    text: "Post Job",
    link: `${URL.EMPLOYER.CREATE_JOB}`,
    icon: <MdOutlineCreate />,
  },
];

const drawerWidth = 300;
const sidebarBg = "linear-gradient(180deg, #1e1b4b 0%, #312e81 55%, #4c1d95 100%)";
interface Props {
  window?: () => Window;
}
export default function EmployerSideBar(props: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar sx={{ px: 2.5, minHeight: { xs: 64, sm: 80 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Avatar
            src="/JobLogo.webp"
            sx={{
              width: { xs: 40, sm: 46 },
              height: { xs: 40, sm: 46 },
              border: "2px solid rgba(255,255,255,0.25)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
            }}
          />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: 1.15,
              }}
            >
              Job Portal
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "12px",
                letterSpacing: "0.4px",
              }}
            >
              Hire the best talent
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Box
        sx={{
          height: "1px",
          bgcolor: "rgba(255,255,255,0.12)",
          mx: 2.5,
        }}
      />

      <List sx={{ px: 2, py: 2.5, flexGrow: 1 }}>
        {sidebar.map((bar, index) => {
          const active = location.pathname === bar.link;
          return (
            <ListItem
              key={index}
              disablePadding
              onClick={() => navigate(`${bar.link}`)}
              sx={{ mb: 0.75 }}
            >
              <ListItemButton
                sx={{
                  borderRadius: "12px",
                  px: 2,
                  py: 1.25,
                  backgroundColor: active
                    ? "rgba(255,255,255,0.16)"
                    : "transparent",
                  borderLeft: active
                    ? "4px solid #a78bfa"
                    : "4px solid transparent",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? "#c4b5fd" : "rgba(255,255,255,0.65)",
                    minWidth: "38px",
                    fontSize: "22px",
                    transition: "color 0.25s ease",
                  }}
                >
                  {bar.icon}
                </ListItemIcon>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: active ? 600 : 500,
                    color: active ? "#fff" : "rgba(255,255,255,0.75)",
                    transition: "color 0.25s ease",
                  }}
                >
                  {bar.text}
                </Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2.5 }}>
        <Button
          onClick={handleLogout}
          fullWidth
          startIcon={<SlLogout style={{ fontSize: "18px" }} />}
          sx={{
            color: "#fda4af",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "12px",
            py: 1.25,
            fontSize: "15px",
            "&:hover": {
              borderColor: "#fda4af",
              backgroundColor: "rgba(253,164,175,0.1)",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  async function handleLogout() {
    try {
      await AxiosInstance.get("/user/logout");
      dispatch(clearUser());
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.error || "Something went wrong");
    }
  }
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: "block", sm: "none" },
          background: sidebarBg,
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            mt={0}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Avatar
              src="/JobLogo.webp"
              sx={{ width: 42, height: 42, border: "2px solid rgba(255,255,255,0.25)" }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: sidebarBg,
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: sidebarBg,
              border: "none",
              boxShadow: "6px 0 24px rgba(30, 27, 75, 0.25)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
