import React, { useState } from "react";
import "./App.css";
import LoginModal from "./Screens/Login";
import Drawer2 from "./Components/Drawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SimpleSnackbar from "./Components/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack } from "@mui/material";
import ForgetPassword from "./Screens/ResetPassword";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { setSnackBarOpen } from "./Redux/reducer";

function App() {
  const dispatch = useDispatch();
  const opensnackbar = useSelector((state) => state.user.opensnackbar);
  const message = useSelector((state) => state.user.message);
  const isLoggedInUser = useSelector((state) => state.user.loggedInUser);

  // console.log(isLoggedInUser);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackBarOpen());
  };

  return (
    <BrowserRouter>
   
    
      <SimpleSnackbar
        open={opensnackbar}
        message={message}
        handleClose={handleClose}
        sx={{
          transform:  "translate(50%, 20%)",         
        }}
      />

      <Routes>
        <Route>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Drawer2 />} />
          <Route path="/reset" element={<ForgetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
