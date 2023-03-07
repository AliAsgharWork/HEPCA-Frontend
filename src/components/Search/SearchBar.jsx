import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { color } from "@mui/system";
import { Button } from "@mui/material";
// import { makeStyles } from "@mui/material/styles";

// const useStyles = makeStyles({
//   field: {
//     marginTop: 20,
//     marginbottom: 20,
//     display: "block",
//   },
// });

const SearchBar = (props) => {
  //   const classes = useStyles();
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      // className={`flex flex-row space-x-3  `}
      className={`flex flex-col space-x-0 lg:flex-row lg:space-x-3 lg:space-y-0`}
      onSubmit={props.handleSearchSubmit}
    >
      <TextField
        style={{ backgroundColor: "white" }} //, borderRadius: 18
        id="filled-basic"
        label="Keywords"
        variant="filled"
        fullWidth
        value={props.text}
        onChange={props.handleTextChange}
      />
      <Button
        variant="contained"
        onClick={props.handleSearchSubmit}
        disabled={props.text.length > 0 ? false : true}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
