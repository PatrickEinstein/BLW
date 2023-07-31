import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage, setSnackBarOpen } from "../Redux/reducer";

const VCloudinary = async (file, setIsUploading) => {
  const preset_key = "ivpdncki";
  const cloudName = "dsdkmnf0b";
  const dispatch = useDispatch();
  try {
    if (file.size > 100000) {
      dispatch(setSnackBarOpen(true));
      dispatch(setMessage("video cannot be greater than 100mb"));
    } else {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);

      const uploadedFile = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadedFileResponse = await uploadedFile.json();
      console.log(uploadedFileResponse);
      setIsUploading(false);
      return uploadedFileResponse.secure_url;
    }
  } catch (err) {
    setIsUploading(false);
    alert(err.message);
    return null;
  }
};

export default VCloudinary;
