import * as React from "react";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker() {
  // Step 2: Create the state variable and setter function
  const [date, setDate] = useState(null);

  // Step 4: Update the state when a new date is selected
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        {/* Step 3: Pass the state variable to the DatePicker component */}
        <DatePicker
          label="Basic date picker"
          value={date}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
