import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setselectedBlog } from "../Redux/reducer";
import MyButtons from "./Button";

const BlogCard = ({
  coverpicture,
  subtitle,
  _id,
  title,
  body,
  avatar,
  onClick,
}) => {
  const dispatch = useDispatch();
  const [isExpandend, setIsExpanded] = useState(false);

  function HTMLRenderer({ htmlString }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  }
  const htmlString = `<h3 style="color: black;">${body}</h1>`;
  return (
    <Card
      sx={{
        background: "none",
        backgroundColor: "white",
        borderRadius: "0.55rem",
        // height: isExpandend ? "auto" : "100%",
      }}
    >
      <CardContent>
        <Typography color="black" fontWeight="bold" variant="h5">
          {title}
        </Typography>
        <img
          src={coverpicture}
          alt="img"
          style={{
            transform: "translate(-20%, 0%)",
            objectFit: "contain",
            height: 50,
            width: "40%",
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpandend)}
        >
          <MyButtons text={isExpandend ? "See Less" : " See more"} />
        </Button>
      </CardActions>
      <Collapse
        in={isExpandend}
        timeout="auto"
        unmountOnExit
        sx={{
          color: "indigo",
        }}
      >
        <CardContent>
          <Typography color="white" fontWeight="bold">
            {subtitle}
          </Typography>
          <br />
          <Typography color="white" fontWeight="bold">
            <HTMLRenderer htmlString={htmlString} />
          </Typography>
          <br />

          <Stack>
            <Typography color="black">About the author</Typography>
            <img
              src={avatar}
              alt="img"
              style={{
                objectFit: "contain",
                height: 50,
                width: 50,
                borderRadius: 50,
              }}
            />
          </Stack>
          <MyButtons
            onClick={() => {
              onClick();
              dispatch(
                setselectedBlog({
                  _id: _id,
                  title: title,
                  coverpicture: coverpicture,
                  subtitle: subtitle,
                  body: body,
                  avatar: avatar,
                })
              );
            }}
            text="Edit"
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BlogCard;
