import React, { useRef, useState } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { Add, Camera, Delete, Upload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  position: "relative",
}));

const MultiDropZone = ({ images, setImages }) => {
  const dropzoneRef = useRef(null);
  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleClick = (event) => {
    // Check if the click occurred on the add images icon
    if (event.target.id === "add-images-icon") {
      dropzoneRef.current.open();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    acceptedFiles: ".jpg, .jpeg, .png",
    multiple: true,
    onDrop,
  });

  return (
    <Stack>
      <Box
        {...getRootProps()}
        border={"1px solid blue"}
        p="1rem"
        width="100%"
        sx={{
          "&:hover": { cursor: "pointer" },
          minHeight: 110,
          //   height: 110,
          position: "relative",
        }}
      >
        <input {...getInputProps()} />
        {images.length > 0 ? (
          <Stack direction="row">
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={3} ms={4} key={index}>
                  <Item>
                    <Box key={index} position="relative">
                      <img
                        key={index}
                        src={
                          typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                        }
                        alt={`Result ${index}`}
                        style={{
                          objectFit: "contain",
                          height: "100%",
                          width: "100%",
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                        }}
                        onClick={() => removeImage(index)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Item>
                </Grid>
              ))}
            </Grid>
            <Box width="5vw" height="13vh">
              <IconButton onClick={handleClick}>
                <Add />
              </IconButton>
            </Box>
          </Stack>
        ) : (
          <Stack>
            <IconButton
              sx={{
                position: "absolute",
                top: "20%",
                left: "50% ",
                fontSize: 60,
              }}
            >
              <Camera />
            </IconButton>
            <Upload />
            <Typography>Upload Images</Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default MultiDropZone;
