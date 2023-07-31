import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { Divider, IconButton, Stack, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UploadWidget from "./DropZone";
import { useMediaQuery } from "@mui/material";
import MyButtons from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import MultiLineTextField from "./MultilineTextField";
import MultiDropZone from "./MultiDropZone";
import Cloudinary from "./Cloudinary";
import BootLoader from "./BootLoader";
import { PatchCaller } from "../Hooks/PatchCaller";
import { setMessage, setSnackBarOpen, toggleopenModal } from "../Redux/reducer";
import { DeleteCaller } from "../Hooks/DeleteCaller";
import UploadWidgetVideo from "./VDdropZone";
import VCloudinary from "./Vcloudinary";

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

const DetailsConsole = ({ onClick, category, open, name }) => {
  const details = useSelector((state) => state.user.selectedRecipee);
  // console.log(details);
  const dispatch = useDispatch();
  const [openLoader, setOpenLoader] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const [image, setImage] = useState(details?.cover);
  const [recipe, setRecipee] = useState(details?.title);
  const [images, setImages] = useState(details?.descriptions?.descriptionimage);
  const [images2, setImages2] = useState(
    details?.ingredients?.ingredientsimage
  );
  const [images3, setImages3] = useState(
    details?.preparations?.preparationsimage
  );
  const [descriptions, setDescription] = useState(
    details?.descriptions?.descriptions
  );

  const [ingredients, setIngredients] = useState(
    details?.ingredients?.ingredients
  );

  const [preparations, setPreparations] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [video, setVideo] = useState(details?.covervideo); //NEW

  const useSubmit = async () => {
    try {
      setOpenLoader(true);
      const covervideo = await VCloudinary(video, setIsUploading); //NEW
      const cover = await Cloudinary(image, setIsUploading);
      const descriptionimage = await Cloudinary(images, setIsUploading);
      const ingredientsimage = await Cloudinary(images2, setIsUploading);
      const preparationsimage = await Cloudinary(images3, setIsUploading);

      const payLoad = {
        _id: details._id,
        title: recipe,
        cover: cover,
        covervideo: covervideo, //NEW
        descriptions: {
          descriptions: descriptions,
          descriptionimage: descriptionimage,
        },
        ingredients: {
          ingredients: ingredients,
          ingredientsimage: ingredientsimage,
        },
        preparations: {
          preparations: preparations,
          preparationsimage: preparationsimage,
        },
      };

      const updatedCategory = PatchCaller(payLoad, "update", {
        "Content-Type": "application/json",
      });
      const updatedCategoryResult = await updatedCategory;
      console.log(updatedCategoryResult);
      dispatch(toggleopenModal());
      dispatch(setSnackBarOpen(true));
      dispatch(setMessage(updatedCategoryResult.message));
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async () => {
    setOpenLoader(true);
    const Delete = DeleteCaller(
      {
        _id: details._id,
      },
      "deleteUpload"
    );

    const deleted = await Delete;
    setOpenLoader(false);
    console.log(deleted);
    dispatch(toggleopenModal());
    dispatch(setSnackBarOpen(true));
    dispatch(setMessage(deleted.message));
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
  };

  return (
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
        <Stack spacing={2} sx={style} justifyContent="space-between">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              paddingLeft: 1,
              paddingRight: 1,
            }}
          >
            <Typography
              sx={{
                color: "blueviolet",
                fontWeight: "bold",
                size: 40,
              }}
            >
              name : {details?.title}
            </Typography>
            <Typography
              sx={{
                color: "blueviolet",
                fontWeight: "bold",
                size: 40,
              }}
            >
              category: {details.category ? details?.category : null}
            </Typography>

            <MyButtons
              text="Back"
              startIcon={<ArrowBackIosIcon />}
              onClick={() => dispatch(toggleopenModal())}
            />
          </Stack>
          <Typography
            sx={{
              color: "blueviolet",
              fontWeight: "bold",
              size: 35,
            }}
          >
            {/* {foundjob.name} */}
          </Typography>
          <Stack direction="row" width="100%">
            <UploadWidget
              image={image}
              setImage={setImage}
              label="Upload a cover image"
            />
            <UploadWidgetVideo //NEW
              file={video}
              setFile={setVideo}
              label="Upload a video"
            />
          </Stack>
          <Stack
            spacing={3}
            justifyContent="space-between"
            sx={{
              width: "100%",
            }}
          >
            <TextField
              label="Name of Recipe"
              onChange={(e) => setRecipee(e.target.value)}
              defaultValue={details.title}
            />
            {details?.category === "online course" ||
            details?.category === "product" ||
            details?.category === "rome course" ? null : (
              <MultiDropZone images={images} setImages={setImages} />
            )}

            <MultiLineTextField
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={descriptions}
            />

            {details?.category === "online course" ||
            details?.category === "product" ||
            details?.category === "rome course" ? null : (
              <MultiDropZone images={images2} setImages={setImages2} />
            )}
            {details?.category === "online course" ||
            details?.category === "product" ||
            details?.category === "rome course" ? null : (
              <MultiLineTextField
                label="Ingredients"
                onChange={(e) => setIngredients(e.target.value)}
                defaultValue={ingredients}
              />
            )}
            {details?.category === "online course" ||
            details?.category === "product" ||
            details?.category === "rome course" ? null : (
              <MultiDropZone images={images3} setImages={setImages3} />
            )}

            {details?.category === "online course" ||
            details?.category === "product" ||
            details?.category === "rome course" ? null : (
              <MultiLineTextField
                label="Preparations"
                onChange={(e) => setPreparations(e.target.value)}
                defaultValue={preparations}
              />
            )}
          </Stack>
          <BootLoader open={isUploading} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <MyButtons
              text="Finish Editing"
              startIcon={<ArrowBackIosIcon />}
              onClick={useSubmit}
            />
            <MyButtons
              text="Delete"
              startIcon={<ArrowBackIosIcon />}
              onClick={onDelete}
            />
          </Stack>
          <BootLoader open={isUploading} />
        </Stack>
      </Fade>
    </Modal>
  );
};

export default DetailsConsole;
