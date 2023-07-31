import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { Stack, Typography, useMediaQuery, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import BootLoader from "./BootLoader";
import MyButtons from "./Button";
import MultiLineTextField from "./MultilineTextField";
import { ArrowBackIos } from "@material-ui/icons";
import UploadWidget from "./DropZone";
import PostCaller from "../Hooks/PostCaller";
import Cloudinary from "./Cloudinary";
import { setMessage, setSnackBarOpen } from "../Redux/reducer";
import TextEditor from "./TextEditor";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        // onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const CreateBlog = ({ onClick, open }) => {
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [avatar, setAvatar] = useState();
  const [body, setBody] = useState("");

  const onPublish = async () => {
    const coverpicture = await Cloudinary(image, setIsUploading);
    const avatarpic = await Cloudinary(avatar, setIsUploading);
    try {
      const Publish = PostCaller(
        {
          title: title,
          subtitle: subtitle,
          coverpicture: coverpicture,
          avatar: avatarpic,
          body: body,
        },
        "createblog",
        {
          "Content-Type": "application/json",
        }
      );
      const Published = await Publish;

      if (Published.status === true) {
        onClick();
        console.log(Published);
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage("Blog succesfully created"));
      } else {
        console.log(Published);
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage("An error occured, try again later"));
        return;
      }
    } catch (err) {
      dispatch(setSnackBarOpen(true));
      dispatch(setMessage("System error, try again soon"));
    }
  };

  const style = {
    transform: isNonMobileScreen ? "translate(10%, 20%)" : "translate(3%, 3%)",
    width: isNonMobileScreen ? "80%" : "100%",
    maxHeight: isNonMobileScreen ? 500 : "auto",
    bgcolor: "background.paper",
    opacity: 1.0,
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
    overflow: isNonMobileScreen ? "scroll" : "scroll",
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
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade
          in={open}
          sx={{
            borderRadius: 10,
          }}
        >
          <Stack width="100%" height="100%" sx={style} spacing={2}>
            <Stack spacing={2} direction="row" justifyContent="space-between">
              <Typography
                sx={{
                  color: "blueviolet",
                  fontWeight: "bold",
                  size: 40,
                }}
              >
                Create a Blog Post
              </Typography>
              <MyButtons
                text="Back"
                startIcon={<ArrowBackIos />}
                onClick={onClick}
              />

              <BootLoader open={isUploading} />
            </Stack>
            <Stack direction="row">
              <UploadWidget
                image={image}
                setImage={setImage}
                label="Upload a cover picture"
              />
              <UploadWidget
                image={avatar}
                setImage={setAvatar}
                label="Upload an Author's avatar"
              />
            </Stack>

            <TextField
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Subtitle"
              onChange={(e) => setSubtitle(e.target.value)}
            />
            {/* <TextField
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <MultiLineTextField
              label="Article"
              onChange={(e) => setArticle(e.target.value)}
            />
            <TextField
              label="optional link"
              onChange={(e) => setLink(e.target.value)}
            /> */}
            <TextEditor setBody={setBody} />
            <MyButtons text="Publish Blog" onClick={onPublish} />
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateBlog;
