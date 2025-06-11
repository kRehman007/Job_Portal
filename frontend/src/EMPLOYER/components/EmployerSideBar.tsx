import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { SlLogout } from "react-icons/sl";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, CssBaseline } from "@mui/material";
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
    text: "Create Job",
    link: `${URL.EMPLOYER.CREATE_JOB}`,
    icon: <MdOutlineCreate />,
  },
];

const drawerWidth = 300;
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
    <div>
      <Toolbar>
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          noWrap
          component="div"
          px={0.5}
          py={1}
          sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
        >
          <Avatar
            src="/JobLogo.webp"
            sx={{ width: { sm: "60px" }, height: { sm: "60px" } }}
          />
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ p: 2 }}>
        {sidebar.map((bar, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(`${bar.link}`)}
            sx={{
              backgroundColor:
                location.pathname === bar.link ? "gainsboro" : "transparent",
              borderRadius: "10px",
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ fontSize: "25px" }}>{bar.icon}</ListItemIcon>
              <Typography sx={{ fontSize: "19px", fontWeight: "medium" }}>
                {bar.text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <SlLogout
        onClick={handleLogout}
        style={{
          position: "absolute",
          bottom: "25px",
          left: "40px",
          fontSize: "25px",
          cursor: "pointer",
        }}
      />
    </div>
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
              sx={{ width: { sm: "60px" }, height: { sm: "60px" } }}
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
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
