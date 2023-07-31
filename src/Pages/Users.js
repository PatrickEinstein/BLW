import React, { useEffect, useState } from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GetCaller } from "../Hooks/GetCaller";
import BootLoader from "../Components/BootLoader";
const Users = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const GetAllUsers = async () => {
      const GetAllUsers = GetCaller("getAllUser");
      const GotAllUSers = await GetAllUsers;
      // console.log(GotAllUSers.message);
      setUsers(GotAllUSers.message);
    };
    const intervalId = setInterval(() => {
      GetAllUsers();
      setOpen(false);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);
  const projects = users;
  const columns = [
    //the firelds corresponds to the
    //key in the objects of the array
    //the header name is what you assign to show it
    //but it must start with capital letter
    {
      field: "fullname",
      headerName: "Full Name",
      flex: 1,
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
  ];
  return (
    <Box
      height="90vh"
      width="70%"
      sx={{
        transform: "translate(30%, 0%)",
        backgroundColor: "black",
        //   "& .MuiDataGrid-root": {
        //     border: "none",
        //   },

        //   "& .MuiDataGrid-cell": {
        //     borderBottom: "none",
        //   },
        //   "$ . MuiDataGrid-columnHeaders": {
        //     // backgroundColor: theme.palette.background.alt,
        //     color: theme.palette.secondary,
        //     borderBottom: "none",
        //   },
        //   "$ . MuiDataGrid-virtualScroller": {
        //     // backgroundColor: theme.palette.primary.light,
        //   },
        //   "$ . MuiDataGrid-footerContainer": {
        //     // backgroundColor: theme.palette.background.alt,
        //     color: theme.palette.secondary,
        //     borderTop: "none",
        //   },
        //   "$ . MuiDataGrid-toolbarContainer .MuiButton-text": {
        //     // color: `${theme.palette.secondary} !important`,
        //   },
        //   "&::-webkit-scrollbar": {
        //     width: "0.1rem",
        //   },
        //   "&::-webkit-scrollbar-track": {
        //     background: "transparent",
        //   },
        //   "&::-webkit-scrollbar-thumb": {
        //     background: "transparent",
        //   },
        //   "&::-webkit-scrollbar-thumb:hover": {
        //     background: "transparent",
        //   },
      }}
    >
      <BootLoader open={open} />
      <DataGrid
        sx={{
          color: "white",
        }}
        //   loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={projects}
        columns={columns}
      />
    </Box>
  );
};

export default Users;
