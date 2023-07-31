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
import { DeleteCaller } from "../Hooks/DeleteCaller";
import { PatchCaller } from "../Hooks/PatchCaller";
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

const EditBlog = ({ onClick, open }) => {
  const dispatch = useDispatch();
  const blogprops = useSelector((state) => state.user.selectedBlog);
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(blogprops.coverpicture);
  const [title, setTitle] = useState(blogprops.title);
  const [subtitle, setSubtitle] = useState(blogprops.subtitle);
  const [avatar, setAvatar] = useState(blogprops.avatar);
  const [body, setBody] = useState(blogprops.body);

  const onEdit = async () => {
    const coverpicture = await Cloudinary(image, setIsUploading);
    const avatarpicture = await Cloudinary(avatar, setIsUploading);
    try {
      const Publish = PatchCaller(
        {
          _id: blogprops._id,
          title: title,
          subtitle: subtitle,
          coverpicture: coverpicture,
          body: body,
          avatar: avatarpicture,
        },
        "editBlog"
      );

      const EditedBlog = await Publish;
      if (EditedBlog.status === true) {
        onClick();
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage("Blog succesfully updated"));
      } else {
        return;
      }
    } catch (err) {
      dispatch(setSnackBarOpen(true));
      dispatch(setMessage(err.message));
    }
  };

  const onDelete = async () => {
    try {
      const Delete = DeleteCaller(
        {
          _id: blogprops._id,
        },
        "deleteBlog",
        {
          "Content-Type": "application/json",
        }
      );
      const Deleted = await Delete;
      if (Deleted.success === true) {
        onClick();
        dispatch(setSnackBarOpen(true));
        dispatch(setMessage("Blog succesfully deleted"));
      } else {
        return;
      }
    } catch (err) {}
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
                Edit Blog {blogprops.title}
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
                image={avatar}
                setImage={setImage}
                label="Upload an Avatar"
              />

              <UploadWidget
                image={image}
                setImage={setAvatar}
                label="Upload a cover picture"
              />
            </Stack>
            <TextField
              label="Title"
              defaultValue={blogprops.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Subtitle"
              defaultValue={blogprops.subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            {/* <TextField
              label="Description"
              defaultValue={blogprops.subtitle}
              onChange={(e) => setDescription(e.target.value)}
            />
            <MultiLineTextField
              label="Article"
              defaultValue={blogprops.article}
              onChange={(e) => setArticle(e.target.value)}
            />
            <TextField
              label="optional link"
              defaultValue={blogprops.link}
              onChange={(e) => setLink(e.target.value)}
            /> */}
            <TextEditor setBody={setBody} defaultValue={blogprops.body} />
            <Stack direction="row" justifyContent="space-between">
              <MyButtons text="Edit Blog" onClick={onEdit} />
              <MyButtons text="Delete Blog" onClick={onDelete} />
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditBlog;
