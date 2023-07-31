import React from "react";
import { useSelector } from "react-redux";
import Createproject from "../Pages/createproject";
import Ongoingproject from "../Pages/Ongoingproject";
import Projectresult from "../Pages/VideoGallery";
import Settings, { ProductsAndCourses } from "../Pages/Settings";
import { Stack } from "@mui/material";
import CreateProjectScrape from "../Pages/createprojectscrape";
import pizza3 from "../assets/pizzza3.png";
import VideoGallery from "../Pages/VideoGallery";
import Blogs from "../Pages/Blog";
import Users from "../Pages/Users";

const Mainboard = () => {
  const typeofpage = useSelector((state) => state.user.typeofProfilePage);
  return (
    <Stack
      sx={{
        padding: 3,
        mt: "1%",
        height: "200%",
        overflow: "hidden",
        backgroundImage: `
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0.8) 
        ),
        url(${pizza3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {(() => {
        switch (typeofpage) {
          case "Create":
            return <CreateProjectScrape />;

          case "Recipees":
            return <Ongoingproject />;

          case "Project Result":
            return <Projectresult />;

          case "Products and Courses":
            return <ProductsAndCourses />;

          case "Video Gallery":
            return <VideoGallery />;

          case "Blog":
            return <Blogs />;
          case "Users":
            return <Users />;

          default:
            <Ongoingproject />;
            break;
        }
      })()}
    </Stack>
  );
};

export default Mainboard;
