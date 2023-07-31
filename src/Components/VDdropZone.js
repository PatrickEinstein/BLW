import { EditOutlined, VideoCall } from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  Stack,
  IconButton,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "phosphor-react";
import { setMessage, setSnackBarOpen } from "../Redux/reducer";

const UploadWidgetVideo = ({ file, setFile, job, label }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(true); // Change to false for video upload
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Stack
      spacing={3}
      sx={{
        width: 200,
      }}
    >
      {isImage && ( // Change the condition to render video-related UI
        <Dropzone
          acceptedFiles=".mp4,.mov,.avi" // Accepted video file formats
          multiple={false}
          onDrop={(acceptedFiles) => setFile(acceptedFiles[0])} // Use setFile instead of setImage
        >
          {({ getRootProps, getInputProps }) => (
            <Stack>
              <Box
                {...getRootProps()}
                border={"2px dashed blue"}
                p="1rem"
                width="80%"
                borderRadius={5}
                sx={{
                  "&:hover": { cursor: "pointer" },
                  height: "auto",
                  position: "relative",
                }}
              >
                <input {...getInputProps()} />
                {file ? (
                  <Stack>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "20%",
                        left: "30% ",
                        fontSize: 60,
                      }}
                    >
                      <VideoCall /> {/* Assuming you have a Video icon */}
                    </IconButton>
                    <video
                      src={
                        typeof file === "string"
                          ? file
                          : URL.createObjectURL(file)
                      }
                      controls
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </Stack>
                ) : (
                  <Stack>
                    <Upload />
                    <Typography>{label}</Typography>
                  </Stack>
                )}
              </Box>
            </Stack>
          )}
        </Dropzone>
      )}
    </Stack>
  );
};

export default UploadWidgetVideo;
