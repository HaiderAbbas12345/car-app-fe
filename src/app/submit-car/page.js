"use client";

import React, { useState } from "react";
import { Box, Typography, Grid, Alert, IconButton } from "@mui/material";
import CustomInput from "@/components/input/CustomInput";
import CustomButton from "@/components/button/CustomButton";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const SubmitCar = () => {
  const [form, setForm] = useState({
    carModel: "",
    price: "",
    phoneNumber: "",
    maxPictures: 1,
    images: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, form.maxPictures);
    setForm((prevForm) => ({ ...prevForm, images: files }));
  };

  // Handle image removal
  const handleImageRemove = (index) => {
    setForm((prevForm) => {
      const updatedImages = [...prevForm.images];
      updatedImages.splice(index, 1);
      return { ...prevForm, images: updatedImages };
    });
  };

  // Form submission
  const handleSubmit = async () => {
    const { carModel, price, phoneNumber, maxPictures, images } = form;

    // Basic validations
    if (carModel.length < 3)
      return setError("Car Model must be at least 3 characters.");
    if (phoneNumber.length !== 11)
      return setError("Phone Number must be exactly 11 digits.");
    if (maxPictures < 1 || maxPictures > 10)
      return setError("Max Pictures should be between 1 and 10.");

    try {
      const formData = new FormData();
      formData.append("carModel", carModel);
      formData.append("price", price);
      formData.append("phoneNumber", phoneNumber);
      formData.append("maxPictures", maxPictures);
      images.forEach((image) => formData.append("images", image));

      const response = await axios.post(
        "http://localhost:5050/api/car/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response) throw new Error("Failed to submit car details");

      setSuccess("Car details submitted successfully!");
      setError("");

      // Reset form
      setForm({
        carModel: "",
        price: "",
        phoneNumber: "",
        maxPictures: 1,
        images: [],
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <Box p={3} maxWidth={600} mx="auto" mt={5} boxShadow={2} borderRadius={2}>
      <Typography color="#111" variant="h4" gutterBottom textAlign="center">
        Submit Car Details
      </Typography>

      <CustomInput
        label="Car Model"
        name="carModel"
        value={form.carModel}
        onChange={handleChange}
        placeholder="Enter Car Model"
      />
      <CustomInput
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Enter Price"
      />
      <CustomInput
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={form.phoneNumber}
        onChange={handleChange}
        placeholder="Enter 11-Digit Phone Number"
      />
      <CustomInput
        label="Max Pictures"
        name="maxPictures"
        type="number"
        value={form.maxPictures}
        onChange={handleChange}
        placeholder="Enter between 1-10"
      />

      {/* Image Upload */}
      <Typography mt={2}>Upload Images (Max: {form.maxPictures})</Typography>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ margin: "10px 0" }}
      />

      {/* Direct Image Previews */}
      <Grid container spacing={2} mt={1}>
        {form.images.map((file, index) => (
          <Grid
            sx={{
              position: "relative",
            }}
            item
            xs={4}
            key={index}
          >
            <Box
              component="img"
              src={URL.createObjectURL(file)}
              alt={`upload-preview-${index}`}
              width="100%"
              height={80}
              borderRadius={1}
              boxShadow={1}
            />
            <IconButton
              color="error"
              onClick={() => handleImageRemove(index)}
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "5px",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>

      {/* Error and Success Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}

      {/* Submit Button */}
      <CustomButton
        label="Submit"
        onClick={handleSubmit}
        sx={{ mt: 3, width: "100%" }}
      />
    </Box>
  );
};

export default SubmitCar;
