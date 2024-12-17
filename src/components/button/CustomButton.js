import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  onClick,
  label,
  variant = "contained",
  color = "primary",
  ...props
}) => {
  return (
    <Button variant={variant} color={color} onClick={onClick} {...props}>
      {label}
    </Button>
  );
};

export default CustomButton;
