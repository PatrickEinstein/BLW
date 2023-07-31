import React, { useState } from "react";
import {
  BadgeMark,
  Box,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MyButtons from "./Button";
import TextBox from "./TextField";
import { useNavigate } from "react-router-dom";
import PostCaller from "../Hooks/PostCaller";
import { setLoggedInUser, setMessage, setSnackBarOpen } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import pizza2 from "../assets/pizza2.png";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSignIn = async () => {
    const user = PostCaller(
      {
        email: email,
        password: password,
      },
      "pizzaSignIn",
      {
        "Content-Type": "application/json",
      }
    );
    const awaitedUser = await user;
    console.log(awaitedUser);
    if (awaitedUser.status === "200" && awaitedUser.user[0].role === "admin") {
      dispatch(setSnackBarOpen(true));
      dispatch(setMessage(awaitedUser.message));
      dispatch(setLoggedInUser(awaitedUser.user));
      navigate("/dashboard");
    } else {
      console.log(awaitedUser);
      dispatch(setSnackBarOpen(true));
      dispatch(setMessage(awaitedUser.message));
      dispatch(setLoggedInUser(awaitedUser));
      return;
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: "black",
        height: 700,
        // paddingTop: 10,
        // paddingBottom: 10,
      }}
    >
      <Stack
        sx={{
          height: "100%",
          width: "50%",
          p: "0 0 3rem 1.5rem",
        }}
      >
        <img
          src={pizza2}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            filter: "brightness(120%)",
          }}
        />
      </Stack>
      <Box
        sx={{
          height: "auto",
          width: "50%",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Stack spacing={3} justifyContent="center" alignItems="center">
          <Typography
            sx={{
              color: "white",
              fontSize: 40,
            }}
          >
            Welcome
            <span
              style={{
                color: "lightblue",
                fontSize: 40,
                textAlign: "right",
              }}
            >
              you
            </span>
          </Typography>

          <TextBox
            id="outlined-basic3"
            label="Email Address"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextBox
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />

          <MyButtons
            text="Login"
            color="black"
            width="80%"
            height={60}
            onClick={onSignIn}
          />
          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                color: "white",
                marginRight: 8,
              }}
            >
              <IconButton>
                <Checkbox />
              </IconButton>
              Remember me
            </Typography>

            <Typography
              sx={{
                color: "white",
                marginTop: 2,
                marginLeft: 8,
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
          <Typography
            sx={{
              color: "white",
            }}
          >
            New here ?
            <span
              style={{
                color: "lightblue",
              }}
              onClick={() => navigate("/")}
            >
              Create an account
            </span>
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SignIn;
