import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { setMessage, setOpen, setSnackBarOpen } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import {PatchCaller} from "../Hooks/PatchCaller"
import PostCaller from "../Hooks/PostCaller";
import { Details } from "../Components/Details";
import { useMediaQuery } from "@mui/material";
import Logo from "../assets/blw.png";

const ForgetPassword = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [change, setChange] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState();
  const [password, setPassword] = useState("");
  const [submittedform, setSubmitted] = useState(false);
  // console.log(email, otp, password);

  const onChangeEmail = async () => {
    try {
     
      const submit = PostCaller(
        {
          email: email,
        },
        "getOTP"
      );
      const submitted = await submit;
      console.log(submitted);
      if (submitted.status === true) {
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage(submitted.message));
        setChange(1);
      } else {
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage(submitted.message));
        return;
      }
    } catch (err) {
    alert(err.message)
    }
  };

  const VerifyOtp = async (e) => {
    try {
      const submit = PostCaller(
        {
          email: email,
          otp: otp,
        },
        "verifyotp"
      );
      const submitted = await submit;
      console.log(submitted);
      if (submitted.status === true) {
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage(submitted.message));
        setChange(2);
      } else {
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage(submitted.message));
        return;
      }
    } catch (err) {
    alert(err.message);
    }
  };

  const onChangePassword = async () => {
    try {
      const submit = PostCaller(
        {
          email: email,
          password: password,
        },
        "changepassword"
      );
      const submitted = await submit;
      console.log(submitted);
      if (submitted.status === true) {
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage(submitted.message));
        setSubmitted(true);
      } else {
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage(submitted.message));
        return;
      }
    } catch (err) {
   alert(err.message);
    }
  };

  
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      sx={{
        paddingLeft: 5,
        paddingRight: 5,
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundImage: `
        linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),
        url(${Logo})
      `,
      }}
    >
      {(() => {
        switch (change) {
          case 0:
            return (
              <Details
                label="email"
                value={email}
                placeholder="example@example.com"
                onChange={(e) => setEmail(e.target.value)}
                onClick={onChangeEmail}
                text="Please enter your registered email address"
                change={change}
                setChange={setChange}
              />
            );
          case 1:
            return (
              <Details
                label="OTP"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                onClick={VerifyOtp}
                text="Now provide your OTP here"
                change={change}
                setChange={setChange}
              />
            );
          case 2:
            return (
              <Details
                label="New password"
                placeholder="my favourite car"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={onChangePassword}
                text={submittedform ? null : "Enter a new password"}
                change={change}
                submitted={submittedform}
                setChange={setChange}
              />
            );
          default:
            return null;
        }
      })()}
    </Box>
  );
};

export default ForgetPassword;
