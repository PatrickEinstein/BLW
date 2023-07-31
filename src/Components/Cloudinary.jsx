import React, { useState } from "react";

const Cloudinary = async (image, setIsUploading) => {
  const preset_key = "ivpdncki";
  const cloudName = "dsdkmnf0b";

  if (Array.isArray(image)) {
    //this case for multiple images upload
    try {
      setIsUploading(true);
      const uploadedImages = [];
      for (const img of image) {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("filepath", img.path);
        formData.append("upload_preset", preset_key);

        const uploadedImage = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const uploadedImageResponse = await uploadedImage.json();
        uploadedImages.push(uploadedImageResponse.secure_url);
      }
      setIsUploading(false);
      return uploadedImages;
    } catch (err) {
      alert(err.message);
    }
  } else {
    try {
      //this case for single image upload
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("filepath", image.path);
      formData.append("upload_preset", preset_key);

      const uploadedImage = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadedImageResponse = await uploadedImage.json();
      setIsUploading(false);
      return uploadedImageResponse.secure_url;
    } catch (err) {
      alert(err.message);
    }
  }
};

export default Cloudinary;
