import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Stack } from "@mui/material";
import { faker } from "@faker-js/faker";
import { toggleopenModal, toggleopenModal2 } from "../Redux/reducer";
import {
  LogoutOutlined,
  Notifications,
  AddTask,
  HourglassBottom,
  FileDownloadDone,
  Settings,
  VideoFile,
} from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";

import { setLoggedInUser, setProfileIndex } from "../Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Mainboard from "./mainboard";
import EditConsole from "./editConsole";
import { PaperPlaneTilt, PencilCircle, User } from "phosphor-react";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    // flexGrow: 1,

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    paddingLeft: 3,
    paddingRight: 3,
    width: "100%",
    // height: "200%",
    overflow: "hidden",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    // height: "auto",

    opacity: 0.8,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  background: "transparent",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  background: "black",
}));

export default function Drawer2() {
  const theme = useTheme();
  const openModal2 = useSelector((state) => state.user.openModal2);
  const [open, setOpen] = React.useState(true);
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const isLoggedInUser = useSelector((state) => state.user.loggedInUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const HandleLogout = () => {
    dispatch(setLoggedInUser(null));
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        width: isNonMobileScreen ? "100%" : "auto",
      }}
    >
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "black",
            color: "white",
            opacity: 0.8,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: "white",
            }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{
            opacity: 0.8,
          }}
        >
          {/* <img
            src={Logo}
            style={{
              width: "auto",
              height: 30,
              objectFit: "center",
              marginLeft: 10,
              paddingTop: 10,
              paddingLeft: 10,
            }}
          /> */}

          <Stack
            direction="row"
            justifyContent="space-around"
            sx={{
              paddingTop: 5,
            }}
          >
            <Avatar alt="Profile" src={faker.image.avatar()} />
            <Typography
              sx={{
                paddingTop: 1,
              }}
            >
              {isLoggedInUser[0].fullname}
            </Typography>
            <IconButton>
              <PublicIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
            <IconButton>
              <Notifications
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Stack>
          <List>
            {[
              { text: "Create", icon: <AddTask /> },
              { text: "Recipees", icon: <HourglassBottom /> },
              // { text: "Project Result", icon: <FileDownloadDone /> },
              { text: "Products and Courses", icon: <Settings /> },
              { text: "Video Gallery", icon: <VideoFile /> },
              { text: "Blog", icon: <PaperPlaneTilt /> },
              { text: "Users", icon: <User /> },
              // { text: "Security", icon: <Security /> },

              {
                text: "Log out",
                icon: <LogoutOutlined onClick={HandleLogout} />,
              },
            ].map(({ text, icon }, index) => (
              <ListItem
                key={text}
                disablePadding
                // onClick={() => setOpen(false)}
                onClick={() => {
                  if (text === "Log out") {
                    HandleLogout();
                  } else {
                    dispatch(setProfileIndex(text));
                  }
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: "white",
                    }}
                    // onClick={() => dispatch(setProfileIndex(text))}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Main open={open}>
        <Mainboard />
        {openModal2 ? (
          <EditConsole onClick={() => dispatch(toggleopenModal2())} />
        ) : null}
      </Main>
    </Box>
  );
}
