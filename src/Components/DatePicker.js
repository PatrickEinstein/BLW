import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function BasicDatePicker({value, setValue}) {
  

  const whiteStyle = {
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid white',
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField', 'DateField']}>
        <DateField
          label="Controlled field"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          InputProps={{
            style: whiteStyle,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
