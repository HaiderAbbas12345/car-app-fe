"use client";

import React from "react";
import { TextField } from "@mui/material";

const CustomInput = ({
  name,
  label,
  type = "text",
  value,
  setValue,
  ...props
}) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <TextField
      name={name}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      margin="normal"
      {...props}
    />
  );
};

export default CustomInput;
