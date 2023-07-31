import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import LinearWithValueLabel from "./ProgressBar";
import { Edit, DeleteOutline } from "@mui/icons-material";
import MyButtons from "./Button";
import { useDispatch } from "react-redux";
import { setselectedRecipee, toggleopenModal } from "../Redux/reducer";
import { useMediaQuery } from "@mui/material";
function ScrapeCard({ filteredFormattedRecipes, name }) {
  const dispatch = useDispatch();
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        // position: "relative",
        marginLeft: 0,
        paddingLeft: 5,
        height: "100%",
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
      {filteredFormattedRecipes.map(
        ({
          _id,
          cover,
          descriptions,
          ingredients,
          preparations,
          title,
          covervideo,
        }) => (
          <Stack key={_id}>
            <Box width="10rem" height="10rem" m="0 2rem 0 2rem">
              <img
                key={_id}
                src={cover}
                alt="Result"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
                onClick={() => {
                  dispatch(
                    setselectedRecipee({
                      cover: cover,
                      covervideo: covervideo,
                      descriptions: descriptions,
                      ingredients: ingredients,
                      preparations: preparations,
                      title: title,
                      _id: _id,
                    })
                  );
                  dispatch(toggleopenModal());
                }}
              />
            </Box>
            <Typography fontWeight="bold" color="black">
              {title}
            </Typography>
          </Stack>
        )
      )}
    </Stack>
  );
}

export default ScrapeCard;
