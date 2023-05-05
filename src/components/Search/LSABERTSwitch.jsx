import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function LSABERTSwitch({ handleModelBoolean }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    handleModelBoolean(!isChecked);
  };

  const labelStyle = {
    color: "white",
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isChecked}
          onChange={handleToggle}
          name="LSA-BERT switch"
        />
      }
      label={isChecked ? "LSA" : "BERT"}
      labelPlacement="start" //start" : "end"}
      style={labelStyle}
    />
  );
}
