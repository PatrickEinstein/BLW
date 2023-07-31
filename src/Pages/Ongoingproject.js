import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import ScrapeCard from "../Components/ScrapeCard";
import EditConsole from "../Components/editConsole";
import { useEffect } from "react";
import { GetCaller } from "../Hooks/GetCaller";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsConsole from "../Components/DetailsConsole";
import { Add } from "@mui/icons-material";
import { selectedProductId } from "../Redux/reducer";
import BootLoader from "../Components/BootLoader";
import { NearMe } from "@material-ui/icons";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Ongoingproject() {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const openmodal = useSelector((state) => state.user.openModal);
  const [openConsole, seOpenConsole] = useState(false);
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllRecipesCategory = async () => {
      const data = await GetCaller("getcollection");
      setCategories(data.NewUserCollectionItem);
    };
    const intervalId = setInterval(() => {
      getAllRecipesCategory();
      setOpen(false);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Stack>
      <Typography
        textAlign="center"
        sx={{
          color: "white",
          fontSize: 40,
          mb: 5,
        }}
      >
        Projects
      </Typography>

      <Stack
        sx={{
          width: "70%",
          position: "absolute",
          mt: 5,
          transform: "translate(30%, 10%)",
        }}
      >
        {categories ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              paddingLeft: 0,
              height: "100%",
              width: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
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
              height: 650,
              pb:10
            }}
          >
            {categories.map(({ name, filteredFormattedRecipes }) => (
              <Grid item xs={12} sm={12} md={12} key={name}>
                <Item
                  sx={{
                    paddingLeft: 0,
                    marginLeft: 0,
                    opacity: 1.0,
                    height: "auto",
                    width: "auto",
                    position: "relative",
                  }}
                >
                  <Typography color="blue" fontWeight="bold" fontSize="1rem">
                    Category: {name}
                  </Typography>

                  <ScrapeCard
                    key={name}
                    name={name}
                    filteredFormattedRecipes={filteredFormattedRecipes}
                  />
                  <IconButton
                    onClick={() => {
                      seOpenConsole(!openConsole);
                      dispatch(selectedProductId(name));
                    }}
                    fontSize="3rem"
                    sx={{
                      position: "absolute",
                      top: "40%",
                      right: "2%",
                      width: 70,
                      height: 70,
                      backgroundColor: "blue",
                    }}
                  >
                    <Add
                      sx={{
                        fontSize: 50,
                        color: "white",
                      }}
                    />
                  </IconButton>
                </Item>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="white">Hey</Typography>
        )}
      </Stack>
      <BootLoader open={open} />
      {openmodal ? <DetailsConsole open={openmodal} /> : null}
      {openConsole ? (
        <EditConsole
          open={openConsole}
          onClick={() => seOpenConsole(!openConsole)}
        />
      ) : null}
    </Stack>
  );
}

export default Ongoingproject;
