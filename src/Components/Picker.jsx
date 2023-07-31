import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import {useMediaQuery} from "@mui/material";

export default function Picker({
  label,
  handleChange,
  options,
  selected,
  description,
  height,
  width,
}) {

  return (
    <div
      style={{
        height: height,
        width: width
      }}
    >
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          color: "white",
          border: "1px solid white", // Set the border to white
          borderRadius: "4px", // Optionally add some border radius for a better appearance
          backgroundColor:"black"
        }}
      >
        <InputLabel
          id="demo-simple-select-autowidth-label"
          sx={{
            color: "grey", // Set the color of the label to white
          }}
        >
          {description}
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selected}
          onChange={handleChange}
          label={label}
          sx={{
            backgroundColor: "powderblue",
          }}
        
          // endAdornment={<ArrowDropDownIcon />}
        >
          {options.map(({ value }) => (
            <MenuItem key={value} value={`${value}`}
           
            >
              <Typography
                sx={{
                  color: "black", // Set the color of the option text to white
                }}
              >
                {" "}
                {value}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
