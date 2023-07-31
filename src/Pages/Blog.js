import { Grid, Stack, Typography } from "@mui/material";
import MyButtons from "../Components/Button";
import TextBox from "../Components/TextField";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import BlogCard from "../Components/card";
import CreateBlog from "../Components/CreateBlog";
import EditBlog from "../Components/EditBlog";
import { GetCaller } from "../Hooks/GetCaller";
import BootLoader from "../Components/BootLoader";
function Blogs() {
  const [createNewBlog, setcreateNewBlog] = useState(false);
  const [editBlog, setEditBlog] = useState(false);
  const [Blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const GetAllBlogs = async () => {
      const GetBlogs = GetCaller("getBlogs");
      const GotBlogs = await GetBlogs;
      // console.log(GotBlogs);
      setBlogs(GotBlogs.message);
    };

    const intervalId = setInterval(() => {
      GetAllBlogs();
      setOpen(false);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Stack
      width="100%"
      backgroundColor="black"
      spacing={2}
      height={600}
      sx={{
        opacity: 1.0,
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          width: "0.1rem",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "transparent",
        },
      }}
    >
      <BootLoader open={open} />
      <Typography
        textAlign="center"
        sx={{
          color: "white",
          fontSize: 40,
        }}
      >
        Blogs
      </Typography>

      <Stack
        width="70%"
        sx={{
          transform: "translate(40%, 0%)",
        }}
      >
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          sx={{
            mb: 10,
            overflow: "scroll",
            // height: 600,
            "&::-webkit-scrollbar": {
              width: "0.1rem",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "transparent",
            },
          }}
        >
          <MyButtons
            width="100%"
            height={100}
            text={"Create a new blog"}
            onClick={() => setcreateNewBlog((prev) => !prev)}
          />
          {Blogs.map(({ coverpicture, subtitle, _id, title, body, avatar }) => (
            <Grid item xs={12} sm={12} md={12} key={_id}>
              <BlogCard
                title={title}
                key={_id}
                coverpicture={coverpicture}
                body={body}
                avatar={avatar}
                subtitle={subtitle}
                _id={_id}
                onClick={() => setEditBlog((prev) => !prev)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      {createNewBlog && (
        <CreateBlog
          open={createNewBlog}
          onClick={() => setcreateNewBlog((prev) => !prev)}
        />
      )}
      {editBlog && (
        <EditBlog
          open={editBlog}
          onClick={() => setEditBlog((prev) => !prev)}
        />
      )}
    </Stack>
  );
}

export default Blogs;
