// import * as React from "react";
// import Box from "@mui/material/Box";
// import { Typography } from "@mui/material";
// import Slider from "@mui/material/Slider";

// function valuetext(value) {
//   return `${value}°C`;
// }

// export default function DiscreteSlider() {
//   const [value, setValue] = React.useState([0, 5]);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   return (
//     <Box sx={{ width: 300 }}>
//       <Typography id="input-slider" color={"white"} gutterBottom>
//         TRL
//       </Typography>
//       <Slider
//         aria-label="Temperature"
//         value={value}
//         onChange={handleChange}
//         defaultValue={value}
//         getAriaValueText={valuetext}
//         valueLabelDisplay="auto"
//         step={1}
//         marks
//         min={0}
//         max={9}
//       />
//     </Box>
//   );
// }
// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import Slider from "@mui/material/Slider";
// import MuiInput from "@mui/material/Input";
// import VolumeUp from "@mui/icons-material/VolumeUp";

// const Input = styled(MuiInput)`
//   width: 42px;
// `;

// export default function InputSlider() {
//   const [value, setValue] = React.useState(30);

//   const handleSliderChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = (event) => {
//     setValue(event.target.value === "" ? "" : Number(event.target.value));
//   };

//   const handleBlur = () => {
//     if (value < 0) {
//       setValue(0);
//     } else if (value > 100) {
//       setValue(100);
//     }
//   };

//   return (
//     <Box sx={{ width: 250 }}>
//       <Typography id="input-slider" gutterBottom>
//         Volume
//       </Typography>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item>
//           <VolumeUp />
//         </Grid>
//         <Grid item xs>
//           <Slider
//             value={typeof value === "number" ? value : 0}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//           />
//         </Grid>
//         <Grid item>
//           <Input
//             value={value}
//             size="small"
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 10,
//               min: 0,
//               max: 100,
//               type: "number",
//               "aria-labelledby": "input-slider",
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";

const Input = styled(MuiInput)`
  width: 42px;
`;
function valuetext(value) {
  return `${value}°C`;
}

// const upper_limit = 0;
// const lower_limit = 9;

export default function InputSlider({ label, limit, handleValue, save_key }) {
  let upper_limit = limit[0];
  let lower_limit = limit[1];

  const [value, setValue] = React.useState([]);

  useEffect(() => {
    const savedInputValue = localStorage.getItem(save_key);
    const savedInputValue_array = eval("[" + savedInputValue + "]");
    console.log(
      "savedBugetvalue",
      typeof savedInputValue,
      savedInputValue,
      "===",
      typeof savedInputValue_array,
      savedInputValue_array
    );
    //WHAT I AM DOING IS A VERY BAD THING, I WILL BE INITILAIZING THE LOCAL STORAGE
    //VARIABLES WHICH WILL MAKE IT SO THAT IT WORKS AND THEN COMMENT OUT THE INITIAL THING TO KEEP THEM THINGS IN THE SAME
    //ONCE I HAVE TIME I WILL BNE BACK TO FIX THIS ISSUE
    if (savedInputValue) {
      setValue(savedInputValue_array);
      handleValue(savedInputValue);
    }
    // else if (savedInputValue == "") {
    //   const initial_array = [upper_limit, lower_limit];
    //   setValue(initial_array);
    //   handleValue(initial_array);
    // }
  }, []);

  useEffect(() => {
    console.log("SAving");
    localStorage.setItem(save_key, value);
  }, [value]);

  const handleSliderChange = (event, newValue) => {
    console.log(newValue);
    // localStorage.setItem(save_key, newValue);
    setValue(newValue);
    handleValue(newValue);
  };

  const handleInputChangeRight = (event) => {
    setValue(
      event.target.value === "" ? "" : [value[0], Number(event.target.value)]
    );
  };
  const handleInputChangeLeft = (event) => {
    setValue(
      event.target.value === "" ? "" : [Number(event.target.value), value[1]]
    );
  };
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: 220 }}>
      <Typography id="input-slider" color={"white"} gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            value={value[0]}
            size="small"
            onChange={handleInputChangeLeft}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: upper_limit,
              max: lower_limit,
              type: "number",
              "aria-labelledby": "input-slider",
              style: {
                fontFamily: "Arial",
                // color: "grey",
                backgroundColor: "white",
              },
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            // value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            aria-label="Temperature"
            value={value}
            getAriaValueText={valuetext}
            defaultValue={value}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={upper_limit}
            max={lower_limit}
          />
        </Grid>
        <Grid item>
          <Input
            value={value[1]}
            size="small"
            onChange={handleInputChangeRight}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: upper_limit,
              max: lower_limit,
              type: "number",
              "aria-labelledby": "input-slider",
              style: {
                fontFamily: "Arial",
                // color: "white",
                backgroundColor: "white",
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
