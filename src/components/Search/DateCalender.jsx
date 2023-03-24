import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DateCalender({ id, label, variant, handleDateChange }) {
  const [value, setValue] = React.useState(); //dayjs("2022-04-17")
  const format_string = "DD MMM YYYY";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        id={id}
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          handleDateChange(newValue.format(format_string));
          console.log(newValue.format(format_string));
        }}
        variant={variant}
        sx={{ backgroundColor: "white" }}
      />
    </LocalizationProvider>
  );
}

//WORK ON THIS LATER

// import * as React from "react";
// import { useEffect, useState } from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

// export default function DateCalender({
//   id,
//   label,
//   variant,
//   handleDateChange,
//   save_key,
// }) {
//   const [value, setValue] = useState(); //dayjs("2022-04-17")
//   const format_string = "YYYY-MM-DD";

//   useEffect(() => {
//     const savedInputValue = localStorage.getItem(save_key);
//     const savedInputValue_array = eval("[" + savedInputValue + "]");
//     console.log(
//       "savedBugetvalue",
//       typeof savedInputValue,
//       savedInputValue,
//       "===",
//       typeof savedInputValue_array,
//       savedInputValue_array
//     );
//     //WHAT I AM DOING IS A VERY BAD THING, I WILL BE INITILAIZING THE LOCAL STORAGE
//     //VARIABLES WHICH WILL MAKE IT SO THAT IT WORKS AND THEN COMMENT OUT THE INITIAL THING TO KEEP THEM THINGS IN THE SAME
//     //ONCE I HAVE TIME I WILL BNE BACK TO FIX THIS ISSUE
//     if (savedInputValue) {
//       setValue(savedInputValue_array);
//       handleDateChange(savedInputValue);
//     }
//     // else if (savedInputValue == "") {
//     //   const initial_array = [upper_limit, lower_limit];
//     //   setValue(initial_array);
//     //   handleValue(initial_array);
//     // }
//   }, []);

//   useEffect(() => {
//     console.log("SAving");
//     localStorage.setItem(save_key, value);
//   }, [value]);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         id={id}
//         label={label}
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//           handleDateChange(newValue.format(format_string));
//           console.log(newValue.format(format_string));
//         }}
//         variant={variant}
//         sx={{ backgroundColor: "white" }}
//       />
//     </LocalizationProvider>
//   );
// }
