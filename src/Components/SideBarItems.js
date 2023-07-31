import React from "react";
import {
  Settings,
  AddTask,
  HourglassBottom,
  ExitToApp,
  FileDownloadDone,
} from "@mui/icons-material";

import { IconButton } from "@mui/material";

export const MenuList = [
  {
    logo: <AddTask />,
    title: "Create Project",
  },
  {
    logo: <HourglassBottom />,
    title: "Ongoing Project",
  },
  {
    logo: <FileDownloadDone />,
    title: "project Result",
  },
];

export const Auth = [
  {
    logo: <Settings />,
    title: "Settings",
  },
  {
    logo: <ExitToApp />,
    title: "Sign Out",
  },
  // {
  //   logo:</IconButton>,
  //   title: "Later",
  // },
];
