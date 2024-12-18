"use client";

import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Snackbar, Alert, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import CustomButton from "@/components/button/CustomButton";
import CustomInput from "@/components/input/CustomInput";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // Snackbar is shown only for errors
  });
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://car-app-be-production.up.railway.app/api/user/login",
        form
      );
      localStorage.setItem("token", response.data.token);
      router.push("/submit-car");
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Invalid credentials",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: "400px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <CustomInput
            name="email"
            label="Email"
            type="email"
            value={form.email}
            setValue={setForm}
          />
          <CustomInput
            name="password"
            label="Password"
            type="password"
            value={form.password}
            setValue={setForm}
          />
          <div style={{ marginTop: "20px" }}>
            <CustomButton
              sx={{ mt: 3, width: "100%" }}
              label="Login"
              onClick={handleSubmit}
            />
          </div>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
