import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditConsole from "../Components/editConsole";
import Picker from "../Components/Picker";
import TextBox from "../Components/TextField";
import MyButtons from "../Components/Button";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CreateProjectScrape() {
  const isNonMobileScreen = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState();
  const [category, setCategory] = React.useState("Recipee");
  const [openConsole, seOpenConsole] = useState(false);

  console.log(openConsole);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const theme = useTheme();
  return (
    <Stack height={650} width="100%">
      <Typography
        textAlign="center"
        sx={{
          color: "white",
          fontSize: 40,
        }}
      >
        Create a Category
      </Typography>

      <Box
        height="auto"
        width="50vw"
        m="5% auto auto auto "
        pb="2rem"
        borderRadius="25px"
        boxShadow="2px 2px 1px powderblue "
        backgroundColor="#800000"
        sx={{
          opacity: 0.6,
        }}
      >
        <Stack justifyContent="space-between" alignItems="center" spacing={5}>
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            p="0 2rem 0 2rem  "
          >
            <Typography
              color="white"
              fontWeight="bold"
              fontSize="1.2rem"
              sx={{
                m: " 1.5rem 0 0 1.5rem",
              }}
            >
              Category of what will you like to create
            </Typography>
            <Picker age={category} handleChange={handleChange} />
          </Stack>
          <TextBox
            label="Name of Category"
            onChange={(e) => setName(e.target.value)}
          />

          <MyButtons
            text="Add an item"
            backgroundColor="powderblue"
            color="black"
            width="60%"
            onClick={() => seOpenConsole(!openConsole)}
          />
        </Stack>

        {openConsole ? (
          <EditConsole
            open={openConsole}
            onClick={() => seOpenConsole(!openConsole)}
            name={name}
            category={category}
          />
        ) : null}
      </Box>
    </Stack>
  );
}

export default CreateProjectScrape;
