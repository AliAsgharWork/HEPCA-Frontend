import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateCalender({ id, label, variant }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        id={id}
        label={label}
        variant={variant}
        sx={{ backgroundColor: "white" }}
      />
    </LocalizationProvider>
  );
}
