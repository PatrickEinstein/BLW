import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CoursesAndProducts from "../Components/CoursesAndProducts";
import EditConsole from "../Components/editConsole";
import { useEffect } from "react";
import { GetCaller } from "../Hooks/GetCaller";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsConsole from "../Components/DetailsConsole";
import BootLoader from "../Components/BootLoader";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function ProductsAndCourses() {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const openmodal = useSelector((state) => state.user.openModal);
  const [openConsole, seOpenConsole] = useState(false);
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllRecipesCategory = async () => {
      const data = await GetCaller("getupload");
      setCategories(data.categories);
    };
    setInterval(() => {
      getAllRecipesCategory();
      setOpen(false);
    }, 3000);
  }, []);

  return (
    <Stack height="100%">
      <Typography
        textAlign="center"
        sx={{
          color: "white",
          fontSize: 40,
        }}
      >
        Products and Courses
      </Typography>

      <Stack
        sx={{
          width: "70%",
          transform: "translate(30%, 10%)",
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 3 }}
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
            height: 680,
            pb: 10,
          }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Item
              sx={{
                paddingLeft: 0,
                marginLeft: 0,
                opacity: 1.0,
                height: 230,
                width: "auto",
                position: "relative",
              }}
            >
              <Typography color="blue" fontWeight="bold" fontSize="1rem">
                Products
              </Typography>

              <CoursesAndProducts what={categories.products} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Item
              sx={{
                paddingLeft: 0,
                marginLeft: 0,
                opacity: 1.0,
                height: 230,
                width: "auto",
                position: "relative",
              }}
            >
              <Typography color="blue" fontWeight="bold" fontSize="1rem">
                Online Courses
              </Typography>

              <CoursesAndProducts what={categories.onlineCourse} />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Item
              sx={{
                paddingLeft: 0,
                marginLeft: 0,
                opacity: 1.0,
                height: 230,
                width: "auto",
                position: "relative",
              }}
            >
              <Typography color="blue" fontWeight="bold" fontSize="1rem">
                Rome Courses
              </Typography>
              <CoursesAndProducts what={categories.romeCourse} />
            </Item>
          </Grid>
        </Grid>
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
