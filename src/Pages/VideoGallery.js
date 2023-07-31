import { Grid, IconButton, Stack, Typography } from "@mui/material";
import MyButtons from "../Components/Button";
import TextBox from "../Components/TextField";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import setSnackBarOpen from "../Redux/reducer";
import { setMessage } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import PostCaller from "../Hooks/PostCaller";
import { GetCaller } from "../Hooks/GetCaller";
import BootLoader from "../Components/BootLoader";
import { DeleteForeverRounded } from "@mui/icons-material";
import { DeleteCaller } from "../Hooks/DeleteCaller";

function VideoGallery() {
  const dispatch = useDispatch();
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(true);
  const [videos, setVideos] = useState([]);

  const onPublish = async () => {
    try {
      const Publish = PostCaller(
        {
          title: title,
          link: link,
        },
        "createvideo"
      );

      const PublishedVideo = await Publish;
      console.log(PublishedVideo);
      if (PublishedVideo.status === true) {
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage("Video succesfully created"));
        setLink("");
        setTitle("");
      } else {
        return;
      }
    } catch (err) {
      // dispatch(setSnackBarOpen(true));
      // dispatch(setMessage("Something went wrong"));
    }
  };
  const onDelete = async (_id) => {
    try {
      const Delete = DeleteCaller(
        {
          _id: _id,
        },
        "deletevideo",
        {
          "Content-Type": "application/json",
        }
      );
      const Deleted = await Delete;
      if (Deleted.success === true) {
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage("Video succesfully deleted"));
      } else {
        return;
      }
    } catch {
      // dispatch(setSnackBarOpen(true));
      // dispatch(setMessage("there was an error"));
    }
  };

  useEffect(() => {
    const GetAllVideosPost = async () => {
      const GetAllVideos = GetCaller("getvideos");
      const GotVideos = await GetAllVideos;
      // console.log(GotVideos.message);
      setVideos(GotVideos.message);
    };

    const intervalId = setInterval(() => {
      GetAllVideosPost();
      setOpen(false);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([^\s&?/]+)/;
    const match = url.match(regExp);
    return match && match[1];
  };

  return (
    <Stack
      width="100%"
      backgroundColor="black"
      spacing={2}
      height={600}
      sx={{
        opacity: 0.7,
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
      <Typography
        textAlign="center"
        sx={{
          color: "white",
          fontSize: 40,
        }}
      >
        VideoGallery
      </Typography>
      <BootLoader open={open} />
      <Stack
        width="70%"
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{
          transform: "translate(40%, 5%)",
        }}
      >
        <TextBox
          id="outlined-basic"
          label="Paste ID for youtube or video link for others"
          variant="outlined"
          onChange={(e) => setLink(e.target.value)}
        />
        <TextBox
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />

        <MyButtons
          text="Publish"
          color="black"
          width="15%"
          height={50}
          backgroundColor="powderblue"
          onClick={onPublish}
        />
      </Stack>
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
            overflow: "scroll",
            height: 600,
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
          {videos.map(({ item, index, title, link, _id }) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              key={_id}
              sx={{
                position: "relative",
              }}
            >
              {link.includes("youtube.com") ? (
                <YouTube
                  key={_id}
                  videoId={getYouTubeVideoId(link)}
                  opts={{
                    height: "80%",
                    width: "80%",
                  }}
                />
              ) : (
                <iframe
                  title={_id}
                  key={_id}
                  src={link}
                  style={{
                    height: "25%",
                    width: "80%",
                  }}
                />
              )}

              <Typography color="white" fontWeight="bold">
                {title}
              </Typography>
              <IconButton
                onClick={() => onDelete(_id)}
                sx={{
                  backgroundColor: "white",
                  position: "absolute",
                  top: 0,
                  right: "20%",
                }}
              >
                <DeleteForeverRounded color="white" />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default VideoGallery;
