import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import MyButtons from "../Components/Button";
import TextBox from "../Components/TextField";
import PostCaller from "../Hooks/PostCaller";
import { useSelector } from "react-redux";


const Createproject = () => {
  const [url, setUrl] = useState();
  const [waited, setAwaitedUser] = useState({});
  const { id, task_url, user_id } = waited;
  const token = useSelector((state) => state.user.loggedInUser.access);

  const onScrape = async () => {
    const user = PostCaller(
      {
        // task_url: url,
      },
      // "tasks/",
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    );
    const awaitedUser = await user;
    console.log(awaitedUser);
    setAwaitedUser(awaitedUser);
  };

  return (
    <Stack
      sx={{
        position: "relative",
        height: 700,
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: 50,
          textAlign: "center",
          marginTop: 4,
        }}
      >
        Create a new project
      </Typography>
      <Box
        sx={{
          background: "linear-gradient(to right, brown, violet)",
          height: "80%",
          width: "50%",
          position: "absolute",
          top: "20%",
          right: "2%",
          borderRadius: 25,
        }}
      >
        <Stack
          spacing={3}
          sx={{
            transform: "translate(8%, 120%)",
          }}
        >
          <TextBox
            id="outlined-basic"
            label="Scrape"
            variant="outlined"
            onChange={(e) => setUrl(e.target.value)}
          />

          <MyButtons
            text="Login"
            color="black"
            width="80%"
            height={60}
            onClick={onScrape}
          />
        </Stack>
        <Box
          sx={{
            transform: "translate(8%, 250%)",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: 20,
            }}
          >
            {id}
          </Typography>

          <Typography
            sx={{
              color: "white",
              fontSize: 20,
            }}
          >
            {task_url}
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: 20,
            }}
          >
            {user_id}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default Createproject;
